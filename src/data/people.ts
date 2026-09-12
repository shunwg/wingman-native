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

export type ReasonIcon = 'plane' | 'pin' | 'users' | 'car' | 'cup';

export interface Person {
  id: PersonId;
  name: string;
  role: string;
  headline: string;
  pronoun: 'him' | 'her' | 'them';
  why: string;
  reasons: { icon: ReasonIcon; title: string; detail: string }[];
}

/**
 * The full seed cast — ported 1:1 from the HTML prototype's PEOPLE object so
 * Discover, Inbox and Event carry the same people and copy, not a smaller
 * placeholder set.
 */
export const PEOPLE: Record<PersonId, Person> = {
  jonas: {
    id: 'jonas', name: 'Jonas', role: 'Principal engineer, Northwind Grid. INSEAD.',
    headline: 'Grid engineer. Will talk about interconnectors for far too long.', pronoun: 'him',
    why: 'Same flight. Both headed for Marina Bay.',
    reasons: [
      { icon: 'plane', title: 'Same flight', detail: 'SQ317 tonight, lands Changi 17:00' },
      { icon: 'pin', title: 'Same way into town', detail: 'You are both headed for Marina Bay' },
      { icon: 'users', title: 'INSEAD', detail: 'You share a circle. He shows the badge.' },
    ],
  },
  mira: {
    id: 'mira', name: 'Mira', role: 'Product designer, Oslo.',
    headline: 'Back from a design sprint. Quiet flight, good coffee after.', pronoun: 'her',
    why: 'Same flight. Tiong Bahru until the 5th.',
    reasons: [
      { icon: 'plane', title: 'Same flight', detail: 'SQ317 tonight' },
      { icon: 'pin', title: 'Singapore until the 5th', detail: 'Tiong Bahru, a short ride from you' },
    ],
  },
  lucas: {
    id: 'lucas', name: 'Lucas', role: 'Consultant, London.',
    headline: 'Same flight, apparently. I have the aisle and no strong opinions.', pronoun: 'him',
    why: 'Same flight. Sentosa for one night.',
    reasons: [
      { icon: 'plane', title: 'Same flight', detail: 'SQ317 tonight' },
      { icon: 'cup', title: 'Coffee at the gate', detail: 'You are both open to it' },
    ],
  },
  hugo: {
    id: 'hugo', name: 'Hugo', role: 'Architect, Lisbon.',
    headline: 'Nine hours in transit. I have read everything I brought.', pronoun: 'him',
    why: 'Same terminal now. His flight leaves before yours.',
    reasons: [
      { icon: 'plane', title: 'Same terminal, right now', detail: 'Terminal 2 until 21:15, then Johannesburg' },
      { icon: 'cup', title: 'Coffee at the gate', detail: 'Ten hours in transit, and he asked first' },
    ],
  },
  priya: {
    id: 'priya', name: 'Priya', role: 'Editor, Delhi.',
    headline: 'Long layover, no lounge access, excellent podcast recommendations.', pronoun: 'her',
    why: 'Same terminal, connecting to Accra.',
    reasons: [
      { icon: 'plane', title: 'Same terminal, right now', detail: 'Terminal 2 until 21:30' },
      { icon: 'cup', title: 'Coffee at the gate', detail: 'She is open to it' },
    ],
  },
  ayla: {
    id: 'ayla', name: 'Ayla', role: 'Researcher, Istanbul.',
    headline: 'First time through Changi. Open to a coffee before the red-eye.', pronoun: 'her',
    why: 'Lands 15 minutes after you, Orchard.',
    reasons: [
      { icon: 'plane', title: 'Lands right after you', detail: 'EK354, Changi T3 at 17:15' },
      { icon: 'pin', title: 'Orchard', detail: 'Twenty minutes from you' },
    ],
  },
  ingrid: {
    id: 'ingrid', name: 'Ingrid', role: 'Engineer, Oslo.',
    headline: 'Landing late, sharing a cab into town if anyone is going my way.', pronoun: 'her',
    why: 'From Oslo, lands 20 minutes after you.',
    reasons: [
      { icon: 'plane', title: 'Lands right after you', detail: 'SK975 from Oslo, T3 at 17:20' },
      { icon: 'car', title: 'Share the ride in', detail: 'She asked for exactly this' },
    ],
  },
  nina: {
    id: 'nina', name: 'Nina', role: 'Lawyer, Stockholm.',
    headline: 'Travelling alone a lot this year. Women only, and I mean it.', pronoun: 'her',
    why: 'In Singapore all week. Women only, which includes you.',
    reasons: [
      { icon: 'pin', title: 'Singapore this week', detail: 'Orchard, 3 to 6 Sept' },
      { icon: 'users', title: 'Women only', detail: 'You can see her because you are one' },
    ],
  },
  sofia: {
    id: 'sofia', name: 'Sofia', role: 'Investor, Milan.',
    headline: 'Only meeting people who have verified who they are. No offence.', pronoun: 'her',
    why: 'Verified only. Your BankID stamp opened the door.',
    reasons: [
      { icon: 'pin', title: 'Singapore this week', detail: 'Raffles Place, 3 to 5 Sept' },
      { icon: 'users', title: 'Verified only', detail: 'Your BankID stamp is why you can see her' },
    ],
  },
  tobias: {
    id: 'tobias', name: 'Tobias', role: 'Director, Berlin.',
    headline: 'Here to work, not to socialise. Happy to make an introduction.', pronoun: 'him',
    why: 'Professional only. Business introduction.',
    reasons: [
      { icon: 'pin', title: 'Singapore, 4 to 6 Sept', detail: 'Tanjong Pagar' },
      { icon: 'users', title: 'Business introduction', detail: 'The only kind he is open to' },
    ],
  },
  daniel: {
    id: 'daniel', name: 'Daniel', role: 'Founder, Lagos.',
    headline: 'Three days, no plans after six. Would like that to change.', pronoun: 'him',
    why: 'Same week, Geylang.',
    reasons: [
      { icon: 'pin', title: 'Singapore this week', detail: 'Geylang, 3 to 7 Sept' },
      { icon: 'cup', title: 'A meal or drinks', detail: 'Open to both' },
    ],
  },
  theo: {
    id: 'theo', name: 'Theo', role: 'Developer, Helsinki.',
    headline: 'In town for three days. Would rather cowork than sightsee.', pronoun: 'him',
    why: 'Six days of overlap. Coworking is on the table.',
    reasons: [
      { icon: 'pin', title: 'Singapore, 2 to 8 Sept', detail: 'Jurong East' },
      { icon: 'users', title: 'Coworking', detail: 'Six days is long enough to make it worth it' },
    ],
  },
  marek: {
    id: 'marek', name: 'Marek', role: 'Analyst, Warsaw.',
    headline: 'Here for a week. Looking for a desk and someone to complain about it with.', pronoun: 'him',
    why: 'A week in one-north.',
    reasons: [
      { icon: 'pin', title: 'Singapore, 2 to 9 Sept', detail: 'one-north' },
      { icon: 'users', title: 'Coworking', detail: 'He is looking for a desk' },
    ],
  },
  amelie: {
    id: 'amelie', name: 'Amélie', role: 'Strategy, Paris. INSEAD.',
    headline: 'INSEAD reunion week. I would rather meet one new person than ten old ones.', pronoun: 'her',
    why: 'INSEAD reunion. Same week in Singapore.',
    reasons: [
      { icon: 'users', title: 'INSEAD', detail: 'Reunion week, same circle' },
      { icon: 'pin', title: 'Singapore this week', detail: 'Marina Bay' },
    ],
  },
  elin: {
    id: 'elin', name: 'Elin', role: 'Speaker, Grid Week. Northwind Grid.',
    headline: 'At Grid Week and I know nobody. Someone please have a coffee with me.', pronoun: 'her',
    why: 'Grid Week speaker. She asked first.',
    reasons: [
      { icon: 'users', title: 'Grid Week', detail: 'Speaker badge, Marina Bay Sands' },
      { icon: 'cup', title: 'Coffee', detail: 'She said so in her sentence' },
    ],
  },
  omar: {
    id: 'omar', name: 'Omar', role: 'Consultant, Dubai.',
    headline: 'Connecting through, two hours, different terminal. Realistic about it.', pronoun: 'him',
    why: 'Connecting through Heathrow, 85 usable minutes.',
    reasons: [
      { icon: 'plane', title: 'Different terminal', detail: 'Terminal 5 to Terminal 2 — tight, but real' },
    ],
  },
};

/** Retained name for the four screens that only need the flagship trio. */
export type CorePersonId = PersonId;
