import type { Metadata } from "next";
import { href, profile, text, type Locale } from "./content";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://anas-codex.vercel.app"
).replace(/\/$/, "");
export function metadata(l: Locale, name: string, path = "", description?: string): Metadata {
  const descriptions: Record<string, [string, string]> = {
    about: [
      "تعرّف على أنس ناصر، مطوّر مواقع ومتاجر إلكترونية في الرياض، وخبرته وأسلوبه في تحويل احتياجات الأعمال إلى تجارب ويب متقنة.",
      "Meet Anas Naser, a web and e-commerce developer in Riyadh. Explore his experience and approach to turning business needs into thoughtful web experiences.",
    ],
    projects: [
      "استكشف أعمال أنس ناصر في تطوير المواقع والمتاجر والتجارب التفاعلية، مع صور وتسجيلات حقيقية وفلاتر حسب التقنية.",
      "Explore Anas Naser's websites, stores, and interactive projects through original screenshots, video walkthroughs, and technology filters.",
    ],
    expertise: [
      "تخصصات أنس ناصر: تطوير الواجهات والمواقع والمتاجر، وتخصيص WordPress، وتحسين الأداء والتهيئة التقنية لمحركات البحث وربط الخدمات.",
      "Explore Anas Naser's expertise in front-end development, WordPress, e-commerce, performance, technical SEO, and API integrations.",
    ],
    resume: [
      "السيرة الذاتية لأنس ناصر: الخبرات المهنية والمهارات التقنية والتعليم، مع نسختين للتحميل بالعربية والإنجليزية.",
      "Anas Naser's professional experience, technical skills, and education. Download his resume in Arabic or English.",
    ],
    contact: [
      "تواصل مع أنس ناصر لفرصة عمل أو مشروع جديد. تجد هنا البريد الإلكتروني وروابط التواصل والسيرة الذاتية.",
      "Get in touch with Anas Naser about a role, collaboration, or web project. Find his email, contact links, and resume.",
    ],
  };
  const desc =
    description ||
    descriptions[path]?.[l === "ar" ? 0 : 1] ||
    text(
      l,
      "أنس ناصر — مطوّر أول للمواقع والمتاجر الإلكترونية في الرياض. أعمال حقيقية وخبرة في Next.js وReact وWordPress وسلة.",
      "Anas Naser — Senior Web & E-Commerce Developer in Riyadh. Explore real projects in Next.js, React, WordPress, and Salla.",
    );
  const url = siteUrl + href(l, path);
  return {
    title: `${name} | Anas Codex`,
    description: desc,
    metadataBase: new URL(siteUrl),
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "64x64" },
      ],
    },
    alternates: {
      canonical: url,
      languages: {
        ar: siteUrl + href("ar", path),
        en: siteUrl + href("en", path),
        "x-default": siteUrl + href("ar", path),
      },
    },
    openGraph: {
      title: `${name} | Anas Codex`,
      description: desc,
      url,
      type: "website",
      locale: l === "ar" ? "ar_SA" : "en_US",
      alternateLocale: l === "ar" ? "en_US" : "ar_SA",
      siteName: "Anas Codex",
      images: [
        {
          url: `/og-${l}.png`,
          width: 1200,
          height: 630,
          alt: text(
            l,
            "ANAS CODEX · أنس ناصر، مطوّر مواقع ومتاجر إلكترونية",
            "ANAS CODEX · Anas Naser, Web & E-Commerce Developer",
          ),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | Anas Codex`,
      description: desc,
      images: [`/og-${l}.png`],
    },
    robots: { index: true, follow: true },
  };
}
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
export function PersonSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${siteUrl}/#anas`,
        name: "Anas Naser",
        alternateName: "Anas Codex",
        jobTitle: "Senior Web & E-Commerce Developer",
        url: siteUrl,
        email: profile.email,
        telephone: profile.phone,
        image: siteUrl + "/media/portrait.webp",
        address: { "@type": "PostalAddress", addressLocality: "Riyadh", addressCountry: "SA" },
        sameAs: [profile.linkedin, profile.github, profile.youtube],
        knowsLanguage: ["Arabic", "English"],
      }}
    />
  );
}
