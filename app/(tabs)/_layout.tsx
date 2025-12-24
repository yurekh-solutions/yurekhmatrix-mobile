import { Tabs } from 'expo-router';
import React from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { colors } from '@/src/styles/colors';

const COLORS = {
  primary: '#c15738', // Terracotta
  primaryLight: '#d66f4f',
  primaryDark: '#8b3a25',
  secondary: '#f5ede3', // Warm cream
  background: '#faf8f6',
  white: '#ffffff',
  text: '#332319',
  textLight: '#8b7355',
  border: '#e8dfd5',
  accent: '#e8a870',
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          borderTopWidth: 1.2,
          paddingBottom: 12,
          paddingTop: 10,
          height: 76,
          elevation: 12,
          shadowColor: COLORS.primary,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginTop: 6,
          letterSpacing: 0.3,
        },
      }}>      
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} size={28} color={color} />
            </View>
          ),
        }}
      />
      
      {/* Products Tab */}
      <Tabs.Screen
        name="products"
        options={{
          title: 'Products',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <MaterialCommunityIcons name={focused ? 'shopping' : 'shopping-outline'} size={28} color={color} />
            </View>
          ),
        }}
      />
      
      {/* RFQ/Cart Tab */}
      <Tabs.Screen
        name="rfq"
        options={{
          title: 'RFQ/Cart',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <MaterialCommunityIcons name={focused ? 'cart' : 'cart-outline'} size={28} color={color} />
            </View>
          ),
        }}
      />
      
      {/* Chat/Material Tab */}
      <Tabs.Screen
        name="material"
        options={{
          title: 'Inquire',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <MaterialCommunityIcons name={focused ? 'message-text' : 'message-text-outline'} size={28} color={color} />
            </View>
          ),
        }}
      />
      
      {/* Account Tab */}
      <Tabs.Screen
        name="more"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <MaterialCommunityIcons name={focused ? 'account-circle' : 'account-circle-outline'} size={28} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  activeIconContainer: {
    backgroundColor: COLORS.primary + '20',
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
});
