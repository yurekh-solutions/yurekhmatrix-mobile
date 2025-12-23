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
  secondary: '#f5ede3', // Warm cream
  background: '#faf8f6',
  white: '#ffffff',
  text: '#332319',
  textLight: '#8b7355',
  border: '#e8dfd5',
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
          borderTopWidth: 1,
          paddingBottom: 10,
          paddingTop: 10,
          height: 70,
          elevation: 8,
          shadowColor: COLORS.primary,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
      }}>
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Ionicons name={focused ? 'home' : 'home-outline'} size={26} color={color} />
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
              <MaterialCommunityIcons name={focused ? 'shopping' : 'shopping-outline'} size={26} color={color} />
            </View>
          ),
        }}
      />
      
      {/* RFQ Tab */}
      <Tabs.Screen
        name="rfq"
        options={{
          title: 'RFQ',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <MaterialCommunityIcons name={focused ? 'file-document' : 'file-document-outline'} size={26} color={color} />
            </View>
          ),
        }}
      />
      
      {/* Material Inquiry Tab */}
      <Tabs.Screen
        name="material"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <MaterialCommunityIcons name={focused ? 'chat-multiple' : 'chat-multiple-outline'} size={26} color={color} />
            </View>
          ),
        }}
      />
      
      {/* More Tab (Drawer) */}
      <Tabs.Screen
        name="more"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Ionicons name={focused ? 'person' : 'person-outline'} size={26} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  activeIconContainer: {
    backgroundColor: COLORS.primary + '15',
  },
});
