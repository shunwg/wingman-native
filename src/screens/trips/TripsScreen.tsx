import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { TabScreenProps } from '../../navigation/types';
import { PlusIcon, ChevronIcon } from '../../design/icons';
import { colors, radius, type } from '../../design/tokens';
import { airportPhotos } from '../../data/photos';
import { MY_JOURNEY, FONTAINEBLEAU_TRIP } from '../../data/journey';

type Props = TabScreenProps<'Trips'>;

export function TripsScreen({ navigation }: Props) {
  return (
    <View style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.head}>
        <Text style={[type.d2, { color: colors.ink }]}>Trips</Text>
        <View style={styles.addBtn}>
          <PlusIcon size={18} />
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <TripCard
          photo={airportPhotos.SIN.jewelWaterfall}
          city="Singapore"
          when="Tonight"
          live
          route={`${MY_JOURNEY.from} to ${MY_JOURNEY.to}`}
          meta={`${MY_JOURNEY.flightNo}, 2 Sept. Marina Bay until the 6th.`}
          tag="A few people"
          onPress={() => navigation.navigate('Home')}
        />

        <TripCard
          photo={airportPhotos.CDG.fontainebleauChateau}
          city={FONTAINEBLEAU_TRIP.city}
          when="This weekend"
          live
          route={`${FONTAINEBLEAU_TRIP.from} to ${FONTAINEBLEAU_TRIP.to}`}
          meta={`${FONTAINEBLEAU_TRIP.flightNo}, ${FONTAINEBLEAU_TRIP.landsLabel}. ${FONTAINEBLEAU_TRIP.stayLabel}.`}
          tag="Sharing a car"
          onPress={() => navigation.navigate('Car')}
        />

        <TripCard
          photo={airportPhotos.CPH.nyhavn}
          city="Copenhagen"
          when="18 Sept"
          route="OSL to CPH"
          meta="SK1465, 06:40. Indre By, two nights."
          tag="Opens 11 Sept"
          tagMuted
        />

        <TripCard
          photo={airportPhotos.LHR.towerBridgeDusk}
          city="London"
          when="6 Oct"
          route="OSL to LHR"
          meta="BA767, 09:15. South Bank, two nights."
          tag="Opens 29 Sept"
          tagMuted
        />

        <Text style={styles.sectionTitle}>Where you will be</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.ports}>
          <PortCard photo={airportPhotos.LHR.terminal2Entrance} code="LHR T2" when="Tonight" />
          <PortCard photo={airportPhotos.SIN.jewelWaterfall} code="SIN T3" when="Tomorrow 17:00" />
          <PortCard photo={airportPhotos.CDG.terminal2eWalkway} code="CDG 2E" when="This weekend" />
          <PortCard photo={airportPhotos.OSL.apronSnow} code="OSL" when="Home airport" />
        </ScrollView>

        <Text style={styles.sectionTitle}>Circles and events</Text>
        <Pressable onPress={() => navigation.navigate('Event')} style={styles.ecard}>
          <Image source={airportPhotos.SIN.marinaBaySkyline} style={styles.ecardImg} />
          <View style={{ flex: 1 }}>
            <Text style={[type.bodyBold, { fontSize: 15.5 }]}>Grid Week Singapore 2026</Text>
            <Text style={[type.small, { color: colors.muted }]}>Marina Bay Sands, 2 to 6 Sept. Live now.</Text>
          </View>
          <ChevronIcon size={16} />
        </Pressable>
        <Pressable style={styles.ecard}>
          <View style={styles.crest}>
            <Text style={{ fontFamily: type.d3.fontFamily, fontWeight: '300', fontSize: 22, color: '#fff' }}>I</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[type.bodyBold, { fontSize: 15.5 }]}>INSEAD</Text>
            <Text style={[type.small, { color: colors.muted }]}>Reunion week, Singapore. Amélie and Jonas are here.</Text>
          </View>
          <ChevronIcon size={16} />
        </Pressable>
      </ScrollView>
    </View>
  );
}

function TripCard({
  photo,
  city,
  when,
  live,
  route,
  meta,
  tag,
  tagMuted,
  onPress,
}: {
  photo: number;
  city: string;
  when: string;
  live?: boolean;
  route: string;
  meta: string;
  tag: string;
  tagMuted?: boolean;
  onPress?: () => void;
}) {
  const [from, to] = route.split(' to ');
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.tcard, pressed && onPress && { transform: [{ scale: 0.98 }] }]}
    >
      <View style={styles.tcardPh}>
        <Image source={photo} style={StyleSheet.absoluteFill} resizeMode="cover" />
        <View style={[styles.whenPill, live && styles.whenPillLive]}>
          {live && <View style={styles.liveDot} />}
          <Text style={[type.label, { fontWeight: '700', color: live ? colors.amber : colors.ink }]}>{when}</Text>
        </View>
        <Text style={styles.cityLabel}>{city}</Text>
      </View>
      <View style={styles.tcardBody}>
        <View style={{ flex: 1 }}>
          <Text style={[type.bodyBold, { fontSize: 17 }]}>
            {from} <Text style={{ fontWeight: '400', color: colors.secondary, fontSize: 15 }}>to</Text> {to}
          </Text>
          <Text style={[type.small, { color: colors.muted, marginTop: 2 }]}>{meta}</Text>
        </View>
        <Text style={[type.label, { fontWeight: '700', color: tagMuted ? colors.secondary : colors.accent }]}>
          {tag}
        </Text>
      </View>
    </Pressable>
  );
}

function PortCard({ photo, code, when }: { photo: number; code: string; when: string }) {
  return (
    <View style={styles.port}>
      <Image source={photo} style={styles.portImg} resizeMode="cover" />
      <View style={{ padding: 8 }}>
        <Text style={[type.mono, { fontSize: 13, fontWeight: '700' }]}>{code}</Text>
        <Text style={[type.label, { marginTop: 2 }]}>{when}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  head: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tcard: { marginHorizontal: 20, marginTop: 12, borderRadius: radius.md, overflow: 'hidden', backgroundColor: colors.surface },
  tcardPh: { height: 150 },
  whenPill: {
    position: 'absolute',
    top: 12,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  whenPillLive: { backgroundColor: colors.amberWash },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.amber },
  cityLabel: {
    position: 'absolute',
    left: 16,
    bottom: 12,
    color: '#ffffff',
    fontFamily: type.d3.fontFamily,
    fontWeight: '300',
    fontSize: 26,
  },
  tcardBody: { padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  sectionTitle: { marginHorizontal: 20, marginTop: 22, marginBottom: 4, fontFamily: type.d3.fontFamily, fontSize: 19, color: colors.ink },
  ports: { gap: 10, paddingHorizontal: 20, paddingTop: 10 },
  port: { width: 132, borderRadius: 12, overflow: 'hidden', backgroundColor: colors.surface },
  portImg: { width: '100%', height: 82 },
  ecard: { flexDirection: 'row', gap: 12, alignItems: 'center', marginHorizontal: 20, marginTop: 10, padding: 12, borderRadius: radius.md, backgroundColor: colors.surface },
  ecardImg: { width: 56, height: 56, borderRadius: 14 },
  crest: { width: 56, height: 56, borderRadius: 14, backgroundColor: colors.trust, alignItems: 'center', justifyContent: 'center' },
});
