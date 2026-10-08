import type { MetadataRoute } from 'next';
import { PROJECTS } from '../data/projects';
import { SITE_URL } from '../data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/work', '/about'].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));
  const projects = PROJECTS.map((p) => ({
    url: `${SITE_URL}/work/${p.slug}`,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
    ...(p.img && { images: [`${SITE_URL}${p.img.src}`] }),
  }));
  return [...pages, ...projects];
}
