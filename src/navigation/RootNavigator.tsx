import type { ReactNode } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { MainTabParamList, RootStackParamList } from './types';
import { WelcomeScreen } from '../screens/welcome/WelcomeScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { DiscoverScreen } from '../screens/discover/DiscoverScreen';
import { InboxScreen } from '../screens/inbox/InboxScreen';
import { TripsScreen } from '../screens/trips/TripsScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { PersonScreen } from '../screens/person/PersonScreen';
import { MomentScreen } from '../screens/moment/MomentScreen';
import { ChatScreen } from '../screens/chat/ChatScreen';
import { CarScreen } from '../screens/car/CarScreen';
import { CarChatScreen } from '../screens/carchat/CarChatScreen';
import { EventScreen } from '../screens/event/EventScreen';
import { PrivacyScreen } from '../screens/privacy/PrivacyScreen';
import { HomeIcon, DiscoverIcon, InboxIcon, TripsIcon, ProfileIcon } from '../design/icons';
import { colors } from '../design/tokens';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_ICON: Record<keyof MainTabParamList, (color: string) => ReactNode> = {
  Home: (c) => <HomeIcon color={c} size={22} />,
  Discover: (c) => <DiscoverIcon color={c} size={22} />,
  Inbox: (c) => <InboxIcon color={c} size={22} />,
  Trips: (c) => <TripsIcon color={c} size={22} />,
  Profile: (c) => <ProfileIcon color={c} size={22} />,
};

/**
 * The five real tabs — Home, Discover, Inbox, Trips, You — replacing the
 * earlier visual-only stand-in. Each tab keeps its own navigation history
 * (react-navigation's default), and unhandled route names (Person, Moment,
 * Chat, Car, ...) bubble up to the root Stack automatically.
 */
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.hairline },
        tabBarIcon: ({ color }) => TAB_ICON[route.name](color),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Trips" component={TripsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'You' }} />
    </Tab.Navigator>
  );
}

/**
 * Every screen this pass built, wired together. Native-stack gives the
 * iOS/Android push-and-pop transition for free — no CSS keyframes to
 * reimplement, unlike the HTML prototype this app replaces.
 *
 * Moment is presented modally (fullScreenModal) rather than pushed: it is
 * reached from a "hello back" notice, not a drill-down, and the web
 * prototype treats it the same way (a fade over Home, not a push).
 */
export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Person" component={PersonScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="Moment" component={MomentScreen} options={{ presentation: 'fullScreenModal', animation: 'fade' }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="Car" component={CarScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="CarChat" component={CarChatScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="Event" component={EventScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ animation: 'slide_from_right' }} />
    </Stack.Navigator>
  );
}
