/**
 * Photo asset map.
 *
 * Metro (React Native's bundler) needs `require()` calls to be static and
 * literal — it cannot resolve a path built from a variable. So this file is
 * the one place that turns a photo id into an actual `require()`, and every
 * screen imports the id, never the path.
 *
 * Source images live in two places, on purpose (see assets/README.md):
 *   assets/photos/stock/            — atmosphere, not tied to a named airport
 *   assets/photos/airports/<CODE>/  — that airport's own photography, plus
 *                                     its destination city where the two are
 *                                     the same trip (CPH → Nyhavn, etc.)
 */

export const stockPhotos = {
  concourse: require('../../assets/photos/stock/concourse.jpg'),
  cloudsWindow: require('../../assets/photos/stock/clouds-window.jpg'),
  windowWarmLight: require('../../assets/photos/stock/window-warm-light.jpg'),
  taxiNight: require('../../assets/photos/stock/taxi-night.jpg'),
  passports: require('../../assets/photos/stock/passports.jpg'),
  runway: require('../../assets/photos/stock/runway.jpg'),
  departureBoard: require('../../assets/photos/stock/departure-board.jpg'),
  lounge: require('../../assets/photos/stock/lounge.jpg'),
  baggageCarousel: require('../../assets/photos/stock/baggage-carousel.jpg'),
  rainOnGlass: require('../../assets/photos/stock/rain-on-glass.jpg'),
  wayfinding: require('../../assets/photos/stock/wayfinding.jpg'),
  jetbridge: require('../../assets/photos/stock/jetbridge.jpg'),
  apronBlueHour: require('../../assets/photos/stock/apron-blue-hour.jpg'),
  terminalClock: require('../../assets/photos/stock/terminal-clock.jpg'),
  gateDusk: require('../../assets/photos/stock/gate-dusk.jpg'),
  blackCabDaytime: require('../../assets/photos/stock/black-cab-daytime.jpg'),
  blackCabNight: require('../../assets/photos/stock/black-cab-night.jpg'),
} as const;

export const airportPhotos = {
  OSL: {
    apronSnow: require('../../assets/photos/airports/OSL/apron-snow.jpg'),
    operaHouse: require('../../assets/photos/airports/OSL/opera-house.jpg'),
    citySunset: require('../../assets/photos/airports/OSL/city-sunset.jpg'),
    pier: require('../../assets/photos/airports/OSL/pier.jpg'),
    streetCrosswalk: require('../../assets/photos/airports/OSL/street-crosswalk.jpg'),
  },
  LHR: {
    terminal2Entrance: require('../../assets/photos/airports/LHR/terminal-2-entrance.jpg'),
    escalator: require('../../assets/photos/airports/LHR/escalator.jpg'),
    towerBridgeDusk: require('../../assets/photos/airports/LHR/tower-bridge-dusk.jpg'),
    citySkylineNight: require('../../assets/photos/airports/LHR/city-skyline-night.jpg'),
    citySkylineDawn: require('../../assets/photos/airports/LHR/city-skyline-dawn.jpg'),
  },
  CPH: {
    terminalExterior: require('../../assets/photos/airports/CPH/terminal-exterior.jpg'),
    terminalInterior: require('../../assets/photos/airports/CPH/terminal-interior.jpg'),
    nyhavn: require('../../assets/photos/airports/CPH/nyhavn.jpg'),
    cafeInRain: require('../../assets/photos/airports/CPH/cafe-in-rain.jpg'),
  },
  SIN: {
    jewelWaterfall: require('../../assets/photos/airports/SIN/jewel-waterfall.jpg'),
    jewelStation: require('../../assets/photos/airports/SIN/jewel-station.jpg'),
    marinaBaySkyline: require('../../assets/photos/airports/SIN/marina-bay-skyline.jpg'),
  },
  CDG: {
    terminal2eWalkway: require('../../assets/photos/airports/CDG/terminal-2e-walkway.jpg'),
    fontainebleauChateau: require('../../assets/photos/airports/CDG/fontainebleau-chateau.jpg'),
    fontainebleauForestRoad: require('../../assets/photos/airports/CDG/fontainebleau-forest-road.jpg'),
  },
} as const;

export type AirportCode = keyof typeof airportPhotos;
