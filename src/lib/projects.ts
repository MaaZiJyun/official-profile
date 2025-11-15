export type Project = {
    title: string;
    href: string;
    supervisor: string;
    date: string;
    img: string;
    intro: string;
    sections: Section[];
    slug: string;
};

export type Section = {
    image: string;
    subtitle: string;
    description: string;
}

function slugify(title: string) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

import rawData from '@/data/projects.json';

const raw = rawData as Array<Omit<Project, 'slug'>>;

export const projects: Project[] = raw.map((p) => ({ ...p, slug: slugify(p.title) }));

export function getProjectBySlug(slug: string) {
    return projects.find((p) => p.slug === slug) ?? null;
}

export function getAllProjectSlugs() {
    return projects.map((p) => p.slug);
}
