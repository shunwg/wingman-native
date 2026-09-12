import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, duration, easing, radius, type } from '../tokens';

type Variant = 'primary' | 'ghost' | 'onPhoto' | 'link' | 'linkOnPhoto';

const VARIANT_STYLE: Record<Variant, { bg: string; fg: string }> = {
  primary: { bg: colors.accent, fg: '#ffffff' },
  ghost: { bg: 'rgba(26,34,51,0.06)', fg: colors.ink },
  onPhoto: { bg: 'rgba(255,255,255,0.92)', fg: colors.ink },
  link: { bg: 'transparent', fg: colors.muted },
  /** A link-style action sitting on a dark photo (Welcome, Moment) — `link`'s
   *  muted grey-blue is unreadable against a night background. */
  linkOnPhoto: { bg: 'transparent', fg: 'rgba(255,255,255,0.72)' },
};

/**
 * The one press affordance every tappable surface in the app shares:
 * scale(0.97), 120ms in, released with the same out-easing. Matches
 * design/tokens/motion.css's --t-press exactly.
 */
export function Button({
  children,
  onPress,
  variant = 'primary',
  style,
}: {
  children: string;
  onPress?: () => void;
  variant?: Variant;
  style?: ViewStyle;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const v = VARIANT_STYLE[variant];

  const pressIn = () =>
    Animated.timing(scale, { toValue: 0.97, duration: duration.press, easing: easing.out, useNativeDriver: true }).start();
  const pressOut = () =>
    Animated.timing(scale, { toValue: 1, duration: duration.fast, easing: easing.out, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        style={[styles.btn, { backgroundColor: v.bg }, (variant === 'link' || variant === 'linkOnPhoto') && styles.linkPad, style]}
      >
        <Text style={[type.bodyBold, { color: v.fg, fontSize: 15 }]}>{children}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  btn: {
    minHeight: 50,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  linkPad: {
    minHeight: 44,
  },
});
