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
          <Text style={styles.lastUpdated}>Last updated: January 15, 2025</Text>
        </View>

        {/* Section 1 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          
          <Text style={styles.subsectionTitle}>Personal Information</Text>
          <Text style={styles.content}>
            We collect information you provide directly to us, such as:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• Name, email address, and phone number</Text>
            <Text style={styles.bullet}>• Company information and business details</Text>
            <Text style={styles.bullet}>• Payment and billing information</Text>
            <Text style={styles.bullet}>• Profile information and preferences</Text>
            <Text style={styles.bullet}>• Communications with our support team</Text>
          </View>

          <Text style={styles.subsectionTitle}>Usage Information</Text>
          <Text style={styles.content}>
            We automatically collect certain information about your use of our Platform:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• Device information (IP address, browser type, operating system)</Text>
            <Text style={styles.bullet}>• Usage patterns and interaction data</Text>
            <Text style={styles.bullet}>• Log files and analytics data</Text>
            <Text style={styles.bullet}>• Cookies and similar tracking technologies</Text>
          </View>
        </View>

        {/* Section 2 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
          <Text style={styles.content}>
            We use the information we collect to:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• Provide, maintain, and improve our services</Text>
            <Text style={styles.bullet}>• Process transactions and send related information</Text>
            <Text style={styles.bullet}>• Send technical notices and support messages</Text>
            <Text style={styles.bullet}>• Respond to your comments and questions</Text>
            <Text style={styles.bullet}>• Develop new products and services</Text>
            <Text style={styles.bullet}>• Analyze usage patterns and optimize user experience</Text>
            <Text style={styles.bullet}>• Detect, prevent, and address fraud and security issues</Text>
          </View>
        </View>

        {/* Section 3 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Information Sharing</Text>
          <Text style={styles.content}>
            We may share your information in the following circumstances:
          </Text>

          <Text style={styles.subsectionTitle}>With Your Consent</Text>
          <Text style={styles.content}>
            We share information when you give us explicit consent to do so.
          </Text>

          <Text style={styles.subsectionTitle}>Service Providers</Text>
          <Text style={styles.content}>
            We work with third-party service providers who perform services on our behalf, such as:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• Payment processing</Text>
            <Text style={styles.bullet}>• Data analytics</Text>
            <Text style={styles.bullet}>• Customer support</Text>
            <Text style={styles.bullet}>• Marketing and advertising</Text>
            <Text style={styles.bullet}>• Cloud hosting and storage</Text>
          </View>

          <Text style={styles.subsectionTitle}>Legal Requirements</Text>
          <Text style={styles.content}>
            We may disclose information if required by law or in response to valid legal requests from public authorities.
          </Text>
        </View>

        {/* Section 4 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Data Security</Text>
          <Text style={styles.content}>
            We implement appropriate technical and organizational measures to protect your personal information:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• Encryption of data in transit and at rest</Text>
            <Text style={styles.bullet}>• Regular security assessments and audits</Text>
            <Text style={styles.bullet}>• Access controls and authentication measures</Text>
            <Text style={styles.bullet}>• Employee training on data protection</Text>
            <Text style={styles.bullet}>• Incident response and breach notification procedures</Text>
          </View>
        </View>

        {/* Section 5 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Data Retention</Text>
          <Text style={styles.content}>
            We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
          </Text>
        </View>

        {/* Section 6 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Your Rights</Text>
          <Text style={styles.content}>
            Depending on your location, you may have the following rights regarding your personal information:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• Access: Request access to your personal information</Text>
            <Text style={styles.bullet}>• Correction: Request correction of inaccurate information</Text>
            <Text style={styles.bullet}>• Deletion: Request deletion of your personal information</Text>
            <Text style={styles.bullet}>• Portability: Request transfer of your data to another service</Text>
            <Text style={styles.bullet}>• Objection: Object to processing of your personal information</Text>
            <Text style={styles.bullet}>• Restriction: Request restriction of processing</Text>
          </View>
        </View>

        {/* Section 7 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Cookies and Tracking</Text>
          <Text style={styles.content}>
            We use cookies and similar technologies to:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• Remember your preferences and settings</Text>
            <Text style={styles.bullet}>• Analyze site traffic and usage patterns</Text>
            <Text style={styles.bullet}>• Provide personalized content and advertisements</Text>
            <Text style={styles.bullet}>• Improve our services and user experience</Text>
          </View>
          <Text style={styles.content}>
            You can control cookies through your browser settings, but disabling cookies may affect the functionality of our Platform.
          </Text>
        </View>

        {/* Section 8 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. International Data Transfers</Text>
          <Text style={styles.content}>
            Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information during such transfers.
          </Text>
        </View>

        {/* Section 9 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Children&apos;s Privacy</Text>
          <Text style={styles.content}>
            Our Platform is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18.
          </Text>
        </View>

        {/* Section 10 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Changes to This Policy</Text>
          <Text style={styles.content}>
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
          </Text>
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <MaterialCommunityIcons name="shield-lock-outline" size={32} color={colors.primary} />
          <Text style={styles.contactTitle}>11. Contact Us</Text>
          <Text style={styles.contactContent}>
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </Text>
          <View style={styles.contactDetails}>
            <Text style={styles.contactItem}>📧 Email: privacy@ritzyard.ai</Text>
            <Text style={styles.contactItem}>📞 Phone: +91 9559262525</Text>
            <Text style={styles.contactItem}>📍 Address: 01 RR DM Road Vakola Bridge,{"\n"}Santacurz Mumbai 400055, INDIA</Text>
            <Text style={styles.contactItem}>👤 Data Protection Officer: dpo@ritzyard.ai</Text>
          </View>
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
    fontStyle: 'italic',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  content: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 20,
    marginBottom: 8,
  },
  bulletList: {
    marginLeft: 8,
    gap: 6,
    marginBottom: 12,
  },
  bullet: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 20,
  },
  contactSection: {
    marginHorizontal: 16,
    marginVertical: 20,
    marginBottom: 30,
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  contactContent: {
    fontSize: 13,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  contactDetails: {
    width: '100%',
    gap: 10,
  },
  contactItem: {
    fontSize: 12,
    color: colors.text,
    lineHeight: 18,
  },
});
