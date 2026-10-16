import { ExpertisePage } from "@/components/pages";
import { metadata as pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("en", "Expertise", "expertise");
export default function Page() {
  return <ExpertisePage locale="en" />;
}
