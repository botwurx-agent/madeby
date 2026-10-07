export interface TeamMember {
  id: string;
  name: string;
  role: string;
  color: string;
  bio: string;
  credits: string;
}

export const TEAM: TeamMember[] = [
  {
    id: 'SN',
    name: 'Steve Nazari',
    role: 'Co-Founder · Director',
    color: '#ff2020',
    bio: 'Steve spent a decade in agency life before walking away to make films he actually believed in. His background in fine art photography shapes every MadeBy frame — the geometry, the quality of light, the decisive moment. On set, Steve is quiet until something is wrong.',
    credits: 'Direction · DOP · Creative Strategy',
  },
  {
    id: 'FK',
    name: 'Fred Kim',
    role: 'Co-Founder · Executive Producer',
    color: '#00e040',
    bio: 'Fred is the reason MadeBy shoots run in budget and on time without ever feeling like a compromise. A former line producer turned EP, he has an instinct for what a shoot needs before anyone else in the room knows they need it. The creative always comes first.',
    credits: 'Production · Logistics · Client Strategy',
  },
  {
    id: 'GL',
    name: 'Greg Lozano',
    role: 'Gaffer',
    color: '#1866ff',
    bio: 'Greg has lit every MadeBy set since day one. Trained under a DP known for practical-only lighting on feature films, his setups are economical, intentional, and always beautiful. He turns whatever a location gives him into something that looks like it was always the plan.',
    credits: 'Lighting · Electrical · Camera',
  },
];

export const CHAPTERS = [
  {
    num: '01',
    label: 'THE SPARK',
    year: '2018',
    body: 'MadeBy started not with a business plan, but with an argument. Steve and Fred were on set for a beverage shoot in downtown LA watching a campaign get made the wrong way — too safe, too polished, no soul. On the drive back, they made a decision.',
  },
  {
    num: '02',
    label: 'THE FIRST FRAME',
    year: '2019',
    body: "The first MadeBy shoot was a one-day taco campaign — a crew of four, a rented Alexa Mini, and a lot of hustle. The client called it the best work they'd ever had. Word spread. MadeBy was real.",
  },
  {
    num: '03',
    label: 'THE STUDIO',
    year: '2020 — NOW',
    body: 'Today, MadeBy operates as a full-service production company with a handpicked crew, premium camera packages, and a client list spanning independent brands to household names. The obsession with craft has never changed.',
  },
];

/** BTS gallery cells: parallax rate, height (px), flex weight. */
export const BTS_CELLS = [
  { rate: 0.07, height: 380, flex: 1 },
  { rate: 0.2, height: 270, flex: 1.5 },
  { rate: 0.09, height: 450, flex: 1 },
  { rate: 0.25, height: 290, flex: 1.5 },
  { rate: 0.05, height: 410, flex: 1 },
];
