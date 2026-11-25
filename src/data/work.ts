import project01 from '../assets/projects/project-01.webp';
import project02 from '../assets/projects/project-02.webp';
import treatYourself from '../assets/projects/treat-yourself.webp';
import type { MediaSource } from './media';

export const CATEGORIES = ['Commercial', 'Brand Film', 'Campaign', 'Social'] as const;
export type Category = (typeof CATEGORIES)[number];

export interface WorkSample extends MediaSource {
  id: string;
  title: string;
  client: string;
  category: Category;
  year: string;
  services: string[];
  desc: string;
  /** Shown in the 4×3 grid on the home page (first 12 featured). */
  featured: boolean;
}

export const WORK: WorkSample[] = [
  {
    id: 'big-fat-tacos',
    title: 'Big Fat Tacos',
    client: 'Del Taco',
    category: 'Commercial',
    year: '2024',
    img: project01,
    video: '/media/work/big-fat-tacos-loop.mp4',
    full: '/media/work/big-fat-tacos.mp4',
    services: ['Direction', 'Production', 'Color Grade'],
    desc: "Summer menu campaign for Del Taco. Three days on location with a 20-person crew — bold, bright and unapologetically indulgent.",
    featured: true,
  },
  {
    id: 'treat-yourself',
    title: 'Treat Yourself',
    client: 'Hint',
    category: 'Commercial',
    year: '2026',
    img: treatYourself,
    video: '/media/work/treat-yourself-loop.mp4',
    full: '/media/work/treat-yourself.mp4',
    services: ['Direction', 'Production', 'Post'],
    desc: "Launch spot for Hint's Treat Yourself variety pack. A dreamlike world for every flavor — strawberry cupcake, berry cobbler, pineapple whip and key lime pie. Tastes like dessert, hydrates like water.",
    featured: true,
  },
  {
    id: 'cherry-splash',
    title: 'Cherry Splash',
    client: 'Hint Water',
    category: 'Commercial',
    year: '2024',
    img: project02,
    services: ['Direction', 'Production', 'VFX', 'Color Grade'],
    desc: 'High-speed product beauty for Hint Water. Macro water work combined with motion-controlled pack shots.',
    featured: true,
  },
  { id: 'crisp-and-clean', title: 'Crisp & Clean', client: 'Beverage Co.', category: 'Campaign', year: '2023', services: ['Creative Strategy', 'Production', 'Post'], desc: 'Three hero spots and twelve social cuts delivered across a six-week production sprint.', featured: true },
  { id: 'midnight-snack', title: 'Midnight Snack', client: 'Food Brand', category: 'Commercial', year: '2023', services: ['Direction', 'Production'], desc: 'Late-night cravings in cinematic slow motion. Moody, atmospheric, shot entirely at night.', featured: true },
  { id: 'first-light', title: 'First Light', client: 'Coffee Label', category: 'Brand Film', year: '2024', services: ['Direction', 'Production', 'Post'], desc: 'A brand film for a single-origin coffee label. Three countries, one cup.', featured: true },
  { id: 'the-pour', title: 'The Pour', client: 'Craft Beer Co.', category: 'Social', year: '2024', services: ['Production', 'Graphic Animation'], desc: 'A vertical-first social series built around one perfect pour per week.', featured: true },
  { id: 'golden-hour', title: 'Golden Hour', client: 'Spirits Brand', category: 'Brand Film', year: '2024', services: ['Direction', 'Production', 'Color Grade'], desc: 'The craft of distilling, grain to glass, shot over a full harvest cycle.', featured: true },
  { id: 'deep-cut', title: 'Deep Cut', client: 'Butcher & Co.', category: 'Campaign', year: '2023', services: ['Creative Strategy', 'Direction'], desc: 'Raw, textured and unfiltered. Shot on 16mm for a genuine analog look.', featured: true },
  { id: 'steam', title: 'Steam', client: 'Noodle House', category: 'Social', year: '2024', services: ['Production', 'Tabletop'], desc: 'Tabletop macro work for a ramen chain — every frame built around rising steam.', featured: true },
  { id: 'fizz', title: 'Fizz', client: 'Soda Brand', category: 'Commercial', year: '2023', services: ['High-Speed', 'VFX'], desc: 'Phantom high-speed bubbles and splash composites for a sparkling soda launch.', featured: true },
  { id: 'sunday-bake', title: 'Sunday Bake', client: 'Bakery', category: 'Brand Film', year: '2022', services: ['Direction', 'Production', 'Post'], desc: 'A quiet documentary portrait of a family bakery, opening to close.', featured: true },
  { id: 'cold-brew', title: 'Cold Brew', client: 'Coffee Label', category: 'Campaign', year: '2024', services: ['Production', 'Color Grade'], desc: 'A summer cold-brew push across broadcast, retail screens and social.', featured: true },
  { id: 'vineyard-run', title: 'Vineyard Run', client: 'Wine Estate', category: 'Brand Film', year: '2022', services: ['Direction', 'Production', 'Post'], desc: 'Harvest season at a boutique wine estate. Twelve minutes, award-nominated.', featured: false },
  { id: 'slice', title: 'Slice', client: 'Pizza Co.', category: 'Social', year: '2023', services: ['Production', 'Resolution Sizes'], desc: 'The cheese pull, 40 ways. A cut-down library for every platform and ratio.', featured: false },
  { id: 'harvest', title: 'Harvest', client: 'Grocer', category: 'Commercial', year: '2023', services: ['Direction', 'Production'], desc: 'Farm-to-shelf spot following produce from field to store in a single day.', featured: false },
];

export const FEATURED_WORK = WORK.filter((w) => w.featured).slice(0, 12);

export const getWork = (id: string) => WORK.find((w) => w.id === id);
