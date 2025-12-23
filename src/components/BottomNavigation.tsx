import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BottomNavigationProps {
  currentTab: 'home' | 'search' | 'rfq' | 'profile';
  onTabChange: (tab: 'home' | 'search' | 'rfq' | 'profile') => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentTab, onTabChange }) => {
  const navItems = [
    { id: 'home', icon: 'home' },
    { id: 'search', icon: 'bag' },
    { id: 'rfq', icon: 'document' },
    { id: 'profile', icon: 'chatbox' },
  ];

  return (
    <View style={styles.navBar}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.navItem}
          onPress={() => onTabChange(item.id as any)}
        >
          <Ionicons 
            name={item.icon as any} 
            size={24} 
            color={currentTab === item.id ? '#FF6B35' : '#999'}
          />
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="menu" size={24} color="#999" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="chevron-down" size={24} color="#999" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
    gap: 20,
  },
  navItem: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
