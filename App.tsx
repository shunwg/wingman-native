import { useCallback } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts as useSpectral,
  Spectral_300Light,
  Spectral_300Light_Italic,
} from '@expo-google-fonts/spectral';
import {
  useFonts as useAtkinson,
  AtkinsonHyperlegible_400Regular,
  AtkinsonHyperlegible_700Bold,
} from '@expo-google-fonts/atkinson-hyperlegible';
import { RootNavigator } from './src/navigation/RootNavigator';
import { colors } from './src/design/tokens';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [spectralLoaded] = useSpectral({ Spectral_300Light, Spectral_300Light_Italic });
  const [atkinsonLoaded] = useAtkinson({ AtkinsonHyperlegible_400Regular, AtkinsonHyperlegible_700Bold });
  const fontsReady = spectralLoaded && atkinsonLoaded;

  const onLayout = useCallback(() => {
    if (fontsReady) SplashScreen.hideAsync().catch(() => {});
  }, [fontsReady]);

  if (!fontsReady) return null;

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: colors.canvas }} onLayout={onLayout}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}
