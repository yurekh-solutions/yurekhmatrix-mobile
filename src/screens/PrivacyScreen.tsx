import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';

export default function PrivacyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Privacy Policy</Text>
          <Text style={styles.lastUpdated}>Last updated: December 2024</Text>
        </View>

        {/* Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.content}>
            We collect information you provide when registering, creating RFQs, or contacting us. This includes name, email, company details, and transaction information.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
          <Text style={styles.content}>
            We use collected information to:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• Provide and improve our services</Text>
            <Text style={styles.bullet}>• Process transactions and send related information</Text>
            <Text style={styles.bullet}>• Send marketing communications (with your consent)</Text>
            <Text style={styles.bullet}>• Respond to inquiries and provide support</Text>
            <Text style={styles.bullet}>• Monitor and analyze trends and usage</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Data Security</Text>
          <Text style={styles.content}>
            We implement security measures to protect your personal information. All data transmitted is encrypted using SSL/TLS protocol.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Sharing Your Information</Text>
          <Text style={styles.content}>
            We do not sell, trade, or rent your personal information. We may share information with service providers who assist in operating our platform, under confidentiality agreements.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Your Rights</Text>
          <Text style={styles.content}>
            You have the right to access, update, or delete your personal information. Contact us at privacy@ritzyard.com to exercise these rights.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Cookies</Text>
          <Text style={styles.content}>
            Our platform uses cookies to enhance user experience. You can control cookie settings through your device or browser.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Third-Party Links</Text>
          <Text style={styles.content}>
            Our platform may contain links to third-party websites. We are not responsible for their privacy practices. Please review their privacy policies.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Changes to Privacy Policy</Text>
          <Text style={styles.content}>
            We may update this privacy policy. We will notify you of significant changes via email or platform notification.
          </Text>
        </View>

        <View style={styles.contactSection}>
          <MaterialCommunityIcons name="shield-lock-outline" size={24} color={colors.primary} />
          <Text style={styles.contactTitle}>Privacy Concerns?</Text>
          <Text style={styles.contactEmail}>privacy@ritzyard.com</Text>
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
  lastUpdated: {
    fontSize: 11,
    color: colors.textLight,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  content: {
    fontSize: 12,
    color: colors.textLight,
    lineHeight: 18,
    marginBottom: 8,
  },
  bulletList: {
    marginLeft: 8,
    gap: 6,
  },
  bullet: {
    fontSize: 12,
    color: colors.textLight,
    lineHeight: 16,
  },
  contactSection: {
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginTop: 10,
  },
  contactEmail: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 4,
  },
});
