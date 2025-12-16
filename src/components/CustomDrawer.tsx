import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '@/src/styles/colors';

interface DrawerItem {
  label: string;
  icon: string;
  route: string;
  section?: string;
}

interface CustomDrawerProps {
  navigation: DrawerNavigationProp<any>;
}

const drawerItems: DrawerItem[] = [
  // Main Features
  { label: 'Home', icon: 'home', route: 'Home', section: 'Main' },
  { label: 'Products', icon: 'package-multiple', route: 'Products' },
  { label: 'RFQ', icon: 'file-document-outline', route: 'RFQ' },
  { label: 'Material Inquiry', icon: 'comment-multiple-outline', route: 'MaterialInquiry' },
  { label: 'Milo AI', icon: 'robot', route: 'MiloAI' },
  { label: 'Profile', icon: 'account', route: 'Profile' },

  // Information
  { label: 'Discover', icon: 'lightbulb', route: 'Discover', section: 'Information' },
  { label: 'About Us', icon: 'information-outline', route: 'About' },
  { label: 'Contact', icon: 'email-outline', route: 'Contact' },
  { label: 'Help Center', icon: 'help-circle-outline', route: 'HelpCenter' },
  { label: 'FAQs', icon: 'frequently-asked-questions', route: 'FAQ' },

  // Content
  { label: 'Blog', icon: 'newspaper', route: 'Blogs', section: 'Content' },
  { label: 'Careers', icon: 'briefcase', route: 'Careers' },
  { label: 'Milo Guide', icon: 'book-outline', route: 'MiloGuide' },

  // Legal
  { label: 'Terms of Service', icon: 'file-document-outline', route: 'Terms', section: 'Legal' },
  { label: 'Privacy Policy', icon: 'shield-outline', route: 'Privacy' },

  // Settings
  { label: 'Settings', icon: 'cog', route: 'Settings', section: 'Account' },
  { label: 'Notifications', icon: 'bell-outline', route: 'Notifications' },
  { label: 'Logout', icon: 'logout', route: 'Logout' },
];

export default function CustomDrawer({ navigation }: CustomDrawerProps) {
  const handlePress = (route: string) => {
    if (route === 'Logout') {
      // Handle logout
      navigation.closeDrawer();
      // TODO: Implement logout logic
    } else {
      navigation.navigate(route);
      navigation.closeDrawer();
    }
  };

  const renderSection = (items: DrawerItem[]) => {
    return items.map((item) => (
      <TouchableOpacity
        key={item.route}
        style={styles.drawerItem}
        onPress={() => handlePress(item.route)}
      >
        <MaterialCommunityIcons
          name={item.icon as any}
          size={20}
          color={item.route === 'Logout' ? colors.error : colors.primary}
        />
        <Text
          style={[
            styles.drawerItemLabel,
            item.route === 'Logout' && styles.logoutLabel,
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    ));
  };

  const sections = [
    {
      title: 'Main',
      items: drawerItems.filter((item) => !item.section || item.section === 'Main'),
    },
    {
      title: 'Information',
      items: drawerItems.filter((item) => item.section === 'Information'),
    },
    {
      title: 'Content',
      items: drawerItems.filter((item) => item.section === 'Content'),
    },
    {
      title: 'Legal',
      items: drawerItems.filter((item) => item.section === 'Legal'),
    },
    {
      title: 'Account',
      items: drawerItems.filter((item) => item.section === 'Account'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialCommunityIcons name="warehouse" size={32} color={colors.primary} />
        <Text style={styles.headerTitle}>RitzYard</Text>
        <Text style={styles.headerSubtitle}>Procurement</Text>
      </View>

      {/* Menu Items */}
      <ScrollView contentContainerStyle={styles.menuContainer} showsVerticalScrollIndicator={false}>
        {sections.map((section) => (
          section.items.length > 0 && (
            <View key={section.title}>
              {section.title !== 'Main' && (
                <Text style={styles.sectionLabel}>{section.title}</Text>
              )}
              <View style={styles.section}>{renderSection(section.items)}</View>
            </View>
          )
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>RitzYard Mobile App</Text>
        <Text style={styles.footerVersion}>v1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  menuContainer: {
    paddingVertical: 12,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textLight,
    textTransform: 'uppercase',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 8,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  drawerItemLabel: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  logoutLabel: {
    color: colors.error,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '500',
  },
  footerVersion: {
    fontSize: 10,
    color: colors.textLight,
    marginTop: 2,
  },
});
