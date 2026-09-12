import type { ReactNode } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { TabScreenProps } from '../../navigation/types';
import { Pill } from '../../design/components';
import { ChevronIcon, EyeIcon, LockIcon, OutIcon, ShieldIcon, UsersIcon } from '../../design/icons';
import { colors, type } from '../../design/tokens';
import { airportPhotos } from '../../data/photos';

type Props = TabScreenProps<'Profile'>;

export function ProfileScreen({ navigation }: Props) {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.band}>
          <Image source={airportPhotos.OSL.operaHouse} style={StyleSheet.absoluteFill} resizeMode="cover" />
          <LinearGradient
            colors={['rgba(236,239,244,0.1)', 'rgba(236,239,244,0)', 'rgba(236,239,244,0.5)', colors.canvas]}
            locations={[0, 0.4, 0.72, 1]}
            style={StyleSheet.absoluteFill}
          />
          <SafeAreaView edges={['top']} style={{ height: 1 }} />
        </View>

        <View style={styles.idcard}>
          <View style={styles.avatar}>
            <Text style={{ fontFamily: type.d1.fontFamily, fontWeight: '300', fontSize: 40, color: '#fff' }}>A</Text>
          </View>
          <View style={{ flex: 1, paddingBottom: 4 }}>
            <Text style={[type.d2, { fontSize: 26, color: colors.ink }]}>Alex Ferrand</Text>
            <Text style={[type.small, { color: colors.muted, marginTop: 3 }]}>Analyst, Tide Capital. Home airport OSL.</Text>
          </View>
        </View>

        <Text style={[type.d3, { fontSize: 17, marginHorizontal: 20, marginTop: 18 }]}>
          Flying out tonight, back in a week. Say hello.
        </Text>

        <SectionLabel>What people see</SectionLabel>
        <View style={styles.group}>
          <Row icon={<EyeIcon />} title="Before hello" sub="First name, one sentence, stamps" onPress={() => navigation.navigate('Privacy')} />
          <Row icon={<LockIcon />} title="Privacy" sub="Verified only is on. Listed on trips." onPress={() => navigation.navigate('Privacy')} last />
        </View>

        <SectionLabel>Stamps and circles</SectionLabel>
        <View style={styles.group}>
          <Row icon={<ShieldIcon />} title="BankID" sub="Verified 2 May" trailing={<Pill tone="trust">Verified</Pill>} />
          <Row icon={<UsersIcon />} title="LinkedIn" sub="Shown after hello" trailing={<Pill tone="trust">Verified</Pill>} />
          <Row icon={<UsersIcon />} title="INSEAD" sub="Badge shown" last />
        </View>

        <SectionLabel>Open to</SectionLabel>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginHorizontal: 20 }}>
          <Pill tone="accent">Coffee at the gate</Pill>
          <Pill tone="accent">Share the ride in</Pill>
          <Pill tone="accent">Lounge</Pill>
          <Pill tone="quiet">A meal</Pill>
          <Pill tone="quiet">Drinks</Pill>
          <Pill tone="quiet">Business introduction</Pill>
        </View>

        <Pressable onPress={() => navigation.getParent()?.navigate('Welcome')} style={styles.signOut}>
          <OutIcon />
          <Text style={[type.bodyBold, { color: colors.muted, fontWeight: '400' }]}>Sign out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <Text style={styles.sectionLabel}>{children}</Text>;
}

function Row({
  icon,
  title,
  sub,
  trailing,
  onPress,
  last,
}: {
  icon: ReactNode;
  title: string;
  sub: string;
  trailing?: ReactNode;
  onPress?: () => void;
  last?: boolean;
}) {
  const content = (
    <View style={[styles.row, !last && styles.rowBorder]}>
      {icon}
      <View style={{ flex: 1 }}>
        <Text style={[type.body, { fontSize: 15, color: colors.ink }]}>{title}</Text>
        <Text style={[type.label, { marginTop: 2 }]}>{sub}</Text>
      </View>
      {trailing ?? (onPress && <ChevronIcon size={16} />)}
    </View>
  );
  return onPress ? <Pressable onPress={onPress}>{content}</Pressable> : content;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  band: { height: 280 },
  idcard: { flexDirection: 'row', gap: 16, alignItems: 'flex-end', marginHorizontal: 20, marginTop: -70 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: '#2e4666',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.canvas,
  },
  sectionLabel: {
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 8,
    fontFamily: type.d3.fontFamily,
    fontSize: 17,
    color: colors.ink,
  },
  group: { marginHorizontal: 20, borderRadius: 16, overflow: 'hidden', backgroundColor: colors.surface },
  row: { flexDirection: 'row', gap: 14, alignItems: 'center', padding: 14 },
  rowBorder: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.hairline },
  signOut: { flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, marginTop: 26, minHeight: 44 },
});
