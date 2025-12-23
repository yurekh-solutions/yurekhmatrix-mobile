import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';

// Import all screens
import ProfileScreen from '@/src/screens/ProfileScreen';
import AboutScreen from '@/src/screens/AboutScreen';
import ContactScreen from '@/src/screens/ContactScreen';
import BlogScreen from '@/src/screens/BlogScreen';
import HelpCenterScreen from '@/src/screens/HelpCenterScreen';
import DiscoverScreen from '@/src/screens/DiscoverScreen';
import FAQScreen from '@/src/screens/FAQScreen';
import TermsScreen from '@/src/screens/TermsScreen';
import PrivacyScreen from '@/src/screens/PrivacyScreen';
import SettingsScreen from '@/src/screens/SettingsScreen';
import NotificationsScreen from '@/src/screens/NotificationsScreen';
import MiloAIScreen from '@/src/screens/MiloAIScreen';
import MiloGuideScreen from '@/src/screens/MiloGuideScreen';
import CareersScreen from '@/src/screens/CareersScreen';

type ScreenType =
  | 'profile'
  | 'about'
  | 'contact'
  | 'blog'
  | 'help'
  | 'discover'
  | 'faq'
  | 'terms'
  | 'privacy'
  | 'settings'
  | 'notifications'
  | 'milo'
  | 'guide'
  | 'careers'
  | null;

export default function MoreScreen() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>(null);
  const [navigationParams, setNavigationParams] = useState<any>(null);

  const screenItems = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'account-circle',
      section: 'Account',
    },
    {
      id: 'milo',
      label: 'Milo AI',
      icon: 'robot',
      section: 'Features',
    },
    {
      id: 'discover',
      label: 'Discover',
      icon: 'lightbulb-on',
      section: 'Features',
    },
    {
      id: 'guide',
      label: 'Milo Guide',
      icon: 'book-open',
      section: 'Help',
    },
    {
      id: 'blog',
      label: 'Blog',
      icon: 'newspaper',
      section: 'Information',
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: 'phone',
      section: 'Support',
    },
    {
      id: 'help',
      label: 'Help Center',
      icon: 'help-circle',
      section: 'Support',
    },
    {
      id: 'faq',
      label: 'FAQ',
      icon: 'frequently-asked-questions',
      section: 'Support',
    },
    {
      id: 'about',
      label: 'About Us',
      icon: 'information',
      section: 'Information',
    },
    {
      id: 'careers',
      label: 'Careers',
      icon: 'briefcase',
      section: 'Information',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'cog',
      section: 'Account',
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'bell',
      section: 'Account',
    },
    {
      id: 'terms',
      label: 'Terms & Conditions',
      icon: 'file-document',
      section: 'Legal',
    },
    {
      id: 'privacy',
      label: 'Privacy Policy',
      icon: 'shield-account',
      section: 'Legal',
    },

  ];

  const sections = [...new Set(screenItems.map((item) => item.section))];

  const renderScreen = () => {
    const navigation = {
      goBack: () => setActiveScreen(null),
      navigate: (screen: string, params?: any) => {
        setNavigationParams(params);
        setActiveScreen(screen.toLowerCase() as ScreenType);
      },
    };

    switch (activeScreen) {
      case 'profile':
        return <ProfileScreen />;
      case 'about':
        return <AboutScreen />;
      case 'contact':
        return <ContactScreen />;
      case 'blog':
        return <BlogScreen />;
      case 'help':
        return <HelpCenterScreen />;
      case 'discover':
        return <DiscoverScreen />;
      case 'faq':
        return <FAQScreen />;
      case 'terms':
        return <TermsScreen />;
      case 'privacy':
        return <PrivacyScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'milo':
        return <MiloAIScreen />;
      case 'guide':
        return <MiloGuideScreen />;
      case 'careers':
        return <CareersScreen />;
      default:
        return null;
    }
  };

  if (activeScreen) {
    return (
      <Modal
        visible={true}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setActiveScreen(null)}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => setActiveScreen(null)}
              style={styles.backButton}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {screenItems.find((item) => item.id === activeScreen)?.label}
            </Text>
            <View style={{ width: 40 }} />
          </View>
          {renderScreen()}
        </SafeAreaView>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Explore RitzYard</Text>
          <Text style={styles.subtitle}>14 screens available</Text>
        </View>

        {sections.map((section) => (
          <View key={section} style={styles.section}>
            <Text style={styles.sectionTitle}>{section}</Text>
            {screenItems
              .filter((item) => item.section === section)
              .map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={() => setActiveScreen(item.id as ScreenType)}>
                  <View style={styles.menuItemLeft}>
                    <View style={styles.iconContainer}>
                      <MaterialCommunityIcons
                        name={item.icon as any}
                        size={20}
                        color={colors.primary}
                      />
                    </View>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={20}
                    color={colors.textLight}
                  />
                </TouchableOpacity>
              ))}
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>RitzYard v1.0.0</Text>
          <Text style={styles.footerSubtext}>All features integrated</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 8,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 8,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: colors.textLight,
  },
});
