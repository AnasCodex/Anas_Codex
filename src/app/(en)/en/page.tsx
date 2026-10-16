import { Home } from "@/components/pages";
import { metadata as pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("en", "Web & E-Commerce Developer in Riyadh", "");
export default function Page() {
  return <Home locale="en" />;
}
