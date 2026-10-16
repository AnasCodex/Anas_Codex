// A fixed-viewport recording of the real production UI and its scroll choreography.
import { chromium, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const url = process.env.QA_URL || "http://127.0.0.1:3000";
const folder = process.env.QA_FOLDER || "qa/radical";
await mkdir(`${folder}/tour`, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "no-preference",
  recordVideo: { dir: `${folder}/tour`, size: { width: 1440, height: 1000 } },
});
const page = await context.newPage();
try {
  await page.goto(url);
  await expect(page.locator(".scene-fallback")).toBeVisible();
  await page.mouse.move(1050, 310, { steps: 30 });
  await page.waitForTimeout(800);
  // Wheel input keeps natural scrolling, so ScrollTrigger responds as it does for visitors.
  async function enter(selector) {
    const destination = await page
      .locator(selector)
      .evaluate((el) => el.getBoundingClientRect().top + scrollY - 50);
    for (
      let y = await page.evaluate(() => scrollY), steps = 0;
      y < destination - 1 && steps < 80;
      y = await page.evaluate(() => scrollY), steps++
    ) {
      await page.mouse.wheel(0, Math.min(180, destination - y));
      await page.waitForTimeout(85);
    }
    await page.waitForTimeout(900);
  }
  await enter(".work-door");
  await enter(".feature-cinema");
  await enter(".kripton-feature");
  await enter(".work-reel");
  await page.locator(".reel-index button").nth(1).click();
  await page.waitForTimeout(900);
  await enter(".practice");
  await page.locator(".capability-row button").nth(2).click();
  await page.waitForTimeout(900);
  await enter(".engineering");
  await enter(".human-section");
  await enter(".journey-home");
  await enter(".contact-section");
  await page.waitForTimeout(1000);
} finally {
  await context.close();
  await page.video().saveAs(`${folder}/portfolio-tour.webm`);
  await browser.close();
}
console.log(`Saved ${folder}/portfolio-tour.webm`);
