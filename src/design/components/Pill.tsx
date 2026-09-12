import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, type } from '../tokens';

type Tone = 'accent' | 'trust' | 'amber' | 'quiet';

const TONE_STYLE: Record<Tone, { bg: string; fg: string }> = {
  accent: { bg: colors.accentWash, fg: colors.accent },
  trust: { bg: colors.trustWash, fg: colors.trust },
  amber: { bg: colors.amberWash, fg: colors.amber },
  quiet: { bg: 'rgba(26,34,51,0.06)', fg: colors.muted },
};

/** A small state or reason label. Colour is never the only signal — every pill carries a label. */
export function Pill({ children, tone = 'accent' }: { children: string; tone?: Tone }) {
  const t = TONE_STYLE[tone];
  return (
    <View style={[styles.pill, { backgroundColor: t.bg }]}>
      <Text style={[type.label, { color: t.fg, fontWeight: '700' }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
});
