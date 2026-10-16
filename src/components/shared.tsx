import Link from "next/link";
import { Arrow, Logo } from "./icons";
import { Film } from "lucide-react";
import { href, profile, text, categoryLabel, type Locale, type Project } from "@/lib/content";

export function ButtonLink({
  children,
  to,
  secondary = false,
  download = false,
}: {
  children: React.ReactNode;
  to: string;
  secondary?: boolean;
  download?: boolean;
}) {
  const Element = download || !to.startsWith("/") ? "a" : Link;
  return (
    <Element
      className={`button ${secondary ? "button-secondary" : ""}`}
      href={to}
      download={download || undefined}
    >
      {children}
      <Arrow down={download} />
    </Element>
  );
}
export function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span className="mono">/{number}</span>
      <span>{children}</span>
    </div>
  );
}
export function PageIntro({
  locale: l,
  number,
  label,
  title,
  description,
}: {
  locale: Locale;
  number: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="page-intro container">
      <div className="breadcrumb">
        <Link href={href(l)}>{text(l, "الرئيسية", "Home")}</Link>
        <span>/</span>
        <span>{label}</span>
      </div>
      <SectionLabel number={number}>{label}</SectionLabel>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}
export function ProjectPicture({
  project: p,
  full = false,
  index = 0,
  priority = false,
  locale: l = "en",
  sizes = "(max-width: 767px) 90vw, 45vw",
}: {
  project: Project;
  full?: boolean;
  index?: number;
  priority?: boolean;
  locale?: Locale;
  sizes?: string;
  transition?: boolean;
}) {
  const a = p.assets[index];
  const picture = (
    <img
      src={`${a.base}-${full ? "full" : "1120"}.webp`}
      srcSet={
        full
          ? undefined
          : `${a.base}-560.webp 560w, ${a.base}-1120.webp 1120w${a.height / a.width < 1 ? `, ${a.base}-full.webp ${a.width}w` : ""}`
      }
      sizes={full ? undefined : sizes}
      width={full ? a.width : 1120}
      height={full ? a.height : Math.round(1120 * Math.min(a.height / a.width, 0.82))}
      alt={`${p.name[l]} — ${text(l, full ? "لقطة كاملة لواجهة المشروع" : "معاينة واجهة المشروع", full ? "full interface screenshot" : "interface preview")}`}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
  return picture;
}
export function ProjectCard({
  project: p,
  locale: l,
  index = 0,
}: {
  project: Project;
  locale: Locale;
  index?: number;
}) {
  return (
    <article className={`project-card project-${p.slug}`} data-flip-id={p.slug}>
      <Link href={href(l, `projects/${p.slug}`)} className="project-image">
        <div className="browser-dots" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>{p.url ? p.url.replace("https://", "").replace(/\/$/, "") : p.name[l]}</span>
        </div>
        <ProjectPicture
          transition
          project={p}
          locale={l}
          index={p.assets.length > 1 ? 1 : 0}
          sizes={
            index % 9 === 0
              ? "(max-width: 767px) 90vw, 60vw"
              : "(max-width: 767px) 90vw, (max-width: 1000px) 45vw, 30vw"
          }
        />
        {!!p.videos?.length && (
          <span className="project-video-badge">
            <Film size={14} aria-hidden="true" />
            {text(l, "يتضمن فيديو", "VIDEO TOUR")}
          </span>
        )}
        <span className="project-view">
          {text(l, "استكشف المشروع", "Explore project")}
          <Arrow />
        </span>
      </Link>
      <div className="project-meta">
        <div>
          <span className="project-index mono">
            {String(index + 1).padStart(2, "0")} / {categoryLabel(p.category, l)}
          </span>
          <h3>
            <Link href={href(l, `projects/${p.slug}`)}>{p.name[l]}</Link>
          </h3>
        </div>
        <Link
          className="round-link"
          href={href(l, `projects/${p.slug}`)}
          aria-label={`${text(l, "تفاصيل", "Details of")} ${p.name[l]}`}
        >
          <Arrow />
        </Link>
      </div>
    </article>
  );
}
export function Footer({ locale: l }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="container footer-bottom">
        <Link href={href(l)} className="brand footer-brand">
          <Logo />
          <span dir="ltr">ANAS CODEX</span>
        </Link>
        <div className="social-links">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <Link href={href(l, "resume")}>{text(l, "السيرة الذاتية", "Resume")} ↗</Link>
          <Link href={href(l, "contact")}>{text(l, "التواصل", "Contact")} ↗</Link>
        </div>
        <small>{text(l, "بُني بعناية، بواسطة أنس.", "Made with care, by Anas.")} © 2026</small>
      </div>
    </footer>
  );
}
