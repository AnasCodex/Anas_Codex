import { notFound } from "next/navigation";
import { projects, projectSummary } from "@/lib/content";
import { metadata } from "@/lib/seo";
import { ProjectDetail } from "@/components/pages";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) return {};
  return metadata("ar", p.name.ar, "projects/" + slug, projectSummary(p, "ar"));
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return <ProjectDetail project={p} locale="ar" />;
}
