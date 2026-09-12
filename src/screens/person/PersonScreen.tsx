import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { Button, Pill } from '../../design/components';
import { BackIcon, CarIcon, CheckIcon, LockIcon, MoreIcon, PinIcon, PlaneIcon, UsersIcon } from '../../design/icons';
import { colors, type } from '../../design/tokens';
import { PEOPLE, personPhotos } from '../../data/people';
import { HelloSheet } from '../../design/components/HelloSheet';

type Props = NativeStackScreenProps<RootStackParamList, 'Person'>;

const REASON_ICON = { plane: PlaneIcon, pin: PinIcon, users: UsersIcon, car: CarIcon };

export function PersonScreen({ route, navigation }: Props) {
  const person = PEOPLE[route.params.personId];
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <Image source={personPhotos[person.id]} resizeMode="cover" style={StyleSheet.absoluteFill} />
        <LinearGradient
          colors={['rgba(14,21,32,0.35)', 'rgba(14,21,32,0)', 'rgba(14,21,32,0)', 'rgba(236,239,244,0)', colors.canvas]}
          locations={[0, 0.28, 0.62, 0.78, 1]}
          style={StyleSheet.absoluteFill}
        />
        <SafeAreaView edges={['top']} style={styles.nav}>
          <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn} hitSlop={8}>
            <BackIcon />
          </Pressable>
          <Pressable style={styles.iconBtn} hitSlop={8}>
            <MoreIcon />
          </Pressable>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={[type.d1, { color: colors.ink }]}>{person.name}</Text>
        <Text style={[type.small, { color: colors.muted, marginTop: 6 }]}>{person.role}</Text>
        <Text style={[type.d3, { fontSize: 19, marginTop: 16, color: colors.ink }]}>{person.headline}</Text>

        <Text style={styles.h3}>Why you are seeing {person.pronoun}</Text>
        {person.reasons.map((r, i) => {
          const Icon = REASON_ICON[r.icon];
          return (
            <View key={i} style={[styles.reason, i > 0 && styles.reasonBorder]}>
              <Icon size={20} />
              <View style={{ flex: 1 }}>
                <Text style={[type.bodyBold, { fontSize: 15 }]}>{r.title}</Text>
                <Text style={[type.small, { color: colors.muted }]}>{r.detail}</Text>
              </View>
            </View>
          );
        })}

        <Text style={styles.h3}>Stamps</Text>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <Pill tone="trust">BankID verified</Pill>
          <Pill tone="trust">LinkedIn</Pill>
          <Pill tone="quiet">Reliable, 5 meets</Pill>
        </View>

        <Text style={styles.h3}>Open to</Text>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <Pill tone="accent">Share the ride in</Pill>
          <Pill tone="quiet">Coffee at the gate</Pill>
          <Pill tone="quiet">Lounge</Pill>
        </View>

        <View style={styles.held}>
          <LockIcon />
          <Text style={[type.small, { color: colors.muted, flex: 1 }]}>
            Seat, exact gate and last name are held back until you both say yes. {person.name} sees
            the same of you.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.cta}>
        <Button onPress={() => setSheetOpen(true)}>Say hello</Button>
      </View>

      <HelloSheet
        visible={sheetOpen}
        onClose={() => setSheetOpen(false)}
        personName={person.name}
        onSend={() => {
          setSheetOpen(false);
          navigation.navigate('Moment');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  hero: { height: 470 },
  nav: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 14 },
  iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.88)', alignItems: 'center', justifyContent: 'center' },
  body: { paddingHorizontal: 20, paddingBottom: 120, marginTop: -34 },
  h3: { ...type.label, fontWeight: '700', letterSpacing: 0.4, color: colors.secondary, textTransform: 'uppercase', marginTop: 26, marginBottom: 10 },
  reason: { flexDirection: 'row', gap: 12, alignItems: 'flex-start', paddingVertical: 10 },
  reasonBorder: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.hairline },
  held: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', marginTop: 18, padding: 14, borderRadius: 12, backgroundColor: colors.surface },
  cta: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    paddingBottom: 34,
    backgroundColor: colors.canvas,
  },
});
