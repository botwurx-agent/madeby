import hintStoryboard from '../assets/services/hint-storyboard.webp';
import iqbarShotBoard from '../assets/services/iqbar-shot-board.webp';
import mezclaLocationPool from '../assets/services/mezcla-location-pool.webp';
import mezclaMoodCar from '../assets/services/mezcla-mood-car.webp';
import mezclaSchedule from '../assets/services/mezcla-schedule.webp';
import wienerschnitzelAnimatic from '../assets/services/wienerschnitzel-animatic.webp';
import wienerschnitzelStoryboard from '../assets/services/wienerschnitzel-storyboard.webp';
import type { MediaSource } from './media';

export interface ServiceItem extends MediaSource {
  name: string;
  /** Which job the sample comes from, shown when it is opened. */
  from?: string;
}

export interface ServicePhase {
  id: string;
  num: string;
  title: string;
  desc: string;
  /** Longer copy in the centre of the phase viewer. */
  long: string;
  /** The first five show on the home page; all show in the phase viewer (12 fill the frame). */
  items: ServiceItem[];
}

const items = (...names: string[]): ServiceItem[] => names.map((name) => ({ name }));

export const SERVICES: ServicePhase[] = [
  {
    id: 'pre-production',
    num: '01',
    title: 'Pre-Production',
    desc: 'Every frame planned before a light is switched on.',
    long: 'Concept, script and boards through to the call sheet. We lock the look, the schedule and the budget up front, so the shoot day is about craft — not surprises.',
    items: [
      { name: 'Storyboards', img: wienerschnitzelStoryboard, from: 'Wienerschnitzel — All-American Pastrami :15' },
      { name: 'Shot Lists', img: iqbarShotBoard, from: 'IQBAR Bites — shot board' },
      { name: 'Animatics', img: wienerschnitzelAnimatic, from: 'Wienerschnitzel — animatic frame' },
      { name: 'Decks', img: hintStoryboard, from: 'Hint — Treat Yourself, director’s approach' },
      { name: 'Call Sheets' },
      { name: 'Mood Boards', img: mezclaMoodCar, from: 'Mezcla — car & street references' },
      { name: 'Scripting' },
      { name: 'Location Scouting', img: mezclaLocationPool, from: 'Mezcla — pool location board' },
      { name: 'Casting' },
      { name: 'Food Styling Prep' },
      { name: 'Scheduling', img: mezclaSchedule, from: 'Mezcla — day 3 schedule' },
      { name: 'Budgeting' },
    ],
  },
  {
    id: 'production',
    num: '02',
    title: 'Production',
    desc: 'Crew, cameras and direction on the day.',
    long: 'A handpicked crew, premium camera and lighting packages, and on-set creative leadership. Tabletop, macro, high-speed and live action — under one roof.',
    items: items(
      'Direction',
      'Cinematography',
      'Lighting',
      'Tabletop',
      'Macro',
      'High-Speed',
      'Motion Control',
      'Food Styling',
      'Live Action',
      'Photography',
      'BTS',
      'Studio & Location',
    ),
  },
  {
    id: 'post-production',
    num: '03',
    title: 'Post-Production',
    desc: 'Finished, graded and cut for every screen.',
    long: 'Edit, color, graphics and VFX in-house, then versioned for every platform and ratio. One shoot becomes a full library of deliverables.',
    items: items(
      'Image Correction',
      'Graphic Animation',
      'Color Grade',
      'AI VFX',
      'Resolution Sizes',
      'Editing',
      'Sound Design',
      'Music Licensing',
      'Compositing',
      'Retouching',
      'Social Cut-Downs',
      'Delivery',
    ),
  },
];
