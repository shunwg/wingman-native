import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { radius } from '../tokens';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'chip' | 'lg';

const SIZES: Record<AvatarSize, number> = {
  xs: 36,
  sm: 48,
  md: 56,
  chip: 68,
  lg: 96,
};

/**
 * A person's photo, with the soft duotone glow the card treatment relies on.
 *
 * The glow colours come from the same per-person palette the web app's
 * avatar generator computes — passed in here rather than derived, since a
 * real photo (this component's only mode) never needs the generated-portrait
 * path at all.
 */
export function Avatar({
  source,
  size = 'md',
  glowFrom,
  glowTo,
}: {
  source: ImageSourcePropType;
  size?: AvatarSize;
  glowFrom: string;
  glowTo: string;
}) {
  const px = SIZES[size];
  const isChip = size === 'chip' || size === 'lg';
  const r = isChip ? radius.photo : radius.pill;
  const glowInset = 7;

  return (
    <View style={{ width: px, height: px }}>
      <LinearGradient
        colors={[glowFrom, glowTo]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          StyleSheet.absoluteFill,
          {
            margin: -glowInset,
            borderRadius: r + glowInset,
            opacity: 0.4,
          },
        ]}
      />
      <Image
        source={source}
        style={{ width: px, height: px, borderRadius: r }}
        resizeMode="cover"
      />
    </View>
  );
}
