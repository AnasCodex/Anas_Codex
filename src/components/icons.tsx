export function Arrow({ className = "", down = false }: { className?: string; down?: boolean }) {
  return (
    <svg
      className={`arrow ${className}`}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={down ? "M12 4v16m-6-6 6 6 6-6" : "M5 19 19 5M5 5h14v14"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Logo({ className = "" }: { className?: string }) {
  return <img className={className} src="/icon.svg" width="35" height="40" alt="" />;
}
export function Pin() {
  return (
    <svg width="14" height="16" viewBox="0 0 20 24" fill="none" aria-hidden="true">
      <path
        d="M17 9c0 6-7 12-7 12S3 15 3 9a7 7 0 1 1 14 0Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="10" cy="9" r="2" stroke="currentColor" />
    </svg>
  );
}
