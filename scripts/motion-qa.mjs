import { chromium, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const url = process.env.QA_URL || "http://127.0.0.1:3000";
const folder = "qa/radical";
await mkdir(folder + "/video", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const checks = [],
  errors = [],
  warnings = [],
  samples = [];
const check = (passed, label) => checks.push({ passed: !!passed, label });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "no-preference",
  recordVideo: { dir: folder + "/video", size: { width: 1440, height: 1000 } },
});
const page = await context.newPage();
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
  if (m.type() === "warning") warnings.push(m.text());
});
await page.goto(url);
await expect(page.locator(".scene-fallback")).toBeVisible();
await page.waitForTimeout(2800);
check(
  (await page.locator("canvas").count()) === 0,
  "Hero keeps the original SVG without loading WebGL",
);
check((await page.locator(".brand-object button").count()) === 0, "Static logo has no 3D controls");
await page.screenshot({ path: folder + "/motion-hero.png" });
await page.locator(".theme-toggle").click();
await page.waitForTimeout(350);
await page.screenshot({ path: folder + "/motion-light-hero.png" });
check(
  (await page.locator("html").getAttribute("data-theme")) === "light",
  "Theme switches with the static logo visible",
);
await page.locator(".theme-toggle").click();
const titleBefore = await page
  .locator(".hero-title-first")
  .evaluate((el) => getComputedStyle(el).transform);
for (let i = 0; i < 8; i++) {
  await page.mouse.wheel(0, 190);
  await page.waitForTimeout(200);
  samples.push(
    await page.evaluate(() => ({
      y: scrollY,
      clip: getComputedStyle(document.querySelector(".cinema-image")).clipPath,
      title: getComputedStyle(document.querySelector(".hero-title-first")).transform,
    })),
  );
}
check(
  samples.some((s) => s.title !== titleBefore),
  "Hero typography moves with scroll",
);
check(
  new Set(samples.map((s) => s.clip)).size > 1,
  "First project mask changes across scroll samples",
);
await page.screenshot({ path: folder + "/motion-project.png" });
for (let i = 0; i < 7; i++) {
  await page.mouse.wheel(0, 260);
  await page.waitForTimeout(180);
}
await page.locator(".reel-index button").nth(1).click();
await page.waitForTimeout(700);
check(
  (await page.locator(".reel-preview a").getAttribute("href")).includes("emad"),
  "Animated reel changes its destination",
);
await page.locator(".archive-portal").click();
await page.waitForURL("**/projects/");
await page.waitForTimeout(650);
check(
  await page.locator("#main-content").evaluate((el) => el === document.activeElement),
  "Client navigation moves focus to main",
);
check(
  await page
    .locator(".route-wipe")
    .evaluate((el) => Math.abs(new DOMMatrix(getComputedStyle(el).transform).d) < 0.01),
  "Route transition completely clears",
);
await page.getByRole("button", { name: /React/ }).click();
await page.waitForTimeout(650);
check(
  (await page.locator(".project-card").count()) === 11,
  "GSAP Flip filter returns 11 React projects",
);
await page.locator(".project-search input").fill("ymall");
await page.waitForTimeout(600);
await page.locator(".project-card h3 a").click();
await page.waitForURL("**/projects/ymall/");
await page.waitForTimeout(650);
check(
  (await page.locator("h1").innerText()).includes("واي مول") ||
    (await page.locator("h1").innerText()).toLowerCase().includes("ymall"),
  "Project detail navigation resolves",
);
await page.goBack();
await page.waitForURL("**/projects/");
await page.waitForTimeout(650);
check(await page.locator(".explorer").isVisible(), "Browser Back returns to working archive");
await page.goto(url);
await page.waitForTimeout(1500);
for (const width of [360, 390, 667, 768, 1024, 1440, 1920]) {
  await page.setViewportSize({ width, height: 900 });
  await page.waitForTimeout(650);
  check(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
    `Motion mode no horizontal overflow at ${width}`,
  );
}
await page.setViewportSize({ width: 390, height: 844 });
await page.reload();
await page.waitForTimeout(600);
check(
  (await page.locator("canvas").count()) === 0 &&
    (await page.locator(".scene-fallback").isVisible()),
  "Mobile shows the original SVG logo",
);
await page.emulateMedia({ reducedMotion: "reduce" });
await page.waitForTimeout(300);
check(
  await page.locator(".scene-fallback").isVisible(),
  "Logo remains visible with reduced motion",
);
await page.emulateMedia({ reducedMotion: "no-preference" });
await page.setViewportSize({ width: 1440, height: 1000 });
await page.waitForTimeout(2800);
check(
  (await page.locator("canvas").count()) === 0 &&
    (await page.locator(".scene-fallback").isVisible()),
  "Returning to desktop keeps the logo static",
);
await context.close();
await page.video().saveAs(folder + "/motion-walkthrough.webm");
await browser.close();
const result = {
  checks,
  failures: checks.filter((c) => !c.passed),
  errors: [...new Set(errors)],
  warnings: [...new Set(warnings)],
  samples,
  video: folder + "/motion-walkthrough.webm",
};
await writeFile(folder + "/motion-results.json", JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
if (result.failures.length || errors.length) process.exitCode = 1;
