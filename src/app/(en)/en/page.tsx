import { Home } from "@/components/home";
import { metadata as pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("en", "Web & E-Commerce Developer in Riyadh", "");
export default function Page() {
  return <Home locale="en" />;
}
