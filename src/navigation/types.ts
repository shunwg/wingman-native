import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CorePersonId } from '../data/people';

/**
 * Tabs are their own param list, nested inside the root stack as one screen
 * ("MainTabs"). Screens inside a tab still call navigation.navigate('Person')
 * etc. directly — React Navigation bubbles an unrecognised route name up to
 * the parent stack automatically, so no getParent() plumbing is needed.
 */
export type MainTabParamList = {
  Home: undefined;
  Discover: undefined;
  Inbox: undefined;
  Trips: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Welcome: undefined;
  MainTabs: undefined;
  Person: { personId: CorePersonId };
  Moment: undefined;
  Chat: undefined;
  Car: undefined;
  CarChat: undefined;
  Event: undefined;
  Privacy: undefined;
};

/** A screen inside a tab still needs the root stack's navigate() too — this
 *  is the prop type every tab screen (Home, Discover, Inbox, Trips, Profile)
 *  should use instead of a plain BottomTabScreenProps. */
export type TabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

export type StackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
