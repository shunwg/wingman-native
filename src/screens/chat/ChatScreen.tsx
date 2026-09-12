import { useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { StackScreenProps } from '../../navigation/types';
import { Avatar, Button } from '../../design/components';
import { BackIcon, CalendarIcon, CheckIcon, MoreIcon, PinIcon, SendIcon } from '../../design/icons';
import { colors, radius, type } from '../../design/tokens';
import { personGlow, personPhotos } from '../../data/people';

type Props = StackScreenProps<'Chat'>;

type Msg = { id: string; kind: 'me' | 'them' | 'sys' | 'proposal'; text?: string };

const INITIAL: Msg[] = [
  { id: '1', kind: 'sys', text: 'You both said yes. Seat and gate are now shared.' },
  { id: '2', kind: 'me', text: 'Landing the same time, headed the same way. Share a cab into town?' },
  { id: '3', kind: 'them', text: 'Yes please. I am in 34C, aisle. You?' },
  { id: '4', kind: 'me', text: '31A. See you at the door then.' },
  { id: '5', kind: 'proposal' },
  { id: '6', kind: 'them', text: 'Taxi rank at T3 works. I will be the one with the too-big suitcase.' },
];

export function ChatScreen({ navigation }: Props) {
  const [messages, setMessages] = useState(INITIAL);
  const [confirmed, setConfirmed] = useState(false);
  const [added, setAdded] = useState(false);
  const [draft, setDraft] = useState('');
  const listRef = useRef<FlatList<Msg>>(null);

  const send = () => {
    if (!draft.trim()) return;
    const mine: Msg = { id: String(Date.now()), kind: 'me', text: draft.trim() };
    setMessages((m) => [...m, mine]);
    setDraft('');
    setTimeout(() => {
      setMessages((m) => [...m, { id: String(Date.now() + 1), kind: 'them', text: 'Perfect. See you at the door.' }]);
    }, 900);
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.nav}>
        <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn} hitSlop={8}>
          <BackIcon />
        </Pressable>
        <View style={styles.who}>
          <Avatar source={personPhotos.jonas} size="xs" glowFrom={personGlow.jonas[0]} glowTo={personGlow.jonas[1]} />
          <View>
            <Text style={[type.bodyBold, { fontSize: 15 }]}>Jonas</Text>
            <Text style={[type.label]}>SQ317, lands 17:00</Text>
          </View>
        </View>
        <Pressable style={styles.iconBtn} hitSlop={8}>
          <MoreIcon />
        </Pressable>
      </SafeAreaView>

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: 20, gap: 6 }}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => {
          if (item.kind === 'sys') return <Text style={styles.sys}>{item.text}</Text>;
          if (item.kind === 'proposal') {
            return confirmed ? (
              <View style={styles.proposal}>
                <Text style={[type.small, { color: colors.trust, fontWeight: '700' }]}>Confirmed</Text>
                <Text style={styles.propTime}>
                  17:25 <Text style={styles.propTimeSmall}>Tomorrow</Text>
                </Text>
                <View style={styles.propWhere}>
                  <PinIcon size={15} color={colors.trust} />
                  <Text style={[type.small, { color: colors.muted }]}>Taxi rank, Terminal 3, Changi</Text>
                </View>
                <Pressable onPress={() => setAdded(true)} style={styles.addCalBtn}>
                  <CalendarIcon size={18} color={colors.ink} />
                  <Text style={[type.bodyBold, { fontSize: 13 }]}>{added ? 'Added' : 'Add to calendar'}</Text>
                  {added && <CheckIcon size={15} />}
                </Pressable>
              </View>
            ) : (
              <View style={styles.proposal}>
                <Text style={[type.small, { color: colors.muted }]}>Jonas suggested</Text>
                <Text style={styles.propTime}>
                  17:25 <Text style={styles.propTimeSmall}>after bags</Text>
                </Text>
                <View style={styles.propWhere}>
                  <PinIcon size={15} color={colors.trust} />
                  <Text style={[type.small, { color: colors.muted }]}>Taxi rank, Terminal 3. Public ground.</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
                  <Button style={{ flex: 1, minHeight: 42 }} onPress={() => setConfirmed(true)}>
                    Accept
                  </Button>
                  <Button variant="ghost" style={{ flex: 1, minHeight: 42 }}>
                    Suggest another
                  </Button>
                </View>
              </View>
            );
          }
          return (
            <View style={[styles.bubble, item.kind === 'me' ? styles.bubbleMe : styles.bubbleThem]}>
              <Text style={[type.body, { color: item.kind === 'me' ? '#fff' : colors.ink }]}>{item.text}</Text>
            </View>
          );
        }}
      />

      <View style={styles.composer}>
        <Pressable style={styles.iconBtnFlat} hitSlop={6}>
          <CalendarIcon size={20} />
        </Pressable>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Message"
          placeholderTextColor={colors.secondary}
          style={styles.input}
          onSubmitEditing={send}
        />
        <Pressable onPress={send} style={styles.sendBtn}>
          <SendIcon size={18} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  nav: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingBottom: 8, gap: 4 },
  iconBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  iconBtnFlat: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  who: { flex: 1, flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center' },
  sys: { ...type.label, alignSelf: 'center', color: colors.secondary, marginVertical: 6 },
  bubble: { maxWidth: '78%', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 18 },
  bubbleMe: { alignSelf: 'flex-end', backgroundColor: colors.ink, borderBottomRightRadius: 6 },
  bubbleThem: { alignSelf: 'flex-start', backgroundColor: colors.surface, borderBottomLeftRadius: 6 },
  proposal: { backgroundColor: colors.raised, borderRadius: radius.md, padding: 16, marginVertical: 6 },
  propTime: { ...type.bodyBold, fontSize: 17, marginTop: 2 },
  propTimeSmall: { fontWeight: '400', color: colors.muted, fontSize: 13 },
  propWhere: { flexDirection: 'row', gap: 6, alignItems: 'center', marginTop: 4 },
  addCalBtn: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(26,34,51,0.06)',
  },
  composer: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingTop: 8, paddingBottom: 30 },
  input: { flex: 1, minHeight: 46, borderRadius: radius.pill, backgroundColor: colors.surface, paddingHorizontal: 16, ...type.body, color: colors.ink },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
});
