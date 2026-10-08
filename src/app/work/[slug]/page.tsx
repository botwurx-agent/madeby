import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProject, PROJECTS, titleCase } from '../../../data/projects';
import ProjectDetail from '../../../views/ProjectDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const title = `${titleCase(project.title)} — ${titleCase(project.client)} ${project.category}`;
  const url = `/work/${project.slug}`;
  return {
    title,
    description: project.desc,
    alternates: { canonical: url },
    openGraph: {
      type: 'video.other',
      url,
      title,
      description: project.desc,
      ...(project.img && {
        images: [{ url: project.img.src, width: project.img.width, height: project.img.height, alt: title }],
      }),
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
