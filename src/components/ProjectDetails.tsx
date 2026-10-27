"use client";

import Link from "next/link";
import SlideShow from "@/components/SlideShow";
import { useLanguage } from "@/components/LanguageProvider";
import { localizeProject, type Project } from "@/lib/projects";

export default function ProjectDetails({ project }: { project: Project | null }) {
  const { language, t } = useLanguage();

  if (!project) {
    return (
      <div className="mt-8">
        <div className="text-xl font-semibold">{t("projectNotFound")}</div>
        <div className="mt-4">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            {t("backHome")}
          </Link>
        </div>
      </div>
    );
  }

  const localizedProject = localizeProject(project, language);

  return (
    <div className="mt-4">
      <div className="rounded-lg p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-2xl font-semibold">
              {localizedProject.title}
            </div>
            <div className="mt-1 text-sm text-zinc-500">
              {t("supervisor")}: {localizedProject.supervisor}
            </div>
          </div>
          <div className="shrink-0 text-sm text-zinc-500">
            {localizedProject.date}
          </div>
        </div>

        <div className="mt-6">
          <SlideShow
            sections={localizedProject.sections ?? []}
            link={localizedProject.href}
          />
        </div>
      </div>
    </div>
  );
}
