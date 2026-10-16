import { ContactPage } from "@/components/pages";
import { metadata as pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("ar", "لنتواصل", "contact");
export default function Page() {
  return <ContactPage locale="ar" />;
}
