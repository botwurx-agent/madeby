import budget from '../assets/services/budget.webp';
import callSheet from '../assets/services/call-sheet.webp';
import castingHandTalent from '../assets/services/casting-hand-talent.webp';
import hintPropDeck from '../assets/services/hint-prop-deck.webp';
import hintStoryboard from '../assets/services/hint-storyboard.webp';
import iqbarShotBoard from '../assets/services/iqbar-shot-board.webp';
import mezclaLocationPool from '../assets/services/mezcla-location-pool.webp';
import mezclaMoodCar from '../assets/services/mezcla-mood-car.webp';
import motionControlPreviz from '../assets/services/motion-control-previz.webp';
import resolveImageCorrection from '../assets/services/resolve-image-correction.webp';
import resolveGraphicAnimation from '../assets/services/resolve-graphic-animation.webp';
import resolveColorGrade from '../assets/services/resolve-color-grade.webp';
import resolveAiVfx from '../assets/services/resolve-ai-vfx.webp';
import resolveResolutionSizes from '../assets/services/resolve-resolution-sizes.webp';
import resolveEditing from '../assets/services/resolve-editing.webp';
import resolveSoundDesign from '../assets/services/resolve-sound-design.webp';
import resolveMusicLicensing from '../assets/services/resolve-music-licensing.webp';
import resolveCompositing from '../assets/services/resolve-compositing.webp';
import resolveRetouching from '../assets/services/resolve-retouching.webp';
import resolveSocialCutdowns from '../assets/services/resolve-social-cutdowns.webp';
import resolveDelivery from '../assets/services/resolve-delivery.webp';
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
    items: [
      { name: 'Image Correction', img: resolveImageCorrection, from: 'Del Taco — primary balance and waveform' },
      { name: 'Graphic Animation', img: resolveGraphicAnimation, from: 'Kettle & Fire — animated type in Fusion' },
      { name: 'Color Grade', img: resolveColorGrade, from: 'Cosori Juni — four-node grade, before and after' },
      { name: 'AI VFX', img: resolveAiVfx, from: 'Hint — AI isolation, tracked on the bottle' },
      { name: 'Resolution Sizes', img: resolveResolutionSizes, from: 'Ninja CREAMi — 16:9 reframed to 9:16' },
      { name: 'Editing', img: resolveEditing, from: 'Mezcla — the cut, across three tracks' },
      { name: 'Sound Design', img: resolveSoundDesign, from: 'Poppi — layered fizz and pour in Fairlight' },
      { name: 'Music Licensing', img: resolveMusicLicensing, from: 'Del Taco — licensed track, cut to the beat' },
      { name: 'Compositing', img: resolveCompositing, from: 'Poppi — the three-panel composite in Fusion' },
      { name: 'Retouching', img: resolveRetouching, from: 'Wienerschnitzel — hero burger, keyed and retouched' },
      { name: 'Social Cut-Downs', img: resolveSocialCutdowns, from: 'Mezcla — vertical cut-down with captions' },
      { name: 'Delivery', img: resolveDelivery, from: 'Ninja CREAMi — every ratio in the render queue' },
    ],
  },
];
