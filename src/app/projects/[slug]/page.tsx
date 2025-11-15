import Link from "next/link";
import { getProjectBySlug, projects } from "@/lib/projects";
import SlideShow from "@/components/SlideShow";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = (await params) as { slug: string };
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="mt-8">
        <div className="text-xl font-semibold">Project not found</div>
        <div className="mt-4">
          <Link
            href="/projects"
            className="text-sm text-blue-600 hover:underline"
          >
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-2xl font-semibold">{project.title}</div>
            <div className="mt-1 text-sm text-zinc-500">
              Supervisor: {project.supervisor}
            </div>
          </div>
          <div className="text-sm text-zinc-500">{project.date}</div>
        </div>

        <div className="mt-6">
          <SlideShow sections={project.sections ?? []} />

          <div className="mt-6 text-justify">
            <div className="mt-4">
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="text-red-600 hover:underline"
              >
                Visit the project website for more details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
