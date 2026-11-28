import alPastorBts from '../assets/bts-al-pastor.webp';
import bigFatTacosBts from '../assets/bts-big-fat-tacos.webp';
import delTacoBts from '../assets/bts-del-taco.webp';
import hintBts from '../assets/bts-hint.webp';
import liquidIvBts from '../assets/bts-liquid-iv.webp';
import mezclaBts from '../assets/bts-mezcla.webp';
import poppiBts from '../assets/bts-poppi.webp';
import onSet from '../assets/about-on-set.webp';
import { blob, type MediaSource } from './media';

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
  { caption: 'On set — the crew', img: onSet },
  {
    caption: 'Del Taco — Del Dorado Chicken',
    img: delTacoBts,
    video: '/media/bts/del-taco-bts-loop.mp4',
    full: blob('bts/del-taco-bts.mp4'),
    portrait: true,
  },
  {
    caption: 'Mezcla — on location',
    img: mezclaBts,
    video: '/media/bts/mezcla-bts-loop.mp4',
    full: blob('bts/mezcla-bts.mp4'),
    portrait: true,
  },
  {
    caption: 'Poppi — Cherry Cola',
    img: poppiBts,
    video: '/media/bts/poppi-bts-loop.mp4',
    full: blob('bts/poppi-bts.mp4'),
    portrait: true,
  },
  {
    caption: 'Hint — rebrand',
    img: hintBts,
    video: '/media/bts/hint-bts-loop.mp4',
    full: blob('bts/hint-bts.mp4'),
    portrait: true,
  },
  {
    caption: 'Liquid I.V. — Hydrascience',
    img: liquidIvBts,
    video: '/media/bts/liquid-iv-bts-loop.mp4',
    full: blob('bts/liquid-iv-bts.mp4'),
    portrait: true,
  },
  {
    caption: 'Del Taco — Big Fat Tacos',
    img: bigFatTacosBts,
    video: '/media/bts/big-fat-tacos-bts-loop.mp4',
    full: blob('bts/big-fat-tacos-bts.mp4'),
    portrait: true,
  },
  {
    caption: 'Del Taco — Al Pastor, the Right Way',
    img: alPastorBts,
    video: '/media/bts/al-pastor-bts-loop.mp4',
    full: blob('bts/al-pastor-bts.mp4'),
    portrait: true,
  },
];
