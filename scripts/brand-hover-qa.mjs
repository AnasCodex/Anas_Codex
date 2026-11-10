import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, readFile, writeFile } from "node:fs/promises";
const folder = "qa/brand-hover/after";
await mkdir(folder, { recursive: true });
const sources = JSON.parse(await readFile("public/brands/sources.json", "utf8"));
const browser = await chromium.launch({ channel: "chrome", headless: true });
const checks = [],
  errors = [],
  accessibility = [];
const expectedGroupSizes = [14, 7, 7, 14, 7];
for (const locale of ["ar", "en"])
  for (const theme of ["light", "dark"])
    for (const width of [390, 820, 1440]) {
      const context = await browser.newContext({
        viewport: { width, height: width === 390 ? 844 : 1000 },
      });
      await context.addInitScript((t) => localStorage.setItem("anas-theme", t), theme);
      const page = await context.newPage();
      page.on("pageerror", (error) => errors.push(error.message));
      const base = "http://127.0.0.1:3000/" + (locale === "en" ? "en/" : "");
      await page.goto(base);
      await page.evaluate(() => document.fonts.ready);
      for (const [area, selector] of [
        ["services", ".capability-row"],
        ["journey", ".journey-item"],
      ]) {
        const item = page.locator(selector).nth(1);
        await item.scrollIntoViewIfNeeded();
        await page.mouse.move(0, 0);
        await page.waitForTimeout(300);
        const before = await item.boundingBox();
        await item.hover();
        await page.waitForTimeout(270);
        const after = await item.boundingBox();
        const geometry = await item.evaluate((element) => {
          const style = getComputedStyle(element, "::before");
          const parent = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return {
            inset: [style.top, style.right, style.bottom, style.left],
            width: parseFloat(style.width),
            height: parseFloat(style.height),
            parentWidth:
              rect.width - parseFloat(parent.borderLeftWidth) - parseFloat(parent.borderRightWidth),
            parentHeight:
              rect.height -
              parseFloat(parent.borderTopWidth) -
              parseFloat(parent.borderBottomWidth),
            opacity: style.opacity,
          };
        });
        expect(geometry.inset).toEqual(["0px", "0px", "0px", "0px"]);
        expect(geometry.width).toBeLessThanOrEqual(geometry.parentWidth + 0.1);
        expect(geometry.height).toBeLessThanOrEqual(geometry.parentHeight + 0.1);
        expect(Number(geometry.opacity)).toBe(1);
        expect(Math.abs(before.x - after.x) + Math.abs(before.y - after.y)).toBeLessThan(0.2);
        await page.screenshot({ path: `${folder}/${area}-${locale}-${theme}-${width}.png` });
        if (width === 1440) {
          if (area === "services") {
            await page.locator(selector).first().hover();
            await page.waitForTimeout(250);
          }
          const result = await new AxeBuilder({ page })
            .include(area === "services" ? ".capabilities" : ".journey-list")
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze();
          accessibility.push(
            ...result.violations.map((v) => ({
              area,
              locale,
              theme,
              id: v.id,
              nodes: v.nodes.map((n) => n.failureSummary),
            })),
          );
        }
        checks.push({ locale, theme, width, area, contained: true, stableBorder: true });
      }
      await page.goto(base + "resume/");
      expect(
        await page
          .locator(".skill-grid")
          .evaluateAll((groups) => groups.map((group) => group.children.length)),
      ).toEqual(expectedGroupSizes);
      const skillNames = await page.locator(".skill-badge > bdi").allTextContents();
      expect(skillNames).toHaveLength(sources.length);
      expect(new Set(skillNames).size).toBe(skillNames.length);
      expect(await page.locator(".skill-badge [data-brand]").count()).toBe(sources.length);
      for (const source of sources) {
        const label = locale === "ar" && source.name === "Zid" ? "زد" : source.name;
        const badge = page
          .locator(".skill-badge")
          .filter({ has: page.getByText(label, { exact: true }) });
        const slug = source.file || source.url.split("/").pop();
        const logoImage = badge.locator("img[data-brand]");
        if (await logoImage.count()) {
          await expect(logoImage).toHaveAttribute("src", `/brands/${slug}`);
          await expect
            .poll(() => logoImage.evaluate((img) => img.complete && img.naturalWidth > 0))
            .toBe(true);
          continue;
        }
        const original = await readFile("public/brands/" + slug, "utf8");
        const originalPaths = [...original.matchAll(/<path\b[^>]*\bd="([^"]+)"/g)].map((m) => m[1]);
        const paths = source.pathIndexes
          ? source.pathIndexes.map((index) => originalPaths[index])
          : originalPaths;
        expect(
          await badge
            .locator("svg path")
            .evaluateAll((elements) => elements.map((e) => e.getAttribute("d"))),
        ).toEqual(paths);
      }
      const sizes = await page.locator(".skill-badge [data-brand]").evaluateAll((logos) =>
        logos.map((logo) => ({
          name: logo.getAttribute("data-brand"),
          size: Number(logo.getAttribute("width")),
        })),
      );
      expect(sizes.every(({ size }) => size === 20)).toBe(true);
      await page.locator(".skill-group").first().scrollIntoViewIfNeeded();
      await page.locator(".skill-badge").filter({ hasText: "Tailwind CSS" }).hover();
      await page.waitForTimeout(250);
      await page.screenshot({ path: `${folder}/skills-${locale}-${theme}-${width}.png` });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      ).toBe(true);
      await page.setViewportSize({ width: 320, height: 844 });
      expect(
        await page.locator(".skill-groups").evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
      ).toBe(true);
      await page.goto(base + "expertise/");
      expect(
        await page
          .locator(".skill-grid")
          .evaluateAll((groups) => groups.map((group) => group.children.length)),
      ).toEqual(expectedGroupSizes);
      expect(await page.locator(".tools-note .skill-badge > bdi").allTextContents()).toEqual(
        skillNames,
      );
      expect(
        await page.locator(".skill-groups").evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
      ).toBe(true);
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
      await page.locator(".tools-note > h2").scrollIntoViewIfNeeded();
      await page.screenshot({ path: `${folder}/toolkit-${locale}-${theme}-${width}.png` });
      if (width === 1440) {
        const result = await new AxeBuilder({ page })
          .include(".skill-groups")
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        accessibility.push(
          ...result.violations.map(({ id }) => ({ area: "skills", locale, theme, id })),
        );
      }
      await page.emulateMedia({ reducedMotion: "reduce" });
      expect(
        await page
          .locator(".skill-badge")
          .first()
          .evaluate((e) => getComputedStyle(e).transitionDuration),
      ).toBe("0s");
      checks.push({
        locale,
        theme,
        width,
        originalBrands: sources.length,
        noGridOverflowAt320: true,
        reducedMotion: true,
      });
      await context.close();
    }
await browser.close();
const result = { checks, errors, accessibility };
await writeFile("qa/brand-hover/results.json", JSON.stringify(result, null, 2));
console.log(JSON.stringify({ checks: checks.length, errors, accessibility }, null, 2));
if (errors.length || accessibility.length) process.exitCode = 1;
