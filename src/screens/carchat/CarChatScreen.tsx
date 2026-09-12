import { useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { StackScreenProps } from '../../navigation/types';
import { Avatar } from '../../design/components';
import { BackIcon, MoreIcon, SendIcon } from '../../design/icons';
import { colors, radius, type } from '../../design/tokens';
import { personGlow, personPhotos } from '../../data/people';
import { FONTAINEBLEAU_TRIP } from '../../data/journey';

type Props = StackScreenProps<'CarChat'>;

type Msg = { id: string; kind: 'me' | 'them' | 'sys'; sender?: string; text: string };

const INITIAL: Msg[] = [
  { id: '1', kind: 'sys', text: 'All three seats are filled. Pickup details are now shared.' },
  { id: '2', kind: 'them', sender: 'Jonas', text: 'Booked. Taxi rank, Terminal 2E, 19:15. White estate car, plate ending 4R.' },
  { id: '3', kind: 'them', sender: 'Amélie', text: "Landing at 18:55, ten minutes behind you both. Please don't leave without me." },
  { id: '4', kind: 'me', text: "Wouldn't dream of it. See you at the rank." },
];

/**
 * The N-party group thread the Fontainebleau scenario needs and the app's
 * one other chat screen (1:1 with Jonas) cannot express: named senders, a
 * persistent cost-split reminder, and three participants in the header
 * instead of one.
 */
export function CarChatScreen({ navigation }: Props) {
  const [messages, setMessages] = useState(INITIAL);
  const [draft, setDraft] = useState('');
  const listRef = useRef<FlatList<Msg>>(null);

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [...m, { id: String(Date.now()), kind: 'me', text: draft.trim() }]);
    setDraft('');
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: String(Date.now() + 1), kind: 'them', sender: 'Jonas', text: 'Noted. See you both at the rank.' },
      ]);
    }, 900);
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.nav}>
        <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn} hitSlop={8}>
          <BackIcon />
        </Pressable>
        <View style={styles.who}>
          <View style={styles.stack}>
            <Avatar source={personPhotos.jonas} size="xs" glowFrom={personGlow.jonas[0]} glowTo={personGlow.jonas[1]} />
            <View style={{ marginLeft: -10 }}>
              <Avatar source={personPhotos.amelie} size="xs" glowFrom={personGlow.amelie[0]} glowTo={personGlow.amelie[1]} />
            </View>
          </View>
          <View>
            <Text style={[type.bodyBold, { fontSize: 14 }]}>Fontainebleau car</Text>
            <Text style={type.label}>You, Jonas, Amélie</Text>
          </View>
        </View>
        <Pressable style={styles.iconBtn} hitSlop={8}>
          <MoreIcon />
        </Pressable>
      </SafeAreaView>

      <View style={styles.splitStrip}>
        <Text style={[type.small, { color: colors.accent, fontWeight: '700' }]}>
          Split 3 ways · {FONTAINEBLEAU_TRIP.costPerHead} EUR each
        </Text>
      </View>

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: 20, gap: 6 }}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => {
          if (item.kind === 'sys') return <Text style={styles.sys}>{item.text}</Text>;
          return (
            <View style={item.kind === 'me' ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }}>
              {item.sender && <Text style={styles.sender}>{item.sender}</Text>}
              <View style={[styles.bubble, item.kind === 'me' ? styles.bubbleMe : styles.bubbleThem]}>
                <Text style={[type.body, { color: item.kind === 'me' ? '#fff' : colors.ink }]}>{item.text}</Text>
              </View>
            </View>
          );
        }}
      />

      <View style={styles.composer}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Message the car"
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
  who: { flex: 1, flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center' },
  stack: { flexDirection: 'row' },
  splitStrip: { marginHorizontal: 14, marginBottom: 8, padding: 8, borderRadius: radius.sm, backgroundColor: colors.accentWash, alignItems: 'center' },
  sys: { ...type.label, alignSelf: 'center', color: colors.secondary, marginVertical: 6 },
  sender: { ...type.label, marginBottom: 2, marginLeft: 2 },
  bubble: { maxWidth: 260, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 18 },
  bubbleMe: { backgroundColor: colors.ink, borderBottomRightRadius: 6 },
  bubbleThem: { backgroundColor: colors.surface, borderBottomLeftRadius: 6 },
  composer: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingTop: 8, paddingBottom: 30 },
  input: { flex: 1, minHeight: 46, borderRadius: radius.pill, backgroundColor: colors.surface, paddingHorizontal: 16, ...type.body, color: colors.ink },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
});
