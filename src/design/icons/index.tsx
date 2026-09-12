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

export function CupIcon({ size = 20, color = '#8f4a1c' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M5 8.5h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z" stroke={color} {...base} />
      <Path d="M16 10.5h1.5a2 2 0 0 1 0 4H16" stroke={color} {...base} />
      <Path d="M8 5.5v1.5M11 5.5v1.5" stroke={color} {...base} />
    </Svg>
  );
}

export function HomeIcon({ size = 22, color = '#1a2233' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M3 11.5 12 4l9 7.5" stroke={color} {...base} />
      <Path d="M5.5 10v9.5h13V10" stroke={color} {...base} />
      <Path d="M10 19.5v-5h4v5" stroke={color} {...base} />
    </Svg>
  );
}

export function DiscoverIcon({ size = 22, color = '#1a2233' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={8.5} stroke={color} {...base} />
      <Path d="m15 9-1.8 4.2L9 15l1.8-4.2Z" stroke={color} {...base} />
    </Svg>
  );
}

export function InboxIcon({ size = 22, color = '#1a2233' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M4 6.5h16v11H9l-4 3v-3H4Z" stroke={color} {...base} />
    </Svg>
  );
}

export function TripsIcon({ size = 22, color = '#1a2233' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M4 8.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2V10a2 2 0 0 0 0 4v1.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V14a2 2 0 0 0 0-4Z"
        stroke={color}
        {...base}
      />
      <Path d="M13 6.5v11" stroke={color} strokeDasharray="2 2" {...base} />
    </Svg>
  );
}

export function ProfileIcon({ size = 22, color = '#1a2233' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={9} r={3.5} stroke={color} {...base} />
      <Path d="M5 19.5c1.2-3.3 3.8-5 7-5s5.8 1.7 7 5" stroke={color} {...base} />
    </Svg>
  );
}

export function PlusIcon({ size = 20, color = '#1a2233' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 5v14M5 12h14" stroke={color} {...base} />
    </Svg>
  );
}

export function SendIcon({ size = 20, color = '#ffffff' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M4.5 11.5 20 4l-4.5 16-4-6.5Z" stroke={color} {...base} />
      <Path d="M11.5 13.5 20 4" stroke={color} {...base} />
    </Svg>
  );
}

export function CalendarIcon({ size = 20, color = '#1a2233' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M4 6h16v14H4z" stroke={color} {...base} />
      <Path d="M4 10.5h16M8.5 4v4M15.5 4v4" stroke={color} {...base} />
    </Svg>
  );
}

export function EyeIcon({ size = 20, color = '#8f4a1c' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke={color} {...base} />
      <Circle cx={12} cy={12} r={2.6} stroke={color} {...base} />
    </Svg>
  );
}

export function HandIcon({ size = 20, color = '#8f4a1c' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M8 12.5V6a1.5 1.5 0 0 1 3 0v5" stroke={color} {...base} />
      <Path d="M11 10.5V4.5a1.5 1.5 0 0 1 3 0v6" stroke={color} {...base} />
      <Path d="M14 11V6a1.5 1.5 0 0 1 3 0v7.5" stroke={color} {...base} />
      <Path d="M8 12.5 6.4 10.2a1.4 1.4 0 0 0-2.3 1.6L7 17.5a6 6 0 0 0 11-1.5V13" stroke={color} {...base} />
    </Svg>
  );
}

export function ShieldIcon({ size = 20, color = '#2f6b4f' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 3.5 5 6v5.5c0 4.2 3 7.4 7 9 4-1.6 7-4.8 7-9V6Z" stroke={color} {...base} />
      <Path d="m9 12 2 2 4-4.5" stroke={color} {...base} />
    </Svg>
  );
}

export function OutIcon({ size = 18, color = '#4d566a' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M10 5H6.5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2H10" stroke={color} {...base} />
      <Path d="M14 8.5 17.5 12 14 15.5M9 12h8.5" stroke={color} {...base} />
    </Svg>
  );
}
