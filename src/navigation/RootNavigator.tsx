import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { WelcomeScreen } from '../screens/welcome/WelcomeScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { PersonScreen } from '../screens/person/PersonScreen';
import { MomentScreen } from '../screens/moment/MomentScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

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
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Person" component={PersonScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="Moment" component={MomentScreen} options={{ presentation: 'fullScreenModal', animation: 'fade' }} />
    </Stack.Navigator>
  );
}
