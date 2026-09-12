import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { TabScreenProps } from '../../navigation/types';
import { Avatar } from '../../design/components';
import { colors, type } from '../../design/tokens';
import { personGlow, personPhotos } from '../../data/people';

type Props = TabScreenProps<'Inbox'>;

interface Row {
  key: string;
  group: string;
  personId: 'jonas' | 'hugo' | 'amelie' | 'mira';
  name: string;
  time: string;
  line: string;
  unread: boolean;
  onPress: (nav: Props['navigation']) => void;
}

const ROWS: Row[] = [
  {
    key: 'jonas',
    group: 'Said yes',
    personId: 'jonas',
    name: 'Jonas',
    time: '20:52',
    line: 'Taxi rank at T3 works. I will be the one with the too-big suitcase.',
    unread: true,
    onPress: (nav) => nav.navigate('Chat'),
  },
  {
    key: 'hugo',
    group: 'New hellos',
    personId: 'hugo',
    name: 'Hugo',
    time: '20:31',
    line: 'Coffee before your flight? I have found the only decent espresso in T2.',
    unread: true,
    onPress: (nav) => nav.navigate('Person', { personId: 'hugo' }),
  },
  {
    key: 'amelie',
    group: 'Waiting',
    personId: 'amelie',
    name: 'Amélie',
    time: 'Yesterday',
    line: 'You said hello. She has not opened it yet.',
    unread: false,
    onPress: (nav) => nav.navigate('Person', { personId: 'amelie' }),
  },
  {
    key: 'mira',
    group: 'Waiting',
    personId: 'mira',
    name: 'Mira',
    time: 'Mon',
    line: 'Not this time. Politely.',
    unread: false,
    onPress: (nav) => nav.navigate('Person', { personId: 'mira' }),
  },
];

export function InboxScreen({ navigation }: Props) {
  let lastGroup = '';
  return (
    <View style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.head}>
        <Text style={[type.d2, { color: colors.ink }]}>Inbox</Text>
      </SafeAreaView>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {ROWS.map((r) => {
          const showGroup = r.group !== lastGroup;
          lastGroup = r.group;
          return (
            <View key={r.key}>
              {showGroup && <Text style={styles.group}>{r.group}</Text>}
              <Pressable
                onPress={() => r.onPress(navigation)}
                style={({ pressed }) => [styles.row, pressed && { opacity: 0.85 }]}
              >
                <Avatar
                  source={personPhotos[r.personId]}
                  size="sm"
                  glowFrom={personGlow[r.personId][0]}
                  glowTo={personGlow[r.personId][1]}
                />
                <View style={{ flex: 1 }}>
                  <View style={styles.rowTop}>
                    <Text style={[type.bodyBold, { fontSize: 16 }]}>{r.name}</Text>
                    <Text style={[type.mono, { fontSize: 12, color: colors.secondary }]}>{r.time}</Text>
                  </View>
                  <Text
                    style={[type.small, { color: r.unread ? colors.ink : colors.muted, marginTop: 2 }]}
                    numberOfLines={1}
                  >
                    {r.line}
                  </Text>
                </View>
                {r.unread && <View style={styles.unreadDot} />}
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  head: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4 },
  group: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 4,
    fontSize: 12.5,
    fontWeight: '700',
    letterSpacing: 0.4,
    color: colors.secondary,
    textTransform: 'uppercase',
  },
  row: { flexDirection: 'row', gap: 14, alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent },
});
