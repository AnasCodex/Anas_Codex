import { text, categoryLabel, type Locale } from "./i18n";
import type { Project } from "./content";
export function projectSummary(p: Project, l: Locale) {
  const copy: Record<string, [string, string]> = {
    "motion-lab": [
      "موشن لاب موقع لوكالة إبداعية. تولّيت تطوير موقعها بالكامل باستخدام WordPress لعرض أعمال الوكالة وخدماتها.",
      "Motion Lab is a creative agency website. I developed the complete WordPress website to present the agency’s work and services.",
    ],
    kripton: [
      "كريبتون موقع تعريفي للشركة وخدماتها. تولّيت تطوير الموقع بالكامل باستخدام WordPress، انطلاقًا من هوية الشركة القائمة.",
      "Kripton is a corporate website introducing the company and its services. I developed the complete WordPress website using the company’s existing brand identity.",
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
      "جيت روم تطبيق ويب. طوّرت واجهاته بـNext.js وربطتها بخدمات خارجية ضمن عمل جزئي عن بُعد من أبريل إلى أكتوبر ٢٠٢٤.",
      "Jeetroom is a web application. I developed Next.js interfaces and connected them to external services in a part-time remote role from April to October 2024.",
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
        `واجهة ${p.name.ar} ضمن أرشيف ${categoryLabel(p.category, l)}. توثّق الصور الأصلية أدناه تخطيط الصفحات وتفاصيلها البصرية.`,
        `${p.name.en}, an interface in the ${p.category} archive. The original screenshots below document its page layout and visual details.`,
      );
}
