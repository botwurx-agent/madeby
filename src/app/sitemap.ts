import type { MetadataRoute } from 'next';
import { SITE_URL } from '../data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/work'].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));
}
