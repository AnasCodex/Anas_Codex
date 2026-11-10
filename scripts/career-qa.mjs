import { chromium, expect } from "@playwright/test";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const url = process.env.QA_URL || "http://127.0.0.1:3000";
const folder = "qa/career";
await mkdir(folder, { recursive: true });
const resumes = JSON.parse(await readFile("src/data/resume-assets.json", "utf8"));
// Approved record, kept independent of the rendered content module.
const records = {
  en: [
    [
      "Trust & Build for Information Technology",
      "Aug 2024 — Oct 2026",
      "Web Developer",
      "Freelance · Remote",
    ],
    ["Rising Point", "May 2025 — Aug 2026", "Web & E-Commerce Developer", "Freelance · Remote"],
    ["ATEQANIA", "Mar 2024 — Jun 2026", "Senior Web Developer", "Remote"],
    ["Jeetroom", "Apr 2024 — Oct 2024", "Next.js Developer", "Part-time · Remote"],
    [
      "NQ7GROUP",
      "Oct 2022 — Feb 2024",
      "Full Stack Developer",
      "Full-time · On-site · Sana’a, Yemen",
    ],
    [
      "NERDO for IT and Multimedia Services",
      "May 2021 — Jun 2023",
      "Front End Developer",
      "Freelance · Remote",
    ],
    [
      "Meem Graphics",
      "Jun 2022 — Oct 2022",
      "Full Stack Developer",
      "Full-time · On-site · Sana’a, Yemen",
    ],
    [
      "BlackGem Tech",
      "Nov 2021 — Sep 2022",
      "React Developer",
      "Full-time · On-site · Sana’a, Yemen",
    ],
  ],
  ar: [
    ["ثقة وإعمار لتقنية المعلومات", "أغسطس ٢٠٢٤ — أكتوبر ٢٠٢٦", "مطوّر ويب", "عمل مستقل عن بُعد"],
    ["نقطة نهوض", "مايو ٢٠٢٥ — أغسطس ٢٠٢٦", "مطوّر مواقع ومتاجر إلكترونية", "عمل مستقل عن بُعد"],
    ["التقنية · ATEQANIA", "مارس ٢٠٢٤ — يونيو ٢٠٢٦", "مطوّر ويب أول", "عن بُعد"],
    ["جيت روم · Jeetroom", "أبريل ٢٠٢٤ — أكتوبر ٢٠٢٤", "مطوّر Next.js", "دوام جزئي عن بُعد"],
    ["NQ7GROUP", "أكتوبر ٢٠٢٢ — فبراير ٢٠٢٤", "مطوّر متكامل", "دوام كامل · صنعاء، اليمن"],
    [
      "نيردو لتقنية المعلومات والوسائط المتعددة",
      "مايو ٢٠٢١ — يونيو ٢٠٢٣",
      "مطوّر واجهات أمامية",
      "عمل مستقل عن بُعد",
    ],
    [
      "ميم جرافيكس · Meem Graphics",
      "يونيو ٢٠٢٢ — أكتوبر ٢٠٢٢",
      "مطوّر متكامل",
      "دوام كامل · صنعاء، اليمن",
    ],
    [
      "بلاك جيم · BlackGem Tech",
      "نوفمبر ٢٠٢١ — سبتمبر ٢٠٢٢",
      "مطوّر React",
      "دوام كامل · صنعاء، اليمن",
    ],
  ],
};
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({ reducedMotion: "reduce" });
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
let checks = 0;
const pdfLinks = new Set();
try {
  for (const locale of ["ar", "en"]) {
    const prefix = locale === "ar" ? "/" : "/en/";
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
      for (const route of ["", "about/", "resume/", "expertise/", "contact/"]) {
        await page.goto(url + prefix + route);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        ).toBe(true);
        expect(await page.locator("body").innerText()).not.toMatch(
          /(?:0?7|٠?٧)\s*\+|\+\s*(?:0?7|٠?٧)|\+967/,
        );
        const person = await page
          .locator('script[type="application/ld+json"]')
          .evaluateAll((elements) =>
            elements
              .map((e) => JSON.parse(e.textContent))
              .find((data) => data["@type"] === "Person"),
          );
        expect(person.description).toContain("available immediately");
        expect(person.description).toContain("5+ years");
        expect(person).not.toHaveProperty("worksFor");
        expect(person.telephone).toBe("+966573984094");
        checks += 6;
        for (const link of await page
          .locator('a[href$=".pdf"]')
          .evaluateAll((a) => a.map((e) => e.getAttribute("href"))))
          pdfLinks.add(link);
        if (["", "about/", "resume/"].includes(route)) {
          const items = page.locator(".journey-item");
          await expect(items).toHaveCount(8);
          await expect(page.locator(".journey-note")).toContainText(
            locale === "ar"
              ? "غير مرتبط بأي جهة حاليًا ومتاح للعمل فورًا"
              : "Not currently employed by or engaged with any organization; available immediately",
          );
          for (const [index, values] of records[locale].entries()) {
            for (const [field, selector] of [
              "h3",
              ".journey-date p",
              ".journey-role",
              ".journey-mode",
            ].entries()) {
              await expect(items.nth(index).locator(selector)).toHaveText(values[field]);
              checks++;
            }
          }
          expect((await items.allInnerTexts()).join("\n")).not.toMatch(
            /\bPresent\b|\bongoing\b|حتى الآن|حتى الان/i,
          );
          await expect(items.nth(2)).toContainText(locale === "ar" ? "١٥" : "15+");
          await expect(items.nth(4)).toContainText("Figma");
          checks += 4;
          if (route === "resume/") {
            await items.nth(4).scrollIntoViewIfNeeded();
            await page.screenshot({ path: `${folder}/${locale}-${width}-experience.png` });
          }
        }
        if (route === "about/" || route === "expertise/") {
          for (const tool of ["Claude", "ChatGPT", "Vibe Coding", "Canva", "Adobe Photoshop"])
            expect(await page.locator("main").textContent()).toContain(tool);
          checks += 5;
        }
        if (route === "contact/") {
          await expect(page.locator('a[href="tel:+966573984094"]')).toHaveCount(1);
          await expect(page.locator('a[href="https://wa.me/967730110440"]')).toHaveCount(1);
          expect(
            await page.locator('a[href="mailto:anas.coding404@gmail.com"]').count(),
          ).toBeGreaterThan(0);
          checks += 3;
        }
        if (!route) {
          await expect(page.locator(".hero-bottom b")).toHaveText("5+");
          const names = await page.locator(".reel-index strong").allTextContents();
          expect(names).toEqual(
            locale === "ar"
              ? ["ثقة وإعمار", "عماد", "بوصلة", "تجربة ألعاب تفاعلية"]
              : ["Theqa Technology", "Emad", "Bawsala", "Gaming Experience"],
          );
          for (const [index, slug] of [
            [2, "bawsala"],
            [3, "gaming-experience"],
          ]) {
            await page.locator(".reel-index button").nth(index).click();
            const video = page.locator(".reel-preview video");
            expect(await video.getAttribute("src")).toBeNull();
            await page.locator(".reel-preview .video-control").click();
            await expect
              .poll(() => video.evaluate((v) => v.currentTime > 0 && !v.paused))
              .toBe(true);
            await expect(page.locator(".reel-description a")).toHaveAttribute(
              "href",
              prefix + "projects/" + slug + "/",
            );
            await page.screenshot({ path: `${folder}/${locale}-${width}-${slug}.png` });
            checks += 3;
          }
          await page.locator(".reel-index button").nth(0).click();
          await expect(page.locator(".reel-preview video")).toHaveCount(0);
          await page.locator(".capability-row button").nth(9).click();
          await expect(page.locator(".capability-body:not([hidden])")).toContainText("Claude");
          await page.locator(".capability-row button").nth(10).click();
          await expect(page.locator(".capability-body:not([hidden])")).toContainText(
            "Adobe Photoshop",
          );
          checks += 5;
        }
      }
    }
  }
  expect([...pdfLinks].sort()).toEqual([
    "/resume/Anas_Naser_CV_AR.pdf",
    "/resume/Anas_Naser_CV_EN.pdf",
  ]);
  for (const locale of ["AR", "EN"]) {
    const response = await context.request.get(url + `/resume/Anas_Naser_CV_${locale}.pdf`);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
    expect(
      createHash("sha256")
        .update(await response.body())
        .digest("hex"),
    ).toBe(resumes[locale].sha256);
    checks += 3;
  }
  expect(errors).toEqual([]);
  await writeFile(
    `${folder}/results.json`,
    JSON.stringify({ url, checks, errors, status: "passed" }, null, 2),
  );
  console.log(JSON.stringify({ checks, errors, status: "passed" }));
} finally {
  await browser.close();
}
