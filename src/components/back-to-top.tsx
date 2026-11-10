"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { text, type Locale } from "@/lib/i18n";

export function BackToTop({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);
  const path = usePathname();
  useEffect(() => {
    const update = () => setVisible(scrollY > 560);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [path]);
  return (
    <button
      className="back-to-top"
      hidden={!visible}
      aria-label={text(locale, "العودة إلى بداية الصفحة", "Back to top")}
      title={text(locale, "بداية الصفحة", "Back to top")}
      onClick={() => {
        document.querySelector<HTMLElement>(".site-header .brand")?.focus({ preventScroll: true });
        window.scrollTo({
          top: 0,
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        });
      }}
    >
      <ArrowUp size={23} strokeWidth={1.6} aria-hidden="true" />
    </button>
  );
}
