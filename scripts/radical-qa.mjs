import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, readFile, writeFile } from "node:fs/promises";
const url = process.env.QA_URL || "http://127.0.0.1:3000";
const folder = "qa/radical";
await mkdir(folder, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const checks = [],
  errors = [],
  violations = [],
  warnings = [];
const check = (passed, label, details) =>
  checks.push({ passed: !!passed, label, ...(details ? { details } : {}) });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
  colorScheme: "light",
});
const page = await context.newPage();
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
  if (m.type() === "warning") warnings.push(m.text());
});
await page.goto(url);
check(
  (await page.locator("html").getAttribute("data-theme")) === "dark",
  "Dark first visit with light OS",
);
const routes = [
  "",
  "projects/",
  "about/",
  "expertise/",
  "resume/",
  "contact/",
  "projects/motion-lab/",
  "projects/jeetroom/",
];
for (const locale of ["ar", "en"]) {
  const prefix = locale === "ar" ? "/" : "/en/";
  for (const theme of ["dark", "light"]) {
    await page.goto(url + prefix);
    if ((await page.locator("html").getAttribute("data-theme")) !== theme)
      await page.locator(".theme-toggle").click();
    await page.reload();
    check(
      (await page.locator("html").getAttribute("data-theme")) === theme,
      `${locale} ${theme}: preference persisted`,
    );
    for (const route of routes) {
      await page.goto(url + prefix + route);
      check((await page.locator("h1").count()) === 1, `${locale} ${theme} ${route}: single h1`);
      check(
        (await page.locator("html").getAttribute("dir")) === (locale === "ar" ? "rtl" : "ltr"),
        `${locale} ${route}: document direction`,
      );
      for (const width of [360, 390, 667, 768, 1024, 1440, 1920]) {
        await page.setViewportSize({ width, height: 1000 });
        const dimensions = await page.evaluate(() => ({
          width: document.documentElement.scrollWidth,
          viewport: innerWidth,
        }));
        check(
          dimensions.width <= width + 1,
          `${locale} ${theme} ${route || "home"} no overflow ${width}`,
          dimensions.width > width + 1 ? dimensions : undefined,
        );
      }
      await page.setViewportSize({ width: 1440, height: 1000 });
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      if (axe.violations.length)
        violations.push({
          locale,
          theme,
          route,
          issues: axe.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
          })),
        });
      if (!route) {
        for (const img of await page.locator("main img").all()) {
          await img.scrollIntoViewIfNeeded();
          await img.evaluate((e) => e.decode().catch(() => {}));
        }
        await page.evaluate(() => {
          document.activeElement?.blur();
          scrollTo({ top: 0, behavior: "instant" });
        });
        await page.screenshot({ path: `${folder}/${locale}-${theme}-desktop.png` });
        await page.screenshot({ path: `${folder}/${locale}-${theme}-full.png`, fullPage: true });
        await page.setViewportSize({ width: 390, height: 844 });
        const mobileAxe = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        if (mobileAxe.violations.length)
          violations.push({
            locale,
            theme,
            route: "home-mobile",
            issues: mobileAxe.violations.map((v) => ({
              id: v.id,
              nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
            })),
          });
        await page.screenshot({ path: `${folder}/${locale}-${theme}-mobile.png` });
        await page.screenshot({
          path: `${folder}/${locale}-${theme}-mobile-full.png`,
          fullPage: true,
        });
      } else if (theme === "dark") {
        for (const img of await page.locator("main img").all()) {
          await img.scrollIntoViewIfNeeded();
          await img.evaluate((e) => e.decode().catch(() => {}));
        }
        await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
        await page.screenshot({
          path: `${folder}/${locale}-${route.replaceAll("/", "-")}page.png`,
          fullPage: true,
        });
      }
    }
  }
  await page.goto(url + prefix + "projects/");
  await page.getByRole("button", { name: /Next.js/ }).click();
  await expect(page.locator(".project-card")).toHaveCount(3);
  check(
    (await page.locator(".project-card").count()) === 3,
    `${locale}: Next.js filter 3 projects`,
  );
  await page.locator(".project-search input").fill("jeet");
  await expect(page.locator(".project-card")).toHaveCount(1);
  check(
    (await page.locator(".project-card h3").innerText()) ===
      (locale === "ar" ? "جيت روم" : "Jeetroom"),
    `${locale}: search and filter combine`,
  );
  await page.locator(".project-search input").fill("zzzznotfound");
  check(await page.locator(".empty-state").isVisible(), `${locale}: empty state`);
  await page.locator(".empty-state button").click();
  check((await page.locator(".project-card").count()) === 12, `${locale}: lazy archive first 12`);
  while (await page.locator(".archive-more button").count())
    await page.locator(".archive-more button").click();
  check(
    (await page.locator(".project-card").count()) === 56,
    `${locale}: complete 56 project archive`,
  );
  await page.goto(url + prefix);
  await page.locator(".reel-index button").nth(2).click();
  check(
    (await page.locator(".reel-preview a").getAttribute("href")).includes("jeetroom"),
    `${locale}: reel switches project`,
  );
  await page.locator(".capability-row button").nth(7).click();
  check(
    (await page.locator(".capability-row button").nth(7).getAttribute("aria-expanded")) === "true",
    `${locale}: API capability expands`,
  );
  check(
    (await page.locator(".capability-body:not([hidden])").count()) === 1,
    `${locale}: one capability panel open`,
  );
  await page.locator(".menu-toggle").click();
  check(await page.locator("dialog").evaluate((e) => e.open), `${locale}: menu opens`);
  await page.keyboard.press("Escape");
  check(!(await page.locator("dialog").evaluate((e) => e.open)), `${locale}: escape closes menu`);
  check(
    await page.locator(".menu-toggle").evaluate((e) => e === document.activeElement),
    `${locale}: menu returns focus`,
  );
  await page.goto(url + prefix + "contact/");
  const submit = page.locator(".contact-form button[type=submit]");
  await submit.click();
  check((await page.locator(".field-error").count()) === 4, `${locale}: required field validation`);
  check(
    await page.locator("[name=user_name]").evaluate((e) => e === document.activeElement),
    `${locale}: first invalid field focus`,
  );
  for (const [name, value] of [
    ["user_name", "Local QA"],
    ["user_email", "bad-address"],
    ["subject", "Local test"],
    ["message", "Local form validation, never sent."],
  ])
    await page.locator(`[name=${name}]`).fill(value);
  await submit.click();
  check(
    (await page.locator("[name=user_email]").getAttribute("aria-invalid")) === "true",
    `${locale}: email validation`,
  );
  await page.locator("[name=user_email]").fill("qa@example.com");
  let sends = 0;
  await page.route("https://api.emailjs.com/**", (r) => {
    sends++;
    return r.abort();
  });
  await submit.click();
  check(
    await page.locator(".form-notice.error").isVisible(),
    `${locale}: unconfigured form gives honest error`,
  );
  check(sends === 0, `${locale}: no email sent without credentials`);
  check(
    (await page.locator("[name=message]").inputValue()) !== "",
    `${locale}: form failure preserves data`,
  );
}
const projects = JSON.parse(await readFile("src/data/projects.json", "utf8"));
for (const prefix of ["/", "/en/"])
  for (const p of projects) {
    const r = await context.request.get(url + prefix + "projects/" + p.slug + "/");
    check(r.status() === 200, `${prefix}${p.slug} HTTP 200`);
  }
for (const asset of [
  "/resume/Anas_Naser_CV_AR.pdf",
  "/resume/Anas_Naser_CV_EN.pdf",
  "/sitemap.xml",
  "/robots.txt",
])
  check((await context.request.get(url + asset)).status() === 200, `${asset} available`);
const noStorage = await browser.newContext({ reducedMotion: "reduce" });
await noStorage.addInitScript(() =>
  Object.defineProperty(window, "localStorage", {
    get() {
      throw Error("blocked");
    },
  }),
);
const fallback = await noStorage.newPage();
await fallback.goto(url);
await fallback.locator(".theme-toggle").click();
check(
  (await fallback.locator("html").getAttribute("data-theme")) === "light",
  "Theme works when storage unavailable",
);
await noStorage.close();
await browser.close();
const result = {
  checkedAt: new Date().toISOString(),
  url,
  checks,
  failures: checks.filter((c) => !c.passed),
  errors: [...new Set(errors)],
  warnings: [...new Set(warnings)],
  accessibility: violations,
};
await writeFile(folder + "/results.json", JSON.stringify(result, null, 2));
console.log(
  JSON.stringify(
    {
      checks: checks.length,
      failures: result.failures,
      errors: result.errors,
      warnings: result.warnings,
      accessibility: violations,
    },
    null,
    2,
  ),
);
if (result.failures.length || errors.length || violations.length) process.exitCode = 1;
