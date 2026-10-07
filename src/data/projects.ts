import project01 from '../assets/projects/project-01.webp';
import project02 from '../assets/projects/project-02.webp';

export type Category = 'Commercial' | 'Brand Film' | 'Campaign' | 'Docu-short';

export interface Project {
  id: string;
  title: string;
  client: string;
  category: Category;
  year: string;
  /** Still image. Projects without one render a placeholder. */
  img?: string;
  /** Video for the player overlay. Drop an MP4 URL here to activate it. */
  video?: string;
  services: string[];
  desc: string;
  /** Shown on the home page film strip. */
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'BIG FAT TACOS',
    client: 'DEL TACO',
    category: 'Commercial',
    year: '2024',
    img: project01,
    services: ['Direction', 'Production', 'Colour Grade'],
    desc: "A full-production commercial campaign for Del Taco's summer menu push. Shot on location over three days with a 20-person crew. Bold, bright, and unapologetically indulgent.",
    featured: true,
  },
  {
    id: '02',
    title: 'CHERRY SPLASH',
    client: 'HINT WATER',
    category: 'Commercial',
    year: '2024',
    img: project02,
    services: ['Direction', 'Production', 'VFX', 'Colour Grade'],
    desc: "High-speed product beauty work for Hint Water's Cherry campaign. Macro water photography combined with motion-controlled pack shots. Zero calories. All flavor.",
    featured: true,
  },
  {
    id: '03',
    title: 'CRISP & CLEAN',
    client: 'BEVERAGE CO.',
    category: 'Campaign',
    year: '2023',
    services: ['Creative Strategy', 'Production', 'Post'],
    desc: 'A multi-platform campaign for a leading beverage brand. Three hero spots and twelve social cuts delivered across a six-week production sprint.',
    featured: true,
  },
  {
    id: '04',
    title: 'MIDNIGHT SNACK',
    client: 'FOOD BRAND',
    category: 'Commercial',
    year: '2023',
    services: ['Direction', 'Production'],
    desc: 'Late-night food cravings rendered in cinematic slow motion. A moody, atmospheric campaign shot entirely at night.',
    featured: true,
  },
  {
    id: '05',
    title: 'FIRST LIGHT',
    client: 'COFFEE LABEL',
    category: 'Brand Film',
    year: '2024',
    services: ['Creative Strategy', 'Direction', 'Production', 'Post'],
    desc: 'A brand story film about a single-origin coffee label. Three countries. One cup. Shot across Colombia, Ethiopia, and Japan.',
    featured: true,
  },
  {
    id: '06',
    title: 'VINEYARD RUN',
    client: 'WINE ESTATE',
    category: 'Docu-short',
    year: '2022',
    services: ['Direction', 'Production', 'Post'],
    desc: 'A documentary short following harvest season at a boutique wine estate. 12 minutes. Award-nominated.',
    featured: true,
  },
  {
    id: '07',
    title: 'DEEP CUT',
    client: 'CRAFT BEER CO.',
    category: 'Campaign',
    year: '2023',
    services: ['Creative Strategy', 'Direction', 'Production'],
    desc: 'A campaign celebrating craft and obsession — raw, textured, and unfiltered. Shot on 16mm for a genuine analog look.',
    featured: true,
  },
  {
    id: '08',
    title: 'GOLDEN HOUR',
    client: 'SPIRITS BRAND',
    category: 'Brand Film',
    year: '2024',
    services: ['Direction', 'Production', 'Colour Grade'],
    desc: 'A brand film about the craft of distilling — from grain to glass. Shot over a full harvest cycle.',
    featured: false,
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export const FILTERS = ['All', 'Commercial', 'Brand Film', 'Campaign', 'Docu-short'] as const;
export type Filter = (typeof FILTERS)[number];
