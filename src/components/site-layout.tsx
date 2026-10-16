/* eslint-disable @next/next/no-head-element -- App Router root document owns the pre-paint theme script and its unmanaged meta tag. */
import "@/app/globals.css";
import localFont from "next/font/local";
import { Navigation } from "./navigation";
import { Footer } from "./shared";
import { ScrollMotion } from "./interactions";
import { PersonSchema } from "@/lib/seo";
import { text, type Locale } from "@/lib/content";
import { themeScript } from "@/lib/theme";
import type { Viewport } from "next";

export const viewport: Viewport = { colorScheme: "dark light" };

const arabic = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-ar",
  display: "swap",
  adjustFontFallback: false,
});
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
      className={`${arabic.variable} ${english.variable}`}
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
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
        <ScrollMotion />
      </body>
    </html>
  );
}
