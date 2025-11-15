import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
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
            <div className="text-zinc-700">{p.intro}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
