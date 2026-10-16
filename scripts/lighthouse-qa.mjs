import { chromium } from "@playwright/test";
import lighthouse from "lighthouse";
import { mkdir, writeFile } from "node:fs/promises";
const url = process.env.QA_URL || "http://127.0.0.1:3000";
await mkdir("qa/lighthouse", { recursive: true });
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--remote-debugging-port=9223"],
});
const results = [];
for (const locale of ["ar", "en"])
  for (const desktop of [false, true]) {
    const name = `${locale}-${desktop ? "desktop" : "mobile"}`;
    const flags = {
      port: 9223,
      output: "json",
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
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
    const result = await lighthouse(url + (locale === "en" ? "/en/" : "/"), flags);
    await writeFile(`qa/lighthouse/${name}.json`, result.report);
    const a = result.lhr.audits;
    const summary = {
      name,
      scores: Object.fromEntries(
        Object.entries(result.lhr.categories).map(([k, v]) => [k, Math.round(v.score * 100)]),
      ),
      LCP: a["largest-contentful-paint"].numericValue,
      CLS: a["cumulative-layout-shift"].numericValue,
      TBT: a["total-blocking-time"].numericValue,
      FCP: a["first-contentful-paint"].numericValue,
    };
    results.push(summary);
    console.log(JSON.stringify(summary));
  }
await writeFile("qa/lighthouse/summary.json", JSON.stringify(results, null, 2));
await browser.close();
