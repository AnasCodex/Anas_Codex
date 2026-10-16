import { ProjectsPage } from "@/components/pages";
import { metadata as pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("en", "Work & Projects", "projects");
export default function Page() {
  return <ProjectsPage locale="en" />;
}
