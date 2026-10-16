"use client";
import { useSyncExternalStore } from "react";
import { text, type Locale } from "@/lib/i18n";

function subscribe(callback: () => void) {
  window.addEventListener("themechange", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("themechange", callback);
    window.removeEventListener("storage", callback);
  };
}
export function useTheme() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme || "dark",
    () => "dark",
  );
}
export function ThemeToggle({ locale: l }: { locale: Locale }) {
  const theme = useTheme();
  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "dark" ? "#101219" : "#f0efe9");
    try {
      localStorage.setItem("anas-theme", next);
    } catch {
      /* Theme remains usable without storage. */
    }
    window.dispatchEvent(new Event("themechange"));
  }
  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={text(l, "تبديل الوضع الداكن والفاتح", "Toggle dark and light theme")}
      aria-pressed={theme === "light"}
    >
      <svg
        className="theme-sun"
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </svg>
      <svg
        className="theme-moon"
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z" />
      </svg>
    </button>
  );
}
