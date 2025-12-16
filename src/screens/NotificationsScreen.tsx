import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  SectionList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  icon: string;
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState({
    rfqResponses: true,
    priceUpdates: true,
    newProducts: false,
    promotions: false,
    orderUpdates: true,
    supplierMessages: true,
    systemAlerts: true,
    newsletter: false,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const NotificationItem = ({ setting, value }: { setting: { label: string; description: string; icon: string }; value: boolean }) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationLeft}>
        <View style={styles.notificationIcon}>
          <MaterialCommunityIcons name={setting.icon as any} size={20} color={colors.primary} />
        </View>
        <View style={styles.notificationText}>
          <Text style={styles.notificationLabel}>{setting.label}</Text>
          <Text style={styles.notificationDescription}>{setting.description}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={(newValue) => {}}
        trackColor={{ false: colors.border, true: colors.primary + '80' }}
        thumbColor={value ? colors.primary : colors.textLight}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.subtitle}>Manage your notification preferences</Text>
        </View>

        {/* RFQ & Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RFQ & Orders</Text>
          <View style={styles.itemsContainer}>
            <NotificationItem
              setting={{
                label: 'RFQ Responses',
                description: 'Get notified when suppliers respond to your RFQs',
                icon: 'file-document-outline',
              }}
              value={notifications.rfqResponses}
            />
            <View style={styles.divider} />
            <NotificationItem
              setting={{
                label: 'Order Updates',
                description: 'Track shipment status and delivery updates',
                icon: 'truck-delivery-outline',
              }}
              value={notifications.orderUpdates}
            />
          </View>
        </View>

        {/* Products & Prices */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Products & Prices</Text>
          <View style={styles.itemsContainer}>
            <NotificationItem
              setting={{
                label: 'Price Updates',
                description: 'Alerts when prices change for saved products',
                icon: 'trending-down',
              }}
              value={notifications.priceUpdates}
            />
            <View style={styles.divider} />
            <NotificationItem
              setting={{
                label: 'New Products',
                description: 'Notify about new products in your categories',
                icon: 'package-multiple',
              }}
              value={notifications.newProducts}
            />
          </View>
        </View>

        {/* Communication */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Communication</Text>
          <View style={styles.itemsContainer}>
            <NotificationItem
              setting={{
                label: 'Supplier Messages',
                description: 'New messages from suppliers',
                icon: 'message-reply-outline',
              }}
              value={notifications.supplierMessages}
            />
            <View style={styles.divider} />
            <NotificationItem
              setting={{
                label: 'System Alerts',
                description: 'Important system notifications',
                icon: 'bell-alert-outline',
              }}
              value={notifications.systemAlerts}
            />
          </View>
        </View>

        {/* Marketing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Marketing</Text>
          <View style={styles.itemsContainer}>
            <NotificationItem
              setting={{
                label: 'Promotions',
                description: 'Special offers and discounts',
                icon: 'tag-multiple',
              }}
              value={notifications.promotions}
            />
            <View style={styles.divider} />
            <NotificationItem
              setting={{
                label: 'Newsletter',
                description: 'Weekly industry insights and tips',
                icon: 'newspaper',
              }}
              value={notifications.newsletter}
            />
          </View>
        </View>

        {/* Notification Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Methods</Text>
          <View style={styles.methodsGrid}>
            <TouchableOpacity style={styles.methodCard}>
              <MaterialCommunityIcons name="bell" size={24} color={colors.primary} />
              <Text style={styles.methodLabel}>In-App</Text>
              <Text style={styles.methodStatus}>Enabled</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.methodCard}>
              <MaterialCommunityIcons name="email" size={24} color={colors.primary} />
              <Text style={styles.methodLabel}>Email</Text>
              <Text style={styles.methodStatus}>Enabled</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.methodCard, styles.methodDisabled]}>
              <MaterialCommunityIcons name="phone-outline" size={24} color={colors.textLight} />
              <Text style={styles.methodLabel}>SMS</Text>
              <Text style={styles.methodStatus}>Disabled</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Info */}
        <View style={styles.infoBox}>
          <MaterialCommunityIcons name="information-outline" size={16} color={colors.primary} />
          <Text style={styles.infoText}>
            You will always receive critical notifications like payment confirmations and security alerts regardless of these settings.
          </Text>
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
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  itemsContainer: {
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.accent,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    flex: 1,
  },
  notificationLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  notificationDescription: {
    fontSize: 11,
    color: colors.textLight,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  methodsGrid: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  methodCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  methodDisabled: {
    opacity: 0.6,
  },
  methodLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginTop: 6,
  },
  methodStatus: {
    fontSize: 10,
    color: colors.textLight,
    marginTop: 2,
  },
  infoBox: {
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoText: {
    flex: 1,
    fontSize: 11,
    color: colors.text,
    lineHeight: 15,
  },
});
