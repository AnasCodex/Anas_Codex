import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";

const origin = "http://127.0.0.1:3000";
const folder = "qa/contact-redesign/after";
const widths = [320, 360, 390, 540, 768, 820, 1024, 1440, 1920];
const email = "anas.coding404@gmail.com";
const whatsapp = "https://wa.me/967730110440";
const instagram = "https://www.instagram.com/anascodex/";
const cases = [],
  accessibility = [],
  errors = [];
await mkdir(folder, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const locale of ["ar", "en"]) {
    for (const theme of ["dark", "light"]) {
      const context = await browser.newContext({
        reducedMotion: "reduce",
        permissions: ["clipboard-read", "clipboard-write"],
      });
      await context.addInitScript((theme) => localStorage.setItem("anas-theme", theme), theme);
      await context.route("https://api.emailjs.com/**", (request) => request.abort());
      const page = await context.newPage();
      page.on("pageerror", (error) => errors.push(error.message));
      const base = origin + (locale === "en" ? "/en/" : "/");
      for (const variant of ["home", "page"]) {
        const selector = variant === "home" ? "#contact" : ".contact-page";
        await page.goto(base + (variant === "page" ? "contact/" : ""));
        await page.evaluate(() => document.fonts.ready);
        const contact = page.locator(selector);
        await expect(contact.locator(`a[href="mailto:${email}"]`)).toHaveCount(1);
        await expect(contact.locator(`a[href="${whatsapp}"]`)).toHaveCount(1);
        await expect(contact.locator(`a[href="${instagram}"]`)).toContainText("@anascodex");
        await expect(contact.locator(".form-setup")).toHaveCount(0);
        await expect(contact.locator(".form-notice")).toBeEmpty();
        if (variant === "page") {
          await expect(contact.locator('a[href="tel:+966573984094"]')).toHaveCount(1);
          await expect(contact.locator(`a[href="${whatsapp}"]`)).toContainText("730110440");
          await expect(contact.locator(`a[href="${base.replace(origin, "")}resume/"]`)).toHaveCount(
            1,
          );
        } else {
          await expect(
            contact.locator(
              `a[download][href="/resume/Anas_Naser_CV_${locale.toUpperCase()}.pdf"]`,
            ),
          ).toHaveCount(1);
        }
        for (const width of widths) {
          await page.setViewportSize({ width, height: width <= 540 ? 844 : 960 });
          const layout = await contact.evaluate((root) => {
            const bounds = root.getBoundingClientRect();
            const rail = root.querySelector(".contact-rail").getBoundingClientRect();
            const form = root.querySelector(".contact-form").getBoundingClientRect();
            return {
              overflow:
                root.scrollWidth > root.clientWidth + 1 ||
                bounds.left < 0 ||
                bounds.right > innerWidth + 1,
              stacked: form.top >= rail.bottom,
              smallestAction: Math.min(
                ...[
                  ...root.querySelectorAll(
                    ".contact-channel, .contact-email-link, .contact-resume-link, .copy-button, .form-bottom button",
                  ),
                ].map((item) => item.getBoundingClientRect().height),
              ),
            };
          });
          expect(layout.overflow, `${locale}/${theme}/${variant}/${width}`).toBe(false);
          expect(layout.stacked).toBe(width <= 880);
          expect(layout.smallestAction).toBeGreaterThanOrEqual(44);
          if (width === 390 || width === 1440) {
            await contact.screenshot({
              path: `${folder}/${locale}-${variant}-${theme}-${width}.png`,
            });
            const result = await new AxeBuilder({ page })
              .include(selector)
              .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
              .analyze();
            accessibility.push(
              ...result.violations.map(({ id, nodes }) => ({
                locale,
                theme,
                variant,
                width,
                id,
                nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
              })),
            );
          }
          cases.push({ locale, theme, variant, width });
        }
        await page.setViewportSize({ width: 390, height: 844 });
        if (variant === "page") {
          await contact.locator(".copy-button").focus();
          await page.keyboard.press("Enter");
          await expect(contact.locator(".copy-status")).toHaveText(
            locale === "ar" ? "تم نسخ البريد" : "Email copied",
          );
          expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(email);
        }
        const submit = contact.locator('button[type="submit"]');
        await submit.focus();
        await page.keyboard.press("Enter");
        await expect(contact.locator(".field-error")).toHaveCount(4);
        await expect(contact.locator("[name=user_name]")).toBeFocused();
      }
      await context.close();
    }
  }
} finally {
  await browser.close();
}
await writeFile(
  `${folder}/results.json`,
  JSON.stringify({ cases, errors, accessibility }, null, 2),
);
console.log(JSON.stringify({ cases: cases.length, errors, accessibility }, null, 2));
if (errors.length || accessibility.length) process.exitCode = 1;
