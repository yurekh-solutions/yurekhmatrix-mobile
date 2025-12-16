import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';

const { width } = Dimensions.get('window');

interface TeamMember {
  id: string;
  name: string;
  role: string;
  icon: string;
}

const teamMembers: TeamMember[] = [
  { id: '1', name: 'Innovation', role: 'Cutting-edge technology', icon: 'lightbulb' },
  { id: '2', name: 'Integrity', role: 'Transparent dealings', icon: 'shield-check' },
  { id: '3', name: 'Efficiency', role: 'Fast turnaround', icon: 'lightning-bolt' },
  { id: '4', name: 'Support', role: '24/7 assistance', icon: 'headset' },
];

export default function AboutScreen() {
  const StatBox = ({ icon, number, label }: { icon: string; number: string; label: string }) => (
    <View style={styles.statBox}>
      <View style={styles.statIcon}>
        <MaterialCommunityIcons name={icon as any} size={24} color={colors.primary} />
      </View>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.logoBox}>
            <MaterialCommunityIcons name="warehouse" size={48} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>RitzYard</Text>
          <Text style={styles.heroSubtitle}>B2B Procurement Platform</Text>
        </View>

        {/* Mission Statement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <View style={styles.missionBox}>
            <MaterialCommunityIcons name="target" size={24} color={colors.primary} />
            <Text style={styles.missionText}>
              To revolutionize industrial procurement by connecting suppliers and buyers through a transparent, efficient, and innovative digital platform that builds lasting business relationships.
            </Text>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <StatBox icon="store-outline" number="500+" label="Active Suppliers" />
          <StatBox icon="briefcase-outline" number="10K+" label="Monthly Orders" />
          <StatBox icon="map-marker-multiple" number="50+" label="Cities Covered" />
          <StatBox icon="users-outline" number="5K+" label="Registered Buyers" />
        </View>

        {/* Core Values */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Core Values</Text>
          <View style={styles.valuesGrid}>
            {teamMembers.map((member) => (
              <View key={member.id} style={styles.valueCard}>
                <View style={styles.valueIcon}>
                  <MaterialCommunityIcons name={member.icon as any} size={28} color={colors.primary} />
                </View>
                <Text style={styles.valueName}>{member.name}</Text>
                <Text style={styles.valueDescription}>{member.role}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Key Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What Makes Us Different</Text>

          <View style={styles.featureItem}>
            <View style={styles.featureNumber}>
              <Text style={styles.featureNumberText}>1</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Verified Suppliers</Text>
              <Text style={styles.featureDescription}>All suppliers undergo rigorous verification to ensure quality and reliability.</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureNumber}>
              <Text style={styles.featureNumberText}>2</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Real-time Quotes</Text>
              <Text style={styles.featureDescription}>Get competitive quotes from multiple suppliers instantly through our RFQ system.</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureNumber}>
              <Text style={styles.featureNumberText}>3</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>AI-Powered Recommendations</Text>
              <Text style={styles.featureDescription}>Milo AI assistant provides smart recommendations based on your needs.</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureNumber}>
              <Text style={styles.featureNumberText}>4</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Secure Transactions</Text>
              <Text style={styles.featureDescription}>End-to-end encrypted communication and secure payment processing.</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureNumber}>
              <Text style={styles.featureNumberText}>5</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>24/7 Support</Text>
              <Text style={styles.featureDescription}>Our support team is available round the clock to assist you.</Text>
            </View>
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get in Touch</Text>
          <View style={styles.contactCard}>
            <View style={styles.contactItem}>
              <MaterialCommunityIcons name="email" size={20} color={colors.primary} />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>hello@ritzyard.com</Text>
              </View>
            </View>
            <View style={styles.contactDivider} />
            <View style={styles.contactItem}>
              <MaterialCommunityIcons name="phone" size={20} color={colors.primary} />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>+91 1234 567 890</Text>
              </View>
            </View>
            <View style={styles.contactDivider} />
            <View style={styles.contactItem}>
              <MaterialCommunityIcons name="map-marker" size={20} color={colors.primary} />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Address</Text>
                <Text style={styles.contactValue}>Mumbai, India</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.contactButton}>
            <MaterialCommunityIcons name="email-outline" size={16} color="#fff" />
            <Text style={styles.contactButtonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        {/* Version Info */}
        <View style={styles.footerSection}>
          <Text style={styles.versionText}>RitzYard Mobile App v1.0.0</Text>
          <Text style={styles.copyrightText}>© 2024 RitzYard. All rights reserved.</Text>
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
  heroSection: {
    alignItems: 'center',
    paddingVertical: 28,
    backgroundColor: colors.primary,
  },
  logoBox: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  missionBox: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  missionText: {
    flex: 1,
    fontSize: 12,
    color: colors.text,
    lineHeight: 18,
    fontWeight: '500',
  },
  statsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    justifyContent: 'space-between',
  },
  statBox: {
    width: (Dimensions.get('window').width - 52) / 2,
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.accent,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textLight,
    marginTop: 4,
    textAlign: 'center',
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  valueCard: {
    width: (Dimensions.get('window').width - 52) / 2,
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  valueIcon: {
    width: 44,
    height: 44,
    backgroundColor: colors.accent,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  valueName: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  valueDescription: {
    fontSize: 10,
    color: colors.textLight,
    marginTop: 4,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 14,
    gap: 10,
  },
  featureNumber: {
    width: 36,
    height: 36,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  featureContent: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 11,
    color: colors.textLight,
    lineHeight: 15,
  },
  contactCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 10,
    color: colors.textLight,
    marginBottom: 2,
    fontWeight: '500',
  },
  contactValue: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
  },
  contactDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  contactButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  footerSection: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  versionText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
  },
  copyrightText: {
    fontSize: 10,
    color: colors.textLight,
    marginTop: 4,
  },
});
