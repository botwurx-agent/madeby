import delTacoBts from '../assets/bts-del-taco.webp';
import onSet from '../assets/about-on-set.webp';
import type { MediaSource } from './media';

export interface BtsShot extends MediaSource {
  caption: string;
  /** Vertical (9:16) footage gets a tall card. */
  portrait?: boolean;
}

/**
 * Behind-the-scenes carousel under the ethos statement. The carousel opens on
 * the middle entry. Entries with `full` open a viewer with sound when clicked.
 */
export const BTS: BtsShot[] = [
  { caption: 'Tabletop, day two' },
  { caption: 'On set, Los Angeles', img: onSet },
  {
    caption: 'Del Taco — Del Dorado Chicken',
    img: delTacoBts,
    video: '/media/bts/del-taco-bts-loop.mp4',
    full: '/media/bts/del-taco-bts.mp4',
    portrait: true,
  },
  { caption: 'Phantom at 1,000fps' },
  { caption: 'Color session' },
];
