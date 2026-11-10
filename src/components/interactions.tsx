"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Check, Copy } from "lucide-react";
import { profile, text, type Locale } from "@/lib/i18n";

export function CopyEmail({ locale: l }: { locale: Locale }) {
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus("done");
    } catch {
      setStatus("error");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 4000);
  }
  return (
    <span className="copy-wrap">
      <button
        className="copy-button"
        onClick={copy}
        aria-label={text(l, "نسخ البريد الإلكتروني", "Copy email address")}
      >
        {status === "done" ? (
          <Check size={16} aria-hidden="true" />
        ) : (
          <Copy size={16} aria-hidden="true" />
        )}
        <span>{text(l, "نسخ", "Copy")}</span>
      </button>
      <span className="copy-status" role="status">
        {status === "done"
          ? text(l, "تم نسخ البريد", "Email copied")
          : status === "error"
            ? text(l, "تعذّر النسخ؛ استخدم رابط البريد.", "Copy unavailable; use the email link.")
            : ""}
      </span>
    </span>
  );
}

export function RouteFocus() {
  const path = usePathname();
  const previous = useRef(path);
  useEffect(() => {
    if (previous.current !== path)
      document.getElementById("main-content")?.focus({ preventScroll: true });
    previous.current = path;
  }, [path]);
  return null;
}
