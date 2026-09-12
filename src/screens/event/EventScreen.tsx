import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { StackScreenProps } from '../../navigation/types';
import { Avatar, Button, Pill } from '../../design/components';
import { BackIcon } from '../../design/icons';
import { colors, radius, type } from '../../design/tokens';
import { stockPhotos } from '../../data/photos';
import { personGlow, personPhotos } from '../../data/people';

type Props = StackScreenProps<'Event'>;

export function EventScreen({ navigation }: Props) {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.hero}>
          <Image source={stockPhotos.lounge} style={StyleSheet.absoluteFill} resizeMode="cover" />
          <LinearGradient
            colors={['rgba(14,21,32,0.35)', 'rgba(14,21,32,0)', 'rgba(236,239,244,0)', colors.canvas]}
            locations={[0, 0.35, 0.7, 1]}
            style={StyleSheet.absoluteFill}
          />
          <SafeAreaView edges={['top']} style={styles.nav}>
            <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn} hitSlop={8}>
              <BackIcon />
            </Pressable>
          </SafeAreaView>
        </View>

        <View style={styles.body}>
          <Text style={[type.d2, { color: colors.ink }]}>Grid Week Singapore 2026</Text>
          <Text style={[type.small, { color: colors.muted, marginTop: 6 }]}>Marina Bay Sands, Hall B. 2 to 6 September.</Text>
          <Pill tone="amber">Matching now, closes on the 6th</Pill>

          <Text style={styles.h3}>Badges people can show</Text>
          <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
            <Pill tone="trust">Organiser</Pill>
            <Pill tone="accent">Speaker</Pill>
            <Pill tone="quiet">Sponsor</Pill>
          </View>

          <Text style={styles.h3}>Here this week</Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Pressable onPress={() => navigation.navigate('Person', { personId: 'elin' })} style={styles.pp}>
              <Avatar source={personPhotos.elin} size="md" glowFrom={personGlow.elin[0]} glowTo={personGlow.elin[1]} />
              <Text style={type.label}>Elin</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Person', { personId: 'jonas' })} style={styles.pp}>
              <Avatar source={personPhotos.jonas} size="md" glowFrom={personGlow.jonas[0]} glowTo={personGlow.jonas[1]} />
              <Text style={type.label}>Jonas</Text>
            </Pressable>
            <View style={styles.pp}>
              <View style={styles.more}>
                <Text style={[type.label, { textAlign: 'center' }]}>a few{'\n'}more</Text>
              </View>
            </View>
          </View>
          <Text style={[type.small, { color: colors.muted, marginTop: 10 }]}>
            Elin is a speaker and said she knows nobody. That is the kind of hello this exists for.
          </Text>

          <Text style={styles.h3}>Join with a code</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TextInput
              placeholder="GRID-2026"
              placeholderTextColor={colors.secondary}
              autoCapitalize="characters"
              style={styles.joinInput}
            />
            <Button style={{ minHeight: 46 }}>Join</Button>
          </View>
          <Text style={[type.small, { color: colors.muted, marginTop: 10 }]}>
            The circle stops matching anyone on 7 September. A delegate list, not a directory.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  hero: { height: 300 },
  nav: { position: 'absolute', top: 0, left: 0, right: 0, paddingHorizontal: 14 },
  iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.88)', alignItems: 'center', justifyContent: 'center' },
  body: { paddingHorizontal: 20, marginTop: -20 },
  h3: { fontSize: 12.5, fontWeight: '700', letterSpacing: 0.4, color: colors.secondary, textTransform: 'uppercase', marginTop: 24, marginBottom: 10 },
  pp: { alignItems: 'center', gap: 6, width: 64 },
  more: { width: 56, height: 56, borderRadius: 16, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  joinInput: {
    flex: 1,
    minHeight: 46,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    fontFamily: type.mono.fontFamily,
    letterSpacing: 1,
    color: colors.ink,
  },
});
