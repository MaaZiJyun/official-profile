import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <section>
      <div className="p-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-700">
            Projects
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
            A Collection List of My Projects.
          </h1>
          <p className="text-sm text-zinc-600 md:text-lg">
            Those are some projects that I have worked on, including coursework
            projects, research projects during my Master’s and Bachelor’s
            degree, and projects in industry.
          </p>
        </div>
      </div>
      <div className="mt-4">
        {projects.map((p, i) => (
          <Link href={`/projects/${p.slug}`} key={i}>
            <div className="rounded-lg hover:cursor-pointer py-3 px-4 hover:scale-[1.05] hover:shadow-xl transition-transform group">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xl font-semibold hover:underline">
                    {p.title}
                  </div>
                </div>
                <div className="text-sm text-zinc-500">{p.date}</div>
              </div>
              <div className="text-sm text-zinc-700">{p.intro}</div>
              <div className="mt-2">
                <p className="text-sm text-red-600 underline">More Details</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
