"use client";
import { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { Search } from "lucide-react";
import { projects, text, categoryLabel, type Locale } from "@/lib/content";
import { ProjectCard } from "./shared";

const categories = ["All", "WordPress", "Next.js", "React", "Salla", "Three.js", "HTML", "Other"];
gsap.registerPlugin(Flip, useGSAP);
export function ProjectExplorer({ locale: l }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(12);
  function capture() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    Flip.killFlipsOf(".project-card", true);
    flipState.current = Flip.getState(root.current!.querySelectorAll(".project-card"));
  }
  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          `${p.name.ar} ${p.name.en} ${p.category}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
      ),
    [category, query],
  );
  useGSAP(
    () => {
      if (!flipState.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      Flip.from(flipState.current, {
        duration: 0.5,
        ease: "power2.inOut",
        scale: true,
        prune: true,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, clearProps: "all" },
          ),
      });
      flipState.current = null;
    },
    { scope: root, dependencies: [category, query, limit] },
  );
  return (
    <section
      ref={root}
      className="container explorer"
      aria-label={text(l, "استكشاف المشاريع", "Explore projects")}
    >
      <div className="explorer-toolbar">
        <div
          className="project-filters"
          role="group"
          aria-label={text(l, "تصنيف المشاريع", "Project category")}
        >
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              onClick={() => {
                capture();
                setCategory(c);
                setLimit(12);
              }}
            >
              {c === "All" ? text(l, "جميع الأعمال", "All work") : categoryLabel(c, l)}
              <sup>
                {c === "All" ? projects.length : projects.filter((p) => p.category === c).length}
              </sup>
            </button>
          ))}
        </div>
        <label className="project-search">
          <Search size={18} strokeWidth={1.4} aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => {
              capture();
              setQuery(e.target.value);
              setLimit(12);
            }}
            placeholder={text(l, "ابحث عن مشروع…", "Find a project…")}
            aria-label={text(l, "بحث في المشاريع", "Search projects")}
          />
        </label>
      </div>
      <div className="results-line">
        <span role="status">
          {text(
            l,
            `المشاريع: ${filtered.length}`,
            `${filtered.length} ${filtered.length === 1 ? "project" : "projects"}`,
          )}
        </span>
        <span>
          {text(l, "من الفكرة إلى آخر تفصيلة.", "From the first idea to the final detail.")}
        </span>
      </div>
      <div className="projects-grid">
        {filtered.slice(0, limit).map((p, i) => (
          <ProjectCard key={p.slug} project={p} locale={l} index={i} />
        ))}
      </div>
      {filtered.length > limit && (
        <div className="archive-more">
          <button
            className="button button-secondary"
            onClick={() => {
              capture();
              setLimit((value) => value + 12);
            }}
          >
            {text(
              l,
              `عرض المزيد (${filtered.length - limit})`,
              `Show more (${filtered.length - limit})`,
            )}{" "}
            <span aria-hidden="true">+</span>
          </button>
        </div>
      )}
      {!filtered.length && (
        <div className="empty-state">
          <h2>{text(l, "لنجرّب كلمة أخرى.", "Try another search.")}</h2>
          <p>
            {text(
              l,
              "لا توجد مشاريع تطابق البحث الحالي.",
              "No projects match your current search.",
            )}
          </p>
          <button
            className="button"
            onClick={() => {
              capture();
              setQuery("");
              setCategory("All");
              setLimit(12);
            }}
          >
            {text(l, "عرض جميع الأعمال", "Show all work")}
          </button>
        </div>
      )}
    </section>
  );
}
