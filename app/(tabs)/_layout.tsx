import { Tabs } from 'expo-router';
import React from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
            <View style={styles.iconWrapper}>
              {focused ? (
                <LinearGradient
                  colors={['rgba(193, 87, 56, 1)', 'rgba(139, 58, 37, 0.95)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.iconContainer, styles.activeIconGradient]}
                >
                  <View style={styles.iconGlowEffect} />
                  <MaterialCommunityIcons name="home" size={26} color="#FFFFFF" />
                </LinearGradient>
              ) : (
                <View style={[styles.iconContainer, styles.inactiveIconContainer]}>
                  <MaterialCommunityIcons name="home-outline" size={26} color={color} />
                </View>
              )}
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
            <View style={styles.iconWrapper}>
              {focused ? (
                <LinearGradient
                  colors={['rgba(193, 87, 56, 1)', 'rgba(139, 58, 37, 0.95)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.iconContainer, styles.activeIconGradient]}
                >
                  <View style={styles.iconGlowEffect} />
                  <MaterialCommunityIcons name="view-grid" size={26} color="#FFFFFF" />
                </LinearGradient>
              ) : (
                <View style={[styles.iconContainer, styles.inactiveIconContainer]}>
                  <MaterialCommunityIcons name="view-grid-outline" size={26} color={color} />
                </View>
              )}
            </View>
          ),
        }}
      />
      
      {/* RFQ/Cart Tab */}
      <Tabs.Screen
        name="rfq"
        options={{
          title: 'RFQ',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              {focused ? (
                <LinearGradient
                  colors={['rgba(193, 87, 56, 1)', 'rgba(139, 58, 37, 0.95)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.iconContainer, styles.activeIconGradient]}
                >
                  <View style={styles.iconGlowEffect} />
                  <MaterialCommunityIcons name="cart" size={26} color="#FFFFFF" />
                </LinearGradient>
              ) : (
                <View style={[styles.iconContainer, styles.inactiveIconContainer]}>
                  <MaterialCommunityIcons name="cart-outline" size={26} color={color} />
                </View>
              )}
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
            <View style={styles.iconWrapper}>
              {focused ? (
                <LinearGradient
                  colors={['rgba(193, 87, 56, 1)', 'rgba(139, 58, 37, 0.95)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.iconContainer, styles.activeIconGradient]}
                >
                  <View style={styles.iconGlowEffect} />
                  <MaterialCommunityIcons name="message-text" size={26} color="#FFFFFF" />
                </LinearGradient>
              ) : (
                <View style={[styles.iconContainer, styles.inactiveIconContainer]}>
                  <MaterialCommunityIcons name="message-text-outline" size={26} color={color} />
                </View>
              )}
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
            <View style={styles.iconWrapper}>
              {focused ? (
                <LinearGradient
                  colors={['rgba(193, 87, 56, 1)', 'rgba(139, 58, 37, 0.95)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.iconContainer, styles.activeIconGradient]}
                >
                  <View style={styles.iconGlowEffect} />
                  <MaterialCommunityIcons name="account-circle" size={26} color="#FFFFFF" />
                </LinearGradient>
              ) : (
                <View style={[styles.iconContainer, styles.inactiveIconContainer]}>
                  <MaterialCommunityIcons name="account-circle-outline" size={26} color={color} />
                </View>
              )}
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
