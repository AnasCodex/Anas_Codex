import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
const folder = "qa/refine/after";
await mkdir(folder, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
const luminance = (rgb) =>
  rgb
    .map((n) => {
      n /= 255;
      return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
    })
    .reduce((s, n, i) => s + n * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = (a, b) => {
  a = luminance(a);
  b = luminance(b);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};
for (const locale of ["ar", "en"])
  for (const theme of ["dark", "light"])
    for (const width of [390, 820, 1440]) {
      const context = await browser.newContext({
        viewport: { width, height: width === 390 ? 844 : 1000 },
        reducedMotion: "reduce",
      });
      await context.addInitScript((t) => localStorage.setItem("anas-theme", t), theme);
      const page = await context.newPage();
      await page.goto("http://127.0.0.1:3000/" + (locale === "en" ? "en/" : ""));
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(150);
      await page.screenshot({ path: `${folder}/hero-${locale}-${theme}-${width}.png` });
      const text = page.locator(".hero-title-last");
      const box = await text.boundingBox();
      const color = await text.evaluate((e) =>
        getComputedStyle(e).color.match(/\d+/g).slice(0, 3).map(Number),
      );
      const clip = {
        x: Math.max(0, box.x),
        y: Math.max(0, box.y),
        width: Math.min(width - box.x, box.width),
        height: box.height,
      };
      const fg = await page.screenshot({ clip });
      await text.evaluate((e) => (e.style.color = "transparent"));
      const bg = await page.screenshot({ clip });
      await text.evaluate((e) => e.style.removeProperty("color"));
      const f = await sharp(fg).removeAlpha().raw().toBuffer(),
        b = await sharp(bg).removeAlpha().raw().toBuffer();
      const samples = [];
      for (let i = 0; i < f.length; i += 3)
        if (
          color.every((c, j) => Math.abs(f[i + j] - c) < 2) &&
          color.some((c, j) => Math.abs(b[i + j] - c) > 20)
        )
          samples.push(contrast(color, [b[i], b[i + 1], b[i + 2]]));
      samples.sort((a, b) => a - b);
      results.push({
        locale,
        theme,
        width,
        samples: samples.length,
        min: samples[0],
        p5: samples[Math.floor(samples.length * 0.05)],
        median: samples[Math.floor(samples.length * 0.5)],
      });
      await page.locator(".human-section").scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
      await page.screenshot({ path: `${folder}/human-${locale}-${theme}-${width}.png` });
      await context.close();
    }
await browser.close();
await writeFile(folder + "/image-contrast.json", JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
