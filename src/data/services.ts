import budget from '../assets/services/budget.webp';
import callSheet from '../assets/services/call-sheet.webp';
import castingHandTalent from '../assets/services/casting-hand-talent.webp';
import hintPropDeck from '../assets/services/hint-prop-deck.webp';
import hintStoryboard from '../assets/services/hint-storyboard.webp';
import iqbarShotBoard from '../assets/services/iqbar-shot-board.webp';
import mezclaLocationPool from '../assets/services/mezcla-location-pool.webp';
import mezclaMoodCar from '../assets/services/mezcla-mood-car.webp';
import motionControlPreviz from '../assets/services/motion-control-previz.webp';
import shootSchedule from '../assets/services/shoot-schedule.webp';
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
    long: 'Concept, boards and motion-control previz through to the call sheet. We lock the look, the schedule and the budget up front, so the shoot day is about craft — not surprises.',
    items: [
      { name: 'Storyboards', img: wienerschnitzelStoryboard, from: 'Wienerschnitzel — All-American Pastrami :15' },
      { name: 'Shot Lists', img: iqbarShotBoard, from: 'IQBAR Bites — shot board' },
      { name: 'Animatics', img: wienerschnitzelAnimatic, from: 'Wienerschnitzel — animatic frame' },
      { name: 'Decks', img: hintStoryboard, from: 'Hint — Treat Yourself, director’s approach' },
      { name: 'Call Sheets', img: callSheet, from: 'Ridgeline “First Light” :30 — day 3 call sheet' },
      { name: 'Mood Boards', img: mezclaMoodCar, from: 'Mezcla — car & street references' },
      { name: 'Motion Control Previz', img: motionControlPreviz, from: 'Robot camera move planned on a tabletop set' },
      { name: 'Location Scouting', img: mezclaLocationPool, from: 'Mezcla — pool location board' },
      { name: 'Casting', img: castingHandTalent, from: 'IQBAR Bites — hand talent manicure brief' },
      { name: 'Prop & Food Styling', img: hintPropDeck, from: 'Hint — Treat Yourself prop deck, Strawberry Cupcake World' },
      { name: 'Scheduling', img: shootSchedule, from: 'Ridgeline “First Light” :30 — day 1 shooting schedule' },
      { name: 'Budgeting', img: budget, from: 'Ridgeline “First Light” :30 — estimate vs actual' },
    ],
  },
  {
    id: 'production',
    num: '02',
    title: 'Production',
    desc: 'Crew, cameras and direction on the day.',
    long: 'A handpicked crew, premium camera and lighting packages, and on-set creative leadership. Tabletop, macro, high-speed and live action — under one roof.',
    items: [
      { name: 'Direction', video: '/media/services/prod-direction.mp4', from: 'Mezcla — directing talent on the tennis court' },
      { name: 'Cinematography', video: '/media/services/prod-cinematography.mp4', from: 'Liquid I.V. — camera team on set' },
      { name: 'Lighting', video: '/media/services/prod-lighting.mp4', from: 'Liquid I.V. — lighting the tabletop' },
      { name: 'Tabletop', video: '/media/services/prod-tabletop.mp4', from: 'Del Taco — Del Dorado Chicken' },
      { name: 'Macro', video: '/media/services/prod-macro.mp4', from: 'Cosori Juni — the bloom, in macro' },
      { name: 'High-Speed', video: '/media/services/prod-high-speed.mp4', from: 'Cali Squeeze — splash at high frame rate' },
      { name: 'Motion Control', video: '/media/services/prod-motion-control.mp4', from: 'Poppi — robot camera move along the can line' },
      { name: 'Food Styling', video: '/media/services/prod-food-styling.mp4', from: 'Del Taco — styling the hero plate' },
      { name: 'Live Action', video: '/media/services/prod-live-action.mp4', from: 'Mezcla — tennis court' },
      { name: 'Photography', video: '/media/services/prod-photography.mp4', from: 'Mezcla — lifestyle stills by the pool' },
      { name: 'BTS', video: '/media/services/prod-bts.mp4', from: 'Hint — talent and the robot on the sky set' },
      { name: 'Studio & Location', video: '/media/services/prod-studio.mp4', from: 'Del Taco — Big Fat Tacos studio build' },
    ],
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
