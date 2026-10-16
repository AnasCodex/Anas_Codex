"use client";
import { useId, useRef, useState, type FormEvent } from "react";
import { profile, text, type Locale } from "@/lib/i18n";
import { Arrow } from "./icons";

const config = {
  service: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  template: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};
const configured = Boolean(config.service && config.template && config.publicKey);
const fields = ["user_name", "user_email", "subject", "message"] as const;
type Field = (typeof fields)[number];
export function ContactForm({ locale: l }: { locale: Locale }) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const sending = useRef(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [notice, setNotice] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const labels: Record<Field, string> = {
    user_name: text(l, "الاسم الكامل", "Full name"),
    user_email: text(l, "البريد الإلكتروني", "Email address"),
    subject: text(l, "الموضوع", "Subject"),
    message: text(l, "الرسالة", "Your message"),
  };
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = formRef.current;
    if (!form || sending.current) return;
    const data = new FormData(form);
    const next: Partial<Record<Field, string>> = {};
    fields.forEach((field) => {
      const value = String(data.get(field) || "").trim();
      if (!value) next[field] = text(l, "يرجى تعبئة هذا الحقل.", "Please fill in this field.");
      else if (field === "user_email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        next[field] = text(l, "اكتب بريدًا إلكترونيًا صحيحًا.", "Enter a valid email address.");
      else if (field === "message" && value.length < 10)
        next[field] = text(
          l,
          "أضف تفاصيل أكثر؛ ١٠ أحرف على الأقل.",
          "Add a little detail; at least 10 characters.",
        );
    });
    setErrors(next);
    setStatus("idle");
    setNotice("");
    const first = fields.find((field) => next[field]);
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (data.get("company_website")) {
      setStatus("error");
      setNotice(
        text(
          l,
          "تعذّر إرسال الرسالة. استخدم البريد المباشر أدناه.",
          "Unable to send. Please use the direct email below.",
        ),
      );
      return;
    }
    if (!config.service || !config.template || !config.publicKey) {
      setStatus("error");
      setNotice(
        text(
          l,
          "الإرسال غير مفعّل بعد. يمكنك مراسلتي مباشرة عبر البريد.",
          "Sending is not enabled yet. Please contact me directly by email.",
        ),
      );
      return;
    }
    sending.current = true;
    setStatus("sending");
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.sendForm(config.service, config.template, form, {
        publicKey: config.publicKey,
        limitRate: { id: "anas-contact", throttle: 30000 },
      });
      setStatus("success");
      setNotice(
        text(
          l,
          "أُرسلت رسالتك بنجاح. شكرًا لتواصلك!",
          "Your message was sent. Thank you for reaching out!",
        ),
      );
      form.reset();
    } catch {
      setStatus("error");
      setNotice(
        text(
          l,
          "لم تُرسل الرسالة. حاول مجددًا بعد قليل أو استخدم البريد المباشر؛ بياناتك محفوظة هنا.",
          "Your message could not be sent. Try again shortly or use direct email. Your message is still here.",
        ),
      );
    } finally {
      sending.current = false;
    }
  }
  return (
    <form
      ref={formRef}
      className="contact-form"
      noValidate
      onSubmit={submit}
      aria-busy={status === "sending"}
    >
      <div className="form-topline">
        <span className="mono">{text(l, "لنتواصل / 01—04", "LET’S CONNECT / 01—04")}</span>
        <span>{text(l, "جميع الحقول مطلوبة", "All fields required")}</span>
      </div>
      <div className="form-grid">
        {fields.map((field, i) => (
          <div
            className={`form-field ${field === "message" || field === "subject" ? "field-wide" : ""}`}
            key={field}
          >
            <label htmlFor={`${id}-${field}`}>
              <span className="mono">0{i + 1}</span>
              {labels[field]}
            </label>
            {field === "message" ? (
              <textarea
                id={`${id}-${field}`}
                name={field}
                rows={4}
                maxLength={5000}
                minLength={10}
                required
                aria-invalid={Boolean(errors[field])}
                aria-describedby={errors[field] ? `${id}-${field}-error` : undefined}
              />
            ) : (
              <input
                id={`${id}-${field}`}
                name={field}
                type={field === "user_email" ? "email" : "text"}
                autoComplete={
                  field === "user_email" ? "email" : field === "user_name" ? "name" : "off"
                }
                dir={field === "user_email" ? "ltr" : undefined}
                maxLength={field === "subject" ? 200 : 150}
                required
                aria-invalid={Boolean(errors[field])}
                aria-describedby={errors[field] ? `${id}-${field}-error` : undefined}
              />
            )}
            {errors[field] && (
              <p className="field-error" id={`${id}-${field}-error`}>
                {errors[field]}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${id}-website`}>
          {text(l, "اترك هذا الحقل فارغًا", "Leave this field empty")}
        </label>
        <input id={`${id}-website`} name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
      {!configured && (
        <p className="form-setup">
          {text(
            l,
            "الإرسال عبر النموذج غير متاح حاليًا. يمكنك التواصل عبر البريد:",
            "The form is currently unavailable. You can reach me by email:",
          )}{" "}
          <a href={`mailto:${profile.email}`} dir="ltr">
            {profile.email}
          </a>
        </p>
      )}
      <div className={`form-notice ${status}`} role="status" aria-live="polite" aria-atomic="true">
        {notice}
      </div>
      <div className="form-bottom">
        <button className="button" type="submit" disabled={status === "sending"}>
          {status === "sending"
            ? text(l, "جارٍ الإرسال…", "Sending…")
            : text(l, "أرسل الرسالة", "Send message")}
          <Arrow />
        </button>
        <p>
          {text(
            l,
            "تُستخدم بياناتك للرد على رسالتك فقط.",
            "Your details are used only to reply to your message.",
          )}
        </p>
      </div>
    </form>
  );
}
