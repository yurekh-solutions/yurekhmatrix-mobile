import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';

interface Discovery {
  id: string;
  icon: string;
  title: string;
  description: string;
  tips: string[];
}

const discoveries: Discovery[] = [
  {
    id: '1',
    icon: 'lightbulb-outline',
    title: 'Smart Material Selection',
    description: 'Get AI-powered recommendations based on your project requirements.',
    tips: [
      'Use filters for specific grades and standards',
      'Compare prices from multiple suppliers',
      'Check customer reviews and ratings',
      'Ask Milo AI for expert advice',
    ],
  },
  {
    id: '2',
    icon: 'trending-up',
    title: 'Market Insights',
    description: 'Stay updated with the latest market trends and price movements.',
    tips: [
      'Monitor price trends in real-time',
      'Get alerts on price changes',
      'View seasonal demand patterns',
      'Access industry reports',
    ],
  },
  {
    id: '3',
    icon: 'handshake',
    title: 'Supplier Network',
    description: 'Connect with verified suppliers and build lasting partnerships.',
    tips: [
      'Browse supplier profiles and ratings',
      'Check certifications and approvals',
      'View supplier portfolios',
      'Connect directly via messaging',
    ],
  },
  {
    id: '4',
    icon: 'percent',
    title: 'Bulk Discounts',
    description: 'Access exclusive bulk pricing and negotiated rates.',
    tips: [
      'Request quotes for bulk orders',
      'Compare discount tiers',
      'Get volume-based pricing',
      'Set up recurring orders',
    ],
  },
  {
    id: '5',
    icon: 'truck-delivery-outline',
    title: 'Fast Delivery',
    description: 'Track shipments and manage deliveries efficiently.',
    tips: [
      'Real-time shipment tracking',
      'Multiple delivery options',
      'Door-step delivery available',
      'Insurance coverage included',
    ],
  },
  {
    id: '6',
    icon: 'security',
    title: 'Secure Transactions',
    description: 'Safe payment processing with buyer protection guarantee.',
    tips: [
      'Multiple payment methods',
      'Escrow-based transactions',
      'Secure data encryption',
      '24/7 fraud protection',
    ],
  },
];

export default function DiscoverScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const DiscoveryCard = ({ discovery }: { discovery: Discovery }) => {
    const isExpanded = expandedId === discovery.id;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => setExpandedId(isExpanded ? null : discovery.id)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons name={discovery.icon as any} size={24} color={colors.primary} />
          </View>
          <View style={styles.cardTitle}>
            <Text style={styles.title}>{discovery.title}</Text>
            <Text style={styles.description}>{discovery.description}</Text>
          </View>
          <MaterialCommunityIcons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={colors.primary}
          />
        </View>

        {isExpanded && (
          <View style={styles.cardExpanded}>
            <View style={styles.divider} />
            <View style={styles.tipsList}>
              {discovery.tips.map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <MaterialCommunityIcons name="check-circle" size={14} color={colors.success} />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.mainTitle}>Discover RitzYard</Text>
          <Text style={styles.mainSubtitle}>Learn how to get the most out of our platform</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroIcon}>
            <MaterialCommunityIcons name="compass" size={40} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>Features & Benefits</Text>
          <Text style={styles.heroSubtitle}>Everything you need to streamline procurement</Text>
        </View>

        {/* Discovery Cards */}
        <View style={styles.cardsContainer}>
          {discoveries.map((discovery) => (
            <DiscoveryCard key={discovery.id} discovery={discovery} />
          ))}
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <MaterialCommunityIcons name="lightbulb-on" size={32} color={colors.primary} />
          <Text style={styles.ctaTitle}>Ready to optimize your procurement?</Text>
          <Text style={styles.ctaSubtitle}>Start with an RFQ or explore our product catalog</Text>
          <View style={styles.ctaButtons}>
            <TouchableOpacity style={styles.primaryButton}>
              <MaterialCommunityIcons name="file-document-outline" size={16} color="#fff" />
              <Text style={styles.primaryButtonText}>Create RFQ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <MaterialCommunityIcons name="magnify" size={16} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>Browse Products</Text>
            </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    marginBottom: 8,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  mainSubtitle: {
    fontSize: 13,
    color: colors.textLight,
  },
  heroSection: {
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
  heroIcon: {
    width: 56,
    height: 56,
    backgroundColor: colors.primary + '20',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
  },
  cardsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
  },
  iconBox: {
    width: 40,
    height: 40,
    backgroundColor: colors.accent,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  cardTitle: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  description: {
    fontSize: 11,
    color: colors.textLight,
    lineHeight: 15,
  },
  cardExpanded: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 10,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 11,
    color: colors.text,
    fontWeight: '500',
    lineHeight: 15,
  },
  ctaSection: {
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: colors.primary + '10',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary + '30',
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginTop: 10,
    marginBottom: 4,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 14,
    textAlign: 'center',
  },
  ctaButtons: {
    width: '100%',
    gap: 8,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});
