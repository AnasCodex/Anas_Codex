import { Sora } from "next/font/google";
import Head from "next/head";

import Header from "../components/Header";
import Nav from "../components/Nav";
import TopLeftImg from "../components/TopLeftImg";

// setup font
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const Layout = ({ children }) => {
  return (
    <main
      className={`page bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative`}
    >
      {/* metadata */}
      <Head>
        <title>Anas Naser | Web & E-Commerce Developer in Riyadh</title>

        <meta
          name="description"
          content="Anas Naser (Anas Codex) is a Senior Web & E-Commerce Developer in Riyadh, Saudi Arabia with 7+ years of experience in WordPress, Salla, WooCommerce, React and Next.js. Available for website development, online stores, freelance projects and web development roles."
        />

        <meta name="author" content="Anas Naser" />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <link rel="canonical" href="https://anas-codex.vercel.app/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />

        <meta
          property="og:title"
          content="Anas Naser | Senior Web & E-Commerce Developer in Riyadh"
        />

        <meta
          property="og:description"
          content="Web and e-commerce developer in Riyadh specializing in WordPress, Salla, WooCommerce, React and Next.js. Explore selected projects or get in touch for development work."
        />

        <meta property="og:url" content="https://anas-codex.vercel.app/" />

        <meta
          property="og:image"
          content="https://anas-codex.vercel.app/og-image.jpg"
        />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Anas Naser - Web and E-Commerce Developer in Riyadh"
        />

        <meta property="og:site_name" content="Anas Codex" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content="Anas Naser | Web & E-Commerce Developer in Riyadh"
        />

        <meta
          name="twitter:description"
          content="Senior Web & E-Commerce Developer in Riyadh specializing in WordPress, Salla, WooCommerce, React and Next.js."
        />

        <meta
          name="twitter:image"
          content="https://anas-codex.vercel.app/og-image.jpg"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <meta name="theme-color" content="#3d6db5" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Anas Naser",
              alternateName: "Anas Codex",
              url: "https://anas-codex.vercel.app/",
              image: "https://anas-codex.vercel.app/anas-naser.jpg",
              jobTitle: "Senior Web & E-Commerce Developer",
              description:
                "Senior Web & E-Commerce Developer based in Riyadh, Saudi Arabia, specializing in WordPress, Salla, WooCommerce, React and Next.js.",
              email: "mailto:anas.coding404@gmail.com",
              telephone: "+966573984049",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Riyadh",
                addressCountry: "SA",
              },
              sameAs: [
                "https://www.linkedin.com/in/anascodex",
                "https://github.com/AnasCodex",
                "https://instagram.com/anascodex",
              ],
              knowsAbout: [
                "Web Development",
                "E-Commerce Development",
                "Salla Development",
                "WordPress Development",
                "WooCommerce",
                "React.js",
                "Next.js",
                "Frontend Development",
                "Technical SEO",
                "Website Performance",
              ],
            }),
          }}
        />
      </Head>

      <TopLeftImg />
      <Nav />
      <Header />

      {/* main content */}
      {children}
    </main>
  );
};

export default Layout;
