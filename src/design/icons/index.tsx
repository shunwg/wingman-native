import Svg, { Circle, Path } from 'react-native-svg';

/**
 * The icon set. One consistent stroke and weight, matching the web app's
 * inline SVG symbols — traced from the same paths rather than drawn fresh,
 * so the two apps read as one product.
 */
type IconProps = { size?: number; color?: string };

const base = { fill: 'none', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export function BackIcon({ size = 22, color = '#1a2233' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="m14.5 5.5-6.5 6.5 6.5 6.5" stroke={color} {...base} />
    </Svg>
  );
}

export function ChevronIcon({ size = 18, color = '#8a94a6' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="m9.5 6 6 6-6 6" stroke={color} {...base} />
    </Svg>
  );
}

export function PlaneIcon({ size = 20, color = '#8f4a1c' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M10.5 13.5 4 11l1.5-1.5 6.5 1 5-5a1.6 1.6 0 0 1 2.3 2.3l-5 5 1 6.5L13.8 21l-2.5-6.5"
        stroke={color}
        {...base}
      />
      <Path d="m7 17 2-2" stroke={color} {...base} />
    </Svg>
  );
}

export function CarIcon({ size = 20, color = '#8f4a1c' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M5 13.5 6.6 8.8A2 2 0 0 1 8.5 7.5h7a2 2 0 0 1 1.9 1.3L19 13.5" stroke={color} {...base} />
      <Path d="M4 13.5h16v4.5H4z" stroke={color} {...base} />
      <Circle cx={7.5} cy={18} r={1.2} fill={color} />
      <Circle cx={16.5} cy={18} r={1.2} fill={color} />
    </Svg>
  );
}

export function PinIcon({ size = 20, color = '#8f4a1c' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 21s-6-5.6-6-10.5a6 6 0 0 1 12 0C18 15.4 12 21 12 21Z" stroke={color} {...base} />
      <Circle cx={12} cy={10.5} r={2} stroke={color} {...base} />
    </Svg>
  );
}

export function UsersIcon({ size = 20, color = '#8f4a1c' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={9} cy={9} r={3} stroke={color} {...base} />
      <Path d="M3.5 19c.9-2.8 3-4.3 5.5-4.3s4.6 1.5 5.5 4.3" stroke={color} {...base} />
      <Path d="M15.5 6.5a3 3 0 0 1 0 5.8" stroke={color} {...base} />
      <Path d="M17 14.9c1.9.5 3.1 1.9 3.6 4.1" stroke={color} {...base} />
    </Svg>
  );
}

export function CheckIcon({ size = 16, color = '#2f6b4f' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="m5.5 12.5 4 4 9-9.5" stroke={color} {...base} />
    </Svg>
  );
}

export function LockIcon({ size = 18, color = '#4d566a' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M5.5 10.5h13v10h-13z" stroke={color} {...base} />
      <Path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke={color} {...base} />
    </Svg>
  );
}

export function MoreIcon({ size = 22, color = '#1a2233' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={6} cy={12} r={1} fill={color} />
      <Circle cx={12} cy={12} r={1} fill={color} />
      <Circle cx={18} cy={12} r={1} fill={color} />
    </Svg>
  );
}
