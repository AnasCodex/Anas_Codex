import { AboutPage } from "@/components/pages";
import { metadata as pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("en", "About Anas Naser", "about");
export default function Page() {
  return <AboutPage locale="en" />;
}
