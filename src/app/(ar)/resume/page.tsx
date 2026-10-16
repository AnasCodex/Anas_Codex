import { ResumePage } from "@/components/pages";
import { metadata as pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("ar", "السيرة الذاتية", "resume");
export default function Page() {
  return <ResumePage locale="ar" />;
}
