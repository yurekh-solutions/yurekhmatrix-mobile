import { Tabs } from 'expo-router';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';

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
            <MaterialCommunityIcons 
              name={focused ? "home" : "home-outline"} 
              size={26} 
              color={focused ? COLORS.primary : color} 
            />
          ),
        }}
      />
      
      {/* Products Tab */}
      <Tabs.Screen
        name="products"
        options={{
          title: 'Products',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "view-grid" : "view-grid-outline"} 
              size={26} 
              color={focused ? COLORS.primary : color} 
            />
          ),
        }}
      />
      
      {/* RFQ/Cart Tab */}
      <Tabs.Screen
        name="rfq"
        options={{
          title: 'RFQ',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "cart" : "cart-outline"} 
              size={26} 
              color={focused ? COLORS.primary : color} 
            />
          ),
        }}
      />
      
      {/* Chat/Material Tab */}
      <Tabs.Screen
        name="material"
        options={{
          title: 'Inquire',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "message-text" : "message-text-outline"} 
              size={26} 
              color={focused ? COLORS.primary : color} 
            />
          ),
        }}
      />
      
      {/* Account Tab */}
      <Tabs.Screen
        name="more"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "account-circle" : "account-circle-outline"} 
              size={26} 
              color={focused ? COLORS.primary : color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
