import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
const specFile = process.argv[2];
if (!specFile)
  throw new Error("Usage: npm run project:add -- input/projects/my-project/project.json");
const spec = JSON.parse(await readFile(specFile, "utf8"));
const categories = ["WordPress", "Next.js", "React", "Salla", "Three.js", "HTML", "Other"];
if (
  !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(spec.slug) ||
  !spec.name?.ar ||
  !spec.name?.en ||
  !categories.includes(spec.category) ||
  !spec.images?.length
)
  throw new Error("Require a unique slug, Arabic/English name, category, and images.");
if (spec.url && !/^https:\/\//.test(spec.url)) throw new Error("Live links must use HTTPS.");
const dataFile = "src/data/projects.json";
const projects = JSON.parse(await readFile(dataFile, "utf8"));
if (projects.some((p) => p.slug === spec.slug))
  throw new Error("Slug already exists. Edit the existing record instead.");
const inputRoot = path.resolve("input/projects");
const sourceFiles = [];
for (const image of spec.images) {
  const file = path.resolve(path.dirname(specFile), image);
  if (!file.startsWith(inputRoot + path.sep) || !(await stat(file)).isFile())
    throw new Error("Source images must be inside input/projects.");
  sourceFiles.push(file);
}
await mkdir("public/media", { recursive: true });
const assets = [];
for (let n = 0; n < sourceFiles.length; n++) {
  const image = sharp(sourceFiles[n]).rotate();
  const meta = await image.metadata();
  const base = `/media/${spec.slug}-${n}`;
  const full = await image
    .clone()
    .resize({ width: 1440, height: 18000, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(`public${base}-full.webp`);
  for (const width of [560, 1120])
    await image
      .clone()
      .extract({
        left: 0,
        top: 0,
        width: meta.width,
        height: Math.min(meta.height, Math.round(meta.width * 0.82)),
      })
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(`public${base}-${width}.webp`);
  assets.push({ base, width: full.width, height: full.height });
}
projects.push({
  slug: spec.slug,
  name: spec.name,
  category: spec.category,
  assets,
  url: spec.url || "",
  featured: false,
  documented: false,
});
await writeFile(dataFile, JSON.stringify(projects, null, 2) + "\n");
console.log(`Added ${spec.name.en}. Both language routes are generated on the next build.`);
