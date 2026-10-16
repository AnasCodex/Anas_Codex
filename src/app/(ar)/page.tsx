import { Home } from "@/components/pages";
import { metadata as pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("ar", "مطوّر مواقع ومتاجر إلكترونية في الرياض", "");
export default function Page() {
  return <Home locale="ar" />;
}
