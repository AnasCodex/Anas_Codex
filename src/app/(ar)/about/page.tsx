import { AboutPage } from "@/components/pages";
import { metadata as pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("ar", "عن أنس ناصر", "about");
export default function Page() {
  return <AboutPage locale="ar" />;
}
