import { readFile, writeFile, mkdir } from "node:fs/promises";
const projects = JSON.parse(await readFile("src/data/projects.json", "utf8"));
const urls = [...new Set(projects.map((p) => p.url).filter(Boolean))];
const results = [];
for (let i = 0; i < urls.length; i += 5) {
  const batch = await Promise.all(
    urls.slice(i, i + 5).map(async (url) => {
      try {
        const r = await fetch(url, {
          redirect: "follow",
          signal: AbortSignal.timeout(20000),
          headers: { "User-Agent": "Mozilla/5.0 (compatible; PortfolioSourceReview/1.0)" },
        });
        const html = await r.text();
        return {
          url,
          status: r.status,
          finalUrl: r.url,
          title: html
            .match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
            ?.trim()
            .slice(0, 150),
          wordpress: /wp-content|wp-includes/.test(html),
        };
      } catch (e) {
        return { url, error: e.message, cause: e.cause?.code };
      }
    }),
  );
  results.push(...batch);
}
await mkdir("qa", { recursive: true });
await writeFile("qa/external-links.json", JSON.stringify({ date: "2026-10-15", results }, null, 2));
console.log(JSON.stringify(results, null, 2));
