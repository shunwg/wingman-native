import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import type { StackScreenProps } from '../../navigation/types';
import { Avatar, Button } from '../../design/components';
import { BackIcon, CheckIcon, LockIcon, PinIcon, PlusIcon } from '../../design/icons';
import { colors, radius, type } from '../../design/tokens';
import { airportPhotos } from '../../data/photos';
import { personGlow, personPhotos } from '../../data/people';
import { FONTAINEBLEAU_TRIP } from '../../data/journey';

type Props = StackScreenProps<'Car'>;

/**
 * The Fontainebleau scenario: the one screen the whole app exists to prove
 * out — a shared car with three seats and a real cost split, not the
 * two-person "accept or decline" shape every other meet in this prototype
 * uses. Ported from the HTML mockup's #car screen, same content and the
 * same accept → crossfade → "message the car" sequence.
 */
export function CarScreen({ navigation }: Props) {
  const [claimed, setClaimed] = useState(false);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: 130 }}>
        <View style={styles.hero}>
          <Image source={airportPhotos.CDG.fontainebleauChateau} style={StyleSheet.absoluteFill} resizeMode="cover" />
          <LinearGradient
            colors={['rgba(14,21,32,0.4)', 'rgba(14,21,32,0)', 'rgba(14,21,32,0)', 'rgba(236,239,244,0)', colors.canvas]}
            locations={[0, 0.32, 0.6, 0.78, 1]}
            style={StyleSheet.absoluteFill}
          />
          <SafeAreaView edges={['top']} style={styles.nav}>
            <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn} hitSlop={8}>
              <BackIcon />
            </Pressable>
          </SafeAreaView>
          <Text style={styles.kicker}>Landed CDG · Terminal 2E</Text>
        </View>

        <View style={styles.body}>
          <Text style={[type.d1, { fontSize: 30, color: colors.ink }]}>Share a car to Fontainebleau</Text>
          <Text style={[type.body, { color: colors.muted, marginTop: 8 }]}>
            Jonas and Amélie already have a car booked. One seat left, and it is cheaper split three
            ways than two.
          </Text>

          {!claimed ? (
            <>
              <View style={styles.seats}>
                <Avatar source={personPhotos.jonas} size="sm" glowFrom={personGlow.jonas[0]} glowTo={personGlow.jonas[1]} />
                <Avatar source={personPhotos.amelie} size="sm" glowFrom={personGlow.amelie[0]} glowTo={personGlow.amelie[1]} />
                <View style={styles.seatOpen}>
                  <PlusIcon size={20} />
                </View>
                <Text style={[type.small, { flex: 1, color: colors.muted }]}>
                  Jonas and <Text style={{ fontWeight: '700', color: colors.ink }}>Amélie</Text> are in. One
                  seat open.
                </Text>
              </View>

              <View style={styles.splitcard}>
                <View style={styles.splitN}>
                  <Text style={styles.splitNum}>{FONTAINEBLEAU_TRIP.costPerHead}</Text>
                  <Text style={styles.splitNumLabel}>EUR each</Text>
                </View>
                <Text style={[type.small, { flex: 1, color: colors.muted }]}>
                  {FONTAINEBLEAU_TRIP.costTotal} EUR total, split three ways. Settled in the car, not in
                  the app.
                </Text>
              </View>

              <CarRail />

              <Text style={[type.small, { color: colors.muted, marginTop: 14 }]}>{FONTAINEBLEAU_TRIP.pickup}</Text>

              <View style={styles.held}>
                <LockIcon />
                <Text style={[type.small, { flex: 1, color: colors.muted }]}>
                  Exact pickup time and the driver&rsquo;s plate are shared with everyone in the car
                  once the third seat is filled.
                </Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.seats}>
                <Avatar source={personPhotos.jonas} size="sm" glowFrom={personGlow.jonas[0]} glowTo={personGlow.jonas[1]} />
                <Avatar source={personPhotos.amelie} size="sm" glowFrom={personGlow.amelie[0]} glowTo={personGlow.amelie[1]} />
                <View style={[styles.seatOpen, styles.seatDone]}>
                  <CheckIcon size={20} color={colors.trust} />
                </View>
                <Text style={[type.small, { flex: 1 }]}>
                  <Text style={{ fontWeight: '700', color: colors.ink }}>You&rsquo;re in.</Text>{' '}
                  <Text style={{ color: colors.muted }}>All three seats are filled.</Text>
                </Text>
              </View>

              <View style={styles.splitcard}>
                <View style={styles.splitN}>
                  <Text style={styles.splitNum}>{FONTAINEBLEAU_TRIP.costPerHead}</Text>
                  <Text style={styles.splitNumLabel}>EUR each</Text>
                </View>
                <Text style={[type.small, { flex: 1, color: colors.muted }]}>
                  {FONTAINEBLEAU_TRIP.costTotal} EUR total. Jonas is booking the car now.
                </Text>
              </View>

              <View style={styles.pinRow}>
                <PinIcon size={15} color={colors.trust} />
                <Text style={[type.small, { color: colors.muted }]}>
                  Taxi rank, Terminal 2E, once Jonas confirms the pickup time.
                </Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <View style={styles.cta}>
        {!claimed ? (
          <Button onPress={() => setClaimed(true)}>Claim the last seat</Button>
        ) : (
          <Button onPress={() => navigation.navigate('CarChat')}>Message the car</Button>
        )}
      </View>
    </View>
  );
}

function CarRail() {
  return (
    <Svg width="100%" height={50} viewBox="0 0 354 50" style={{ marginTop: 18 }}>
      <Path
        d="M18 30 C 110 30, 140 16, 336 16"
        stroke={colors.secondary}
        strokeWidth={1.5}
        fill="none"
      />
      <Circle cx={18} cy={30} r={4} fill={colors.ink} />
      <Circle cx={336} cy={16} r={9} fill="none" stroke={colors.accentWash} strokeWidth={2} opacity={0.9} />
      <Circle cx={336} cy={16} r={4.5} fill={colors.ink} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  hero: { height: 300 },
  nav: { position: 'absolute', top: 0, left: 0, right: 0, paddingHorizontal: 14 },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.88)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kicker: {
    position: 'absolute',
    left: 20,
    bottom: 14,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12.5,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  body: { paddingHorizontal: 20, marginTop: -24 },
  seats: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 20 },
  seatOpen: {
    width: 48,
    height: 48,
    borderRadius: radius.photo,
    borderWidth: 2,
    borderColor: colors.secondary,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatDone: { borderStyle: 'solid', borderColor: 'transparent', backgroundColor: colors.trustWash },
  splitcard: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: 16,
  },
  splitN: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  splitNum: { fontFamily: type.d1.fontFamily, fontWeight: '300', fontSize: 30, color: colors.ink },
  splitNumLabel: { ...type.small, color: colors.muted },
  pinRow: { flexDirection: 'row', gap: 6, alignItems: 'center', marginTop: 14 },
  held: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  cta: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 20, paddingBottom: 34, backgroundColor: colors.canvas },
});
