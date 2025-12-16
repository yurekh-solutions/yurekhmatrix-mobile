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

interface Guide {
  id: string;
  title: string;
  description: string;
  icon: string;
  steps: string[];
}

const guides: Guide[] = [
  {
    id: '1',
    title: 'Getting Started with RitzYard',
    description: 'Complete your profile and start connecting with suppliers',
    icon: 'rocket-launch',
    steps: [
      'Sign up and verify your email',
      'Complete company profile',
      'Add business documents',
      'Browse suppliers and products',
      'Create your first RFQ',
    ],
  },
  {
    id: '2',
    title: 'Creating an RFQ',
    description: 'Request quotes from multiple suppliers at once',
    icon: 'file-document-outline',
    steps: [
      'Go to RFQ section',
      'Add products and quantities',
      'Specify delivery requirements',
      'Add special instructions',
      'Submit and wait for quotes',
    ],
  },
  {
    id: '3',
    title: 'Finding the Right Supplier',
    description: 'Search, filter, and evaluate suppliers effectively',
    icon: 'magnify',
    steps: [
      'Use filters for specific needs',
      'Check supplier ratings and reviews',
      'Verify certifications',
      'Compare past orders',
      'Contact supplier for details',
    ],
  },
  {
    id: '4',
    title: 'Using Milo AI Assistant',
    description: 'Get personalized recommendations from Milo',
    icon: 'robot',
    steps: [
      'Open Milo AI chat',
      'Describe your material needs',
      'Get instant recommendations',
      'Ask for price comparisons',
      'Create RFQ directly',
    ],
  },
  {
    id: '5',
    title: 'Negotiating Prices',
    description: 'Leverage competitive quotes to negotiate better rates',
    icon: 'percent',
    steps: [
      'Collect quotes from suppliers',
      'Compare prices and terms',
      'Use Milo for negotiation tips',
      'Request volume discounts',
      'Finalize terms',
    ],
  },
  {
    id: '6',
    title: 'Managing Orders',
    description: 'Track and manage your orders efficiently',
    icon: 'package-multiple',
    steps: [
      'Place order from quote',
      'Track shipment status',
      'Receive delivery updates',
      'Confirm receipt',
      'Rate supplier',
    ],
  },
];

export default function MiloGuideScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const GuideCard = ({ guide }: { guide: Guide }) => {
    const isExpanded = expandedId === guide.id;

    return (
      <TouchableOpacity
        style={styles.guideCard}
        onPress={() => setExpandedId(isExpanded ? null : guide.id)}
        activeOpacity={0.7}
      >
        <View style={styles.guideHeader}>
          <View style={styles.guideIcon}>
            <MaterialCommunityIcons name={guide.icon as any} size={24} color={colors.primary} />
          </View>
          <View style={styles.guideTitle}>
            <Text style={styles.title}>{guide.title}</Text>
            <Text style={styles.description}>{guide.description}</Text>
          </View>
          <MaterialCommunityIcons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={colors.primary}
          />
        </View>

        {isExpanded && (
          <View style={styles.guideExpanded}>
            <View style={styles.divider} />
            <View style={styles.stepsList}>
              {guide.steps.map((step, index) => (
                <View key={index} style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{step}</Text>
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
          <Text style={styles.mainTitle}>Milo Guide</Text>
          <Text style={styles.mainSubtitle}>Learn how to use RitzYard effectively</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroIcon}>
            <MaterialCommunityIcons name="book-open" size={40} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>Step-by-Step Guides</Text>
          <Text style={styles.heroSubtitle}>Master every feature of the RitzYard platform</Text>
        </View>

        {/* Guides */}
        <View style={styles.guidesContainer}>
          {guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </View>

        {/* Quick Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pro Tips</Text>
          <View style={styles.tipsContainer}>
            <View style={styles.tipCard}>
              <View style={styles.tipIcon}>
                <MaterialCommunityIcons name="lightbulb" size={20} color={colors.primary} />
              </View>
              <Text style={styles.tipText}>Use specific product names and quantities in RFQs for better quotes</Text>
            </View>

            <View style={styles.tipCard}>
              <View style={styles.tipIcon}>
                <MaterialCommunityIcons name="timer-outline" size={20} color={colors.primary} />
              </View>
              <Text style={styles.tipText}>Set realistic delivery timelines to get more competitive quotes</Text>
            </View>

            <View style={styles.tipCard}>
              <View style={styles.tipIcon}>
                <MaterialCommunityIcons name="compare" size={20} color={colors.primary} />
              </View>
              <Text style={styles.tipText}>Compare at least 3 quotes before making a decision</Text>
            </View>

            <View style={styles.tipCard}>
              <View style={styles.tipIcon}>
                <MaterialCommunityIcons name="robot" size={20} color={colors.primary} />
              </View>
              <Text style={styles.tipText}>Ask Milo AI for personalized recommendations anytime</Text>
            </View>
          </View>
        </View>

        {/* CTA */}
        <View style={styles.ctaSection}>
          <MaterialCommunityIcons name="play-circle-outline" size={32} color={colors.primary} />
          <Text style={styles.ctaTitle}>Ready to get started?</Text>
          <TouchableOpacity style={styles.ctaButton}>
            <MaterialCommunityIcons name="file-document-outline" size={16} color="#fff" />
            <Text style={styles.ctaButtonText}>Create Your First RFQ</Text>
          </TouchableOpacity>
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
  guidesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  guideCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  guideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
  },
  guideIcon: {
    width: 44,
    height: 44,
    backgroundColor: colors.accent,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  guideTitle: {
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
  guideExpanded: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 10,
  },
  stepsList: {
    gap: 8,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  stepNumber: {
    width: 28,
    height: 28,
    backgroundColor: colors.primary,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    fontSize: 11,
    color: colors.text,
    fontWeight: '500',
    lineHeight: 15,
    paddingTop: 4,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  tipsContainer: {
    gap: 10,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tipIcon: {
    width: 32,
    height: 32,
    backgroundColor: colors.primary + '20',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  tipText: {
    flex: 1,
    fontSize: 11,
    color: colors.text,
    fontWeight: '500',
    lineHeight: 15,
    paddingTop: 2,
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
    marginBottom: 14,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    width: '100%',
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
