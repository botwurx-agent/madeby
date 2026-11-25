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
    roles: ['Director', 'Producer', 'Senior Operator'],
    short: 'A decade of agency life, then a decision to only make films he believes in.',
    bio: "Steve spent ten years in agency life before walking away to make films he actually believed in. His background in fine art photography shapes every MadeBy frame — the geometry, the quality of light, the decisive moment. On set, Steve is quiet until something is wrong.",
    work: ['big-fat-tacos', 'treat-yourself', 'all-american-burgers', 'first-light', 'golden-hour', 'midnight-snack', 'sunday-bake', 'deep-cut'],
  },
  {
    id: 'fred',
    name: 'Frederick Kim',
    title: 'Co-Founder',
    roles: ['Executive Producer', 'Client Strategy', 'Logistics'],
    short: 'The reason shoots land on time and on budget without feeling like a compromise.',
    bio: 'Fred is the reason MadeBy shoots run on time and on budget without ever feeling like a compromise. A former line producer turned EP, he knows what a shoot needs before anyone else in the room does. The creative always comes first.',
    work: ['treat-yourself', 'hydrascience', 'cherry-splash', 'crisp-and-clean', 'cold-brew', 'the-pour', 'fizz', 'harvest'],
  },
  {
    id: 'greg',
    name: 'Greg Lozano',
    title: 'Gaffer',
    roles: ['Lighting', 'Electrical', 'Camera Support'],
    short: 'Has lit every MadeBy set since day one. Economical, intentional, always beautiful.',
    bio: 'Greg has lit every MadeBy set since day one. Trained under a DP known for practical-only lighting, his setups are economical, intentional and always beautiful. He turns whatever a location gives him into something that looks like it was always the plan.',
    work: ['all-american-burgers', 'hydrascience', 'steam', 'midnight-snack', 'cherry-splash', 'golden-hour', 'vineyard-run', 'slice'],
  },
];
