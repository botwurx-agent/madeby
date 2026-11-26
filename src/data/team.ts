import fredPortrait from '../assets/team/fred.webp';
import gregPortrait from '../assets/team/greg.webp';
import type { MediaSource } from './media';

export interface TeamMember {
  id: string;
  name: string;
  /** First line under the name. */
  title: string;
  /** Everything else they do on a job. */
  roles: string[];
  /** Short line on the home page row. */
  short: string;
  bio: string;
  /** Portrait: still or a looping clip. Initials are drawn until one is added. */
  portrait?: MediaSource;
  /** Ids from WORK shown as samples in their profile. */
  work: string[];
}

export const TEAM: TeamMember[] = [
  {
    id: 'steve',
    name: 'Steve Nazari',
    title: 'Co-Founder',
    roles: ['Producer', 'Motion Control Operator'],
    short: 'A decade of agency life, then a decision to only make films he believes in.',
    bio: "Steve spent ten years in agency life before walking away to make films he actually believed in. His background in fine art photography shapes every MadeBy frame — the geometry, the quality of light, the decisive moment. On set, Steve is quiet until something is wrong.",
    work: ['big-fat-tacos', 'del-dorado-chicken', 'treat-yourself', 'all-american-burgers', 'cosori-juni', 'mezcla', 'kettle-and-fire', 'first-light', 'golden-hour', 'midnight-snack', 'sunday-bake', 'deep-cut'],
  },
  {
    id: 'fred',
    name: 'Frederick Kim',
    title: 'Co-Founder',
    roles: ['Director', 'Director of Photography'],
    short: 'The reason shoots land on time and on budget without feeling like a compromise.',
    portrait: { img: fredPortrait, focus: '50% 15%' },
    bio: 'Fred is the reason MadeBy shoots run on time and on budget without ever feeling like a compromise. A former line producer turned EP, he knows what a shoot needs before anyone else in the room does. The creative always comes first.',
    work: ['treat-yourself', 'cosori-juni', 'hydrascience', 'poppi-cherry-cola', 'cali-squeeze', 'mezcla', 'ninja-creami', 'cherry-splash', 'crisp-and-clean', 'cold-brew', 'the-pour', 'fizz', 'harvest'],
  },
  {
    id: 'greg',
    name: 'Greg Lozano',
    title: 'Lighting Engineer',
    roles: ['Gaffer'],
    short: 'Has lit every MadeBy set since day one. Economical, intentional, always beautiful.',
    portrait: { img: gregPortrait, focus: '50% 15%' },
    bio: 'Greg has lit every MadeBy set since day one. Trained under a DP known for practical-only lighting, his setups are economical, intentional and always beautiful. He turns whatever a location gives him into something that looks like it was always the plan.',
    work: ['del-dorado-chicken', 'all-american-burgers', 'hydrascience', 'poppi-cherry-cola', 'cali-squeeze', 'kettle-and-fire', 'ninja-creami', 'steam', 'midnight-snack', 'cherry-splash', 'golden-hour', 'vineyard-run', 'slice'],
  },
];
