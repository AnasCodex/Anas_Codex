/* eslint-disable @next/next/no-head-element -- App Router root document owns the pre-paint theme script and its unmanaged meta tag. */
import "@/app/globals.css";
import localFont from "next/font/local";
import { Navigation } from "./navigation";
import { Footer } from "./shared";
import { RouteFocus } from "./interactions";
import { BackToTop } from "./back-to-top";
import { PersonSchema } from "@/lib/seo";
import { text, type Locale } from "@/lib/content";
import { themeScript } from "@/lib/theme";
import type { Viewport } from "next";

export const viewport: Viewport = { colorScheme: "dark light" };

const english = localFont({
  src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-en",
  display: "swap",
});

export function SiteLayout({ children, locale: l }: { children: React.ReactNode; locale: Locale }) {
  return (
    <html
      lang={l}
      dir={l === "ar" ? "rtl" : "ltr"}
      className={english.variable}
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {l === "ar" &&
          [400, 500].map((weight) => (
            <link
              key={weight}
              rel="preload"
              href={`/fonts/ibm-plex-arabic-${weight}.woff2`}
              as="font"
              type="font/woff2"
              crossOrigin="anonymous"
            />
          ))}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          {text(l, "تخطّ إلى المحتوى", "Skip to content")}
        </a>
        <Navigation locale={l} />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer locale={l} />
        <PersonSchema />
        <RouteFocus />
        <BackToTop locale={l} />
      </body>
    </html>
  );
}
