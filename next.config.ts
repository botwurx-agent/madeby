import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Pages from the previous version of the site.
  async redirects() {
    return [
      { source: '/work/:slug', destination: '/work', permanent: true },
    ];
  },
};

export default nextConfig;
