import type { LucideIcon } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';

export type ProjectDetail = {
  name: string;
  client: string;
  website: string;
  industry: string;
  role: string;
  description: string;
  responsibilities: string[];
  technologies: Record<string, string[]>;
  highlights: string[];
};

type ProjectDetailFile = {
  project: ProjectDetail;
};

export type ProjectCard = {
  id: string;
  slug: string;
  title: string;
  category: string;
  role: string;
  description: string;
  image: string;
  images: string[];
  tags: string[];
  tech: string[];
  technologies: Record<string, string[]>;
  highlights: string[];
  responsibilities: string[];
  links: { live: string };
  icon: LucideIcon;
  client: string;
};

export const technologyCategoryLabels: Record<string, string> = {
  cms: 'CMS',
  ecommerce: 'Ecommerce',
  frontend: 'Frontend',
  backend: 'Backend',
  infrastructure: 'Infrastructure',
  media: 'Media',
  features: 'Features',
};

const detailModules = import.meta.glob<ProjectDetailFile>(
  '../assets/**/project.detail.json',
  { eager: true, import: 'default' },
);

const imageModules = import.meta.glob<string>('../assets/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});

function projectSlugFromPath(path: string): string {
  const match = path.match(/assets\/([^/]+)\//);
  return match?.[1] ?? '';
}

function flattenTechnologies(technologies: Record<string, string[]>): string[] {
  return [...new Set(Object.values(technologies).flat())];
}

const imagesBySlug = new Map<string, string[]>();

for (const [path, url] of Object.entries(imageModules)) {
  const slug = projectSlugFromPath(path);
  if (!slug) continue;
  const images = imagesBySlug.get(slug) ?? [];
  images.push(url);
  imagesBySlug.set(slug, images);
}

for (const images of imagesBySlug.values()) {
  images.sort((a, b) => a.localeCompare(b));
}

export const projects: ProjectCard[] = Object.entries(detailModules)
  .map(([path, { project }]) => {
    const slug = projectSlugFromPath(path);
    const images = imagesBySlug.get(slug) ?? [];

    return {
      id: slug,
      slug,
      title: project.name,
      category: project.industry,
      role: project.role,
      description: project.description,
      image: images[0] ?? '',
      images,
      tags: project.highlights,
      tech: flattenTechnologies(project.technologies),
      technologies: project.technologies,
      highlights: project.highlights,
      responsibilities: project.responsibilities,
      links: { live: project.website },
      icon: ShoppingCart,
      client: project.client,
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

export function getProjectBySlug(slug: string): ProjectCard | undefined {
  return projects.find((p) => p.slug === slug);
}
