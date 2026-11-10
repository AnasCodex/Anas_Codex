import { chromium } from "@playwright/test";
import lighthouse from "lighthouse";
import { mkdir, writeFile } from "node:fs/promises";
const stage = process.argv[2] || "before";
const folder = `qa/refine/${stage}`;
const base = "http://127.0.0.1:3000";
await mkdir(folder, { recursive: true });
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--remote-debugging-port=9223"],
});
const page = await browser.newPage();
if (stage === "before") {
  for (const locale of ["ar", "en"])
    for (const theme of ["dark", "light"])
      for (const width of [390, 820, 1440]) {
        await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
        await page.addInitScript((t) => localStorage.setItem("anas-theme", t), theme);
        await page.goto(base + (locale === "en" ? "/en/" : "/"));
        await page.evaluate((t) => (document.documentElement.dataset.theme = t), theme);
        await page.waitForTimeout(800);
        await page.screenshot({ path: `${folder}/hero-${locale}-${theme}-${width}.png` });
        await page.locator(".human-section").scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await page.screenshot({ path: `${folder}/human-${locale}-${theme}-${width}.png` });
      }
}
await page.close();
const results = [];
for (const route of ["", "en/", "projects/", "projects/jeetroom/"])
  for (const desktop of route === "" || route === "en/" ? [false, true] : [false])
    for (let round = 1; round <= 3; round++) {
      const name = (route.replaceAll("/", "-") || "ar") + (desktop ? "-desktop" : "-mobile");
      const flags = {
        port: 9223,
        output: "json",
        logLevel: "error",
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
        disableStorageReset: false,
        ...(desktop
          ? {
              formFactor: "desktop",
              screenEmulation: {
                mobile: false,
                width: 1440,
                height: 1000,
                deviceScaleFactor: 1,
                disabled: false,
              },
              throttling: {
                rttMs: 40,
                throughputKbps: 10240,
                cpuSlowdownMultiplier: 1,
                requestLatencyMs: 0,
                downloadThroughputKbps: 0,
                uploadThroughputKbps: 0,
              },
            }
          : {}),
      };
      const result = await lighthouse(base + "/" + route, flags);
      await writeFile(`${folder}/${name}-${round}.json`, result.report);
      const a = result.lhr.audits;
      const requests = a["network-requests"].details.items;
      const summary = {
        name,
        round,
        performance: Math.round(result.lhr.categories.performance.score * 100),
        LCP: a["largest-contentful-paint"].numericValue,
        CLS: a["cumulative-layout-shift"].numericValue,
        TBT: a["total-blocking-time"].numericValue,
        transferKiB: a["total-byte-weight"].numericValue / 1024,
        jsKiB:
          requests
            .filter((r) => r.resourceType === "Script")
            .reduce((s, r) => s + r.transferSize, 0) / 1024,
        mp4: requests.filter((r) => r.url.includes(".mp4")).length,
      };
      results.push(summary);
      console.log(JSON.stringify(summary));
      await writeFile(`${folder}/summary.json`, JSON.stringify(results, null, 2));
    }
await browser.close();
