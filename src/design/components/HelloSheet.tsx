import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from './Button';
import { CarIcon } from '../icons';
import { colors, duration, easing, radius, type } from '../tokens';

const OPENERS = [
  'Landing the same time, headed the same way. Share a cab into town?',
  'Heading the same way from here. Want to split a car?',
];

/**
 * The bottom sheet, built once here rather than as a generic primitive —
 * this pass only needed one. Pull the backdrop + drag-to-dismiss chrome out
 * into design/components/Sheet.tsx the moment a second sheet (Suggest a
 * time, Privacy) needs the same shell; don't copy this file.
 */
export function HelloSheet({
  visible,
  onClose,
  onSend,
  personName,
}: {
  visible: boolean;
  onClose: () => void;
  onSend: () => void;
  personName: string;
}) {
  const translateY = useRef(new Animated.Value(400)).current;
  const backdrop = useRef(new Animated.Value(0)).current;
  const [message, setMessage] = useState(OPENERS[0]);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (visible) {
      setSent(false);
      Animated.timing(backdrop, { toValue: 1, duration: 200, useNativeDriver: true }).start();
      Animated.timing(translateY, {
        toValue: 0,
        duration: duration.sheet,
        easing: easing.drawer,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const close = () => {
    Animated.timing(backdrop, { toValue: 0, duration: 150, useNativeDriver: true }).start();
    Animated.timing(translateY, {
      toValue: 400,
      duration: 200,
      easing: easing.exit,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const pan = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 4,
        onPanResponderMove: (_, g) => {
          if (g.dy > 0) translateY.setValue(g.dy);
        },
        onPanResponderRelease: (_, g) => {
          if (g.dy > 120 || g.vy > 0.6) {
            close();
          } else {
            Animated.timing(translateY, { toValue: 0, duration: 200, easing: easing.drawer, useNativeDriver: true }).start();
          }
        },
      }),
    []
  );

  const send = () => {
    setSent(true);
    setTimeout(() => {
      onSend();
    }, 650);
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={close}>
      <Animated.View style={[styles.backdrop, { opacity: backdrop }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={close} />
      </Animated.View>
      <Animated.View style={[styles.panel, { transform: [{ translateY }] }]} {...pan.panHandlers}>
        <SafeAreaView edges={['bottom']}>
          <View style={styles.grab} />
          <Text style={[type.d2, { color: colors.ink }]}>Say hello to {personName}</Text>
          <Text style={[type.small, { color: colors.muted, marginTop: 4, marginBottom: 16 }]}>
            One suggestion, one line. {personName} sees your first name and sentence, nothing else
            yet.
          </Text>

          <View style={styles.kind}>
            <CarIcon />
            <View style={{ flex: 1 }}>
              <Text style={[type.bodyBold, { fontSize: 15 }]}>Share the ride in</Text>
              <Text style={[type.small, { color: colors.muted }]}>Taxi rank, Terminal 3, after bags</Text>
            </View>
          </View>

          <TextInput
            value={message}
            onChangeText={setMessage}
            multiline
            style={styles.input}
            accessibilityLabel="Your line"
          />

          <Button onPress={send} style={{ marginBottom: 8 }}>
            {sent ? 'Sent' : 'Send'}
          </Button>
          <Button variant="link" onPress={close}>
            Not now
          </Button>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(10,16,30,0.42)' },
  panel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  grab: { width: 36, height: 5, borderRadius: 3, backgroundColor: 'rgba(26,34,51,0.18)', alignSelf: 'center', marginBottom: 14 },
  kind: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    backgroundColor: colors.raised,
    borderRadius: radius.sm,
    padding: 14,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  input: {
    backgroundColor: colors.raised,
    borderRadius: radius.sm,
    padding: 14,
    minHeight: 60,
    marginBottom: 14,
    ...type.body,
    color: colors.ink,
    textAlignVertical: 'top',
  },
});
