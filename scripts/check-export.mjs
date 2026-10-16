import { readFile, stat, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
const projects = JSON.parse(await readFile("src/data/projects.json", "utf8"));
const paths = [
  "",
  "projects",
  "about",
  "expertise",
  "resume",
  "contact",
  ...projects.map((p) => "projects/" + p.slug),
];
const root = path.resolve("out");
const issues = [];
let checkedLinks = 0,
  schemas = 0;
const exists = async (p) => {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
};
for (const l of ["ar", "en"])
  for (const p of paths) {
    const url = `${l === "en" ? "/en" : ""}/${p}${p ? "/" : ""}`;
    const file = path.join(root, url, "index.html");
    if (!(await exists(file))) {
      issues.push("Missing HTML: " + url);
      continue;
    }
    const html = await readFile(file, "utf8");
    if (!html.includes(`lang="${l}"`) || !html.includes(`dir="${l === "ar" ? "rtl" : "ltr"}"`))
      issues.push("Language/direction: " + url);
    if ((html.match(/<h1[\s>]/g) || []).length !== 1) issues.push("Expected one H1: " + url);
    if (!/<link[^>]+rel="canonical"/.test(html)) issues.push("Missing canonical: " + url);
    for (const alt of ["ar", "en", "x-default"])
      if (!html.includes(`hrefLang="${alt}"`)) issues.push("Missing hreflang " + alt + ": " + url);
    if (!/<meta name="description" content="[^\"]+"/.test(html))
      issues.push("Missing description: " + url);
    for (const match of html.matchAll(/<(?:a|link|img|script)\b[^>]*?\b(?:href|src)="([^\"]+)"/g)) {
      const raw = match[1].replaceAll("&amp;", "&");
      if (!raw.startsWith("/") || raw.startsWith("//")) continue;
      const target = decodeURIComponent(raw.split(/[?#]/)[0]);
      if (!target) continue;
      const dest = path.join(root, target);
      if (!(await exists(dest)) && !(await exists(path.join(dest, "index.html"))))
        issues.push(`Broken local asset/link ${target} on ${url}`);
      checkedLinks++;
    }
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try {
        JSON.parse(m[1]);
        schemas++;
      } catch {
        issues.push("Invalid JSON-LD: " + url);
      }
    }
  }
for (const l of ["AR", "EN"]) {
  const name = `Anas_Naser_CV_${l}.pdf`;
  const hash = async (p) =>
    createHash("sha256")
      .update(await readFile(p))
      .digest("hex");
  if (!(await exists("out/resume/" + name))) {
    issues.push("Missing CV " + l);
    continue;
  }
  if ((await hash("public/resume/" + name)) !== (await hash("out/resume/" + name)))
    issues.push("Exported CV differs from public asset " + l);
  if (await exists("input/cv/" + name)) {
    if ((await hash("input/cv/" + name)) !== (await hash("out/resume/" + name)))
      issues.push("CV differs from original " + l);
  }
}
for (const f of ["sitemap.xml", "robots.txt", "404.html", "og-ar.png", "og-en.png"])
  if (!(await exists(path.join(root, f)))) issues.push("Missing " + f);
const xml = await readFile(path.join(root, "sitemap.xml"), "utf8");
if ((xml.match(/<loc>/g) || []).length !== paths.length * 2)
  issues.push("Sitemap route count mismatch");
const report = {
  pages: paths.length * 2,
  projects: projects.length,
  checkedLinks,
  schemas,
  issues,
};
await mkdir("qa", { recursive: true });
await writeFile("qa/export-results.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (issues.length) process.exitCode = 1;
