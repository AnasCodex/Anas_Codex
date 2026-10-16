"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Arrow } from "./icons";
import { ProjectPicture } from "./shared";
import { href, projects, projectSummary, text, type Locale } from "@/lib/content";
gsap.registerPlugin(useGSAP);
const collection = ["theqa", "emad", "jeetroom", "golden-afaq"].map((slug) =>
  projects.find((p) => p.slug === slug)!,
);

export function WorkReel({ locale: l }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".reel-active-image",
        { clipPath: "inset(0 0 0 100%)", scale: 1.06 },
        { clipPath: "inset(0 0 0 0%)", scale: 1, duration: 0.65, ease: "power3.inOut" },
      );
      gsap.from(".reel-description", {
        y: 12,
        opacity: 0.2,
        duration: 0.45,
        delay: 0.12,
        clearProps: "all",
      });
    },
    { scope: root, dependencies: [active], revertOnUpdate: true },
  );
  const p = collection[active];
  return (
    <div ref={root} className="work-reel container">
      <div className="reel-heading">
        <span className="mono" dir="ltr">
          {text(l, "عوالم أخرى / 03—06", "MORE WORLDS / 03—06")}
        </span>
        <h3>{text(l, "لكل فكرة، عالمها.", "DIFFERENT IDEAS. DIFFERENT WORLDS.")}</h3>
        <span>{text(l, "اختر عملًا لاستكشافه", "Select a project to explore")}</span>
      </div>
      <div className="reel-composition">
        <div
          className="reel-index"
          role="group"
          aria-label={text(l, "الأعمال المختارة", "Featured projects")}
        >
          {collection.map((project, i) => (
            <button
              key={project.slug}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              aria-controls="reel-preview"
            >
              <span className="mono">0{i + 3}</span>
              <strong>{project.name[l]}</strong>
              <span className="reel-category" dir="ltr">
                {project.category}
              </span>
              <Arrow />
            </button>
          ))}
        </div>
        <div id="reel-preview" className="reel-preview" aria-live="polite" aria-atomic="true">
          <Link className="reel-active-image" href={href(l, `projects/${p.slug}`)}>
            <ProjectPicture
              project={p}
              locale={l}
              index={p.assets.length > 1 ? 1 : 0}
              sizes="(max-width: 767px) 90vw, 58vw"
            />
            <span className="reel-image-link">
              <Arrow />
              {text(l, "استكشف المشروع", "EXPLORE PROJECT")}
            </span>
          </Link>
          <div className="reel-description">
            <p>{projectSummary(p, l)}</p>
            <span className="mono">0{active + 3} / 06</span>
          </div>
        </div>
      </div>
    </div>
  );
}
