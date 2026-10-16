import "./globals.css";
import Link from "next/link";
export const metadata = { title: "404 | Anas Codex", robots: { index: false, follow: true } };
export default function NotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <main className="not-found">
          <img src="/icon.svg" width="55" height="64" alt="Anas Codex" />
          <div className="not-found-code" dir="ltr">
            404
          </div>
          <h1>هذه الصفحة غير موجودة.</h1>
          <p>ربما تغيّر الرابط. يمكنك العودة إلى الرئيسية لاستكشاف الأعمال.</p>
          <p lang="en" dir="ltr">
            We couldn&apos;t find this page. Head back home to explore the work.
          </p>
          <div className="not-found-links">
            <Link className="button" href="/">
              العودة للرئيسية ↗
            </Link>
            <Link className="button button-secondary" href="/en/" lang="en" dir="ltr">
              Back to home ↗
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
