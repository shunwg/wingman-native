import type { CorePersonId } from '../data/people';

/**
 * One param list for the whole app. Kept in its own file so a screen can
 * import its own params without importing the navigator itself — the same
 * "screens never import each other directly" boundary the web app enforces.
 */
export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Person: { personId: CorePersonId };
  Moment: undefined;
};
