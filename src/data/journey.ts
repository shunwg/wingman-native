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
