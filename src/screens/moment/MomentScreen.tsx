import { useEffect, useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { Button } from '../../design/components';
import { BackIcon, CarIcon } from '../../design/icons';
import { colors, type } from '../../design/tokens';
import { airportPhotos } from '../../data/photos';
import { MOMENT } from '../../data/journey';

type Props = NativeStackScreenProps<RootStackParamList, 'Moment'>;

const AnimatedPath = Animated.createAnimatedComponent(Path);

/**
 * The one authored moment in the app — everything else stays quiet by
 * design (see CLAUDE.md's "frequently-seen surfaces do not animate"). Every
 * value below is a direct port of the timing table in the web app's motion
 * spec: photo settle 0–600ms, scrim 80–380ms, headline 180–460ms, rail draw
 * 260–760ms with nodes firing as the line reaches them, pill 560–800ms, CTA
 * 680–880ms.
 */
export function MomentScreen({ navigation }: Props) {
  const photoScale = useRef(new Animated.Value(1.06)).current;
  const scrim = useRef(new Animated.Value(0)).current;
  const headline = useRef(new Animated.Value(0)).current;
  const body = useRef(new Animated.Value(0)).current;
  const rail = useRef(new Animated.Value(0)).current;
  const nodeA = useRef(new Animated.Value(0)).current;
  const nodeB = useRef(new Animated.Value(0)).current;
  const nodeC = useRef(new Animated.Value(0)).current;
  const pill = useRef(new Animated.Value(0)).current;
  const cta = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const t = (v: Animated.Value, duration: number, delay: number) =>
      Animated.timing(v, { toValue: 1, duration, delay, useNativeDriver: true });

    Animated.timing(photoScale, { toValue: 1, duration: 600, delay: 0, useNativeDriver: true }).start();
    t(scrim, 300, 80).start();
    t(headline, 280, 180).start();
    t(body, 280, 240).start();
    t(rail, 500, 260).start();
    t(nodeA, 160, 300).start();
    t(nodeB, 160, 520).start();
    t(nodeC, 160, 720).start();
    t(pill, 240, 560).start();
    t(cta, 200, 680).start();
  }, []);

  const rise = (v: Animated.Value, distance = 14) => ({
    opacity: v,
    transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) }],
  });

  return (
    <View style={styles.screen}>
      <Animated.Image
        source={airportPhotos.SIN.marinaBaySkyline}
        resizeMode="cover"
        style={[StyleSheet.absoluteFill, { transform: [{ scale: photoScale }] }]}
      />
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: scrim }]}>
        <LinearGradient
          colors={['rgba(14,21,32,0.25)', 'rgba(14,21,32,0)', 'rgba(14,21,32,0.6)', colors.night]}
          locations={[0, 0.3, 0.58, 1]}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <SafeAreaView edges={['top']} style={styles.nav}>
        <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn} hitSlop={8}>
          <BackIcon color="#ffffff" />
        </Pressable>
      </SafeAreaView>

      <View style={styles.body}>
        <Animated.Text style={[type.d1, styles.headline, rise(headline)]}>
          Jonas said <Text style={{ fontStyle: 'italic' }}>hello back.</Text>
        </Animated.Text>
        <Animated.Text style={[type.body, styles.sub, rise(body)]}>{MOMENT.body}</Animated.Text>

        <View style={styles.rail}>
          <Svg width="100%" height={64} viewBox="0 0 354 64">
            <AnimatedPath
              d="M18 40 C 90 40, 110 22, 177 22 S 264 40, 336 40"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth={1.5}
              fill="none"
              strokeDasharray={100}
              strokeDashoffset={rail.interpolate({ inputRange: [0, 1], outputRange: [100, 0] })}
            />
            <RailNode x={18} y={40} radius={4} progress={nodeA} />
            <RailNode x={177} y={22} radius={4.5} progress={nodeB} emphasis />
            <RailNode x={336} y={40} radius={4} progress={nodeC} />
          </Svg>
          <View style={styles.railLabels}>
            <Text style={styles.railLabel}>LHR 21:00</Text>
            <Text style={[styles.railLabel, { fontWeight: '700', color: '#fff' }]}>SIN T3, 17:00</Text>
            <Text style={styles.railLabel}>Marina Bay</Text>
          </View>
        </View>

        <Animated.View style={[styles.pill, rise(pill, 8)]}>
          <CarIcon color="#ffffff" size={14} />
          <Text style={styles.pillText}>{MOMENT.meetNote}</Text>
        </Animated.View>

        <Animated.View style={rise(cta)}>
          <Button variant="onPhoto" onPress={() => navigation.navigate('Home')}>
            Open the chat
          </Button>
          <View style={{ height: 8 }} />
          <Button variant="linkOnPhoto" onPress={() => navigation.goBack()}>
            Later
          </Button>
        </Animated.View>
      </View>
    </View>
  );
}

const AnimatedSvgCircle = Animated.createAnimatedComponent(Circle);

/**
 * One rail stop: a pop from 60% to full size with a fade in, mirroring the
 * web version's `m-node` keyframe (scale(0.6) → scale(1), opacity 0 → 1).
 * The emphasis stop (Singapore, the meeting point) additionally gets a
 * static halo ring — no extra animation, so it does not compete with the
 * line draw for attention.
 */
function RailNode({
  x,
  y,
  radius,
  progress,
  emphasis,
}: {
  x: number;
  y: number;
  radius: number;
  progress: Animated.Value;
  emphasis?: boolean;
}) {
  const animatedRadius = Animated.multiply(progress, radius);
  return (
    <>
      {emphasis && <Circle cx={x} cy={y} r={9} fill="none" stroke={colors.accentWash} strokeWidth={2} opacity={0.9} />}
      <AnimatedSvgCircle cx={x} cy={y} r={animatedRadius} fill="#ffffff" opacity={progress} />
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.night },
  nav: { position: 'absolute', top: 0, left: 0, right: 0, paddingHorizontal: 14 },
  iconBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  body: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 24, paddingBottom: 40 },
  headline: { color: '#ffffff', fontSize: 36, lineHeight: 40, marginBottom: 10 },
  sub: { color: 'rgba(255,255,255,0.8)', marginBottom: 18, maxWidth: 320 },
  rail: { marginBottom: 14 },
  railLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  railLabel: { ...type.label, color: 'rgba(255,255,255,0.85)' },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 22,
  },
  pillText: { ...type.small, color: '#ffffff' },
});
