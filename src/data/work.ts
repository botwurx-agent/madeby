import project01 from '../assets/projects/project-01.webp';
import project02 from '../assets/projects/project-02.webp';
import allAmericanBurgers from '../assets/projects/all-american-burgers.webp';
import caliSqueeze from '../assets/projects/cali-squeeze.webp';
import cheetosQueso from '../assets/projects/cheetos-queso.webp';
import cosoriJuni from '../assets/projects/cosori-juni.webp';
import delDoradoChicken from '../assets/projects/del-dorado-chicken.webp';
import hydrascience from '../assets/projects/hydrascience.webp';
import hintRebrand from '../assets/projects/hint-rebrand.webp';
import kettleAndFire from '../assets/projects/kettle-and-fire.webp';
import mezcla from '../assets/projects/mezcla.webp';
import ninjaCreami from '../assets/projects/ninja-creami.webp';
import poppiOrangeCream from '../assets/projects/poppi-orange-cream.webp';
import poppiCherryCola from '../assets/projects/poppi-cherry-cola.webp';
import rightWay from '../assets/projects/right-way.webp';
import treatYourself from '../assets/projects/treat-yourself.webp';
import { blob, type MediaSource } from './media';

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
  /** Kept in the list but left off the site everywhere. */
  hidden?: boolean;
}

const ALL_WORK: WorkSample[] = [
  {
    id: 'big-fat-tacos',
    title: 'Big Fat Tacos',
    client: 'Del Taco',
    category: 'Commercial',
    year: '2024',
    img: project01,
    video: '/media/work/big-fat-tacos-loop.mp4',
    full: blob('work/big-fat-tacos.mp4'),
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
    full: blob('work/treat-yourself.mp4'),
    services: ['Direction', 'Production', 'Post'],
    desc: "Launch spot for Hint's Treat Yourself variety pack. A dreamlike world for every flavor — strawberry cupcake, berry cobbler, pineapple whip and key lime pie. Tastes like dessert, hydrates like water.",
    featured: true,
  },
  {
    id: 'all-american-burgers',
    title: 'All-American Burgers',
    client: 'Wienerschnitzel',
    category: 'Commercial',
    year: '2025',
    img: allAmericanBurgers,
    video: '/media/work/all-american-burgers-loop.mp4',
    full: blob('work/all-american-burgers.mp4'),
    services: ['Direction', 'Tabletop', 'Post'],
    desc: "Launch spot for Wienerschnitzel's new All-American Burgers — Deluxe, Chili Cheese and Jalapeño BBQ Bacon. Bright, clean tabletop with a stars-and-stripes ribbon running through every shot.",
    featured: true,
  },
  {
    id: 'cosori-juni',
    title: 'Juni Launch',
    client: 'Cosori',
    category: 'Commercial',
    year: '2026',
    img: cosoriJuni,
    video: '/media/work/cosori-juni-loop.mp4',
    full: blob('work/cosori-juni.mp4'),
    services: ['Direction', 'Production', 'Color Grade'],
    desc: 'Launch film for Juni, Cosori’s automated pour-over machine. Warm, slow, macro-led — from the bloom to the final brew, the ritual of pour-over at the push of a button.',
    featured: true,
  },
  {
    id: 'hydrascience',
    title: 'Hydrascience',
    client: 'Liquid I.V.',
    category: 'Commercial',
    year: '2024',
    img: hydrascience,
    video: '/media/work/hydrascience-loop.mp4',
    full: blob('work/hydrascience.mp4'),
    services: ['Direction', 'High-Speed', 'Post'],
    desc: 'Liquid I.V. Hydration Multiplier: transform ordinary water into extraordinary hydration. High-speed liquid and powder work built around one move — tear, pour, hydrate.',
    featured: true,
  },
  {
    id: 'poppi-cherry-cola',
    title: 'Cherry Cola',
    client: 'Poppi',
    category: 'Commercial',
    year: '2024',
    img: poppiCherryCola,
    video: '/media/work/poppi-cherry-cola-loop.mp4',
    full: blob('work/poppi-cherry-cola.mp4'),
    services: ['Direction', 'High-Speed', 'Graphic Animation'],
    desc: 'Twenty seconds of cherry-red excess for Poppi Cherry Cola. Splash, crush and pour in saturated pinks and reds, cut fast with bold animated type. Here to serve taste.',
    featured: true,
  },
  {
    id: 'del-dorado-chicken',
    title: 'Del Dorado Chicken',
    client: 'Del Taco',
    category: 'Commercial',
    year: '2025',
    img: delDoradoChicken,
    video: '/media/work/del-dorado-chicken-loop.mp4',
    full: blob('work/del-dorado-chicken.mp4'),
    services: ['Direction', 'Production', 'Tabletop'],
    desc: 'Menu launch for Del Taco’s new Del Dorado Chicken. A therapy session that turns into a dance party, then pure tabletop: the sauce pour, the cheese pull and the chicken drop. Shot on a green-screen stage.',
    featured: true,
  },
  {
    id: 'cali-squeeze',
    title: 'Blood Orange',
    client: 'Cali Squeeze',
    category: 'Social',
    year: '2026',
    img: caliSqueeze,
    video: '/media/work/cali-squeeze-loop.mp4',
    full: blob('work/cali-squeeze.mp4'),
    services: ['Direction', 'Tabletop', 'High-Speed'],
    desc: 'Fifteen-second social spot for Cali Squeeze Blood Orange. Real fruit, real beer: the crack, the splash, the pour and the overflow, shot macro against saturated red.',
    featured: true,
  },
  {
    id: 'mezcla',
    title: 'Puff-Crispy Bars',
    client: 'Mezcla',
    category: 'Commercial',
    year: '2026',
    img: mezcla,
    video: '/media/work/mezcla-loop.mp4',
    full: blob('work/mezcla.mp4'),
    services: ['Direction', 'Live Action', 'Color Grade'],
    desc: 'Sun-soaked lifestyle spot for Mezcla Puff-Crispy Bars. Poolside, courtside and top-down in a convertible — a light, crispy protein bar that fits wherever the day goes.',
    featured: true,
  },
  {
    id: 'kettle-and-fire',
    title: 'Play With Your Food',
    client: 'Kettle & Fire',
    category: 'Commercial',
    year: '2024',
    img: kettleAndFire,
    video: '/media/work/kettle-and-fire-loop.mp4',
    full: blob('work/kettle-and-fire.mp4'),
    services: ['Direction', 'Tabletop', 'Graphic Animation'],
    desc: 'Overhead tabletop spot for Kettle & Fire broths. Play with your food, not your health: ramen, stews and soups in split-screen pairs, cut to bold animated type.',
    featured: true,
  },
  {
    id: 'right-way',
    title: 'Al Pastor, the Right Way',
    client: 'Del Taco',
    category: 'Commercial',
    year: '2025',
    img: rightWay,
    video: '/media/work/right-way-loop.mp4',
    full: blob('work/right-way.mp4'),
    services: ['Direction', 'Production', 'Food Styling', 'Post'],
    desc: "Launch spot for Trejo's Tacos Roasted Pork Al Pastor at Del Taco. A kitchen, a microwave that has it coming, and street tacos done the right way.",
    featured: true,
  },
  {
    id: 'hint-rebrand',
    title: 'Rebrand',
    client: 'Hint',
    category: 'Campaign',
    year: '2026',
    img: hintRebrand,
    video: '/media/work/hint-rebrand-loop.mp4',
    full: blob('work/hint-rebrand.mp4'),
    services: ['Direction', 'Motion Control', 'Production', 'Post'],
    desc: "The 30-second hero spot for Hint's rebrand. Bottles in a sky-blue world, a sea of cherries and high-speed pours — what water would taste like if it wanted people to drink it.",
    featured: true,
  },
  {
    id: 'poppi-orange-cream',
    title: 'Orange Cream',
    client: 'Poppi',
    category: 'Commercial',
    year: '2024',
    img: poppiOrangeCream,
    video: '/media/work/poppi-orange-cream-loop.mp4',
    full: blob('work/poppi-orange-cream.mp4'),
    services: ['Direction', 'Tabletop', 'High-Speed', 'Post'],
    desc: "Orange Cream for Poppi. Juicy, creamy, bubbly — high-speed pours, a float that overflows and a can that never stops sweating.",
    featured: true,
  },
  {
    id: 'cherry-splash',
    hidden: true,
    title: 'Cherry Splash',
    client: 'Hint Water',
    category: 'Commercial',
    year: '2024',
    img: project02,
    services: ['Direction', 'Production', 'VFX', 'Color Grade'],
    desc: 'High-speed product beauty for Hint Water. Macro water work combined with motion-controlled pack shots.',
    featured: true,
  },
  {
    id: 'ninja-creami',
    title: 'CREAMi XL',
    client: 'Ninja',
    category: 'Commercial',
    year: '2026',
    img: ninjaCreami,
    video: '/media/work/ninja-creami-loop.mp4',
    full: blob('work/ninja-creami.mp4'),
    services: ['Direction', 'Tabletop', 'Live Action'],
    desc: 'Product launch for the Ninja CREAMi XL. Ingredient macros — strawberries, mango, oats — become sorbet and protein ice cream, then the family kitchen takes over.',
    featured: true,
  },
  {
    id: 'cheetos-queso',
    title: 'Cheetos Queso',
    client: 'Del Taco',
    category: 'Social',
    year: '2025',
    img: cheetosQueso,
    video: '/media/work/cheetos-queso-loop.mp4',
    full: blob('work/cheetos-queso.mp4'),
    services: ['Production', 'Tabletop', 'Food Styling', 'Post'],
    desc: 'A 10-second hit for the Del Taco × Cheetos Queso menu. Burritos, a slow queso dip and a loaded nacho build — orange on orange.',
    featured: true,
  },
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

/** Everything on the site: ALL_WORK minus hidden samples. */
export const WORK = ALL_WORK.filter((w) => !w.hidden);

export const FEATURED_WORK = WORK.filter((w) => w.featured).slice(0, 12);

export const getWork = (id: string) => WORK.find((w) => w.id === id);
