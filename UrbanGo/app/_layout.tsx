import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS } from '../config/constants';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={COLORS.primary} translucent={false} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen 
          name="splash" 
          options={{
            animation: 'none',
          }}
        />
        <Stack.Screen 
          name="onboarding"
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="(auth)" />
        <Stack.Screen 
          name="(tabs)"
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="index" options={{ href: null }} />
      </Stack>
    </SafeAreaProvider>
  );
}
