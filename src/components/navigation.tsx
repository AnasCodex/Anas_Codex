"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { href, profile, text, type Locale } from "@/lib/i18n";
import { Arrow, Logo } from "./icons";
import { ThemeToggle } from "./theme-toggle";
export function Navigation({ locale: l }: { locale: Locale }) {
  const path = usePathname();
  const masthead = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const links = [
    ["", text(l, "البداية", "Home")],
    ["projects", text(l, "الأعمال", "Work")],
    ["about", text(l, "من أنا", "About")],
    ["expertise", text(l, "التخصصات", "Expertise")],
    ["resume", text(l, "السيرة الذاتية", "Resume")],
    ["contact", text(l, "لنتحدث", "Contact")],
  ];
  const other = l === "ar" ? `/en${path === "/" ? "/" : path}` : path.replace(/^\/en/, "") || "/";
  function openMenu() {
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    toggle.current?.setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    dialog.current?.close();
    document.body.style.overflow = "";
    toggle.current?.setAttribute("aria-expanded", "false");
  }
  useEffect(() => {
    const header = masthead.current;
    if (!header) return;
    const topZone = 120;
    const directionThreshold = 12;
    let pivot = Math.max(0, window.scrollY);
    let hidden = false;
    header.removeAttribute("data-nav-hidden");

    function trackScroll() {
      const y = Math.max(0, window.scrollY);
      const previous = hidden;
      if (y <= topZone || dialog.current?.open) {
        hidden = false;
        pivot = y;
      } else {
        // Ignore small direction changes from the trackpad or touch inertia.
        pivot = hidden ? Math.max(pivot, y) : Math.min(pivot, y);
        if (Math.abs(y - pivot) >= directionThreshold) {
          hidden = !hidden;
          pivot = y;
        }
      }
      if (previous !== hidden) header?.toggleAttribute("data-nav-hidden", hidden);
    }

    window.addEventListener("scroll", trackScroll, { passive: true });
    return () => window.removeEventListener("scroll", trackScroll);
  }, [path]);
  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    [],
  );
  return (
    <>
      <header className="site-masthead" ref={masthead}>
        <div className="site-header container">
          <Link
            href={href(l)}
            className="brand"
            aria-label={text(l, "ANAS CODEX — الرئيسية", "ANAS CODEX — Home")}
          >
            <Logo />
            <span dir="ltr">
              ANAS <span className="brand-light">CODEX</span>
            </span>
          </Link>
          <span className="header-status">
            <span className="status-dot" />
            {text(l, "متاح للعمل فورًا", "AVAILABLE IMMEDIATELY")}
          </span>
          <div className="header-actions">
            <ThemeToggle locale={l} />
            <a
              href={other}
              className="language"
              hrefLang={l === "ar" ? "en" : "ar"}
              aria-label={text(l, "EN — Switch to English", "عربي — التبديل إلى العربية")}
            >
              {l === "ar" ? "EN" : "عربي"}
            </a>
            <button
              ref={toggle}
              className="menu-toggle"
              aria-label={text(l, "فتح القائمة", "Open menu")}
              aria-expanded="false"
              aria-haspopup="dialog"
              aria-controls="navigation-dialog"
              onClick={openMenu}
            >
              <span>{text(l, "القائمة", "MENU")}</span>
              <span className="menu-lines" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="navigation-dialog"
        className="navigation-dialog"
        aria-label={text(l, "القائمة الرئيسية", "Main navigation")}
        onClose={closeMenu}
        onCancel={closeMenu}
      >
        <div className="menu-top container">
          <Link href={href(l)} className="brand" onClick={closeMenu}>
            <Logo />
            <span dir="ltr">ANAS CODEX</span>
          </Link>
          <button
            className="menu-close"
            onClick={closeMenu}
            aria-label={text(l, "إغلاق القائمة", "Close menu")}
          >
            {text(l, "إغلاق", "CLOSE")} <span>×</span>
          </button>
        </div>
        <div className="menu-body container">
          <nav className="main-nav" aria-label={text(l, "روابط الموقع", "Site links")}>
            {links.map(([p, label], i) => (
              <Link
                className="menu-link"
                key={p}
                href={href(l, p)}
                onClick={closeMenu}
                aria-current={
                  path.replace(/\/$/, "") === href(l, p).replace(/\/$/, "") ? "page" : undefined
                }
              >
                <span className="mono">0{i + 1}</span>
                <strong>{label}</strong>
                <Arrow />
              </Link>
            ))}
          </nav>
          <aside className="menu-aside">
            <span className="mono">{text(l, "ما وراء الواجهة.", "BEYOND THE INTERFACE.")}</span>
            <p>
              {text(
                l,
                "فكرة تستحق البناء؟\nلنبدأ بمحادثة.",
                "An idea worth building?\nLet’s start a conversation.",
              )}
            </p>
            <a href={`mailto:${profile.email}`} dir="ltr">
              {profile.email}
            </a>
            <div>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </div>
          </aside>
        </div>
      </dialog>
    </>
  );
}
