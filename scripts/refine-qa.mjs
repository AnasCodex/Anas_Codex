import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
const folder = "qa/refine/after";
await mkdir(folder, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const checks = [],
  errors = [],
  violations = [];
const check = (passed, label, detail) =>
  checks.push({ passed: !!passed, label, ...(detail ? { detail } : {}) });
const routes = ["", "projects/", "about/", "contact/", "projects/kripton/", "projects/jeetroom/"];
for (const locale of ["ar", "en"])
  for (const theme of ["dark", "light"]) {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    await context.addInitScript((t) => localStorage.setItem("anas-theme", t), theme);
    await context.route("https://api.emailjs.com/**", (r) =>
      r.fulfill({ status: 500, body: "Local test only" }),
    );
    const page = await context.newPage();
    page.on("pageerror", (e) => errors.push(e.message));
    for (const width of [390, 820, 1440, 360]) {
      await page.setViewportSize({ width, height: width <= 390 ? 844 : 1000 });
      for (const route of routes) {
        await page.goto("http://127.0.0.1:3000/" + (locale === "en" ? "en/" : "") + route);
        await page.evaluate(() => document.fonts.ready);
        check(
          await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
          `${locale}/${theme}/${width}/${route || "home"}: no horizontal overflow`,
        );
        if (width !== 360)
          await page.screenshot({
            path: `${folder}/page-${locale}-${theme}-${width}-${route.replaceAll("/", "-") || "home"}.png`,
          });
        if (width === 390) {
          if (route === "contact/") {
            await page.locator("button[type=submit]").click();
            check(
              await page.locator("[name=user_name]").evaluate((e) => e === document.activeElement),
              "Invalid form focuses the first required field",
            );
            await page.screenshot({ path: `${folder}/form-errors-${locale}-${theme}.png` });
          }
          const result = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
            .analyze();
          if (result.violations.length)
            violations.push({
              locale,
              theme,
              route,
              items: result.violations.map((v) => ({
                id: v.id,
                nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
              })),
            });
        }
      }
    }
    await page.goto("http://127.0.0.1:3000/" + (locale === "en" ? "en/" : ""));
    const badge = page.locator(".hero-portrait-wrap figcaption");
    check(
      (await badge.getAttribute("dir")) === (locale === "ar" ? "rtl" : "ltr"),
      `${locale}: badge has its own reading direction`,
    );
    const geometry = await badge.evaluate((e) => ({
      children: [...e.children].map((c) => ({ name: c.className, x: c.getBoundingClientRect().x })),
      font: getComputedStyle(e).fontFamily,
    }));
    check(
      locale === "ar"
        ? geometry.children[0].x > geometry.children[1].x
        : geometry.children[0].x < geometry.children[1].x,
      `${locale}: badge status follows locale order`,
      geometry,
    );
    await page.locator(".menu-toggle").focus();
    await page.keyboard.press("Enter");
    check(
      await page.locator(".navigation-dialog").evaluate((e) => e.open),
      `${locale}: keyboard opens menu`,
    );
    await page.keyboard.press("Tab");
    check(
      await page.evaluate(() => !!document.activeElement.closest("dialog")),
      `${locale}: focus stays inside menu`,
    );
    await page.keyboard.press("Escape");
    check(
      await page.locator(".menu-toggle").evaluate((e) => e === document.activeElement),
      `${locale}: Escape restores menu focus`,
    );
    await page.locator(".work-reel").scrollIntoViewIfNeeded();
    const buttons = page.locator(".reel-index button");
    await buttons.nth(0).focus();
    await page.keyboard.press("ArrowDown");
    await expect(buttons.nth(1)).toHaveAttribute("aria-pressed", "true");
    check(
      (await page.locator(".reel-description a").getAttribute("href")) ===
        (locale === "en" ? "/en" : "") + "/projects/emad/",
      `${locale}: keyboard selection updates details`,
    );
    check(
      (await page.locator(".reel-incoming").evaluate((e) => getComputedStyle(e).transform)) ===
        "none",
      `${locale}: reduced motion changes instantly`,
    );
    await expect(page.locator(".back-to-top")).toBeVisible();
    await page.locator(".back-to-top").focus();
    check(
      (await page.locator(".back-to-top").evaluate((e) => getComputedStyle(e).outlineStyle)) !==
        "none",
      `${locale}: back-to-top has visible keyboard focus`,
    );
    await page.screenshot({ path: `${folder}/back-to-top-${locale}-${theme}.png` });
    await page.keyboard.press("Enter");
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    check(
      await page.locator(".site-header .brand").evaluate((e) => e === document.activeElement),
      `${locale}: back-to-top restores header focus`,
    );
    await page.locator(".archive-portal").click();
    await page.waitForURL("**/projects/");
    await page.goBack();
    await page.waitForURL(locale === "en" ? "**/en/" : "http://127.0.0.1:3000/");
    check(
      (await page.locator(".hero-title").count()) === 1,
      `${locale}: browser back returns to homepage`,
    );
    await context.close();
  }
await writeFile(
  `${folder}/matrix-results.json`,
  JSON.stringify({ checks, errors, violations }, null, 2),
);
// Real animation and touch interaction, isolated from the layout matrix.
for (const locale of ["ar", "en"]) {
  const context = await browser.newContext({
    viewport: { width: 820, height: 1000 },
    reducedMotion: "no-preference",
    hasTouch: true,
    recordVideo: { dir: `${folder}/recording`, size: { width: 820, height: 1000 } },
  });
  const page = await context.newPage();
  let mp4 = 0;
  page.on("request", (r) => {
    if (r.url().includes(".mp4")) mp4++;
  });
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:3000/" + (locale === "en" ? "en/" : ""));
  await page.waitForTimeout(300);
  check(mp4 === 0, `${locale}: no MP4 before preview visibility`);
  await page.locator(".work-reel").scrollIntoViewIfNeeded();
  await page.waitForTimeout(650);
  await page.locator(".reel-index button").nth(1).tap();
  await expect(page.locator(".reel-index button").nth(1)).toHaveAttribute("aria-pressed", "true");
  await page.waitForTimeout(70);
  const moving = await page
    .locator(".reel-incoming")
    .evaluate((e) => getComputedStyle(e).transform);
  check(moving !== "none", `${locale}: image moves during the 280ms reveal`, moving);
  await page.locator(".reel-index button").nth(2).tap();
  await page.locator(".reel-index button").nth(3).tap();
  check(
    (await page.locator(".reel-description a").getAttribute("href")).includes("gaming-experience"),
    `${locale}: rapid changes update link immediately`,
  );
  await page.waitForTimeout(340);
  check(
    (await page.locator(".reel-incoming").evaluate((e) => getComputedStyle(e).transform)) ===
      "none",
    `${locale}: superseded animations end cleanly`,
  );
  await page.locator(".reel-index button").nth(0).tap();
  await page.waitForTimeout(400);
  await page.locator(".reel-index button").nth(1).tap();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${folder}/reel-${locale}.png` });
  await page.locator(".reel-description a").click();
  await page.waitForURL("**/projects/emad/");
  check(
    (await page.locator(".route-wipe").count()) === 0,
    `${locale}: MotionDirector unmounts outside home`,
  );
  await context.close();
  await page.video().saveAs(`${folder}/reel-${locale}.webm`);
}
await browser.close();
const result = {
  checks,
  failures: checks.filter((c) => !c.passed),
  errors: [...new Set(errors)],
  violations,
};
await writeFile(`${folder}/functional-results.json`, JSON.stringify(result, null, 2));
console.log(
  JSON.stringify(
    { checks: checks.length, failures: result.failures, errors: result.errors, violations },
    null,
    2,
  ),
);
if (result.failures.length || errors.length || violations.length) process.exitCode = 1;
