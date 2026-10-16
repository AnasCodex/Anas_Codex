// Expose GSAP counts only in intercepted QA responses; never change production files.
import { chromium, expect } from "@playwright/test";
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
await mkdir("qa/polish", { recursive: true });
const url = process.env.QA_URL || "http://127.0.0.1:3010";
let fixture;
for (const name of await readdir("out/_next/static/chunks")) {
  if (!name.endsWith(".js")) continue;
  const body = await readFile("out/_next/static/chunks/" + name, "utf8");
  if (!body.includes(".hero-sculpture")) continue;
  const match = body.match(/([\w$]+\.[\w$]+)\.registerPlugin\(([\w$]+),([\w$]+)\.f\)/);
  if (match)
    fixture = {
      name,
      body: body.replace(
        match[0],
        `${match[0]},window.__qaTriggerCount=()=>${match[2]}.getAll().length`,
      ),
    };
}
if (!fixture) throw Error("GSAP QA fixture not located");
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "no-preference",
});
await page.route("**/_next/static/chunks/" + fixture.name, async (r) => {
  const response = await r.fetch();
  await r.fulfill({ response, body: fixture.body });
});
const counts = [];
await page.goto(url);
await expect.poll(() => page.evaluate(() => window.__qaTriggerCount?.() || 0)).toBeGreaterThan(0);
const baseline = await page.evaluate(() => window.__qaTriggerCount());
for (let i = 0; i < 3; i++) {
  counts.push({ route: "home", count: await page.evaluate(() => window.__qaTriggerCount()) });
  await page.locator('.site-footer a[href="/contact/"]').click();
  await page.waitForURL("**/contact/");
  await expect.poll(() => page.evaluate(() => window.__qaTriggerCount())).toBe(0);
  counts.push({ route: "contact", count: await page.evaluate(() => window.__qaTriggerCount()) });
  await page.locator(".site-header .brand").click();
  await page.waitForURL(url + "/");
  await expect.poll(() => page.evaluate(() => window.__qaTriggerCount())).toBe(baseline);
}
await page.emulateMedia({ reducedMotion: "reduce" });
await expect.poll(() => page.evaluate(() => window.__qaTriggerCount())).toBe(0);
await page.emulateMedia({ reducedMotion: "no-preference" });
await expect.poll(() => page.evaluate(() => window.__qaTriggerCount())).toBe(baseline);
await browser.close();
const result = { baseline, counts, reducedMotionCount: 0, restoredCount: baseline, passed: true };
await writeFile("qa/polish/motion-lifecycle.json", JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
