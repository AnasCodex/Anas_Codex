export type Locale = "ar" | "en";
export const categoryLabel = (category: string, locale: Locale) =>
  category === "Other" ? (locale === "ar" ? "تقنيات أخرى" : "Other") : category;
export const text = (locale: Locale, ar: string, en: string) => (locale === "ar" ? ar : en);
export const href = (locale: Locale, path = "") =>
  `${locale === "en" ? "/en" : ""}/${path}${path && !path.endsWith("/") ? "/" : ""}`;
const whatsappNumber = "730110440";
export const profile = {
  email: "anas.coding404@gmail.com",
  phone: "+966573984094",
  linkedin: "https://www.linkedin.com/in/anascodex",
  github: "https://github.com/AnasCodex",
  whatsappNumber,
  whatsapp: `https://wa.me/967${whatsappNumber}`,
  youtube: "https://www.youtube.com/@AnasCodex",
  instagram: "https://www.instagram.com/anascodex/",
};
