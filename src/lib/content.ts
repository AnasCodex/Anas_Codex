export { aiWorkflow, designWorkflow } from "./workflows";
import type brandIcons from "@/data/brand-icons.json";
import projectData from "@/data/projects.json";
import { text, type Locale } from "./i18n";
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
    "أنا أنس ناصر، مطوّر أول للمواقع والمتاجر الإلكترونية في الرياض، بخبرة تزيد على ٥ سنوات تشمل العمل المستقل والعمل لدى الشركات. أجمع بين هندسة الواجهات والتفاصيل البصرية لبناء تجارب عربية وإنجليزية واضحة وسهلة الاستخدام.",
    "I'm Anas Naser, a Senior Web & E-Commerce Developer based in Riyadh, with 5+ years of experience across freelance and company roles. I combine front-end engineering with an eye for design to create clear, intuitive Arabic and English experiences.",
  );

export const availability = (l: Locale) =>
  text(
    l,
    "غير مرتبط بأي جهة حاليًا ومتاح للعمل فورًا.",
    "Not currently employed by or engaged with any organization; available immediately.",
  );
export const experienceNote = (l: Locale) =>
  text(
    l,
    "خبرة تزيد على ٥ سنوات تشمل العمل المستقل والوظائف. تداخلت بعض فترات العمل المستقل والجزئي مع وظائف أخرى؛ لم تُجمع مدد الأعمال المتزامنة.",
    "5+ years of experience across freelance and company roles. Some freelance and part-time engagements overlapped with company roles; concurrent periods are not added together.",
  );
// Ordered by engagement end date, matching the approved career package.
export const experiences = [
  {
    company: { ar: "ثقة وإعمار لتقنية المعلومات", en: "Trust & Build for Information Technology" },
    date: { ar: "أغسطس ٢٠٢٤ — أكتوبر ٢٠٢٦", en: "Aug 2024 — Oct 2026" },
    role: { ar: "مطوّر ويب", en: "Web Developer" },
    mode: { ar: "عمل مستقل عن بُعد", en: "Freelance · Remote" },
    description: {
      ar: "طوّرت مواقع ومتاجر عربية وإنجليزية متجاوبة، وخصّصت WordPress وElementor والإضافات. حسّنت سرعة الصفحات والتهيئة التقنية لمحركات البحث وتجربة التصفح والشراء، وقدّمت الدعم الفني ونسّقت تحديثات الاستضافة وDNS.",
      en: "Developed responsive Arabic and English websites and storefronts, customizing WordPress, Elementor, and plugins. Improved page speed, technical SEO, and browsing and shopping flows; provided technical support and coordinated hosting and DNS updates.",
    },
  },
  {
    company: { ar: "نقطة نهوض", en: "Rising Point" },
    date: { ar: "مايو ٢٠٢٥ — أغسطس ٢٠٢٦", en: "May 2025 — Aug 2026" },
    role: {
      ar: "مطوّر مواقع ومتاجر إلكترونية",
      en: "Web & E-Commerce Developer",
    },
    mode: { ar: "عمل مستقل عن بُعد", en: "Freelance · Remote" },
    description: {
      ar: "طوّرت مواقع WordPress وخصّصت متاجر سلة وصفحات المنتجات والتصنيفات وصفحات الهبوط والنماذج والتكاملات. حسّنت واجهات أنظمة الأعمال والمحاسبة ولوحات التحكم وتجربة الاستخدام العربية، وصنت المشاريع وعالجت الأعطال.",
      en: "Developed WordPress websites and customized Salla storefronts, product and category pages, landing pages, forms, and integrations. Improved business and accounting interfaces, dashboards, and Arabic user flows; maintained projects and resolved issues.",
    },
  },
  {
    company: { ar: "التقنية · ATEQANIA", en: "ATEQANIA" },
    date: { ar: "مارس ٢٠٢٤ — يونيو ٢٠٢٦", en: "Mar 2024 — Jun 2026" },
    role: { ar: "مطوّر ويب أول", en: "Senior Web Developer" },
    mode: { ar: "عن بُعد", en: "Remote" },
    description: {
      ar: "طوّرت وأطلقت أكثر من ١٥ موقع WordPress مخصصًا، وربطت واجهات API وخدمات الطرف الثالث، بالتعاون مع المصممين والمسوقين.",
      en: "Developed and launched 15+ custom WordPress websites, integrated APIs and third-party services, and collaborated with designers and marketers.",
    },
  },
  {
    company: { ar: "جيت روم · Jeetroom", en: "Jeetroom" },
    date: { ar: "أبريل ٢٠٢٤ — أكتوبر ٢٠٢٤", en: "Apr 2024 — Oct 2024" },
    role: { ar: "مطوّر Next.js", en: "Next.js Developer" },
    mode: { ar: "دوام جزئي عن بُعد", en: "Part-time · Remote" },
    description: {
      ar: "طوّرت تطبيقات ويب ديناميكية وربطتها بخدمات خارجية، وحسّنت أداء الواجهات وتهيئة محركات البحث واستقرار التكاملات.",
      en: "Developed dynamic Next.js applications, integrated external APIs, and improved front-end performance, SEO, and integration stability.",
    },
  },
  {
    company: { ar: "NQ7GROUP", en: "NQ7GROUP" },
    date: { ar: "أكتوبر ٢٠٢٢ — فبراير ٢٠٢٤", en: "Oct 2022 — Feb 2024" },
    role: { ar: "مطوّر متكامل", en: "Full Stack Developer" },
    mode: { ar: "دوام كامل · صنعاء، اليمن", en: "Full-time · On-site · Sana’a, Yemen" },
    description: {
      ar: "قدت تنسيق الفريق التقني، ووزّعت المهام بين مطوري الواجهات الأمامية والخلفية ومسؤول تصميم Figma. نسّقت تسليم التصاميم إلى التطوير وربط الواجهات بالخلفية، وحدّدت بنية صفحات الويب وواءمت التنفيذ بين أعضاء الفريق.",
      en: "Led technical team coordination, distributing tasks across front-end and back-end developers and the Figma design contributor. Coordinated design handoffs and front-end/back-end integration, defined web page structure, and aligned implementation across contributors.",
    },
  },
  {
    company: {
      ar: "نيردو لتقنية المعلومات والوسائط المتعددة",
      en: "NERDO for IT and Multimedia Services",
    },
    date: { ar: "مايو ٢٠٢١ — يونيو ٢٠٢٣", en: "May 2021 — Jun 2023" },
    role: { ar: "مطوّر واجهات أمامية", en: "Front End Developer" },
    mode: { ar: "عمل مستقل عن بُعد", en: "Freelance · Remote" },
    description: {
      ar: "قدّمت خدمات تطوير الواجهات الأمامية بصفة مستقلة في بيئة تقنية المعلومات والوسائط المتعددة.",
      en: "Provided freelance front-end development services in an IT and multimedia services environment.",
    },
  },
  {
    company: { ar: "ميم جرافيكس · Meem Graphics", en: "Meem Graphics" },
    date: { ar: "يونيو ٢٠٢٢ — أكتوبر ٢٠٢٢", en: "Jun 2022 — Oct 2022" },
    role: { ar: "مطوّر متكامل", en: "Full Stack Developer" },
    mode: { ar: "دوام كامل · صنعاء، اليمن", en: "Full-time · On-site · Sana’a, Yemen" },
    description: {
      ar: "عملت على تطوير الويب المتكامل في بيئة تجمع التسويق الرقمي والتصميم الجرافيكي.",
      en: "Worked on full-stack web development in a digital marketing and graphic design environment.",
    },
  },
  {
    company: { ar: "بلاك جيم · BlackGem Tech", en: "BlackGem Tech" },
    date: { ar: "نوفمبر ٢٠٢١ — سبتمبر ٢٠٢٢", en: "Nov 2021 — Sep 2022" },
    role: { ar: "مطوّر React", en: "React Developer" },
    mode: { ar: "دوام كامل · صنعاء، اليمن", en: "Full-time · On-site · Sana’a, Yemen" },
    description: {
      ar: "طوّرت واجهات ويب باستخدام React لمشاريع المواقع والبرمجيات.",
      en: "Developed React-based web interfaces for website and software projects.",
    },
  },
];

export type BrandedSkill = keyof typeof brandIcons;

export const expertise = [
  {
    n: "01",
    name: { ar: "تطوير الواجهات", en: "Front-end development" },
    tools: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "Bootstrap 5",
      "Sass",
      "Material UI",
      "jQuery",
      "Three.js",
      "GSAP",
    ],
  },
  {
    n: "02",
    name: { ar: "المتاجر وإدارة المحتوى", en: "E-commerce & CMS" },
    tools: ["WordPress", "Salla", "Zid", "WooCommerce", "Elementor", "Shopify", "Yoast SEO"],
  },
  {
    n: "03",
    name: { ar: "الخوادم والبيانات", en: "Back end & data" },
    tools: ["Node.js", "Express", "MongoDB", "MySQL", "phpMyAdmin", "Firebase", "JSON"],
  },
  {
    n: "04",
    name: { ar: "أدوات التطوير", en: "Developer tools" },
    tools: [
      "Git",
      "GitHub",
      "npm",
      "Visual Studio Code",
      "Chrome DevTools",
      "Postman",
      "Vercel",
      "ESLint",
      "Prettier",
      "Vite",
      "cPanel",
      "Cloudflare",
      "Hostinger",
      "GoDaddy",
    ],
  },
  {
    n: "05",
    name: { ar: "الذكاء الاصطناعي والتصميم", en: "AI & design" },
    tools: ["Claude", "ChatGPT", "Ollama", "Pinokio", "Figma", "Canva", "Adobe Photoshop"],
  },
] satisfies { n: string; name: Record<Locale, string>; tools: BrandedSkill[] }[];

export { projectSummary } from "./project-copy";
