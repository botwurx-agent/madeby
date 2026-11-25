import caliSqueezeDeck from '../assets/services/cali-squeeze-deck.webp';
import caliSqueezeMoodBoard from '../assets/services/cali-squeeze-mood-board.webp';
import caliSqueezeShotList from '../assets/services/cali-squeeze-shot-list.webp';
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
      { name: 'Storyboards' },
      { name: 'Shot Lists', img: caliSqueezeShotList, from: 'Cali Squeeze — pre-light shot list' },
      { name: 'Animatics' },
      { name: 'Decks', img: caliSqueezeDeck, from: 'Cali Squeeze — capture concept' },
      { name: 'Call Sheets' },
      { name: 'Mood Boards', img: caliSqueezeMoodBoard, from: 'Cali Squeeze — lighting and background' },
      ...items('Scripting', 'Location Scouting', 'Casting', 'Food Styling Prep', 'Scheduling', 'Budgeting'),
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
