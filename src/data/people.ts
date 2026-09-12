/**
 * The seed cast's photographs and duotone card colours.
 *
 * These are generated likenesses of people who do not exist, copied from
 * the real Wingman web app's own seed set (src/assets/people/ there) — never
 * a real stranger's photo standing in for a fictional profile.
 */
export const personPhotos = {
  jonas: require('../../assets/people/jonas.jpg'),
  mira: require('../../assets/people/mira.jpg'),
  lucas: require('../../assets/people/lucas.jpg'),
  hugo: require('../../assets/people/hugo.jpg'),
  amelie: require('../../assets/people/amelie.jpg'),
  elin: require('../../assets/people/elin.jpg'),
  ayla: require('../../assets/people/ayla.jpg'),
  ingrid: require('../../assets/people/ingrid.jpg'),
  nina: require('../../assets/people/nina.jpg'),
  priya: require('../../assets/people/priya.jpg'),
  sofia: require('../../assets/people/sofia.jpg'),
  tobias: require('../../assets/people/tobias.jpg'),
  daniel: require('../../assets/people/daniel.jpg'),
  theo: require('../../assets/people/theo.jpg'),
  marek: require('../../assets/people/marek.jpg'),
  omar: require('../../assets/people/omar.jpg'),
} as const;

export type PersonId = keyof typeof personPhotos;

/** Card-glow gradient pair per person — the same values the HTML prototype used. */
export const personGlow: Record<PersonId, [string, string]> = {
  jonas: ['#c8a988', '#5e7a97'],
  mira: ['#a9c4d6', '#3e5f7e'],
  lucas: ['#b9c9b3', '#4a6b52'],
  hugo: ['#d9b48f', '#7a5a44'],
  priya: ['#e2c4a2', '#8a5a3c'],
  ayla: ['#c9b6d6', '#5f4a7a'],
  ingrid: ['#a8c8c2', '#2f6b64'],
  nina: ['#d6b3b3', '#7a3e4a'],
  sofia: ['#e3c6a8', '#8a5a2c'],
  tobias: ['#b8c4d6', '#3a4a6b'],
  daniel: ['#d4b89a', '#6b4a2a'],
  theo: ['#b3c6c9', '#3e5f66'],
  marek: ['#c6c2b3', '#5e5a4a'],
  amelie: ['#e0b7a3', '#7a4a52'],
  elin: ['#c4d0b3', '#4a6b3a'],
  omar: ['#c9c2b6', '#5a5346'],
};

export interface Person {
  id: PersonId;
  name: string;
  role: string;
  headline: string;
  pronoun: 'him' | 'her' | 'them';
  reasons: { icon: 'plane' | 'pin' | 'users' | 'car'; title: string; detail: string }[];
}

/**
 * The people the core screens actually show.
 *
 * A narrower id union than `PersonId` on purpose: the photo and glow maps
 * above cover the full 16-person seed cast (ready for Discover, Inbox, Trips
 * when those screens are built), but only three of them have match-reason
 * copy written yet. Typing this as `Record<PersonId, Person>` would force a
 * fake entry for the other 13 just to satisfy the compiler — worse than a
 * narrower, honest type.
 */
export type CorePersonId = 'jonas' | 'mira' | 'hugo';

export const PEOPLE: Record<CorePersonId, Person> = {
  jonas: {
    id: 'jonas',
    name: 'Jonas',
    role: 'Principal engineer, Northwind Grid. INSEAD.',
    headline: 'Grid engineer. Will talk about interconnectors for far too long.',
    pronoun: 'him',
    reasons: [
      { icon: 'plane', title: 'Same flight', detail: 'SQ317 tonight, lands Changi 17:00' },
      { icon: 'pin', title: 'Same way into town', detail: 'You are both headed for Marina Bay' },
      { icon: 'users', title: 'INSEAD', detail: 'You share a circle. He shows the badge.' },
    ],
  },
  mira: {
    id: 'mira',
    name: 'Mira',
    role: 'Product designer, Oslo.',
    headline: 'Back from a design sprint. Quiet flight, good coffee after.',
    pronoun: 'her',
    reasons: [
      { icon: 'plane', title: 'Same flight', detail: 'SQ317 tonight' },
      { icon: 'pin', title: 'Singapore until the 5th', detail: 'Tiong Bahru, a short ride from you' },
    ],
  },
  hugo: {
    id: 'hugo',
    name: 'Hugo',
    role: 'Architect, Lisbon.',
    headline: 'Nine hours in transit. I have read everything I brought.',
    pronoun: 'him',
    reasons: [
      { icon: 'plane', title: 'Same terminal, right now', detail: 'Terminal 2 until 21:15, then Johannesburg' },
    ],
  },
};
