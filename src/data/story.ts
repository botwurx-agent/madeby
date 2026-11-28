import poppiBts from '../assets/bts-poppi.webp';
import onSet from '../assets/about-on-set.webp';
import alPastorBts from '../assets/bts-al-pastor.webp';
import delTacoBts from '../assets/bts-del-taco.webp';
import hintBts from '../assets/bts-hint.webp';
import liquidIvBts from '../assets/bts-liquid-iv.webp';
import mezclaBts from '../assets/bts-mezcla.webp';
import fredPortrait from '../assets/team/fred.webp';
import gregPortrait from '../assets/team/greg.webp';
import stevePortrait from '../assets/team/steve.webp';
import type { MediaSource } from './media';
import { WORK } from './work';

/*
 * The About page (/about). Everything here is plain copy and pictures, so the
 * story can be rewritten without touching the layout.
 *
 * DRAFT: the chapter copy below is a first pass written around what we know
 * (who does what on set). Swap in the real story: where Steve and Fred met,
 * the first job together, when Greg came on. A chapter with an empty `media`
 * shows a "photo coming soon" frame until a picture is added.
 */

export const ABOUT_TITLE = 'The people behind the frame.';

export const ABOUT_INTRO =
  'MadeBy is a small crew who would rather be on set than anywhere else. This is how we found each other, and what we have built since.';

export interface Polaroid {
  img: MediaSource['img'];
  caption: string;
  /** Starting spot on the table, in % of its width and height. */
  x: number;
  y: number;
  /** Starting tilt, in degrees. */
  r: number;
  focus?: string;
}

/** Photos scattered on the table at the top of the page. Visitors can drag them around. */
export const POLAROIDS: Polaroid[] = [
  { img: onSet, caption: 'On set', x: 4, y: 8, r: -7 },
  { img: stevePortrait, caption: 'Steve', x: 25, y: 4, r: -3, focus: '50% 15%' },
  { img: mezclaBts, caption: 'Mezcla, on location', x: 15, y: 52, r: 5 },
  { img: fredPortrait, caption: 'Fred', x: 45, y: 12, r: 6, focus: '50% 15%' },
  { img: hintBts, caption: 'Hint, sky set', x: 37, y: 50, r: -6 },
  { img: delTacoBts, caption: 'Del Taco', x: 60, y: 54, r: 3 },
  { img: gregPortrait, caption: 'Greg', x: 76, y: 6, r: -4, focus: '50% 15%' },
];

export interface Chapter {
  take: string;
  title: string;
  body: string;
  media: MediaSource;
  /** Caption under the picture (and the label on the "coming soon" frame). */
  caption: string;
  portrait?: boolean;
}

export const CHAPTERS: Chapter[] = [
  {
    take: '01',
    title: 'Where it started',
    body: 'Steve and Fred met years before MadeBy had a name. What stuck was a shared habit: both would rather spend another hour on one frame than ship ten that were only fine.',
    media: {},
    caption: 'Where we met: photo coming soon',
  },
  {
    take: '02',
    title: 'The first job together',
    body: 'The first job together settled the roles that still run every shoot. Fred calls the shots and the camera. Steve produces the day and keeps it on the rails.',
    media: { img: delTacoBts, video: '/media/bts/del-taco-bts-loop.mp4' },
    caption: 'Del Taco, on set',
    portrait: true,
  },
  {
    take: '03',
    title: 'Enter the robot',
    body: 'Food moves fast and never moves the same way twice. So Steve took on motion control, and a robot arm joined the crew: repeatable moves, perfect passes, the same pour shot a dozen ways.',
    media: { img: poppiBts },
    caption: 'Poppi, prepping a robot pass',
    portrait: true,
  },
  {
    take: '04',
    title: 'Greg finds the light',
    body: 'Then Greg came on. Every set since carries his touch: light that looks like it was always there, built fast from whatever the room gives him.',
    media: { img: liquidIvBts, video: '/media/bts/liquid-iv-bts-loop.mp4' },
    caption: 'Liquid I.V., lighting the tabletop',
    portrait: true,
  },
  {
    take: '05',
    title: 'MadeBy today',
    body: 'Today MadeBy shoots for brands like Del Taco, Hint, Poppi and Ninja. Same small crew, same obsession with the frame.',
    media: { img: alPastorBts, video: '/media/bts/al-pastor-bts-loop.mp4' },
    caption: 'Del Taco, Al Pastor',
    portrait: true,
  },
];

/** Every brand in the reel, in reel order. */
export const CLIENTS = [...new Set(WORK.map((w) => w.client))];

/** Counters in the last chapter. Worked out from the site's own data where possible. */
export const STATS = [
  { value: WORK.length, label: 'Spots in the reel' },
  { value: CLIENTS.length, label: 'Brands' },
  { value: 3, label: 'Crew' },
  { value: 1, label: 'Robot' },
];
