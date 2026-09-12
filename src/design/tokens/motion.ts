import { Easing } from 'react-native';

/**
 * Motion tokens — ported from the web app's motion.css.
 *
 * React Native's Animated only takes an Easing function, not a raw bezier
 * string, so these are the same curves reconstructed with Easing.bezier().
 */
export const easing = {
  out: Easing.bezier(0.23, 1, 0.32, 1),
  inOut: Easing.bezier(0.77, 0, 0.175, 1),
  drawer: Easing.bezier(0.32, 0.72, 0, 1),
  exit: Easing.bezier(0.4, 0, 1, 1),
};

export const duration = {
  press: 120,
  fast: 160,
  base: 220,
  push: 280,
  sheet: 320,
  moment: 900,
};
