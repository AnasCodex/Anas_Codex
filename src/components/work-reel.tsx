"use client";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Arrow } from "./icons";
import { ProjectPicture } from "./shared";
import { ProjectVideo } from "./project-video";
import { href, text, type Locale } from "@/lib/i18n";
import { projectSummary } from "@/lib/project-copy";
import type { Project } from "@/lib/content";
export function WorkReel({ locale: l, collection }: { locale: Locale; collection: Project[] }) {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const engine = useRef<typeof import("gsap").gsap | null>(null);
  useEffect(() => {
    let disposed = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
          void import("gsap").then(({ gsap }) => {
            if (!disposed) engine.current = gsap;
          });
        }
        // Warm only this nearby reel, so a touch can reveal a decoded image.
        for (const project of collection) {
          const asset = project.assets[project.assets.length > 1 ? 1 : 0];
          const image = new Image();
          image.fetchPriority = "low";
          image.sizes = "(max-width: 767px) 90vw, 58vw";
          image.srcset = `${asset.base}-560.webp 560w, ${asset.base}-1120.webp 1120w${asset.height / asset.width < 1 ? `, ${asset.base}-full.webp ${asset.width}w` : ""}`;
          image.src = `${asset.base}-1120.webp`;
        }
        observer.disconnect();
      },
      { rootMargin: "400px" },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, [collection]);
  function select(index: number) {
    if (index === active) return;
    setPrevious(active);
    setActive(index);
  }
  useLayoutEffect(() => {
    const gsap = engine.current;
    if (!gsap || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (active === previous) return;
        gsap.fromTo(
          ".reel-incoming",
          {
            xPercent: l === "ar" ? 100 : -100,
          },
          {
            xPercent: 0,
            duration: 0.28,
            ease: "power2.out",
            overwrite: true,
            clearProps: "transform",
          },
        );
      });
    }, root);
    return () => context.revert();
  }, [active, previous, l]);
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
              onClick={() => select(i)}
              onKeyDown={(event) => {
                const next =
                  event.key === "ArrowDown" ||
                  event.key === (l === "ar" ? "ArrowLeft" : "ArrowRight");
                const back =
                  event.key === "ArrowUp" ||
                  event.key === (l === "ar" ? "ArrowRight" : "ArrowLeft");
                if (!next && !back && event.key !== "Home" && event.key !== "End") return;
                event.preventDefault();
                const index =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? collection.length - 1
                      : (i + (next ? 1 : -1) + collection.length) % collection.length;
                select(index);
                root.current
                  ?.querySelectorAll<HTMLButtonElement>(".reel-index button")
                  [index]?.focus({ preventScroll: true });
              }}
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
          <div className="reel-active-image">
            {previous !== active && (
              <div className="reel-outgoing" aria-hidden="true">
                <ProjectPicture
                  project={collection[previous]}
                  locale={l}
                  index={collection[previous].assets.length > 1 ? 1 : 0}
                  sizes="(max-width: 767px) 90vw, 58vw"
                  defer
                />
              </div>
            )}
            <div className="reel-incoming" key={p.slug}>
              {p.videos?.[0] ? (
                <ProjectVideo video={p.videos[0]} name={p.name[l]} locale={l} />
              ) : (
                <ProjectPicture
                  project={p}
                  locale={l}
                  index={p.assets.length > 1 ? 1 : 0}
                  sizes="(max-width: 767px) 90vw, 58vw"
                  defer
                />
              )}
            </div>
            {!p.videos?.length && (
              <Link href={href(l, `projects/${p.slug}`)} className="reel-image-link">
                <Arrow />
                {text(l, "استكشف المشروع", "EXPLORE PROJECT")}
              </Link>
            )}
          </div>
          <div className="reel-description">
            <div>
              <p>{projectSummary(p, l)}</p>
              <strong className="reel-selected-name">{p.name[l]}</strong>
              <Link className="text-link" href={href(l, `projects/${p.slug}`)}>
                {text(l, "استكشف المشروع", "EXPLORE PROJECT")} <Arrow />
              </Link>
            </div>
            <span className="mono">0{active + 3} / 06</span>
          </div>
        </div>
      </div>
    </div>
  );
}
