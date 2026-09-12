# Wingman — native prototype

A React Native (Expo) rebuild of the "Gate 4, 05:40" visual prototype, built to
run on a real phone via Expo Go — not a web mockup, not a base64-embedded
single HTML file. This is a **separate, standalone project**: it does not
touch or replace the real Wingman web app (`../wingman/`, Vite + React), which
stays the production codebase.

## Run it on your phone

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

## What's built, and what isn't

Four screens, wired together with real navigation and real motion:

| Screen | What it shows |
|---|---|
| Welcome | Full-bleed concourse photo, the slow photo-settle entrance |
| Home | The gate photo band, the journey card, the "hello back" notice, the flagship match card |
| Person | The tall photo hero, match reasons, stamps, the Say-hello bottom sheet |
| Moment | The one choreographed screen — animated route line, staggered reveal |

**Not built yet**, on purpose — this was the "core flow" pass, not the whole
app: Sign up, Discover, Inbox, Chat, Trips, Event, Profile, Privacy. The
bottom tab bar (`src/design/components/TabBar.tsx`) is a visual stand-in —
swap it for `@react-navigation/bottom-tabs` once those screens exist; nothing
about the four built screens needs to change to support that.

## Folder structure

```
wingman-native/
├── App.tsx                    Entry point: font loading, navigation root
├── app.json                   Expo config
│
├── src/
│   ├── design/                 ── THE DESIGN TEMPLATE ──
│   │   ├── tokens/              Colour, spacing, type, motion — the only
│   │   │                        place a literal colour or animation curve
│   │   │                        may be written. Everything imports from here.
│   │   ├── components/          Avatar, Button, Card, Pill, TabBar, HelloSheet
│   │   └── icons/                One SVG icon set, one stroke weight
│   │
│   ├── screens/                 One folder per screen area
│   │   ├── welcome/
│   │   ├── home/
│   │   ├── person/
│   │   └── moment/
│   │
│   ├── navigation/              Route params + the stack navigator
│   │
│   └── data/                    Seed content: people, the flagship journey,
│                                 and the photo asset map (turns an id into
│                                 a require() — Metro needs static paths)
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
            └── SIN/               Singapore Changi + the Marina Bay skyline
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
2. Add its route to `RootStackParamList` in `src/navigation/types.ts`.
3. Register it in `src/navigation/RootNavigator.tsx`.

## Design system

Ported token-for-token from the real web app's "Gate 4, 05:40" direction:
canvas `#eceff4`, ink `#1a2233`, one warm accent `#8f4a1c`, Spectral for
display type, Atkinson Hyperlegible for body text. See
`src/design/tokens/colors.ts` for the full palette and the reasoning behind
each choice.

**Not carried over from the web prototype:** a dark theme. This is a single,
deliberately-committed light world, same as the HTML version before it.

## Known limitation of this pass

The bottom tab bar is visual only (see table above) — there is no
`bottom-tabs` navigator yet, because only Home has a real screen behind it.
