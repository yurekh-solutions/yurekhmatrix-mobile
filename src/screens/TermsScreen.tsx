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

export default function TermsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Terms of Service</Text>
          <Text style={styles.lastUpdated}>Last updated: December 2024</Text>
        </View>

        {/* Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.content}>
            By accessing and using RitzYard platform, you accept and agree to be bound by the terms and provision of this agreement.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Use License</Text>
          <Text style={styles.content}>
            Permission is granted to temporarily download one copy of the materials (information or software) on RitzYard platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• Modifying or copying the materials</Text>
            <Text style={styles.bullet}>• Using the materials for any commercial purpose or for any public display</Text>
            <Text style={styles.bullet}>• Attempting to reverse engineer, disassemble, or decompile any software</Text>
            <Text style={styles.bullet}>• Removing any copyright or other proprietary notations</Text>
            <Text style={styles.bullet}>• Transferring the materials to another person or &quot;mirroring&quot; the materials</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Disclaimer</Text>
          <Text style={styles.content}>
            The materials on RitzYard platform are provided &quot;as is&quot;. RitzYard makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Limitations</Text>
          <Text style={styles.content}>
            In no event shall RitzYard or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on RitzYard platform.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Accuracy of Materials</Text>
          <Text style={styles.content}>
            The materials appearing on RitzYard platform could include technical, typographical, or photographic errors. RitzYard does not warrant that any of the materials on RitzYard platform are accurate, complete, or current.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Materials and Content</Text>
          <Text style={styles.content}>
            RitzYard has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by RitzYard of the site. Use of any such linked website is at the user&apos;s own risk.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Modifications</Text>
          <Text style={styles.content}>
            RitzYard may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Governing Law</Text>
          <Text style={styles.content}>
            These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts located in Mumbai.
          </Text>
        </View>

        <View style={styles.contactSection}>
          <MaterialCommunityIcons name="email-outline" size={24} color={colors.primary} />
          <Text style={styles.contactTitle}>Questions about our Terms?</Text>
          <Text style={styles.contactEmail}>legal@ritzyard.com</Text>
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
