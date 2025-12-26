import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
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

interface Stat {
  icon: string;
  number: string;
  label: string;
}

export default function AboutScreen() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      // TODO: Fetch from backend API
      // For now, using fallback data
      const defaultTeam: TeamMember[] = [
        { id: '1', name: 'Innovation', role: 'Cutting-edge technology', icon: 'lightbulb' },
        { id: '2', name: 'Integrity', role: 'Transparent dealings', icon: 'shield-check' },
        { id: '3', name: 'Efficiency', role: 'Fast turnaround', icon: 'lightning-bolt' },
        { id: '4', name: 'Support', role: '24/7 assistance', icon: 'headset' },
      ];

      const defaultStats: Stat[] = [
        { icon: 'store-outline', number: '500+', label: 'Active Suppliers' },
        { icon: 'briefcase-outline', number: '10K+', label: 'Monthly Orders' },
        { icon: 'map-marker-multiple', number: '50+', label: 'Cities Covered' },
        { icon: 'users-outline', number: '5K+', label: 'Registered Buyers' },
      ];

      setTeamMembers(defaultTeam);
      setStats(defaultStats);
    } catch (error) {
      console.error('Error fetching about data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const StatBox = ({ icon, number, label }: Stat) => (
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
          {stats.map((stat) => (
            <StatBox key={stat.label} {...stat} />
          ))}
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
    paddingVertical: 24,
    paddingTop: 60,
  },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  missionBox: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  missionText: {
    flex: 1,
    fontSize: 12,
    color: colors.textLight,
    lineHeight: 18,
  },
  statsSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  statBox: {
    width: (width - 52) / 2,
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textLight,
    textAlign: 'center',
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  valueCard: {
    width: (width - 52) / 2,
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  valueIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  valueName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  valueDescription: {
    fontSize: 11,
    color: colors.textLight,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 10,
  },
  featureNumber: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.primary,
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
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: colors.textLight,
    lineHeight: 16,
  },
  contactCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  contactItem: {
    flexDirection: 'row',
    padding: 12,
    gap: 10,
    alignItems: 'flex-start',
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 11,
    color: colors.textLight,
    fontWeight: '500',
  },
  contactValue: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
    marginTop: 2,
  },
  contactDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  footerSection: {
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 8,
  },
  versionText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  copyrightText: {
    fontSize: 11,
    color: colors.textLight,
    marginTop: 4,
  },
});
