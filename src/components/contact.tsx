import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download, FileText, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "./contact-form";
import { CopyEmail } from "./interactions";
import { PageIntro, SectionLabel } from "./shared";
import { availability } from "@/lib/content";
import { href, profile, text, type Locale } from "@/lib/i18n";
import contactIcons from "@/data/contact-icons.json";
import "@/app/contact.css";

type ChannelIcon = keyof typeof contactIcons | "phone";
type Channel = { icon: ChannelIcon; url: string; name: string; label?: string };

function ContactMark({ icon }: { icon: ChannelIcon }) {
  if (icon === "phone") return <Phone size={18} aria-hidden="true" />;
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {contactIcons[icon].paths.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}

function ContactChannels({ channels }: { channels: Channel[] }) {
  return (
    <ul className="contact-channels" role="list">
      {channels.map(({ icon, url, name, label }) => (
        <li key={icon}>
          <a
            className="contact-channel"
            href={url}
            target={icon === "phone" ? undefined : "_blank"}
            rel={icon === "phone" ? undefined : "noreferrer"}
          >
            <span className="contact-tile-icon">
              <ContactMark icon={icon} />
            </span>
            <span className="contact-channel-copy">
              {label && <span>{label}</span>}
              <strong>
                <bdi dir="ltr">{name}</bdi>
              </strong>
            </span>
            <ArrowUpRight className="contact-outbound" size={16} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function ContactEmail() {
  return (
    <a className="contact-email-link" href={`mailto:${profile.email}`}>
      <span className="contact-tile-icon">
        <Mail size={20} aria-hidden="true" />
      </span>
      <bdi dir="ltr">{profile.email}</bdi>
      <ArrowUpRight className="contact-outbound" size={18} aria-hidden="true" />
    </a>
  );
}

function ContactAvailability({ locale }: { locale: Locale }) {
  return (
    <p className="contact-availability">
      <span className="status-dot" aria-hidden="true" />
      {availability(locale)}
    </p>
  );
}

export function HomeContact({ locale: l }: { locale: Locale }) {
  return (
    <section className="contact-section" id="contact" aria-labelledby="home-contact-heading">
      <div className="container contact-shell">
        <div className="contact-headline">
          <SectionLabel number="06">
            {text(l, "الفصل القادم، معك", "THE NEXT CHAPTER IS OURS")}
          </SectionLabel>
          <h2 id="home-contact-heading">
            {text(l, "لنصنع", "LET’S MAKE")}
            <span>{text(l, "شيئًا يستحق.", "IT MATTER.")}</span>
          </h2>
          <ArrowUpRight className="contact-headline-mark" strokeWidth={1} aria-hidden="true" />
        </div>
        <div className="contact-layout">
          <div className="contact-rail">
            <div className="contact-direct-card">
              <ContactAvailability locale={l} />
              <p className="contact-invitation">
                {text(
                  l,
                  "فكرة طموحة، مشروع جديد، أو فرصة عمل.\nأخبرني بما تفكر فيه، ولنبدأ من هناك.",
                  "An ambitious idea, a new project, or an opportunity.\nTell me what you have in mind. We’ll start there.",
                )}
              </p>
              <ContactEmail />
            </div>
            <ContactChannels
              channels={[
                { icon: "linkedin", name: "LinkedIn", url: profile.linkedin },
                { icon: "github", name: "GitHub", url: profile.github },
                { icon: "whatsapp", name: "WhatsApp", url: profile.whatsapp },
                { icon: "instagram", name: "Instagram · @anascodex", url: profile.instagram },
              ]}
            />
            <a
              className="contact-resume-link"
              href={`/resume/Anas_Naser_CV_${l.toUpperCase()}.pdf`}
              download
            >
              <span className="contact-tile-icon">
                <FileText size={18} aria-hidden="true" />
              </span>
              <span>{text(l, "تحميل السيرة الذاتية", "Download resume")}</span>
              <Download className="contact-outbound" size={18} aria-hidden="true" />
            </a>
          </div>
          <ContactForm locale={l} />
        </div>
      </div>
    </section>
  );
}

export function ContactPage({ locale: l }: { locale: Locale }) {
  return (
    <div className="contact-page">
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
      <div className="container contact-shell">
        <div className="contact-layout">
          <div className="contact-rail">
            <div className="contact-direct-card">
              <SectionLabel number="01">{text(l, "اكتب لي مباشرة", "DROP ME A LINE")}</SectionLabel>
              <ContactEmail />
              <CopyEmail locale={l} />
              <ContactAvailability locale={l} />
              <p className="contact-location">
                <MapPin size={15} aria-hidden="true" />
                {text(
                  l,
                  "مقيم في الرياض، المملكة العربية السعودية",
                  "Based in Riyadh, Saudi Arabia",
                )}
              </p>
            </div>
            <ContactChannels
              channels={[
                {
                  icon: "phone",
                  label: text(l, "اتصال مباشر", "Call me"),
                  name: "+966 57 398 4094",
                  url: `tel:${profile.phone}`,
                },
                {
                  icon: "linkedin",
                  label: text(l, "لنتواصل مهنيًا", "Connect professionally"),
                  name: "LinkedIn",
                  url: profile.linkedin,
                },
                {
                  icon: "github",
                  label: text(l, "استكشف الكود", "Explore the code"),
                  name: "GitHub",
                  url: profile.github,
                },
                {
                  icon: "whatsapp",
                  label: text(l, "راسلني عبر واتساب", "Message on WhatsApp"),
                  name: `WhatsApp · ${profile.whatsappNumber}`,
                  url: profile.whatsapp,
                },
                {
                  icon: "youtube",
                  label: text(l, "على يوتيوب", "On YouTube"),
                  name: "@AnasCodex",
                  url: profile.youtube,
                },
                {
                  icon: "instagram",
                  label: "Instagram",
                  name: "@anascodex",
                  url: profile.instagram,
                },
              ]}
            />
          </div>
          <ContactForm locale={l} />
        </div>
        <div className="contact-resume">
          <span>
            {text(l, "تبحث عن ملخص سريع لخبرتي؟", "Looking for a quick overview of my experience?")}
          </span>
          <Link className="contact-resume-link" href={href(l, "resume")}>
            <span className="contact-tile-icon">
              <FileText size={18} aria-hidden="true" />
            </span>
            <span>{text(l, "تصفّح السيرة الذاتية", "Read my resume")}</span>
            <ArrowRight className="contact-outbound contact-forward" size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
