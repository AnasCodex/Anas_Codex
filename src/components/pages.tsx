import Link from "next/link";
import { Arrow, Pin } from "./icons";
import { Play } from "lucide-react";
import { ButtonLink, PageIntro, ProjectPicture, SectionLabel } from "./shared";
import { ProjectExplorer } from "./project-explorer";
import { CopyEmail } from "./interactions";
import {
  categoryLabel,
  bio,
  expertise,
  featured,
  href,
  profile,
  projectSummary,
  projects,
  text,
  title,
  type Locale,
  type Project,
} from "@/lib/content";
import { JsonLd, siteUrl } from "@/lib/seo";

export { Home } from "./home";
import { Journey } from "./sections";
import { ContactForm } from "./contact-form";
import { Capabilities } from "./capabilities";
import { ProjectVideo } from "./project-video";

export function ProjectsPage({ locale: l }: { locale: Locale }) {
  return (
    <>
      <PageIntro
        locale={l}
        number="01"
        label={text(l, "الأعمال", "WORK")}
        title={text(l, "أفكار أخذت شكلها.", "Ideas, made tangible.")}
        description={text(
          l,
          "مواقع، متاجر، وتطبيقات. أرشيف متنوع من العمل والتجربة، يمكنك استكشافه بحسب التقنية.",
          "Websites, stores, and applications. A varied archive of work and experimentation, ready to explore by technology.",
        )}
      />
      <ProjectExplorer locale={l} />
    </>
  );
}

export function AboutPage({ locale: l }: { locale: Locale }) {
  return (
    <>
      <PageIntro
        locale={l}
        number="02"
        label={text(l, "عنّي", "ABOUT")}
        title={text(l, "فضول يقودني. وإتقان يعرّفني.", "Driven by curiosity. Defined by care.")}
      />
      <section className="container about-page">
        <div className="about-portrait">
          <img
            src="/media/portrait.webp"
            srcSet="/media/portrait-360.webp 360w, /media/portrait-720.webp 720w"
            sizes="(max-width: 767px) 90vw, 38vw"
            width="900"
            height="900"
            alt={text(l, "أنس ناصر", "Anas Naser")}
          />
          <div>
            <span>{text(l, "أنس ناصر", "ANAS NASER")}</span>
            <Pin />
            {text(l, "الرياض، السعودية", "Riyadh, Saudi Arabia")}
          </div>
        </div>
        <div className="about-story">
          <h2>{text(l, "أنس ناصر. وهذا عالمي.", "I'm Anas. Welcome to my corner of the web.")}</h2>
          <p className="large-copy">{bio(l)}</p>
          <p>
            {text(
              l,
              "أستمتع بالمساحة التي يلتقي فيها التفكير التجاري مع التنفيذ البرمجي. قد تكون البداية منصة تحتاج إلى واجهات واضحة، أو علامة تجارية تريد حضورًا رقميًا، أو متجرًا يحتاج إلى تجربة شراء أفضل.",
              "I enjoy turning business needs into thoughtful web experiences. It might start with a platform that needs clearer interfaces, a brand looking for a digital presence, or a store that needs a better shopping experience.",
            )}
          </p>
          <p>
            {text(
              l,
              "خبرتي تجمع بين React وNext.js وتخصيص WordPress والمتاجر الإلكترونية. أعمل بالتعاون مع المصممين والمسوقين، وأهتم بأن يظل الموقع قابلًا للاستخدام والتطوير بعد إطلاقه.",
              "My experience spans React, Next.js, WordPress customization, and e-commerce. I collaborate with designers and marketers, and focus on keeping websites useful and maintainable after launch.",
            )}
          </p>
          <ButtonLink to={href(l, "resume")} secondary>
            {text(l, "تعرّف على خبرتي", "Explore my experience")}
          </ButtonLink>
        </div>
      </section>
      <section className="container section-space">
        <SectionLabel number="01">{text(l, "رحلتي المهنية", "MY JOURNEY")}</SectionLabel>
        <Journey locale={l} />
      </section>
      <section className="container section-space process-section">
        <SectionLabel number="02">{text(l, "كيف أعمل؟", "HOW I WORK")}</SectionLabel>
        <div className="process-grid">
          {[
            [
              "01",
              text(l, "أفهم قبل أن أبني.", "Understand first."),
              text(
                l,
                "أبدأ بالهدف والجمهور ومتطلبات العمل، حتى يخدم كل قرار حاجة واضحة.",
                "I start with the goals, audience, and requirements so every decision serves a clear need.",
              ),
            ],
            [
              "02",
              text(l, "أحوّل الفكرة إلى نظام.", "Give the idea structure."),
              text(
                l,
                "أنظم الواجهات والمكونات والمحتوى، ثم أطوّر تجربة متجاوبة ومتسقة.",
                "I organize the interfaces, components, and content, then build a consistent experience across devices.",
              ),
            ],
            [
              "03",
              text(l, "أراجع التفاصيل.", "Follow through."),
              text(
                l,
                "أراجع الاستخدام والأداء والشاشات المختلفة، وأعالج المشكلات قبل التسليم.",
                "I test usability and performance across screen sizes, then resolve issues before delivery.",
              ),
            ],
          ].map(([n, h, p]) => (
            <article key={n}>
              <span className="mono">/{n}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
        <Education locale={l} />
      </section>
    </>
  );
}

export function Education({ locale: l }: { locale: Locale }) {
  return (
    <div className="education">
      <span className="mono">2021</span>
      <div>
        <h3>{text(l, "بكالوريوس تقنية المعلومات", "Bachelor of Information Technology")}</h3>
        <p>
          {text(
            l,
            "الجامعة الوطنية اليمنية · تعز، اليمن",
            "The National University of Yemen · Taiz, Yemen",
          )}
        </p>
      </div>
      <div className="education-languages">
        <span>{text(l, "العربية — اللغة الأم", "Arabic — Native")}</span>
        <span>
          {text(
            l,
            "الإنجليزية — مستوى مهني في العمل",
            "English — Professional working proficiency",
          )}
        </span>
      </div>
    </div>
  );
}

export function ExpertisePage({ locale: l }: { locale: Locale }) {
  return (
    <>
      <PageIntro
        locale={l}
        number="03"
        label={text(l, "التخصصات", "EXPERTISE")}
        title={text(l, "منطق المطوّر. عين المصمّم.", "An engineer's logic. A designer's eye.")}
        description={text(
          l,
          "من تطوير الواجهات والمتاجر إلى تحسين الأداء وربط الخدمات. هذه التخصصات التي أعمل بها.",
          "From interfaces and online stores to performance and integrations. These are the areas I work in.",
        )}
      />
      <section className="container expertise-page">
        <Capabilities locale={l} />
        <div className="tools-note">
          <span className="code-bracket">&lt;/&gt;</span>
          <div>
            <h3>{text(l, "أدوات أخرى أستخدمها", "Also in the toolkit")}</h3>
            <p>
              {text(
                l,
                "Node.js وExpress وMySQL وMongoDB، مع استخدام أدوات الذكاء الاصطناعي للمساعدة في البرمجة وتصحيح الأخطاء وتسريع الإنجاز.",
                "Node.js, Express, MySQL, and MongoDB, alongside AI-assisted coding, debugging, and delivery workflows.",
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export function ResumePage({ locale: l }: { locale: Locale }) {
  return (
    <>
      <PageIntro
        locale={l}
        number="04"
        label={text(l, "السيرة الذاتية", "RESUME")}
        title={text(l, "الخبرة، بصورة واضحة.", "The experience. At a glance.")}
        description={title(l)}
      />
      <section className="container resume-page">
        <div className="resume-summary">
          <div>
            <h2>{text(l, "أنس ناصر", "Anas Naser")}</h2>
            <p>{bio(l)}</p>
            <span>
              <Pin /> {text(l, "الرياض، المملكة العربية السعودية", "Riyadh, Saudi Arabia")}
            </span>
          </div>
          <div className="resume-downloads">
            <ButtonLink to="/resume/Anas_Naser_CV_AR.pdf" download>
              {text(l, "السيرة الذاتية العربية", "Arabic resume")} <small>PDF</small>
            </ButtonLink>
            <ButtonLink to="/resume/Anas_Naser_CV_EN.pdf" download secondary>
              {text(l, "السيرة الذاتية الإنجليزية", "English resume")} <small>PDF</small>
            </ButtonLink>
          </div>
        </div>
        <SectionLabel number="01">
          {text(l, "الخبرات العملية", "PROFESSIONAL EXPERIENCE")}
        </SectionLabel>
        <Journey locale={l} />
        <div className="resume-section">
          <SectionLabel number="02">{text(l, "المهارات التقنية", "TECHNICAL SKILLS")}</SectionLabel>
          {expertise.map((e) => (
            <div className="resume-skills" key={e.n}>
              <h3>{e.name[l]}</h3>
              <div className="tags" dir="ltr">
                {e.tools.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="resume-section">
          <SectionLabel number="03">
            {text(l, "التعليم واللغات", "EDUCATION & LANGUAGES")}
          </SectionLabel>
          <Education locale={l} />
        </div>
        <div className="resume-section">
          <SectionLabel number="04">{text(l, "أعمال مختارة", "SELECTED PROJECTS")}</SectionLabel>
          <div className="resume-projects">
            {featured.slice(0, 4).map((p) => (
              <Link key={p.slug} href={href(l, `projects/${p.slug}`)}>
                <strong>{p.name[l]}</strong>
                <p>{projectSummary(p, l)}</p>
                <Arrow />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function ContactPage({ locale: l }: { locale: Locale }) {
  return (
    <>
      <PageIntro
        locale={l}
        number="05"
        label={text(l, "التواصل", "CONTACT")}
        title={text(l, "كل تجربة جيدة تبدأ بمحادثة.", "Good things start with a conversation.")}
        description={text(
          l,
          "لديك فرصة عمل، أو مشروع يستحق العناية؟ يسعدني أن أسمع منك.",
          "Have an opportunity or a project that deserves care? I'd love to hear about it.",
        )}
      />
      <section className="container contact-page">
        <div className="contact-main">
          <SectionLabel number="01">{text(l, "اكتب لي مباشرة", "DROP ME A LINE")}</SectionLabel>
          <a className="contact-email" href={`mailto:${profile.email}`} dir="ltr">
            anas.coding404
            <br />
            @gmail.com
            <Arrow />
          </a>
          <CopyEmail locale={l} />
          <p>
            <Pin />
            {text(l, "مقيم في الرياض، المملكة العربية السعودية", "Based in Riyadh, Saudi Arabia")}
          </p>
        </div>
        <div className="contact-options">
          {[
            [text(l, "اتصال مباشر", "Call me"), "+966 57 398 4094", `tel:${profile.phone}`],
            [text(l, "لنتواصل مهنيًا", "Connect professionally"), "LinkedIn", profile.linkedin],
            [text(l, "استكشف الكود", "Explore the code"), "GitHub", profile.github],
            [
              text(l, "راسلني عبر واتساب", "Message on WhatsApp"),
              "WhatsApp · +967 730 110 440",
              profile.whatsapp,
            ],
            [text(l, "على يوتيوب", "On YouTube"), "@AnasCodex", profile.youtube],
          ].map(([label, name, url]) => (
            <a
              key={name}
              href={url}
              {...(url.startsWith("https") ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <span>{label}</span>
              <strong dir="ltr">{name}</strong>
              <Arrow />
            </a>
          ))}
        </div>
      </section>
      <section className="container standalone-form">
        <ContactForm locale={l} />
      </section>
      <section className="container contact-resume">
        <span>
          {text(l, "تبحث عن ملخص سريع لخبرتي؟", "Looking for a quick overview of my experience?")}
        </span>
        <Link className="text-link" href={href(l, "resume")}>
          {text(l, "تصفّح السيرة الذاتية", "Read my resume")}
          <Arrow />
        </Link>
      </section>
    </>
  );
}

export function ProjectDetail({ project: p, locale: l }: { project: Project; locale: Locale }) {
  const index = projects.findIndex((project) => project.slug === p.slug);
  const next = projects[(index + 1) % projects.length];
  const documented = ["motion-lab", "theqa", "kripton", "emad"].includes(p.slug);
  return (
    <>
      <div className="container project-detail-intro">
        <div className="breadcrumb">
          <Link href={href(l)}>{text(l, "الرئيسية", "Home")}</Link>
          <span>/</span>
          <Link href={href(l, "projects")}>{text(l, "الأعمال", "Work")}</Link>
          <span>/</span>
          <span>{p.name[l]}</span>
        </div>
        <div className="project-detail-title">
          <div>
            <span className="eyebrow" dir="ltr">
              {p.category} / {text(l, "من أعمالي", "SELECTED PROJECT")}
            </span>
            <h1>{p.name[l]}</h1>
          </div>
          <div className="project-detail-actions">
            {!!p.videos?.length && (
              <a className="text-link" href="#video">
                <Play size={16} aria-hidden="true" />
                {text(l, "شاهد تسجيل المشروع", "Watch the recording")}
              </a>
            )}
            {p.url && (
              <a className="button button-secondary" href={p.url} target="_blank" rel="noreferrer">
                {text(l, "زيارة الموقع", "Visit website")}
                <Arrow />
              </a>
            )}
            {p.repository && (
              <a className="text-link" href={p.repository} target="_blank" rel="noreferrer">
                {text(l, "استعرض الكود على GitHub", "View code on GitHub")}
                <Arrow />
              </a>
            )}
          </div>
        </div>
        <p className="project-lead">{projectSummary(p, l)}</p>
        <div className="project-facts">
          <div>
            <span>{text(l, "التخصص", "DISCIPLINE")}</span>
            <strong>{categoryLabel(p.category, l)}</strong>
          </div>
          <div>
            <span>{text(l, "الدور", "MY ROLE")}</span>
            <strong>
              {p.slug === "jeetroom"
                ? text(l, "مطوّر Next.js", "Next.js Developer")
                : documented
                  ? text(l, "تطوير الموقع بالكامل", "Complete website development")
                  : text(
                      l,
                      "تطوير الواجهات · أرشيف الأعمال",
                      "Interface development · Work archive",
                    )}
            </strong>
          </div>
          <div>
            <span>{text(l, "المحتوى", "ON DISPLAY")}</span>
            <strong>
              {p.videos?.length
                ? text(l, "صور وتسجيل للمشروع", "Screenshots & walkthrough")
                : text(l, "صور من المشروع", "Project screenshots")}
            </strong>
          </div>
        </div>
      </div>
      <section
        className={`container project-gallery project-${p.slug}`}
        aria-label={text(l, "صور وتسجيلات المشروع", "Project images and recordings")}
      >
        <figure className="project-hero-capture">
          <div className="browser-dots" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>{p.name[l]}</span>
          </div>
          <ProjectPicture
            project={p}
            locale={l}
            priority
            transition
            index={p.assets.length > 1 ? 1 : 0}
          />
        </figure>
        <div className="project-story">
          <SectionLabel number="01">
            {text(
              l,
              documented ? "عن التنفيذ" : "عن هذا العمل",
              documented ? "THE IMPLEMENTATION" : "ABOUT THIS WORK",
            )}
          </SectionLabel>
          <div>
            <h2>
              {text(
                l,
                documented ? "من هوية المشروع إلى واجهة حقيقية." : "التفاصيل كما ظهرت في العمل.",
                documented
                  ? "From a brand to a working website."
                  : "The work, in its original detail.",
              )}
            </h2>
            <p>{projectSummary(p, l)}</p>
            <p>
              {p.slug === "jeetroom"
                ? text(
                    l,
                    "شمل العمل تطبيقات ويب ديناميكية، والتكامل مع واجهات API وخدمات خارجية، وتحسين أداء الواجهات والتهيئة لمحركات البحث. فترة التعاقد: أبريل إلى أكتوبر ٢٠٢٤.",
                    "The contract covered dynamic web applications, API and third-party integrations, front-end performance, and SEO. Contract period: April to October 2024.",
                  )
                : documented
                  ? text(
                      l,
                      "تولّيت التطوير البرمجي للموقع. توثّق الصور والتسجيلات المتاحة تجربة المشروع وقت تنفيذها، وقد تختلف عن نسخته الحالية.",
                      "I was responsible for developing the website. The screenshots and any recordings show the project as it was captured; the live site may have changed since.",
                    )
                  : text(
                      l,
                      "تعرض هذه الصفحة واجهات المشروع كما ظهرت وقت توثيقها. يمكنك استكشاف تفاصيلها في الصور والتسجيلات المتاحة أدناه.",
                      "This page presents the project as it was captured. Explore its interfaces in the screenshots and any recordings below.",
                    )}
            </p>
          </div>
        </div>
        {p.videos?.map((video, i) => (
          <figure
            className="project-recording"
            id={i === 0 ? "video" : `video-${i + 1}`}
            key={video.src}
          >
            <figcaption className="capture-label">
              <span>{text(l, "المشروع أثناء الاستخدام", "THE PROJECT IN ACTION")}</span>
              <span>{text(l, "تسجيل كامل · دون صوت", "Full recording · No audio")}</span>
            </figcaption>
            <ProjectVideo video={video} name={p.name[l]} locale={l} />
          </figure>
        ))}
        {p.assets.map((a, i) => (
          <figure className="full-capture" key={a.base}>
            <div className="capture-label">
              <span className="mono">
                {text(l, "لقطة", "VIEW")} / {String(i + 1).padStart(2, "0")}
              </span>
              <a href={`${a.base}-full.webp`} target="_blank" rel="noreferrer">
                {text(l, "فتح الصورة كاملة", "Open full image")} ↗
              </a>
            </div>
            <ProjectPicture project={p} locale={l} full index={i} />
          </figure>
        ))}
      </section>
      <div className="container next-project">
        <span>{text(l, "العمل التالي", "NEXT PROJECT")}</span>
        <Link href={href(l, `projects/${next.slug}`)}>
          <h2>{next.name[l]}</h2>
          <Arrow />
        </Link>
        <Link className="text-link" href={href(l, "projects")}>
          {text(l, "العودة إلى جميع الأعمال", "Back to all work")}
        </Link>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: p.name[l],
          description: projectSummary(p, l),
          url: siteUrl + href(l, `projects/${p.slug}`),
          creator: { "@id": `${siteUrl}/#anas` },
          image: siteUrl + p.assets[0].base + "-1120.webp",
          inLanguage: l,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { name: text(l, "الرئيسية", "Home"), item: siteUrl + href(l) },
            { name: text(l, "الأعمال", "Work"), item: siteUrl + href(l, "projects") },
            { name: p.name[l], item: siteUrl + href(l, `projects/${p.slug}`) },
          ].map((item, i) => ({ "@type": "ListItem", position: i + 1, ...item })),
        }}
      />
    </>
  );
}
