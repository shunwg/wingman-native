/**
 * Type scale.
 *
 * Display face is Spectral (light, editorial); body is Atkinson Hyperlegible
 * (built for legibility at small sizes — the same rationale the Braille
 * Institute designed it for suits a screen read at a gate). Font family
 * strings match the keys returned by useFonts() in App.tsx.
 */
export const fonts = {
  display: 'Spectral_300Light',
  displayItalic: 'Spectral_300Light_Italic',
  body: 'AtkinsonHyperlegible_400Regular',
  bodyBold: 'AtkinsonHyperlegible_700Bold',
} as const;

export const type = {
  d1: { fontFamily: fonts.display, fontSize: 34, lineHeight: 38 },
  d2: { fontFamily: fonts.display, fontSize: 28, lineHeight: 32 },
  d3: { fontFamily: fonts.display, fontSize: 22, lineHeight: 26 },
  body: { fontFamily: fonts.body, fontSize: 15, lineHeight: 21 },
  bodyBold: { fontFamily: fonts.bodyBold, fontSize: 15, lineHeight: 21 },
  small: { fontFamily: fonts.body, fontSize: 13, lineHeight: 18 },
  label: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 16 },
  mono: { fontFamily: 'Menlo', fontSize: 13, lineHeight: 18 },
} as const;
