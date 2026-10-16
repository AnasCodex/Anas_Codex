import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile, writeFile, mkdir } from "node:fs/promises";
const url = process.env.QA_URL || "http://127.0.0.1:3010";
const folder = "qa/polish";
await mkdir(folder, { recursive: true });
const projects = JSON.parse(await readFile("src/data/projects.json", "utf8")).filter(
  (p) => p.videos?.length,
);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const checks = [],
  errors = [],
  warnings = [],
  accessibility = [];
const check = (passed, label, details) =>
  checks.push({ passed: !!passed, label, ...(details ? { details } : {}) });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "no-preference",
});
const page = await context.newPage();
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
  if (m.type() === "warning") warnings.push(m.text());
});
let requests = [];
page.on("request", (r) => {
  if (r.url().includes("/videos/") && r.url().endsWith(".mp4")) requests.push(r.url());
});
for (const locale of ["ar", "en"]) {
  const prefix = locale === "ar" ? "/" : "/en/";
  await page.goto(url + prefix);
  await page.waitForTimeout(3000);
  check(requests.length === 0, `${locale}: hero loads without a video download`);
  await page.locator(".menu-toggle").click();
  check(
    await page
      .getByRole("link", { name: locale === "ar" ? /من أنا/ : /About/, exact: false })
      .isVisible(),
    `${locale}: natural About navigation label`,
  );
  await page.keyboard.press("Escape");
  for (const theme of ["dark", "light"]) {
    if ((await page.locator("html").getAttribute("data-theme")) !== theme)
      await page.locator(".theme-toggle").click();
    for (const width of [1440, 820, 390]) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await page.waitForTimeout(900);
      check(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        `${locale}/${theme}/${width}: hero has no overflow`,
      );
      await page.evaluate(() => document.activeElement?.blur());
      await page.screenshot({ path: `${folder}/hero-after-${locale}-${theme}-${width}.png` });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.locator(".kripton-image").scrollIntoViewIfNeeded();
  const preview = page.locator(".video-preview video");
  await expect.poll(() => preview.evaluate((v) => !v.paused && v.currentTime > 0)).toBe(true);
  check(true, `${locale}: real featured preview plays on visibility`);
  check(
    await preview.evaluate((v) => v.muted && v.playsInline && v.loop),
    `${locale}: preview is muted, inline, looping`,
  );
  await page.screenshot({ path: `${folder}/featured-video-${locale}.png` });
  await page.locator(".video-preview .video-control").click();
  await expect.poll(() => preview.evaluate((v) => v.paused)).toBe(true);
  await page.locator(".practice").scrollIntoViewIfNeeded();
  await page.locator(".kripton-image").scrollIntoViewIfNeeded();
  check(
    await preview.evaluate((v) => v.paused),
    `${locale}: explicit preview pause persists after scrolling`,
  );
  await page.locator(".video-preview .video-control").click();
  await expect.poll(() => preview.evaluate((v) => !v.paused)).toBe(true);
  await page.locator(".practice").scrollIntoViewIfNeeded();
  await expect.poll(() => preview.evaluate((v) => v.paused)).toBe(true);
  check(true, `${locale}: preview stops outside viewport`);
  check(
    requests.every((r) => r.endsWith("kripton-preview.mp4")),
    `${locale}: homepage never downloads full recordings`,
  );
  for (let i = 0; i < 9; i++) {
    const button = page.locator(".capability-row button").nth(i);
    if ((await button.getAttribute("aria-expanded")) !== "true") await button.click();
    check(
      (await page.locator(".capability-body:not([hidden]) a").count()) === 0,
      `${locale}: service ${i + 1} has no project/example links`,
    );
    check(
      (await page.locator(".capability-body:not([hidden]) p").innerText()).length > 25,
      `${locale}: service ${i + 1} retains its description`,
    );
  }
  await page.locator(".capability-row button").nth(6).click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${folder}/services-${locale}.png` });
  for (const [i, p] of projects.entries()) {
    requests = [];
    await page.goto(url + prefix + "projects/" + p.slug + "/");
    const video = page.locator(".video-full video");
    await page.locator('.project-detail-actions a[href="#video"]').click();
    check(
      requests.length === 0 && !(await video.getAttribute("src")),
      `${locale}/${p.slug}: full recording waits for intent`,
    );
    const before = await page.locator(".project-video").boundingBox();
    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    if (axe.violations.length)
      accessibility.push({
        locale,
        slug: p.slug,
        violations: axe.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
        })),
      });
    await page.locator(".video-full .video-control").click();
    await expect.poll(() => video.evaluate((v) => v.currentTime > 0 && !v.paused)).toBe(true);
    const actual = await video.evaluate((v) => ({
      width: v.videoWidth,
      height: v.videoHeight,
      duration: v.duration,
      controls: v.controls,
      muted: v.muted,
      source: v.currentSrc,
    }));
    check(
      actual.width === p.videos[0].width &&
        actual.height === p.videos[0].height &&
        Math.abs(actual.duration - p.videos[0].duration) < 0.1,
      `${locale}/${p.slug}: recording decodes with verified dimensions/duration`,
      actual,
    );
    check(
      actual.controls && actual.muted,
      `${locale}/${p.slug}: native playback controls and silent start`,
    );
    const after = await page.locator(".project-video").boundingBox();
    check(
      Math.abs(before.height - after.height) < 1,
      `${locale}/${p.slug}: playback does not shift layout`,
    );
    await video.evaluate((v) => {
      v.currentTime = v.duration - 2;
    });
    await expect.poll(() => video.evaluate((v) => !v.seeking && v.readyState >= 2)).toBe(true);
    check(true, `${locale}/${p.slug}: can seek to the end`);
    if (i === 0) await page.screenshot({ path: `${folder}/detail-video-${locale}.png` });
    await page.locator("h1").scrollIntoViewIfNeeded();
    await expect.poll(() => video.evaluate((v) => v.paused)).toBe(true);
    check(true, `${locale}/${p.slug}: full recording pauses out of view`);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator(".project-recording").scrollIntoViewIfNeeded();
    check(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      `${locale}/${p.slug}: mobile media fits viewport`,
    );
    if (i === 0) await page.screenshot({ path: `${folder}/detail-video-${locale}-mobile.png` });
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
  await page.goto(url + prefix + "projects/");
  while (await page.locator(".archive-more button").count())
    await page.locator(".archive-more button").click();
  check(
    (await page.locator(".project-video-badge").count()) === 6,
    `${locale}: archive marks all six recorded projects`,
  );
  requests = [];
}
for (const p of projects) {
  const r = await context.request.get(url + p.videos[0].src, {
    headers: { Range: "bytes=0-1023" },
  });
  check(
    r.status() === 206 &&
      (await r.body()).length === 1024 &&
      r.headers()["content-type"] === "video/mp4",
    `${p.slug}: byte-range video delivery`,
  );
}
const reduced = await browser.newContext({
  reducedMotion: "reduce",
  viewport: { width: 390, height: 844 },
});
const rp = await reduced.newPage();
let reducedRequests = 0;
rp.on("request", (r) => {
  if (r.url().endsWith(".mp4")) reducedRequests++;
});
await rp.goto(url);
await rp.locator(".kripton-image").scrollIntoViewIfNeeded();
check(reducedRequests === 0, "Reduced motion: no automatic video download");
await rp.locator(".video-control").click();
await expect
  .poll(() => rp.locator("video").evaluate((v) => v.currentTime > 0 && !v.paused))
  .toBe(true);
check(true, "Reduced motion: explicit playback works on touch viewport");
await reduced.close();
const failed = await browser.newContext({ reducedMotion: "reduce" });
const fp = await failed.newPage();
await fp.route("**/videos/*.mp4", (r) => r.abort());
await fp.goto(url + "/projects/kripton/");
await fp.locator(".video-control").click();
await expect(fp.locator(".video-unavailable")).toBeVisible();
check(
  await fp.locator(".video-poster").isVisible(),
  "Failed video retains poster and localized explanation",
);
await failed.close();
await context.close();
await browser.close();
const result = {
  checkedAt: new Date().toISOString(),
  checks,
  failures: checks.filter((c) => !c.passed),
  errors: [...new Set(errors)],
  warnings: [...new Set(warnings)],
  accessibility,
};
await writeFile(folder + "/results.json", JSON.stringify(result, null, 2));
console.log(
  JSON.stringify(
    {
      checks: checks.length,
      failures: result.failures,
      errors: result.errors,
      warnings: result.warnings,
      accessibility,
    },
    null,
    2,
  ),
);
if (result.failures.length || errors.length || accessibility.length) process.exitCode = 1;
