import type { Metadata } from "next";
import { availability, bio, href, profile, text, type Locale } from "./content";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://anas-codex.vercel.app"
).replace(/\/$/, "");
export function metadata(l: Locale, name: string, path = "", description?: string): Metadata {
  const descriptions: Record<string, [string, string]> = {
    about: [
      "أنس ناصر، مطوّر أول للمواقع والمتاجر الإلكترونية في الرياض، بخبرة تزيد على ٥ سنوات تشمل العمل المستقل والوظائف. متاح للعمل فورًا.",
      "Anas Naser, Senior Web & E-Commerce Developer in Riyadh, with 5+ years across freelance and company roles. Available immediately.",
    ],
    projects: [
      "استكشف أعمال أنس ناصر في تطوير المواقع والمتاجر والتجارب التفاعلية، مع صور وتسجيلات حقيقية وفلاتر حسب التقنية.",
      "Explore Anas Naser's websites, stores, and interactive projects through original screenshots, video walkthroughs, and technology filters.",
    ],
    expertise: [
      "تخصصات أنس ناصر: تطوير الواجهات والمتاجر وWordPress، والتطوير بمساعدة Claude وChatGPT وVibe Coding، والتصميم باستخدام Canva وAdobe Photoshop.",
      "Anas Naser's expertise: front-end development, WordPress, e-commerce, AI-Assisted Development with Claude and ChatGPT, Vibe Coding, Canva, and Adobe Photoshop.",
    ],
    resume: [
      "السيرة الذاتية لأنس ناصر: خبرة تزيد على ٥ سنوات تشمل العمل المستقل والوظائف. غير مرتبط بأي جهة حاليًا ومتاح للعمل فورًا. تحميل PDF بالعربية والإنجليزية.",
      "Anas Naser's resume: 5+ years across freelance and company roles. Not currently employed or engaged with any organization; available immediately. Arabic and English PDFs.",
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
      "أنس ناصر — مطوّر أول للمواقع والمتاجر الإلكترونية في الرياض بخبرة تزيد على ٥ سنوات تشمل العمل المستقل والوظائف. متاح للعمل فورًا.",
      "Anas Naser — Senior Web & E-Commerce Developer in Riyadh. 5+ years across freelance and company roles. Available immediately.",
    );
  const url = siteUrl + href(l, path);
  // Use a new URL when replacing artwork so preview caches can fetch the new image.
  const shareImage = `/og-${l}-20261105.jpg`;
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
          url: shareImage,
          width: 1200,
          height: 630,
          type: "image/jpeg",
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
      images: [shareImage],
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
        description: `${bio("en")} ${availability("en")}`,
        knowsAbout: [
          "React",
          "Next.js",
          "WordPress",
          "Salla",
          "AI-Assisted Development",
          "Vibe Coding",
          "Claude",
          "ChatGPT",
          "Canva",
          "Adobe Photoshop",
          "Technical team coordination",
        ],
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
