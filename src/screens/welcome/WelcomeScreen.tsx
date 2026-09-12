import { useEffect, useRef } from 'react';
import { Animated, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { Button } from '../../design/components';
import { colors, duration, easing, type } from '../../design/tokens';
import { stockPhotos } from '../../data/photos';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

/**
 * The one screen that gets a slow photo settle on mount — the web app's
 * m-photo keyframe (scale 1.05 → 1, 900ms), reconstructed with Animated.
 */
export function WelcomeScreen({ navigation }: Props) {
  const photoScale = useRef(new Animated.Value(1.05)).current;
  const bodyRise = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(photoScale, {
      toValue: 1,
      duration: 900,
      easing: easing.out,
      useNativeDriver: true,
    }).start();
    Animated.timing(bodyRise, {
      toValue: 1,
      duration: 320,
      delay: 120,
      easing: easing.out,
      useNativeDriver: true,
    }).start();
  }, [bodyRise, photoScale]);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <Animated.Image
        source={stockPhotos.concourse}
        resizeMode="cover"
        style={[StyleSheet.absoluteFill, { transform: [{ scale: photoScale }] }]}
      />
      <LinearGradient
        colors={['rgba(15,22,34,0.15)', 'rgba(15,22,34,0)', 'rgba(15,22,34,0.62)', '#0f1622']}
        locations={[0, 0.35, 0.62, 1]}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View
        style={[
          styles.body,
          {
            opacity: bodyRise,
            transform: [{ translateY: bodyRise.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
          },
        ]}
      >
        <Text style={styles.wordmark}>wingman</Text>
        <Text style={[type.d1, styles.headline]}>
          Meet people worth meeting, around the way you already{' '}
          <Text style={{ fontFamily: type.d1.fontFamily, fontStyle: 'italic' }}>travel.</Text>
        </Text>
        <Text style={[type.body, styles.sub]}>
          Someone on your flight, in your terminal, or landing in the same city tonight. A coffee
          at the gate, a shared cab into town, a real introduction.
        </Text>
        <View style={{ gap: 10 }}>
          <Button variant="onPhoto" onPress={() => navigation.replace('Home')}>
            Get started
          </Button>
          <Button variant="linkOnPhoto" onPress={() => navigation.replace('Home')}>
            I already have an account
          </Button>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.night },
  body: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 24, paddingBottom: 44 },
  wordmark: {
    fontFamily: type.d3.fontFamily,
    color: 'rgba(255,255,255,0.82)',
    fontSize: 18,
    letterSpacing: 2,
    textTransform: 'lowercase',
    marginBottom: 14,
  },
  headline: { color: '#ffffff', fontSize: 36, lineHeight: 40, marginBottom: 12 },
  sub: { color: 'rgba(255,255,255,0.78)', marginBottom: 26, maxWidth: 300 },
});
