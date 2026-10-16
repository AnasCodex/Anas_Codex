import { text, type Locale } from "@/lib/i18n";

export function SceneShell({ locale: l }: { locale: Locale }) {
  return (
    <div className="brand-object">
      <div className="object-cross top" aria-hidden="true">
        +
      </div>
      <div className="object-cross bottom" aria-hidden="true">
        +
      </div>
      <img
        src="/icon.svg"
        className="scene-fallback"
        width="180"
        height="210"
        alt=""
        aria-hidden="true"
      />
      <span className="object-caption" dir="ltr">
        {text(l, "CODEX / التكوين 01", "CODEX / ASSEMBLY 01")}
      </span>
    </div>
  );
}
