import { StyleSheet, Text, View } from 'react-native';
import { colors, type } from '../tokens';

/**
 * Visual only, for now.
 *
 * Only Home is a built screen in this pass (see README at the project
 * root for what else is stubbed) — Discover, Inbox, Trips and You need
 * their own screens before this becomes a real tab navigator. Swap this
 * for @react-navigation/bottom-tabs's <Tab.Navigator> once they exist;
 * nothing else about the screens needs to change to support that.
 */
const TABS = ['Home', 'Discover', 'Inbox', 'Trips', 'You'] as const;

export function TabBar({ active = 'Home' as (typeof TABS)[number] }) {
  return (
    <View style={styles.bar}>
      {TABS.map((t) => (
        <View key={t} style={styles.item}>
          <View style={[styles.dot, t === active && styles.dotActive]} />
          <Text style={[type.label, { color: t === active ? colors.accent : colors.muted }]}>{t}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.hairline,
  },
  item: { alignItems: 'center', gap: 4, minWidth: 44, minHeight: 44 },
  dot: { width: 22, height: 22, borderRadius: 6, backgroundColor: 'rgba(26,34,51,0.12)' },
  dotActive: { backgroundColor: colors.accentWash },
});
