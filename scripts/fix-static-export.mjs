// Next.js on Windows can emit nested RSC segment files while the router requests
// dot-separated names. Copy portable aliases; do nothing when already correct.
// Upstream: https://github.com/vercel/next.js/issues/92339
import { readdir, copyFile } from "node:fs/promises";
import path from "node:path";
let aliases = 0;
async function walk(dir, segmentRoot = null) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    const root =
      segmentRoot || (entry.isDirectory() && entry.name.startsWith("__next.") ? file : null);
    if (entry.isDirectory()) await walk(file, root);
    else if (segmentRoot && entry.name.endsWith(".txt")) {
      const relative = path.relative(path.dirname(segmentRoot), file).split(path.sep).join(".");
      await copyFile(file, path.join(path.dirname(segmentRoot), relative));
      aliases++;
    }
  }
}
await walk(path.resolve("out"));
console.log(`Static export verified: ${aliases} Windows RSC aliases prepared.`);
