import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { TabScreenProps } from '../../navigation/types';
import { Avatar } from '../../design/components';
import { ChevronIcon } from '../../design/icons';
import { colors, radius, type } from '../../design/tokens';
import { PEOPLE, personGlow, personPhotos, type PersonId } from '../../data/people';
import { LENSES } from '../../data/journey';
import { usePrivacy } from '../../state/privacy';

type Props = TabScreenProps<'Discover'>;

const INSEAD_IDS = LENSES.find((l) => l.key === 'insead')!.ids;

export function DiscoverScreen({ navigation }: Props) {
  const [active, setActive] = useState(LENSES[0]!.key);
  const lens = LENSES.find((l) => l.key === active)!;
  const { toggles } = usePrivacy();

  /*
   * "Women only" and "My circles only" on the Privacy screen used to be
   * cosmetic — flipping them changed nothing here. This is the fix: the two
   * settings that describe who you see (as opposed to "Verified people only"
   * and "Listed on trips", which describe how *others* find *you*, and have
   * no data in this seed cast to filter on) now actually narrow the board,
   * symmetric with how the real settings would work both ways.
   *
   * There is no `gender` field on `Person` — `pronoun` is the closest proxy
   * this data model has, so "woman" reads as `pronoun === 'her'`.
   */
  const visibleIds = lens.ids.filter(
    (id) =>
      (!toggles.women || PEOPLE[id].pronoun === 'her') &&
      (!toggles.circles || INSEAD_IDS.includes(id)),
  );
  const hiddenCount = lens.ids.length - visibleIds.length;

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.head}>
        <Text style={[type.d2, { color: colors.ink }]}>Discover</Text>
        <Text style={[type.small, { color: colors.muted, marginTop: 6 }]}>
          Ordered by how much your paths overlap. Never by looks.
        </Text>
      </SafeAreaView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.lensRow}
        style={{ flexGrow: 0 }}
      >
        {LENSES.map((l) => {
          const on = l.key === active;
          return (
            <Pressable
              key={l.key}
              onPress={() => setActive(l.key)}
              style={[styles.lens, on && styles.lensOn]}
            >
              <Text style={[type.small, { color: on ? '#ffffff' : colors.ink, fontWeight: '500' }]}>
                {l.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {visibleIds.map((id) => (
          <DiscoverRow key={id} id={id} onPress={() => navigation.navigate('Person', { personId: id })} />
        ))}
        <Text style={[type.label, styles.note]}>{lens.note}</Text>
        {hiddenCount > 0 && (
          <Text style={[type.label, styles.note]}>
            {hiddenCount} more hidden by your privacy settings.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

function DiscoverRow({ id, onPress }: { id: PersonId; onPress: () => void }) {
  const p = PEOPLE[id];
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
      <Avatar source={personPhotos[id]} size="chip" glowFrom={personGlow[id][0]} glowTo={personGlow[id][1]} />
      <View style={{ flex: 1 }}>
        <Text style={[type.bodyBold, { fontSize: 16 }]}>{p.name}</Text>
        <Text style={[type.body, { fontFamily: type.d3.fontFamily, fontSize: 14, marginTop: 3 }]}>{p.headline}</Text>
        <Text style={[type.label, { marginTop: 6 }]}>{p.why}</Text>
      </View>
      <ChevronIcon />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  head: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 8 },
  lensRow: { gap: 8, paddingHorizontal: 20, paddingBottom: 12 },
  lens: {
    minHeight: 40,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lensOn: { backgroundColor: colors.ink, borderColor: colors.ink },
  row: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    padding: 14,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  rowPressed: { transform: [{ scale: 0.98 }] },
  note: { marginHorizontal: 20, marginTop: 14, color: colors.secondary },
});
