import type { MetadataRoute } from "next";
import { projects, href } from "@/lib/content";
import { siteUrl } from "@/lib/seo";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "projects",
    "about",
    "expertise",
    "resume",
    "contact",
    ...projects.map((p) => `projects/${p.slug}`),
  ];
  return paths.flatMap((path) =>
    (["ar", "en"] as const).map((l) => ({
      url: siteUrl + href(l, path),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.includes("/") ? 0.7 : 0.85,
      alternates: { languages: { ar: siteUrl + href("ar", path), en: siteUrl + href("en", path) } },
    })),
  );
}
