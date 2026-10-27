import { getProjectBySlug, projects } from "@/lib/projects";
import ProjectDetails from "@/components/ProjectDetails";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = (await params) as { slug: string };
  const project = getProjectBySlug(slug);

  return <ProjectDetails project={project} />;
}
