import { ResumePage } from "@/components/pages";
import { metadata as pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("en", "Resume", "resume");
export default function Page() {
  return <ResumePage locale="en" />;
}
