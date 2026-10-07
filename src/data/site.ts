export const RGB_STRIPS = [
  { color: '#ff2020', delay: 0, parallax: -0.14 },
  { color: '#00e040', delay: 0.11, parallax: -0.07 },
  { color: '#1866ff', delay: 0.22, parallax: -0.01 },
] as const;

export const RGB_COLORS = RGB_STRIPS.map((s) => s.color);

export interface NavLink {
  num: string;
  label: string;
  /** Route path, or `/#id` for a section on the home page. */
  to: string;
}

export const NAV_LINKS: NavLink[] = [
  { num: 'F-001', label: 'The Work', to: '/work' },
  { num: 'F-002', label: 'About', to: '/about' },
  { num: 'F-003', label: 'Services', to: '/#services' },
  { num: 'F-004', label: 'Contact', to: '/#contact' },
];

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#' },
  { label: 'Vimeo', href: '#' },
  { label: 'LinkedIn', href: '#' },
];

export const CONTACT_EMAIL = 'hello@madeby.studio';

export const SERVICES = [
  {
    num: '01',
    title: 'Pre-Production',
    desc: 'Concept development, scripting, storyboarding, location scouting, casting, and full shoot prep.',
  },
  {
    num: '02',
    title: 'Production',
    desc: 'Full crew, premium camera packages, on-set direction and creative leadership from day one.',
  },
  {
    num: '03',
    title: 'Post-Production',
    desc: 'Edit, colour grade, sound design, VFX, music licensing, and multi-platform delivery.',
  },
  {
    num: '04',
    title: 'Creative Strategy',
    desc: 'Brand story development, campaign architecture, audience targeting, and platform specifications.',
  },
];

export const STATS = [
  ['40+', 'Projects Delivered'],
  ['8', 'Years on Set'],
  ['3', 'Continents'],
] as const;

export const MARQUEE_ITEMS = [
  'Food & Beverage',
  'Brand Films',
  'Commercials',
  'Award-Winning',
  'Creative Direction',
  '4K Production',
  'Colour Grade',
];
