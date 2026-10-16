import { ProjectsPage } from "@/components/pages";
import { metadata as pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("ar", "الأعمال والمشاريع", "projects");
export default function Page() {
  return <ProjectsPage locale="ar" />;
}
