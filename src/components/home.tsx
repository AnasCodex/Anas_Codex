import Link from "next/link";
import { Arrow } from "./icons";
import { ProjectPicture, SectionLabel } from "./shared";
import { SceneShell } from "./scene-shell";
import { HomeContact } from "./contact";
import { Journey } from "./sections";
import { WorkReel } from "./work-reel";
import { Capabilities } from "./capabilities";
import { ProjectVideo } from "./project-video";
import { ScrollMotion } from "./scroll-motion";
import { bio, href, projects, text, type Locale } from "@/lib/content";
import { JsonLd, siteUrl } from "@/lib/seo";

export function Home({ locale: l }: { locale: Locale }) {
  const first = projects.find((p) => p.slug === "motion-lab")!;
  const second = projects.find((p) => p.slug === "kripton")!;
  return (
    <>
      <ScrollMotion />
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-stage">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-topline container">
            <span className="eyebrow">
              {text(l, "أنس ناصر — مطوّر ويب إبداعي", "ANAS NASER — CREATIVE DEVELOPER")}
            </span>
            <span className="mono" dir="ltr">
              {text(l, "أعمالي / إصدار 2026", "PORTFOLIO / VOL. 2026")}
            </span>
          </div>
          <div className="hero-orbit" aria-hidden="true">
            <i />
            <i />
          </div>
          <div className="hero-spine" aria-hidden="true">
            <span>{text(l, "كود", "CODE")}</span>
            <span>{text(l, "إتقان", "CRAFT")}</span>
            <span>{text(l, "هوية", "CHARACTER")}</span>
          </div>
          <div className="portrait-light" aria-hidden="true" />
          <h1 id="hero-heading" className="hero-title">
            <span className="hero-title-first">{text(l, "ما وراء", "BEYOND")}</span>
            <span className="hero-title-last">{text(l, "الواجهة.", "THE INTERFACE.")}</span>
          </h1>
          <figure className="hero-portrait-wrap">
            <picture>
              <source
                type="image/avif"
                srcSet="/media/portrait-cutout-360.avif 360w, /media/portrait-cutout-560.avif 560w, /media/portrait-cutout-640.avif 640w, /media/portrait-cutout-720.avif 720w"
                sizes="(max-width: 499px) 88vw, (max-width: 767px) 390px, (max-width: 1100px) 48vw, (min-width: 1527px) 580px, 38vw"
              />
              <img
                className="hero-portrait"
                src="/media/portrait-cutout-720.webp"
                srcSet="/media/portrait-cutout-360.webp 360w, /media/portrait-cutout-560.webp 560w, /media/portrait-cutout-640.webp 640w, /media/portrait-cutout-720.webp 720w"
                sizes="(max-width: 499px) 88vw, (max-width: 767px) 390px, (max-width: 1100px) 48vw, (min-width: 1527px) 580px, 38vw"
                width="737"
                height="678"
                fetchPriority="high"
                alt={text(
                  l,
                  "أنس ناصر — مطوّر أول للمواقع والمتاجر الإلكترونية",
                  "Anas Naser — Senior Web & E-Commerce Developer",
                )}
              />
            </picture>
            <figcaption dir={l === "ar" ? "rtl" : "ltr"}>
              <span className="status-dot" aria-hidden="true" />
              <span className="portrait-name">{text(l, "أنس ناصر", "ANAS NASER")}</span>
              <span className="portrait-arrow" aria-hidden="true">
                ↗
              </span>
            </figcaption>
          </figure>
          <div className="hero-sculpture">
            <SceneShell locale={l} />
          </div>
          <div className="hero-note">
            <span className="small-cross" aria-hidden="true">
              ✳
            </span>
            <p>
              {text(
                l,
                "من فكرة إلى تجربة ويب،\nبعناية في كل تفصيلة.",
                "From idea to web experience.\nCare in every detail.",
              )}
            </p>
            <span className="mono" dir="ltr">
              {text(l, "تطوير × تصميم", "DEVELOPMENT × DESIGN")}
            </span>
          </div>
          <a className="hero-cta" href="#selected" data-magnetic>
            <span>
              {text(l, "شاهد", "VIEW MY")}
              <br />
              <strong>{text(l, "أعمالي", "WORK")}</strong>
            </span>
            <Arrow down />
          </a>
          <span className="hero-coordinate mono" dir="ltr">
            24.7136° N / 46.6753° E<br />
            {text(l, "الرياض، السعودية", "RIYADH, SAUDI ARABIA")}
          </span>
        </div>
        <div className="hero-bottom container">
          <p>
            {text(
              l,
              "مواقع. متاجر. تجارب تستحق أن تُتذكّر.",
              "Websites. Commerce. Experiences worth remembering.",
            )}
          </p>
          <span>
            <b dir="ltr">5+</b> {text(l, "سنوات من الخبرة", "YEARS OF EXPERIENCE")}
          </span>
          <a href={`/resume/Anas_Naser_CV_${l.toUpperCase()}.pdf`} download className="text-link">
            {text(l, "السيرة الذاتية", "RESUME")} <Arrow down />
          </a>
        </div>
      </section>
      <section className="selected-work" id="selected" aria-labelledby="work-heading">
        <div className="work-door container">
          <SectionLabel number="01">{text(l, "مساحة الأعمال", "THE WORK, IN FOCUS")}</SectionLabel>
          <h2 id="work-heading">
            <span>{text(l, "أقلّ كلامًا.", "LESS TALK.")}</span>
            <span>{text(l, "أكثر أثرًا.", "MORE WORK.")}</span>
          </h2>
          <div className="work-door-note">
            <span className="mono">{text(l, "أعمال مختارة / 01—06", "SELECTED / 01—06")}</span>
            <p>
              {text(
                l,
                "من أول فكرة إلى آخر تفصيلة.\nهذه بعض العوالم التي ساهمت في بنائها.",
                "From a first idea to the last detail.\nA few worlds I helped bring to life.",
              )}
            </p>
            <Arrow down />
          </div>
        </div>
        <article className="feature-cinema">
          <Link className="cinema-image" href={href(l, `projects/${first.slug}`)}>
            <ProjectPicture project={first} locale={l} index={1} sizes="100vw" defer />
            <span className="cinema-corner mono">01 / MOTION LAB</span>
            <span className="cinema-open">
              <Arrow />
              <span>{text(l, "افتح التجربة", "OPEN PROJECT")}</span>
            </span>
          </Link>
          <div className="cinema-caption container">
            <div>
              <span className="eyebrow">
                {text(l, "WordPress / وكالة إبداعية", "WORDPRESS / CREATIVE AGENCY")}
              </span>
              <h3>
                <Link href={href(l, `projects/${first.slug}`)}>{first.name[l]}</Link>
              </h3>
            </div>
            <p>
              {text(
                l,
                "مساحة رقمية لوكالة تصنع الحركة.\nتطوير الموقع الإلكتروني بالكامل.",
                "A digital home for a creative agency.\nComplete website development.",
              )}
            </p>
            <Link
              className="round-link"
              href={href(l, `projects/${first.slug}`)}
              aria-label={text(l, "تفاصيل موشن لاب", "Motion Lab details")}
            >
              <Arrow />
            </Link>
          </div>
        </article>
        <article className="kripton-feature">
          <div className="kripton-word" dir="ltr" aria-hidden="true">
            KRIPTON
          </div>
          <div className="kripton-layout container">
            <div className="kripton-copy">
              <span className="mono">{text(l, "02 / حضور رقمي", "02 / CORPORATE PRESENCE")}</span>
              <h3>{text(l, "حضورٌ\nله ثقله.", "A presence.\nWith purpose.")}</h3>
              <p>
                {text(
                  l,
                  "كريبتون — من هوية قوية إلى موقع يقدّم خدمات الشركة بوضوح. تطوير الموقع بالكامل باستخدام WordPress.",
                  "Kripton — from a strong brand to a website that gives its services a clear voice. Complete WordPress development.",
                )}
              </p>
              <Link className="text-link" href={href(l, `projects/${second.slug}`)}>
                {text(l, "اكتشف كريبتون", "Discover Kripton")}
                <Arrow />
              </Link>
            </div>
            <div className="kripton-image">
              {second.videos?.[0] ? (
                <ProjectVideo video={second.videos[0]} name={second.name[l]} locale={l} preview />
              ) : (
                <ProjectPicture
                  project={second}
                  locale={l}
                  index={1}
                  sizes="(max-width: 767px) 92vw, 65vw"
                />
              )}
              <Link
                className="image-corner"
                href={href(l, `projects/${second.slug}`)}
                aria-label={text(l, "تفاصيل مشروع كريبتون", "Kripton project details")}
              >
                ↗
              </Link>
            </div>
          </div>
        </article>
        <WorkReel
          locale={l}
          collection={["theqa", "emad", "bawsala", "gaming-experience"].map((slug) =>
            projects.find((p) => p.slug === slug)!,
          )}
        />
        <Link className="archive-portal container" href={href(l, "projects")}>
          <span className="mono">{text(l, "أرشيف الأعمال", "THE COMPLETE ARCHIVE")}</span>
          <strong>
            {text(l, "وما زال هناك المزيد.", "THERE’S MORE.")}
            <sup>{projects.length}</sup>
          </strong>
          <span className="archive-portal-bottom">
            {text(l, "تصفّح جميع المشاريع", "EXPLORE ALL PROJECTS")}
            <Arrow />
          </span>
        </Link>
      </section>
      <section className="practice section-space" id="expertise">
        <div className="container practice-heading">
          <SectionLabel number="02">{text(l, "ما الذي أبنيه؟", "WHAT I BUILD")}</SectionLabel>
          <h2>
            {text(l, "الفكرة حرة.", "OPEN IDEAS.")}
            <br />
            <span className="serif-accent">{text(l, "والتنفيذ دقيق.", "PRECISE EXECUTION.")}</span>
          </h2>
          <p>
            {text(
              l,
              "لكل مشروع احتياجه. ولكل تفصيلة أداتها.",
              "Every project has its needs. Every detail, its tools.",
            )}
          </p>
        </div>
        <Capabilities locale={l} />
      </section>
      <section
        className="engineering container section-space"
        aria-labelledby="engineering-heading"
      >
        <SectionLabel number="03">
          {text(l, "الإبداع، بهندسة واضحة", "ENGINEERING MEETS CREATIVITY")}
        </SectionLabel>
        <div className="engineering-heading">
          <h2 id="engineering-heading">
            {text(l, "جميلٌ من الخارج.", "CONSIDERED OUTSIDE.")}
            <br />
            <span className="muted">{text(l, "مدروسٌ من الداخل.", "ENGINEERED WITHIN.")}</span>
          </h2>
          <p>
            {text(
              l,
              "قرارات تقنية مدروسة، تظهر قيمتها في تجربة الاستخدام.",
              "Technical decisions that make a difference to the people using the work.",
            )}
          </p>
        </div>
        <div className="engineering-composition">
          <div className="system-glyph" aria-hidden="true">
            <div className="glyph-ring" />
            <div className="glyph-ring" />
            <img src="/icon.svg" width="150" height="175" alt="" />
            <span className="mono">
              {text(l, "فكرة ← نظام ← تجربة", "IDEA → SYSTEM → EXPERIENCE")}
            </span>
          </div>
          <div className="engineering-evidence">
            {[
              [
                "01",
                "jeetroom",
                text(l, "واجهات تتصل بما وراءها", "Interfaces that connect"),
                text(
                  l,
                  "طوّرت واجهات بـNext.js وربطت واجهات API والخدمات الخارجية خلال عملي السابق بدوام جزئي عن بُعد لدى جيت روم.",
                  "Developed Next.js interfaces, APIs, and third-party integrations in my previous part-time remote role at Jeetroom.",
                ),
                text(l, "Next.js / تكامل الخدمات", "NEXT.JS / API INTEGRATION"),
              ],
              [
                "02",
                "theqa",
                text(l, "تجربة تتحدث لغتك", "An experience in your language"),
                text(
                  l,
                  "طوّرت واجهات عربية وإنجليزية وخصّصت WordPress وElementor خلال عملي المستقل السابق مع ثقة وإعمار.",
                  "Developed Arabic and English interfaces and customized WordPress and Elementor during my previous freelance engagement with Trust & Build.",
                ),
                "WordPress / RTL + LTR",
              ],
              [
                "03",
                "alansga",
                text(l, "من المنتج إلى الواجهة", "From product to interface"),
                text(
                  l,
                  "تخصيص متاجر سلة؛ ويمكن استكشاف واجهة متجر الأنسجة في أرشيف الأعمال.",
                  "Salla storefront customization. Explore the Alansga store interface in the work archive.",
                ),
                text(l, "Salla / متاجر إلكترونية", "SALLA / E-COMMERCE"),
              ],
            ].map(([n, slug, heading, copy, stack]) => (
              <Link key={slug} href={href(l, `projects/${slug}`)}>
                <span className="mono">/{n}</span>
                <div>
                  <h3>{heading}</h3>
                  <p>{copy}</p>
                  <span className="mono" dir="ltr">
                    {stack}
                  </span>
                </div>
                <Arrow />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="human-section about-home" aria-labelledby="human-heading">
        <div className="human-top container">
          <SectionLabel number="04">
            {text(l, "بعيدًا عن شاشة الكود", "THE HUMAN BEHIND THE CODE")}
          </SectionLabel>
          <span className="mono" dir="ltr">
            {text(l, "أنس ناصر / الرياض", "ANAS NASER / RIYADH")}
          </span>
        </div>
        <div className="human-editorial container">
          <h2 id="human-heading">
            <span>{text(l, "شغفٌ", "A CURIOUS")}</span>
            <span>{text(l, "يأخذ شكلًا.", "MIND.")}</span>
          </h2>
          <figure className="human-portrait">
            <img
              src="/media/portrait-studio-720.webp"
              srcSet="/media/portrait-studio-360.webp 360w, /media/portrait-studio-720.webp 720w"
              sizes="(max-width:767px) 64vw, 30vw"
              width="900"
              height="900"
              loading="lazy"
              alt={text(l, "أنس ناصر", "Anas Naser")}
            />
            <figcaption>
              <span>{text(l, "01 / من أنا", "01 / ABOUT ME")}</span>
              <span>{text(l, "شغف يظهر في التفاصيل.", "CARE IN EVERY DETAIL.")}</span>
            </figcaption>
          </figure>
          <div className="human-note">
            <span className="handwritten">{text(l, "أهلًا، أنا أنس.", "Hello, I’m Anas.")}</span>
            <p>{bio(l)}</p>
            <p>
              {text(
                l,
                "أفهم الاحتياج قبل اختيار التقنية، وأهتم بما يحدث بعد الإطلاق بقدر اهتمامي بأول انطباع.",
                "I understand the need before choosing the technology. What happens after launch matters as much as the first impression.",
              )}
            </p>
            <Link className="text-link" href={href(l, "about")}>
              {text(l, "المزيد عنّي", "MORE ABOUT ME")}
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <section className="journey-home container section-space">
        <div className="section-heading">
          <div>
            <SectionLabel number="05">
              {text(l, "فصول من المسار", "CHAPTERS ALONG THE WAY")}
            </SectionLabel>
            <h2>{text(l, "خبرة تتراكم.", "ALWAYS BUILDING.")}</h2>
          </div>
          <Link className="text-link" href={href(l, "resume")}>
            {text(l, "السيرة الذاتية كاملة", "THE FULL RESUME")}
            <Arrow />
          </Link>
        </div>
        <Journey locale={l} />
      </section>
      <HomeContact locale={l} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Anas Codex",
          url: siteUrl + href(l),
          inLanguage: l,
          author: { "@id": `${siteUrl}/#anas` },
        }}
      />
    </>
  );
}
