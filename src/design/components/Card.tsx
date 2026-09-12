import { ReactNode, useRef } from 'react';
import { Animated, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { colors, duration, easing, radius } from '../tokens';

/**
 * The one card shape every list row and content block uses. `elevated`
 * lifts the hero moment (Home's flagship match) off the flat, scannable
 * default the high-volume Discover board keeps.
 */
export function Card({
  children,
  onPress,
  elevated = false,
  style,
}: {
  children: ReactNode;
  onPress?: () => void;
  elevated?: boolean;
  style?: ViewStyle;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const pressable = !!onPress;

  const pressIn = () =>
    pressable &&
    Animated.timing(scale, { toValue: 0.98, duration: duration.press, easing: easing.out, useNativeDriver: true }).start();
  const pressOut = () =>
    pressable &&
    Animated.timing(scale, { toValue: 1, duration: duration.fast, easing: easing.out, useNativeDriver: true }).start();

  const card = (
    <Animated.View
      style={[styles.card, elevated && styles.elevated, { transform: [{ scale }] }, style]}
    >
      {children}
    </Animated.View>
  );

  if (!pressable) return card;

  return (
    <Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
      {card}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.raised,
    borderRadius: radius.md,
    padding: 16,
  },
  elevated: {
    shadowColor: 'rgba(20,30,50,0.35)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 6,
  },
});
