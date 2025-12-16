import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  SectionList,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';

interface SettingsItem {
  id: string;
  label: string;
  icon: string;
  type: 'toggle' | 'action' | 'link';
  value?: boolean;
  badge?: string;
  action?: () => void;
}

interface SettingsSection {
  title: string;
  data: SettingsItem[];
}

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    pushNotifications: true,
    orderUpdates: true,
    promotions: false,
    twoFactor: false,
    darkMode: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Logout',
        onPress: () => {
          Alert.alert('Success', 'You have been logged out');
          // Navigate to login screen
        },
        style: 'destructive',
      },
    ]);
  };

  const settingsSections: SettingsSection[] = [
    {
      title: 'Notifications',
      data: [
        {
          id: 'notifications',
          label: 'All Notifications',
          icon: 'bell',
          type: 'toggle',
          value: settings.notifications,
        },
        {
          id: 'emailAlerts',
          label: 'Email Alerts',
          icon: 'email',
          type: 'toggle',
          value: settings.emailAlerts,
        },
        {
          id: 'pushNotifications',
          label: 'Push Notifications',
          icon: 'phone-notification',
          type: 'toggle',
          value: settings.pushNotifications,
        },
        {
          id: 'orderUpdates',
          label: 'Order Updates',
          icon: 'package-variant',
          type: 'toggle',
          value: settings.orderUpdates,
        },
        {
          id: 'promotions',
          label: 'Promotions & Offers',
          icon: 'tag',
          type: 'toggle',
          value: settings.promotions,
        },
      ],
    },
    {
      title: 'Security & Privacy',
      data: [
        {
          id: 'twoFactor',
          label: 'Two-Factor Authentication',
          icon: 'shield-check',
          type: 'toggle',
          value: settings.twoFactor,
        },
        {
          id: 'password',
          label: 'Change Password',
          icon: 'lock',
          type: 'action',
          badge: 'Update',
        },
        {
          id: 'privacy',
          label: 'Privacy Policy',
          icon: 'file-document-outline',
          type: 'link',
        },
        {
          id: 'terms',
          label: 'Terms of Service',
          icon: 'file-document-outline',
          type: 'link',
        },
      ],
    },
    {
      title: 'Appearance',
      data: [
        {
          id: 'darkMode',
          label: 'Dark Mode',
          icon: 'moon',
          type: 'toggle',
          value: settings.darkMode,
        },
        {
          id: 'language',
          label: 'Language',
          icon: 'translate',
          type: 'action',
          badge: 'English',
        },
      ],
    },
    {
      title: 'Account',
      data: [
        {
          id: 'profile',
          label: 'Edit Profile',
          icon: 'account-edit',
          type: 'action',
        },
        {
          id: 'company',
          label: 'Company Information',
          icon: 'office-building',
          type: 'action',
        },
        {
          id: 'billing',
          label: 'Billing & Payments',
          icon: 'credit-card',
          type: 'action',
        },
        {
          id: 'dataExport',
          label: 'Download My Data',
          icon: 'download',
          type: 'action',
        },
      ],
    },
    {
      title: 'Support & About',
      data: [
        {
          id: 'help',
          label: 'Help & Support',
          icon: 'help-circle-outline',
          type: 'action',
        },
        {
          id: 'feedback',
          label: 'Send Feedback',
          icon: 'message-reply-outline',
          type: 'action',
        },
        {
          id: 'about',
          label: 'About RitzYard',
          icon: 'information-outline',
          type: 'action',
          badge: 'v1.0.0',
        },
      ],
    },
  ];

  const renderSettingItem = (item: SettingsItem) => {
    switch (item.type) {
      case 'toggle':
        return (
          <View style={styles.settingItemContainer}>
            <View style={styles.settingItemLeft}>
              <View style={styles.iconBox}>
                <MaterialCommunityIcons name={item.icon as any} size={20} color={colors.primary} />
              </View>
              <Text style={styles.settingItemLabel}>{item.label}</Text>
            </View>
            <Switch
              value={item.value || false}
              onValueChange={() =>
                handleToggle(item.id as keyof typeof settings)
              }
              trackColor={{ false: colors.border, true: colors.primary + '80' }}
              thumbColor={item.value ? colors.primary : colors.textLight}
            />
          </View>
        );

      case 'action':
        return (
          <TouchableOpacity style={styles.settingItemContainer}>
            <View style={styles.settingItemLeft}>
              <View style={styles.iconBox}>
                <MaterialCommunityIcons name={item.icon as any} size={20} color={colors.primary} />
              </View>
              <Text style={styles.settingItemLabel}>{item.label}</Text>
            </View>
            <View style={styles.settingItemRight}>
              {item.badge && (
                <View style={styles.badgeBox}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
              <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textLight} />
            </View>
          </TouchableOpacity>
        );

      case 'link':
        return (
          <TouchableOpacity style={styles.settingItemContainer}>
            <View style={styles.settingItemLeft}>
              <View style={styles.iconBox}>
                <MaterialCommunityIcons name={item.icon as any} size={20} color={colors.primary} />
              </View>
              <Text style={styles.settingItemLabel}>{item.label}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textLight} />
          </TouchableOpacity>
        );

      default:
        return null;
    }
  };

  const renderSectionHeader = (section: { title: string }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Manage your preferences and account</Text>
        </View>

        {/* Settings List */}
        {settingsSections.map((section, index) => (
          <View key={index}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            <View style={styles.settingsSection}>
              {section.data.map((item, itemIndex) => (
                <View key={item.id}>
                  {renderSettingItem(item)}
                  {itemIndex < section.data.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={18} color={colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Footer Info */}
        <View style={styles.footerInfo}>
          <Text style={styles.footerText}>RitzYard Mobile App</Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <Text style={styles.copyrightText}>© 2024 All rights reserved</Text>
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
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textLight,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
  },
  settingsSection: {
    marginHorizontal: 16,
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 8,
  },
  settingItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 36,
    height: 36,
    backgroundColor: colors.accent,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  settingItemLabel: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
    flex: 1,
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgeBox: {
    backgroundColor: colors.accent,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 11,
    color: colors.text,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: 12,
  },
  logoutButton: {
    marginHorizontal: 16,
    marginVertical: 12,
    flexDirection: 'row',
    backgroundColor: colors.error + '15',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.error + '30',
    gap: 10,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.error,
  },
  footerInfo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  versionText: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
  },
  copyrightText: {
    fontSize: 11,
    color: colors.textLight,
    marginTop: 8,
  },
});
