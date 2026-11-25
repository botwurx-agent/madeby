export interface NavLink {
  label: string;
  /** Route path, or `/#id` for a section on the home page. */
  to: string;
  /** Home-page section ids that light this link up while in view. */
  sections: string[];
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Work', to: '/#work', sections: ['work'] },
  { label: 'About Us', to: '/#about', sections: ['about', 'ethos', 'services'] },
  { label: 'Contact', to: '/#contact', sections: ['contact'] },
];

/** Where the pulsing "Live" link in the nav goes (a stream, Instagram live, a BTS feed…). */
export const LIVE_URL = 'https://instagram.com';

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Vimeo', href: 'https://vimeo.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
];

export const CONTACT_EMAIL = 'hello@madeby.studio';

/** Brand film in the hero. Drop an MP4 URL (or /public path) here; stills crossfade until then. */
export const HERO_VIDEO: string | undefined = undefined;

export const ETHOS =
  'We are filmmakers who live on set. We obsess over the frame — the light, the pour, the steam, the split second — so food & beverage brands get work that looks as good as it tastes.';
/** The closing phrase of ETHOS, which settles in orange once the reader scrolls past it. */
export const ETHOS_ACCENT = 'as good as it tastes.';

export const SITE_NAME = 'MadeBy';
export const SITE_TAGLINE = 'Commercial production for food & beverage';
export const SITE_DESCRIPTION =
  'MadeBy is a commercial production company for food & beverage brands — pre-production, production and post, from first storyboard to final delivery.';

/**
 * Public site URL, used for canonical links, the sitemap and share images.
 * Set NEXT_PUBLIC_SITE_URL once a custom domain is live; until then Vercel's
 * production URL is used.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '');
