import projectData from "@/data/projects.json";
import { text, categoryLabel, type Locale } from "./i18n";
export { text, href, profile, categoryLabel, type Locale } from "./i18n";
export type ProjectVideo = {
  src: string;
  poster: string;
  width: number;
  height: number;
  duration: number;
  previewSrc?: string;
};
export type Project = (typeof projectData)[number] & {
  repository?: string;
  videos?: ProjectVideo[];
};
export const projects: Project[] = projectData;
export const featured = projects.filter((p) => p.featured);
export const title = (l: Locale) =>
  text(l, "مطوّر أول للمواقع والمتاجر الإلكترونية", "Senior Web & E-Commerce Developer");
export const bio = (l: Locale) =>
  text(
    l,
    "أنا أنس ناصر، مطوّر مواقع ومتاجر إلكترونية في الرياض. أجمع بين هندسة الواجهات والتفاصيل البصرية، وأحوّل متطلبات الأعمال إلى تجارب عربية وإنجليزية سريعة وواضحة وسهلة الاستخدام.",
    "I'm Anas Naser, a web and e-commerce developer based in Riyadh. I combine front-end engineering with an eye for design to create fast, intuitive Arabic and English experiences that meet business needs.",
  );

export const experiences = [
  {
    company: { ar: "نقطة نهوض", en: "Rising Point" },
    date: { ar: "مايو ٢٠٢٥ — حتى الآن", en: "May 2025 — Present" },
    role: {
      ar: "مطوّر مواقع ومتاجر إلكترونية · عمل حر",
      en: "Web & E-Commerce Developer · Freelance",
    },
    description: {
      ar: "تطوير مواقع WordPress وتخصيص متاجر سلة وتحسين واجهات أنظمة الأعمال والمحاسبة وتجربة الاستخدام العربية، مع صيانة المشاريع ومعالجة الأعطال.",
      en: "Developing WordPress websites, customizing Salla stores, and improving business and accounting interfaces for Arabic-speaking users. Ongoing project maintenance and troubleshooting.",
    },
  },
  {
    company: { ar: "ثقة وإعمار لتقنية المعلومات", en: "Trust & Build for IT" },
    date: { ar: "يناير ٢٠٢٥ — حتى الآن", en: "Jan 2025 — Present" },
    role: {
      ar: "مطوّر أول للمواقع والمتاجر · عمل حر",
      en: "Senior Web & E-Commerce Developer · Freelance",
    },
    description: {
      ar: "تطوير واجهات عربية وإنجليزية، وتخصيص Elementor والإضافات، وتحسين السرعة والبنية التقنية لمحركات البحث، ومتابعة الاستضافة وDNS.",
      en: "Developing Arabic and English websites and stores, customizing Elementor and plugins, improving performance and technical SEO, and managing hosting and DNS.",
    },
  },
  {
    company: { ar: "التقنية · ATEQANIA", en: "ATEQANIA" },
    date: { ar: "مارس ٢٠٢٤ — يونيو ٢٠٢٦", en: "Mar 2024 — Jun 2026" },
    role: { ar: "مطوّر ويب أول", en: "Senior Web Developer" },
    description: {
      ar: "تطوير وإطلاق أكثر من ١٥ موقع WordPress مخصصًا، ودمج واجهات API وخدمات الطرف الثالث، بالتعاون مع المصممين والمسوقين.",
      en: "Developed and launched 15+ custom WordPress websites, integrated APIs and third-party services, and collaborated with designers and marketers.",
    },
  },
  {
    company: { ar: "جيت روم · Jeetroom", en: "Jeetroom" },
    date: { ar: "أبريل ٢٠٢٤ — أكتوبر ٢٠٢٤", en: "Apr 2024 — Oct 2024" },
    role: { ar: "مطوّر Next.js · تعاقد على مشروع", en: "Next.js Developer · Project Contract" },
    description: {
      ar: "تطوير تطبيقات ويب ديناميكية وربطها بخدمات خارجية، وتحسين أداء الواجهات وتهيئة محركات البحث واستقرار التكاملات.",
      en: "Developed dynamic Next.js applications, integrated external APIs, and improved front-end performance, SEO, and integration stability.",
    },
  },
];

export const expertise = [
  {
    n: "01",
    name: { ar: "واجهات تُبنى لتُستخدم.", en: "Interfaces built for people." },
    category: "FRONT-END ENGINEERING",
    description: {
      ar: "واجهات تفاعلية متجاوبة، ومكونات قابلة لإعادة الاستخدام، وتجارب ثنائية اللغة تهتم بالتفاصيل من أول نقرة.",
      en: "Responsive interfaces, reusable components, and bilingual experiences shaped around the details of everyday use.",
    },
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux"],
    slugs: ["jeetroom", "ymall", "sales-dashboard"],
  },
  {
    n: "02",
    name: { ar: "التجارة، بتجربة أفضل.", en: "A better way to shop." },
    category: "E-COMMERCE & CMS",
    description: {
      ar: "مواقع WordPress مخصصة ومتاجر سلة وWooCommerce؛ من صفحة المنتج إلى تجربة تصفح واضحة تناسب السوق السعودي.",
      en: "Custom WordPress websites, Salla storefronts, and WooCommerce experiences, with clear product and browsing flows for Saudi audiences.",
    },
    tools: ["WordPress", "Salla", "WooCommerce", "Elementor", "Shopify"],
    slugs: ["motion-lab", "alansga", "hanai-boutique"],
  },
  {
    n: "03",
    name: { ar: "عناية بما وراء الواجهة.", en: "Care beyond the surface." },
    category: "PERFORMANCE & INTEGRATION",
    description: {
      ar: "تحسين السرعة والتهيئة التقنية لمحركات البحث، وربط واجهات API، واستخدام Git وأدوات التطوير للحفاظ على جودة التنفيذ.",
      en: "Performance tuning, technical SEO, API integration, and a development workflow grounded in Git and maintainable implementation.",
    },
    tools: ["Technical SEO", "REST APIs", "Git", "GitHub", "DNS"],
    slugs: ["theqa", "kripton", "jeetroom"],
  },
];

export function projectSummary(p: Project, l: Locale) {
  const copy: Record<string, [string, string]> = {
    "motion-lab": [
      "تطوير الموقع الإلكتروني لوكالة إبداعية؛ مساحة تجمع أعمال الوكالة وخدماتها في تجربة بصرية واحدة.",
      "Complete website development for a creative agency, bringing its work and services into one visual experience.",
    ],
    kripton: [
      "تطوير الموقع التعريفي لشركة كريبتون، بحضور رقمي يعرض خدمات الشركة وهويتها.",
      "Complete development of Kripton's corporate website, presenting the company's services and brand.",
    ],
    theqa: [
      "تطوير الموقع التعريفي لشركة ثقة وإعمار لتقنية المعلومات، لعرض الحلول والخدمات التقنية.",
      "Complete development of the Trust & Build for IT company website, presenting its technology solutions and services.",
    ],
    emad: [
      "تطوير الموقع التعريفي لمنصة عماد، لتقديم المنصة وخدماتها عبر الويب.",
      "Complete development of Emad's informational website, introducing the digital platform and its services.",
    ],
    jeetroom: [
      "تطبيق ويب باستخدام Next.js، ضمن تعاقد شمل تطوير الواجهات والتكامل مع الخدمات الخارجية.",
      "A Next.js web application, delivered under a project contract covering front-end development and external integrations.",
    ],
    "gaming-experience": [
      "تجربة ويب تفاعلية بطابع ألعاب، تجمع بين الفيديو والعناوين الكبيرة وانتقالات مرتبطة بالتمرير.",
      "An interactive gaming-themed website combining video, bold typography, and scroll-driven transitions.",
    ],
    "portfolio-react": [
      "نسخة سابقة من موقعي الشخصي باستخدام React، تعرض أعمالي ومهاراتي ضمن تجربة تفاعلية بعناصر ثلاثية الأبعاد.",
      "An earlier React portfolio presenting my work and skills through an interactive experience with 3D elements.",
    ],
    "island-portfolio": [
      "بورتفوليو تفاعلي يبدأ بجزيرة ثلاثية الأبعاد، ويتيح استكشاف الأعمال والخبرات ضمن تجربة بصرية مختلفة.",
      "An interactive portfolio built around a 3D island, with pages for exploring my work and experience.",
    ],
    bawsala: [
      "تجربة ويب عربية لبوصلة، توظّف الحركة وتداخل الصور في عرض المحتوى والأعمال الإبداعية.",
      "An Arabic web experience for Bawsala, using motion and layered imagery to present its content and creative work.",
    ],
    "brand-awards": [
      "موقع روح لعرض خدمات الدروع والجوائز، يجمع التعريف بالشركة مع معرض للمشاريع والنماذج.",
      "A website for Rooh's awards and trophies services, bringing together company information and a gallery of projects and designs.",
    ],
  };
  const c = copy[p.slug];
  return c
    ? c[l === "ar" ? 0 : 1]
    : text(
        l,
        `مشروع ضمن أعمالي في ${categoryLabel(p.category, l)}. استكشف واجهاته وتفاصيله من خلال الصور الأصلية.`,
        `A project from my ${p.category} portfolio. Explore its interfaces and visual details through original screenshots.`,
      );
}
