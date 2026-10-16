"use client";
import { useId, useRef, useState } from "react";
import {
  CodeXml,
  PanelsTopLeft,
  ShoppingBag,
  Component,
  Layers,
  Gauge,
  SearchCheck,
  Workflow,
  Shapes,
  Plus,
  Minus,
} from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { text, type Locale } from "@/lib/i18n";
gsap.registerPlugin(useGSAP);
const skills = [
  {
    icon: CodeXml,
    ar: "تطوير الويب",
    en: "Web development",
    copy: [
      "مواقع متجاوبة تحوّل متطلبات العمل إلى واجهات واضحة وقابلة للتطوير.",
      "Responsive websites that turn business requirements into clear, maintainable interfaces.",
    ],
  },
  {
    icon: PanelsTopLeft,
    ar: "تطوير WordPress",
    en: "WordPress & CMS",
    copy: [
      "مواقع WordPress مخصصة، مع تخصيص Elementor والإضافات لتسهيل إدارة المحتوى.",
      "Custom WordPress websites, with Elementor and plugin customization to make content easier to manage.",
    ],
  },
  {
    icon: ShoppingBag,
    ar: "المتاجر الإلكترونية",
    en: "E-commerce",
    copy: [
      "تخصيص متاجر سلة وWooCommerce، وتنظيم واجهات المنتجات لتجربة تصفح سهلة.",
      "Salla and WooCommerce customization, with product interfaces designed for clear browsing.",
    ],
  },
  {
    icon: Component,
    ar: "تطبيقات React وNext.js",
    en: "React & Next.js",
    copy: [
      "واجهات تفاعلية ومكونات قابلة لإعادة الاستخدام، مع ربط البيانات والخدمات الخارجية.",
      "Interactive interfaces and reusable components, connected to data and external services.",
    ],
  },
  {
    icon: Layers,
    ar: "تطوير الواجهات",
    en: "UI development",
    copy: [
      "تطوير أنظمة واجهات متسقة، ولوحات تحكم، وتجارب عربية وإنجليزية تراعي اتجاه القراءة.",
      "Consistent interfaces, dashboards, and Arabic and English experiences that respect reading direction.",
    ],
  },
  {
    icon: Gauge,
    ar: "تحسين أداء المواقع",
    en: "Website performance",
    copy: [
      "مراجعة تحميل الصفحات وأداء الواجهات، ومعالجة المشكلات ضمن تطوير وصيانة المواقع.",
      "Reviewing page loading and front-end performance, resolving issues through development and maintenance.",
    ],
  },
  {
    icon: SearchCheck,
    ar: "التهيئة التقنية لمحركات البحث",
    en: "Technical SEO",
    copy: [
      "العناية بالبنية التقنية والبيانات الوصفية، كجزء من تجربة موقع واضحة للمستخدم ومحركات البحث.",
      "Care for technical structure and metadata, making websites clearer to people and search engines.",
    ],
  },
  {
    icon: Workflow,
    ar: "ربط الأنظمة والخدمات",
    en: "API integrations",
    copy: [
      "ربط المواقع بواجهات API والخدمات الخارجية، مع الاهتمام باستقرار تبادل البيانات.",
      "API and third-party service integrations, with attention to reliable data flows.",
    ],
  },
  {
    icon: Shapes,
    ar: "تجارب ويب إبداعية",
    en: "Creative frontend",
    copy: [
      "واجهات تفاعلية توظّف الحركة والعناصر ثلاثية الأبعاد لخدمة المحتوى وتجربة الاستخدام.",
      "Interactive interfaces that use motion and 3D elements to support the content and user experience.",
    ],
  },
];
export function Capabilities({ locale: l }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  const { contextSafe } = useGSAP({ scope: root });
  const animateIcon = contextSafe((element: HTMLElement) => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      element.querySelector(".capability-icon"),
      { rotation: -12, scale: 0.85 },
      { rotation: 0, scale: 1, duration: 0.55, ease: "back.out(2)", overwrite: true },
    );
  });
  useGSAP(
    () => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".capability-body:not([hidden]) .capability-inner", {
        y: 12,
        opacity: 0.2,
        duration: 0.4,
        clearProps: "all",
      });
    },
    { scope: root, dependencies: [active], revertOnUpdate: true },
  );
  return (
    <div className="capabilities container" ref={root}>
      <div className="capability-art" aria-hidden="true">
        <span className="capability-count" dir="ltr">
          {active < 0 ? "—" : `0${active + 1}`}
          <span>/09</span>
        </span>
        <div className="capability-mark">
          {(() => {
            const Icon = skills[active < 0 ? 0 : active].icon;
            return <Icon size={145} strokeWidth={0.7} />;
          })()}
        </div>
        <span className="mono">
          {text(l, "فكرة واضحة.", "CRAFTED WITH INTENT.")}
          <br />
          {text(l, "تنفيذ يخدمها.", "BUILT TO WORK.")}
        </span>
      </div>
      <div className="capability-list">
        {skills.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <div className={`capability-row ${active === i ? "is-active" : ""}`} key={skill.en}>
              <h3>
                <button
                  id={`${id}-button-${i}`}
                  aria-expanded={active === i}
                  aria-controls={`${id}-panel-${i}`}
                  onClick={() => setActive(active === i ? -1 : i)}
                  onPointerEnter={(e) => animateIcon(e.currentTarget)}
                  onFocus={(e) => animateIcon(e.currentTarget)}
                >
                  <span className="mono">0{i + 1}</span>
                  <span className="capability-icon">
                    <Icon size={25} strokeWidth={1.4} />
                  </span>
                  <span>{l === "ar" ? skill.ar : skill.en}</span>
                  {active === i ? <Minus size={18} /> : <Plus size={18} />}
                </button>
              </h3>
              <div
                className="capability-body"
                id={`${id}-panel-${i}`}
                role="region"
                aria-labelledby={`${id}-button-${i}`}
                hidden={active !== i}
              >
                <div className="capability-inner">
                  <p>{skill.copy[l === "ar" ? 0 : 1]}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
