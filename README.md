# Wingman — native prototype

A React Native (Expo) rebuild of the "Gate 4, 05:40" visual prototype, built to
run on a real phone via Expo Go — not a web mockup, not a base64-embedded
single HTML file. This is a **separate, standalone project**: it does not
touch or replace the real Wingman web app (`../wingman/`, Vite + React), which
stays the production codebase.

## Test it right now, from this link

**[shunwg.github.io/wingman-native](https://shunwg.github.io/wingman-native/)**

Opens the app running in any browser — no install, no phone, no account. It's
the same React Native code as the phone build below, compiled to web via
`react-native-web`, so navigation, the Moment screen's animated route line,
and every screen work the same way. Two things are genuinely different from
a phone: gestures are mouse/trackpad rather than touch, and animations run on
JavaScript instead of the native driver, so they're a shade less smooth.

This page rebuilds itself automatically: push a change to `master` and a
GitHub Action re-exports `docs/` and redeploys within a couple of minutes —
see `.github/workflows/deploy-pages.yml`. To rebuild it yourself locally:

```bash
npm run build:pages
```

## Run it on your phone, for the real thing

```bash
npm install
npm start
```

This starts the Expo dev server and prints a QR code in the terminal.

1. Install **Expo Go** on your phone (App Store / Play Store).
2. Scan the QR code — iPhone: with the Camera app; Android: with the Expo Go
   app's own scanner.
3. The app opens and hot-reloads as you edit code.

No Xcode, no Android Studio, no cables required for this. `npm run ios` /
`npm run android` are also available if you have a simulator installed.

## What's built

Thirteen screens, wired together with a real `@react-navigation/bottom-tabs`
tab bar nested inside a native stack — every tab actually switches, every
button actually navigates:

| Screen | What it shows |
|---|---|
| Welcome | Full-bleed concourse photo, the slow photo-settle entrance |
| Home *(tab)* | The gate photo band, the journey card, the "hello back" notice, the flagship match card |
| Discover *(tab)* | Lens chips (same flight, same terminal, INSEAD, …) filtering the match list |
| Inbox *(tab)* | Conversation rows grouped by said-yes / new-hellos / waiting |
| Trips *(tab)* | Upcoming trips, the Fontainebleau shared-car card, ports, circles and events |
| Profile *(tab, "You")* | Identity, stamps and circles, privacy summary, sign out |
| Person | The tall photo hero, match reasons, stamps, the Say-hello bottom sheet |
| Moment | The one choreographed screen — animated route line, staggered reveal |
| Chat | 1:1 thread with a plan proposal that crossfades pending → confirmed |
| Car | The Fontainebleau scenario's centerpiece — claim the last seat, cost split, route rail |
| CarChat | The claimed car's group chat, with a persistent split-cost strip |
| Event | A circle/event's detail page |
| Privacy | The reveal-in-steps ladder plus its toggles |

**Not built yet:** Sign up (Welcome's second button is a no-op placeholder).

## Folder structure

```
wingman-native/
├── App.tsx                    Entry point: font loading, navigation root
├── app.json                   Expo config
├── docs/                      The web export GitHub Pages serves — generated,
│                               never hand-edited; see "Test it right now" above
├── scripts/
│   └── fix-web-base-path.js   Rewrites exported asset paths for Pages' subpath
├── .github/workflows/
│   └── deploy-pages.yml       Rebuilds docs/ on every push to master
│
├── src/
│   ├── design/                 ── THE DESIGN TEMPLATE ──
│   │   ├── tokens/              Colour, spacing, type, motion — the only
│   │   │                        place a literal colour or animation curve
│   │   │                        may be written. Everything imports from here.
│   │   ├── components/          Avatar, Button, Card, Pill, HelloSheet
│   │   └── icons/                One SVG icon set, one stroke weight
│   │
│   ├── screens/                 One folder per screen area
│   │   ├── welcome/
│   │   ├── home/                    ┐
│   │   ├── discover/                │
│   │   ├── inbox/                   ├─ the five bottom-tab screens
│   │   ├── trips/                   │
│   │   ├── profile/                 ┘
│   │   ├── person/
│   │   ├── moment/
│   │   ├── chat/
│   │   ├── car/                     ┐ the Fontainebleau shared-car
│   │   ├── carchat/                 ┘ scenario
│   │   ├── event/
│   │   └── privacy/
│   │
│   ├── navigation/              Route params + the tab and stack navigators
│   │                             (RootNavigator.tsx nests a bottom-tabs
│   │                             navigator, MainTabs, inside the root stack)
│   │
│   └── data/                    Seed content: all 16 people, the flagship
│                                 journey (incl. the Fontainebleau trip and
│                                 its discover-lens groupings), and the photo
│                                 asset map (turns an id into a require() —
│                                 Metro needs static paths)
│
└── assets/
    ├── app-icons/               ── EXPO/APP CHROME ──
    │                             App icon, adaptive icon layers, splash,
    │                             web favicon. Referenced from app.json only.
    │
    ├── people/                  ── SEED CAST PORTRAITS ──
    │                             One photo per seeded person. Generated
    │                             likenesses, never a real stranger's photo.
    │
    └── photos/                  ── PLACE PHOTOGRAPHY, in two clearly split trees ──
        ├── stock/                Atmosphere shots not tied to a named airport
        │                         (a concourse, a lounge, a departure board,
        │                         a jetbridge). Reusable across any city.
        │
        └── airports/             One folder per airport, by IATA code.
            ├── OSL/               Oslo Gardermoen + Oslo city
            ├── LHR/               London Heathrow + London city
            ├── CPH/               Copenhagen Airport + Copenhagen city
            ├── SIN/               Singapore Changi + the Marina Bay skyline
            └── CDG/               Paris CDG Terminal 2E + Fontainebleau
                                    chateau and forest road, for the shared-
                                    car scenario
```

### Adding a new airport's photography

Ready to scale, as asked. To add a fifth city:

1. `mkdir assets/photos/airports/<CODE>` (the IATA code, e.g. `AMS`).
2. Drop the licensed photos in.
3. Add a `<CODE>: { ... }` block to `airportPhotos` in `src/data/photos.ts`,
   one `require()` per file — Metro's bundler needs each path written out
   literally, so this file is the one place that ever changes for a new city.
4. Reference `airportPhotos.AMS.whatever` from any screen.

### Adding a new screen

1. `mkdir src/screens/<name>` and write `<Name>Screen.tsx` there, importing
   only from `src/design/` and `src/data/` — never from another screen.
2. Add its route to `RootStackParamList` (or, if it belongs on the bottom
   tab bar, `MainTabParamList`) in `src/navigation/types.ts`, and use the
   matching `StackScreenProps<'Name'>` / `TabScreenProps<'Name'>` prop type.
3. Register it in `src/navigation/RootNavigator.tsx` — a tab screen inside
   `MainTabs()`'s `<Tab.Navigator>`, everything else as a `<Stack.Screen>`.
   A screen nested in a tab can still call `navigation.navigate('Person')`
   etc. directly: React Navigation bubbles an unrecognised route name up to
   the parent stack automatically, no `getParent()` plumbing needed.

## Design system

Ported token-for-token from the real web app's "Gate 4, 05:40" direction:
canvas `#eceff4`, ink `#1a2233`, one warm accent `#8f4a1c`, Spectral for
display type, Atkinson Hyperlegible for body text. See
`src/design/tokens/colors.ts` for the full palette and the reasoning behind
each choice.

**Not carried over from the web prototype:** a dark theme. This is a single,
deliberately-committed light world, same as the HTML version before it.
