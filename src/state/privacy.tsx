import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

/**
 * The privacy toggles, shared app-wide.
 *
 * `PrivacyScreen` used to hold these in its own `useState`, which meant
 * turning "Women only" or "My circles only" on had no effect anywhere else —
 * the toggle looked real but did nothing the moment you navigated away. This
 * context is the fix: one shared value, read by `DiscoverScreen` to actually
 * filter who shows up, so the setting does what its own copy promises.
 *
 * `verified` and `listed` stay stored here too, for the same one-shared-value
 * reason, but nothing filters on them yet — this seed cast has no `verified`
 * flag on `Person`, and "listed" describes how *other* people find *you*,
 * which this single-device preview has no second viewpoint to demonstrate.
 * Wiring either up for real is matching/domain work, not a UI correction.
 */

export interface PrivacyToggles {
  verified: boolean;
  women: boolean;
  circles: boolean;
  listed: boolean;
}

const DEFAULT_TOGGLES: PrivacyToggles = { verified: true, women: false, circles: false, listed: true };

interface PrivacyContextValue {
  toggles: PrivacyToggles;
  toggle: (key: keyof PrivacyToggles) => void;
}

const PrivacyContext = createContext<PrivacyContextValue | null>(null);

export function PrivacyProvider({ children }: { children: ReactNode }) {
  const [toggles, setToggles] = useState<PrivacyToggles>(DEFAULT_TOGGLES);
  const value = useMemo<PrivacyContextValue>(
    () => ({
      toggles,
      toggle: (key) => setToggles((t) => ({ ...t, [key]: !t[key] })),
    }),
    [toggles],
  );
  return <PrivacyContext.Provider value={value}>{children}</PrivacyContext.Provider>;
}

export function usePrivacy(): PrivacyContextValue {
  const ctx = useContext(PrivacyContext);
  if (!ctx) throw new Error('usePrivacy() must be used inside <PrivacyProvider>.');
  return ctx;
}
