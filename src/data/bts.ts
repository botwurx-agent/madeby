import onSet from '../assets/about-on-set.webp';
import project01 from '../assets/projects/project-01.webp';
import project02 from '../assets/projects/project-02.webp';
import type { MediaSource } from './media';

export interface BtsShot extends MediaSource {
  caption: string;
}

/** Behind-the-scenes carousel under the ethos statement. */
export const BTS: BtsShot[] = [
  { caption: 'Lighting the pour', img: project02 },
  { caption: 'Tabletop, day two' },
  { caption: 'On set, Los Angeles', img: onSet },
  { caption: 'Phantom at 1,000fps' },
  { caption: 'Hero plate', img: project01 },
  { caption: 'Color session' },
];
