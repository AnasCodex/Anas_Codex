import { ExpertisePage } from "@/components/pages";
import { metadata as pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("ar", "الخبرات والتخصصات", "expertise");
export default function Page() {
  return <ExpertisePage locale="ar" />;
}
