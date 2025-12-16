import { Tabs } from 'expo-router';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { colors } from '@/src/styles/colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}>
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={24} color={color} />
          ),
        }}
      />
      
      {/* Products Tab */}
      <Tabs.Screen
        name="products"
        options={{
          title: 'Products',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="shopping-outline" size={24} color={color} />
          ),
        }}
      />
      
      {/* RFQ Tab */}
      <Tabs.Screen
        name="rfq"
        options={{
          title: 'RFQ',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="file-document" size={24} color={color} />
          ),
        }}
      />
      
      {/* Material Inquiry Tab */}
      <Tabs.Screen
        name="material"
        options={{
          title: 'Material',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="comment-multiple" size={24} color={color} />
          ),
        }}
      />
      
      {/* More Tab (Drawer) */}
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="menu" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
