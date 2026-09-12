import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { StackScreenProps } from '../../navigation/types';
import { BackIcon, CheckIcon, EyeIcon, HandIcon } from '../../design/icons';
import { colors, radius, type } from '../../design/tokens';
import { usePrivacy } from '../../state/privacy';

type Props = StackScreenProps<'Privacy'>;

const RUNGS = [
  { icon: EyeIcon, title: 'Before hello', detail: 'First name, one sentence, your stamps, and which of your paths overlap.' },
  { icon: HandIcon, title: 'After hello', detail: 'Photo, employer, flight number, LinkedIn.' },
  { icon: CheckIcon, title: 'After you both say yes', detail: 'Seat, gate, exact time. Nothing more, ever.' },
];

export function PrivacyScreen({ navigation }: Props) {
  const { toggles, toggle } = usePrivacy();

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.nav}>
        <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn} hitSlop={8}>
          <BackIcon />
        </Pressable>
        <Text style={[type.bodyBold, { flex: 1, textAlign: 'center', fontSize: 15 }]}>Privacy</Text>
        <View style={{ width: 44 }} />
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={[type.d2, { color: colors.ink }]}>Revealed in steps, never all at once.</Text>
        <Text style={[type.small, { color: colors.muted, marginTop: 8, marginBottom: 20 }]}>
          Everyone sees the same ladder. You climb it together.
        </Text>

        <View style={styles.group}>
          {RUNGS.map((r, i) => (
            <View key={r.title} style={[styles.rung, i > 0 && styles.rungBorder]}>
              <View style={styles.rungIcon}>
                <r.icon size={15} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[type.body, { fontSize: 15, color: colors.ink }]}>{r.title}</Text>
                <Text style={[type.small, { color: colors.muted, marginTop: 2 }]}>{r.detail}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.h3}>Who can see you</Text>
        <View style={styles.group}>
          <ToggleRow title="Verified people only" detail="Only people with a government stamp can find you." on={toggles.verified} onToggle={() => toggle('verified')} />
          <ToggleRow title="Women only" detail="Hide you from anyone who is not a woman." on={toggles.women} onToggle={() => toggle('women')} />
          <ToggleRow title="My circles only" detail="INSEAD sees you. Nobody else does." on={toggles.circles} onToggle={() => toggle('circles')} />
          <ToggleRow title="Listed on trips" detail="Off means you can still say hello, but nobody can find you first." on={toggles.listed} onToggle={() => toggle('listed')} last />
        </View>

        <Text style={[type.small, { color: colors.secondary, marginTop: 16 }]}>
          Counts are rounded on purpose. On a four-person flight, &ldquo;2 hidden&rdquo; names both of
          them.
        </Text>
      </ScrollView>
    </View>
  );
}

function ToggleRow({
  title,
  detail,
  on,
  onToggle,
  last,
}: {
  title: string;
  detail: string;
  on: boolean;
  onToggle: () => void;
  last?: boolean;
}) {
  return (
    <View style={[styles.toggleRow, !last && styles.rungBorder]}>
      <View style={{ flex: 1 }}>
        <Text style={[type.body, { fontSize: 15, color: colors.ink }]}>{title}</Text>
        <Text style={[type.small, { color: colors.muted, marginTop: 2 }]}>{detail}</Text>
      </View>
      <Pressable
        onPress={onToggle}
        accessibilityRole="switch"
        accessibilityState={{ checked: on }}
        style={[styles.sw, on && styles.swOn]}
      >
        <View style={[styles.swKnob, on && styles.swKnobOn]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  nav: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingBottom: 8 },
  iconBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  body: { paddingHorizontal: 20, paddingBottom: 40 },
  group: { borderRadius: radius.md, overflow: 'hidden', backgroundColor: colors.surface },
  rung: { flexDirection: 'row', gap: 14, padding: 14, alignItems: 'flex-start' },
  rungBorder: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.hairline },
  rungIcon: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.accentWash, alignItems: 'center', justifyContent: 'center' },
  h3: { fontSize: 12.5, fontWeight: '700', letterSpacing: 0.4, color: colors.secondary, textTransform: 'uppercase', marginTop: 24, marginBottom: 8 },
  toggleRow: { flexDirection: 'row', gap: 14, alignItems: 'center', padding: 14 },
  sw: { width: 50, height: 30, borderRadius: 15, backgroundColor: 'rgba(26,34,51,0.16)', padding: 3, justifyContent: 'center' },
  swOn: { backgroundColor: colors.trust },
  swKnob: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#fff' },
  swKnobOn: { transform: [{ translateX: 20 }] },
});
