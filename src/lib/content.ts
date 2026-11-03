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
export const aiWorkflow = (l: Locale) =>
  text(
    l,
    "أستخدم Claude وChatGPT في التطوير بمساعدة الذكاء الاصطناعي (AI-Assisted Development) وVibe Coding، للمساعدة في البرمجة وتصحيح الأخطاء والنمذجة الأولية وإنشاء المحتوى البصري. هذا الموقع الشخصي مثال عملي على استخدامي لهذه الأدوات في التطوير.",
    "I use Claude and ChatGPT for AI-Assisted Development and Vibe Coding, supporting coding, debugging, prototyping, and visual content creation. This personal portfolio is a practical example of my development work with these tools.",
  );
export const designWorkflow = (l: Locale) =>
  text(
    l,
    "أستخدم Canva وAdobe Photoshop للتصميم الجرافيكي وإعداد مرئيات الويب.",
    "I use Canva and Adobe Photoshop for graphic design and web visuals.",
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
  {
    n: "04",
    name: { ar: "الذكاء الاصطناعي والتصميم.", en: "AI-assisted development & design." },
    category: "AI-ASSISTED DEVELOPMENT & DESIGN",
    description: {
      ar: aiWorkflow("ar") + " " + designWorkflow("ar"),
      en: aiWorkflow("en") + " " + designWorkflow("en"),
    },
    tools: ["Claude", "ChatGPT", "Vibe Coding", "Canva", "Adobe Photoshop"],
    slugs: [],
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
      "تطبيق ويب باستخدام Next.js، ضمن عمل بدوام جزئي عن بُعد شمل تطوير الواجهات والتكامل مع الخدمات الخارجية.",
      "A Next.js web application developed in a part-time remote role covering front-end development and external integrations.",
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
