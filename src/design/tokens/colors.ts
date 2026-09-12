/**
 * Colour tokens — the "Gate 4, 05:40" direction.
 *
 * Single light theme, deliberately. Nothing outside this file may write a
 * literal colour — every component imports from here, the same rule the real
 * Wingman web app follows in src/design/tokens/.
 */
export const colors = {
  canvas: '#eceff4',
  surface: '#f7f8fb',
  raised: '#ffffff',

  ink: '#1a2233',
  muted: '#4d566a',
  secondary: '#8a94a6',

  hairline: 'rgba(26,34,51,0.08)',

  accent: '#8f4a1c',
  accentPressed: '#7a3e17',
  accentWash: '#f3e6dc',

  trust: '#2f6b4f',
  trustWash: '#e2eee7',

  amber: '#b8781e',
  amberWash: '#f6ecd8',

  onPhoto: '#ffffff',
  scrimDark: 'rgba(14,21,32,0.55)',

  /** The one deliberately dark screen — Welcome and the Moment reveal. */
  night: '#0f1622',
} as const;

export type ColorToken = keyof typeof colors;
