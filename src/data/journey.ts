/**
 * The flagship scenario: one evening, London Heathrow to Singapore, on
 * flight SQ317 — the same red-eye the real Wingman web app's seed data uses.
 * Kept as one small file rather than a full matching-engine port, since the
 * native prototype's job is the screens and motion, not re-deriving the
 * engine that already exists in the web app.
 */
export const MY_JOURNEY = {
  from: 'LHR',
  to: 'SIN',
  flightNo: 'SQ317',
  departLabel: 'Tonight 21:00',
  arriveLabel: 'lands 17:00 tomorrow',
  gate: 'Gate 4',
  terminal: 'Heathrow, Terminal 2',
  boardingIn: 'Boarding in 40 minutes',
  staySummary: '3 to 6 Sept in Singapore',
};

export const MOMENT = {
  personId: 'jonas' as const,
  headline: 'Jonas said hello back.',
  body:
    'You are on the same flight, you both land at Changi at 17:00, and you are both headed for Marina Bay. Share the ride in.',
  route: [
    { label: 'LHR 21:00', emphasis: false },
    { label: 'SIN T3, 17:00', emphasis: true },
    { label: 'Marina Bay', emphasis: false },
  ],
  meetNote: 'Taxi rank, Terminal 3. About 25 minutes together.',
};

/** The second trip on the Trips screen — the INSEAD Fontainebleau weekend. */
export const FONTAINEBLEAU_TRIP = {
  from: 'OSL',
  to: 'CDG',
  flightNo: 'SK1732',
  landsLabel: 'lands 18:40',
  stayLabel: 'Campus weekend, two nights',
  city: 'Fontainebleau',
  seatsLeft: 1,
  totalSeats: 3,
  costPerHead: 50,
  costTotal: 150,
  pickup: 'Taxi rank, Terminal 2E. About 55 minutes to campus, forest roads most of the way.',
};

/** Discover's lens chips — grouping the seed cast by why they surface. */
export const LENSES: {
  key: string;
  label: string;
  ids: import('./people').PersonId[];
  note: string;
}[] = [
  { key: 'flight', label: 'Same flight', ids: ['jonas', 'mira', 'lucas'], note: 'A few people on this flight are hidden from you by their settings.' },
  { key: 'airport', label: 'Same terminal', ids: ['hugo', 'priya'], note: 'Omar is connecting through Terminal 5 with 85 minutes. Not enough for a coffee, so he is not shown.' },
  { key: 'city', label: 'Singapore this week', ids: ['ayla', 'ingrid', 'nina', 'sofia', 'tobias', 'daniel', 'theo', 'marek'], note: 'Ordered by overlap. Nobody is scored where you can see it.' },
  { key: 'insead', label: 'INSEAD', ids: ['amelie', 'jonas'], note: 'Reunion week. Only members who chose to show the badge appear here.' },
  { key: 'gridweek', label: 'Grid Week', ids: ['elin', 'jonas'], note: 'This circle closes on the 6th. After that it matches nobody.' },
];
