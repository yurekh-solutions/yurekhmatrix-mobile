import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import CustomDrawer from '@/src/components/CustomDrawer';
import { AuthProvider, useAuth } from '@/src/contexts/AuthContext';
import LoginScreen from '@/src/screens/LoginScreen';
import SupplierOnboardingScreen from '@/src/screens/SupplierOnboardingScreen';
import { colors } from '@/src/styles/colors';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootNavigator() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, isLoading } = useAuth();
  const [showApp, setShowApp] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShowApp(isAuthenticated);
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (showOnboarding) {
    return (
      <SupplierOnboardingScreen 
        navigation={{
          goBack: () => setShowOnboarding(false),
          navigate: (screen: string) => {
            if (screen === 'Home') {
              setShowOnboarding(false);
              setShowApp(true);
            }
          },
        }}
      />
    );
  }

  if (!showApp) {
    return (
      <LoginScreen 
        onLoginSuccess={() => setShowApp(true)}
        navigation={{
          navigate: (screen: string) => {
            if (screen === 'supplierOnboarding') {
              setShowOnboarding(true);
            }
          },
        }}
      />
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
