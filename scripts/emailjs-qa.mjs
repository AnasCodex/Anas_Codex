// Run only against an isolated development process with QA-only environment identifiers.
// Every EmailJS request is intercepted locally: this never sends an email.
import { chromium, expect } from "@playwright/test";
import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
await mkdir("qa", { recursive: true });
const url = process.env.QA_EMAILJS_URL;
if (!url || !/^http:\/\/127\.0\.0\.1:\d+$/.test(url))
  throw new Error("Set QA_EMAILJS_URL to an isolated loopback fixture.");
const browser = await chromium.launch({ channel: "chrome", headless: true });
const checks = [],
  payloads = [];
// Optional production-bundle fixture: identifiers are injected only into this isolated
// browser's JS responses. Disk files and the served site remain unconfigured.
const fixtureChunks = [];
if (process.env.QA_EMAILJS_FIXTURE === "1") {
  for (const name of await readdir("out/_next/static/chunks")) {
    if (!name.endsWith(".js")) continue;
    const body = await readFile("out/_next/static/chunks/" + name, "utf8");
    if (body.includes("NEXT_PUBLIC_EMAILJS_SERVICE_ID") && body.includes("user_name"))
      fixtureChunks.push(name);
  }
  if (!fixtureChunks.length) throw Error("No EmailJS configuration fixture target found");
}
async function installFixture(context) {
  for (const name of fixtureChunks)
    await context.route("**/_next/static/chunks/" + name, async (route) => {
      const response = await route.fetch();
      const body = (await response.text()).replace(
        /\b[\w$]+\.default\.env\.NEXT_PUBLIC_EMAILJS_(SERVICE_ID|TEMPLATE_ID|PUBLIC_KEY)/g,
        (_, key) => JSON.stringify("qa-fixture-" + key.toLowerCase()),
      );
      await route.fulfill({ response, body });
    });
}
const assert = (passed, label) => checks.push({ label, passed: !!passed });
for (const locale of ["ar", "en"]) {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  await installFixture(context);
  const page = await context.newPage();
  let requests = 0,
    responseCode = 500,
    release;
  await page.route("https://api.emailjs.com/**", async (route) => {
    requests++;
    payloads.push(route.request().postData());
    await new Promise((resolve) => {
      release = resolve;
    });
    await route.fulfill({
      status: responseCode,
      contentType: "text/plain",
      body: responseCode === 200 ? "OK" : "QA simulated service failure",
    });
  });
  await page.goto(url + (locale === "en" ? "/en/contact/" : "/contact/"));
  const form = page.locator(".contact-form"),
    submit = form.locator('button[type="submit"]');
  await expect(form.locator(".form-setup")).toHaveCount(0);
  assert(
    (await form.locator(".form-setup").count()) === 0,
    `${locale}: isolated QA configuration recognized`,
  );
  for (const [name, value] of [
    ["user_name", "Local QA"],
    ["user_email", "qa@example.com"],
    ["subject", "Simulated delivery"],
    ["message", "This is a local test that is never sent."],
  ])
    await form.locator(`[name="${name}"]`).fill(value);
  await submit.click();
  await expect(submit).toBeDisabled();
  await expect.poll(() => requests).toBe(1);
  assert(
    (await form.getAttribute("aria-busy")) === "true",
    `${locale}: loading state is accessible`,
  );
  assert(
    (await form.locator(".form-notice.success").count()) === 0,
    `${locale}: no early success before service response`,
  );
  assert(requests === 1, `${locale}: one request while busy`);
  release();
  await expect(form.locator(".form-notice.error")).toBeVisible();
  assert(
    (await form.locator('[name="message"]').inputValue()) !== "",
    `${locale}: service failure keeps data`,
  );
  assert(await submit.isEnabled(), `${locale}: service failure re-enables submit`);
  // A new document/context clears only the local SDK rate-limit fixture state.
  await context.close();
  const successContext = await browser.newContext({ reducedMotion: "reduce" });
  await installFixture(successContext);
  const successPage = await successContext.newPage();
  await successPage.route("https://api.emailjs.com/**", async (route) => {
    payloads.push(route.request().postData());
    return route.fulfill({ status: 200, contentType: "text/plain", body: "OK" });
  });
  await successPage.goto(url + (locale === "en" ? "/en/contact/" : "/contact/"));
  for (const [name, value] of [
    ["user_name", "Local QA"],
    ["user_email", "qa@example.com"],
    ["subject", "Simulated success"],
    ["message", "Locally intercepted test message."],
  ])
    await successPage.locator(`[name="${name}"]`).fill(value);
  await successPage.locator('.contact-form button[type="submit"]').click();
  await expect(successPage.locator(".form-notice.success")).toBeVisible();
  assert(
    (await successPage.locator('[name="user_name"]').inputValue()) === "" &&
      (await successPage.locator('[name="message"]').inputValue()) === "",
    `${locale}: success resets form only after response`,
  );
  await successContext.close();
}
assert(
  payloads.every((payload) =>
    ["user_name", "user_email", "subject", "message", "service_id", "template_id", "user_id"].every(
      (name) => payload.includes(`name="${name}"`),
    ),
  ),
  "Modern EmailJS sendForm payload contains all template field names",
);
await writeFile(
  "qa/emailjs-simulated-results.json",
  JSON.stringify(
    {
      mode: "Locally intercepted responses; no real email sent",
      checks,
      failures: checks.filter((c) => !c.passed),
    },
    null,
    2,
  ),
);
console.log(
  JSON.stringify({ checks: checks.length, failures: checks.filter((c) => !c.passed) }, null, 2),
);
await browser.close();
if (checks.some((c) => !c.passed)) process.exitCode = 1;
