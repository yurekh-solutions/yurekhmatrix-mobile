import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
  primary: '#c15738',
  primaryLight: '#d66f4f',
  secondary: '#f5ede3',
  background: '#faf8f6',
  white: '#ffffff',
  text: '#683627',
  textLight: '#8b7355',
  border: '#e8dfd5',
};

interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  route: string;
  color: string;
}

const menuSections = [
  {
    title: 'RITZYARD',
    items: [
      {
        id: 'home',
        title: 'Home',
        subtitle: 'Back to homepage',
        icon: 'home-outline',
        route: 'index',
        color: '#c15738',
      },
      {
        id: 'discover',
        title: 'Discover',
        subtitle: 'Explore products',
        icon: 'compass-outline',
        route: 'discover',
        color: '#FF6B6B',
      },
      {
        id: 'miloai',
        title: 'Milo AI',
        subtitle: 'AI-powered assistant',
        icon: 'robot-outline',
        route: 'miloai',
        color: '#4ECDC4',
      },
      {
        id: 'miloguide',
        title: 'Milo Guide',
        subtitle: 'Product recommendations',
        icon: 'book-open-outline',
        route: 'miloguide',
        color: '#95E1D3',
      },
    ],
  },
  {
    title: 'YOUR ACCOUNT',
    items: [
      {
        id: 'profile',
        title: 'Profile',
        subtitle: 'Manage your profile',
        icon: 'account-circle-outline',
        route: 'profile',
        color: '#9B59B6',
      },
      {
        id: 'settings',
        title: 'Settings',
        subtitle: 'App preferences',
        icon: 'cog-outline',
        route: 'settings',
        color: '#3498DB',
      },
      {
        id: 'notifications',
        title: 'Notifications',
        subtitle: 'Manage notifications',
        icon: 'bell-outline',
        route: 'notifications',
        color: '#E74C3C',
      },
    ],
  },
  {
    title: 'SUPPORT & INFO',
    items: [
      {
        id: 'help',
        title: 'Help Center',
        subtitle: 'Get help & support',
        icon: 'help-circle-outline',
        route: 'helpcenter',
        color: '#F39C12',
      },
      {
        id: 'faq',
        title: 'FAQ',
        subtitle: 'Frequently asked questions',
        icon: 'comment-question-outline',
        route: 'faq',
        color: '#16A085',
      },
      {
        id: 'contact',
        title: 'Contact Us',
        subtitle: 'Get in touch',
        icon: 'email-outline',
        route: 'contact',
        color: '#2ECC71',
      },
      {
        id: 'about',
        title: 'About',
        subtitle: 'About RitzYard',
        icon: 'information-outline',
        route: 'about',
        color: '#E67E22',
      },
      {
        id: 'blog',
        title: 'Blog',
        subtitle: 'Latest news & updates',
        icon: 'post-outline',
        route: 'blog',
        color: '#8E44AD',
      },
      {
        id: 'careers',
        title: 'Careers',
        subtitle: 'Join our team',
        icon: 'briefcase-outline',
        route: 'careers',
        color: '#27AE60',
      },
    ],
  },
  {
    title: 'LEGAL',
    items: [
      {
        id: 'privacy',
        title: 'Privacy Policy',
        subtitle: 'How we protect your data',
        icon: 'shield-check-outline',
        route: 'privacy',
        color: '#34495E',
      },
      {
        id: 'terms',
        title: 'Terms of Service',
        subtitle: 'Terms and conditions',
        icon: 'file-document-outline',
        route: 'terms',
        color: '#7F8C8D',
      },
    ],
  },
];

export default function ExploreScreen() {
  const navigation = useNavigation();

  const handleNavigate = (route: string) => {
    if (navigation && (navigation as any).navigate) {
      (navigation as any).navigate(route);
    }
  };

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => handleNavigate(item.route)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconBox, { backgroundColor: item.color + '20' }]}>
        <MaterialCommunityIcons
          name={item.icon as any}
          size={24}
          color={item.color}
        />
      </View>
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={20}
        color={COLORS.textLight}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.secondary, COLORS.background]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Explore RitzYard</Text>
            <Text style={styles.headerSubtitle}>14 screens available</Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {menuSections.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.menuList}>
                {section.items.map((item) => renderMenuItem(item))}
              </View>
            </View>
          ))}

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>RitzYard v1.0.0</Text>
            <Text style={styles.footerSubtext}>Premium Materials Marketplace</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  gradient: {
    flex: 1,
  },

  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },

  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
  },

  scrollContent: {
    paddingBottom: 40,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textLight,
    paddingHorizontal: 20,
    marginBottom: 12,
    letterSpacing: 1,
  },

  menuList: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginHorizontal: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  menuTextContainer: {
    flex: 1,
  },

  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },

  menuSubtitle: {
    fontSize: 13,
    color: COLORS.textLight,
  },

  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },

  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },

  footerSubtext: {
    fontSize: 12,
    color: COLORS.textLight,
  },
});
