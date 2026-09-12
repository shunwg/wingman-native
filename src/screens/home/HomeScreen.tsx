import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { Avatar, Button, Card, Pill, TabBar } from '../../design/components';
import { CarIcon, ChevronIcon } from '../../design/icons';
import { colors, radius, type } from '../../design/tokens';
import { stockPhotos } from '../../data/photos';
import { PEOPLE, personGlow, personPhotos } from '../../data/people';
import { MY_JOURNEY } from '../../data/journey';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const jonas = PEOPLE.jonas;

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View style={styles.band}>
          <Image source={stockPhotos.gateDusk} resizeMode="cover" style={StyleSheet.absoluteFill} />
          <LinearGradient
            colors={['rgba(236,239,244,0.05)', 'rgba(236,239,244,0)', 'rgba(236,239,244,0.55)', colors.canvas]}
            locations={[0, 0.4, 0.74, 1]}
            style={StyleSheet.absoluteFill}
          />
          <SafeAreaView edges={['top']} style={styles.onPhoto}>
            <Text style={styles.greet}>
              Good evening, <Text style={{ fontStyle: 'italic' }}>Alex.</Text>
            </Text>
            <Text style={[type.small, { color: colors.muted }]}>
              {MY_JOURNEY.terminal}. {MY_JOURNEY.boardingIn}.
            </Text>
          </SafeAreaView>
        </View>

        <Card style={styles.journeyCard}>
          <View style={styles.journeyTop}>
            <Text style={styles.route}>
              {MY_JOURNEY.from} <Text style={styles.routeTo}>to</Text> {MY_JOURNEY.to}
            </Text>
            <Text style={[type.mono, { color: colors.muted }]}>{MY_JOURNEY.flightNo}</Text>
          </View>
          <Text style={[type.small, { color: colors.muted, marginTop: 4 }]}>
            {MY_JOURNEY.departLabel}, {MY_JOURNEY.arriveLabel}. {MY_JOURNEY.gate}.
          </Text>
          <View style={styles.journeyFoot}>
            <View style={styles.boardingRow}>
              <View style={styles.liveDot} />
              <Text style={[type.bodyBold, { color: colors.amber, fontSize: 13 }]}>Boarding 21:00</Text>
            </View>
            <Text style={[type.small, { color: colors.muted }]}>{MY_JOURNEY.staySummary}</Text>
          </View>
        </Card>

        <Card onPress={() => navigation.navigate('Moment')} style={styles.helloBack}>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Avatar source={personPhotos.jonas} size="xs" glowFrom={personGlow.jonas[0]} glowTo={personGlow.jonas[1]} />
            <View style={{ flex: 1 }}>
              <Text style={[type.bodyBold, { color: colors.accent, fontSize: 14 }]}>Jonas said hello back.</Text>
              <Text style={[type.small, { color: colors.ink }]}>
                You both land at 17:00 and are headed for Marina Bay.
              </Text>
            </View>
            <ChevronIcon color={colors.accent} />
          </View>
        </Card>

        <Text style={[type.d3, styles.sectionTitle]}>People worth meeting</Text>

        <Card elevated onPress={() => navigation.navigate('Person', { personId: 'jonas' })} style={styles.pcard}>
          <View style={styles.pcardHead}>
            <Avatar source={personPhotos.jonas} size="chip" glowFrom={personGlow.jonas[0]} glowTo={personGlow.jonas[1]} />
            <View style={{ flex: 1 }}>
              <Text style={[type.bodyBold, { fontSize: 17 }]}>{jonas.name}</Text>
              <Text style={[type.small, { color: colors.muted }]}>{jonas.role}</Text>
            </View>
          </View>
          <Text style={[type.d3, { fontSize: 17, marginTop: 12 }]}>{jonas.headline}</Text>
          <Text style={[type.small, { color: colors.muted, marginTop: 8 }]}>
            Same flight. Same circle. Both headed for Marina Bay.
          </Text>
          <View style={{ flexDirection: 'row', gap: 6, marginTop: 12 }}>
            <Pill tone="accent">Share the ride in</Pill>
            <Pill tone="quiet">Coffee at the gate</Pill>
          </View>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 14 }}>
            <Button style={{ flex: 1, minHeight: 46 }} onPress={() => navigation.navigate('Person', { personId: 'jonas' })}>
              Say hello
            </Button>
            <Button variant="ghost" style={{ flex: 1, minHeight: 46 }} onPress={() => navigation.navigate('Person', { personId: 'jonas' })}>
              More
            </Button>
          </View>
        </Card>

        {(['hugo', 'mira'] as const).map((id) => {
          const p = PEOPLE[id];
          return (
            <Card key={id} onPress={() => navigation.navigate('Person', { personId: id })} style={styles.compactCard}>
              <View style={styles.pcardHead}>
                <Avatar source={personPhotos[id]} size="sm" glowFrom={personGlow[id][0]} glowTo={personGlow[id][1]} />
                <View style={{ flex: 1 }}>
                  <Text style={[type.bodyBold, { fontSize: 15 }]}>{p.name}</Text>
                  <Text style={[type.small, { color: colors.muted }]} numberOfLines={1}>
                    {id === 'hugo' ? 'Same terminal, ten hours in transit' : 'Same flight, Tiong Bahru'}
                  </Text>
                </View>
              </View>
              <Text style={[type.small, { color: colors.ink, marginTop: 8 }]}>{p.headline}</Text>
            </Card>
          );
        })}

        <Text style={[type.label, styles.rowNote]}>
          A few people on this flight are hidden from you by their settings. That is them choosing,
          not us.
        </Text>
      </ScrollView>
      <TabBar active="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  band: { height: 330 },
  onPhoto: { position: 'absolute', left: 20, right: 20, bottom: 12 },
  greet: { ...type.d1, fontSize: 32, color: colors.ink },
  journeyCard: { marginHorizontal: 20, marginTop: -28 },
  journeyTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  route: { ...type.bodyBold, fontSize: 22, color: colors.ink },
  routeTo: { fontWeight: '400', color: colors.secondary, fontSize: 15 },
  journeyFoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  boardingRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.amber },
  helloBack: { marginHorizontal: 20, marginTop: 14, backgroundColor: colors.accentWash },
  sectionTitle: { marginHorizontal: 20, marginTop: 26, marginBottom: 10, color: colors.ink },
  pcard: { marginHorizontal: 20 },
  pcardHead: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  compactCard: { marginHorizontal: 20, marginTop: 10, backgroundColor: colors.surface },
  rowNote: { marginHorizontal: 20, marginTop: 12, color: colors.secondary },
});
