import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    id: '1',
    category: 'RFQ',
    question: 'How do I create an RFQ?',
    answer: 'Go to the RFQ section, add items with details, fill supplier information, and submit. Suppliers will respond within 24 hours.',
  },
  {
    id: '2',
    category: 'RFQ',
    question: 'Can I modify my RFQ after submission?',
    answer: 'You can modify open RFQs. Once suppliers respond with quotes, modifications may affect their responses.',
  },
  {
    id: '3',
    category: 'RFQ',
    question: 'How long are RFQs valid?',
    answer: 'RFQs remain active for 30 days by default. You can extend or close them anytime.',
  },
  {
    id: '4',
    category: 'Products',
    question: 'How can I search for specific products?',
    answer: 'Use the search bar with product name, category, or specifications. You can also filter by price range and supplier.',
  },
  {
    id: '5',
    category: 'Products',
    question: 'Are product prices negotiable?',
    answer: 'Yes, submit an RFQ to get competitive quotes. Most suppliers offer volume discounts for bulk orders.',
  },
  {
    id: '6',
    category: 'Suppliers',
    question: 'How are suppliers verified?',
    answer: 'All suppliers undergo KYC verification, GST validation, and quality checks before joining our platform.',
  },
  {
    id: '7',
    category: 'Suppliers',
    question: 'Can I chat with suppliers directly?',
    answer: 'Yes, you can message suppliers through the chat feature within the RFQ or product details page.',
  },
  {
    id: '8',
    category: 'Payment',
    question: 'What payment methods are available?',
    answer: 'We support bank transfers, credit/debit cards, and UPI. Payments are secured through our platform.',
  },
  {
    id: '9',
    category: 'Delivery',
    question: 'How long does delivery take?',
    answer: 'Delivery time depends on supplier and location, typically 7-14 days. Express options available.',
  },
  {
    id: '10',
    category: 'Account',
    question: 'How do I reset my password?',
    answer: 'Click on Forgot Password on login, enter your email, and follow the verification link sent to your inbox.',
  },
];

export default function FAQScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(faqItems.map((item) => item.category))];

  const filteredItems =
    selectedCategory === 'All'
      ? faqItems
      : faqItems.filter((item) => item.category === selectedCategory);

  const FAQItem = ({ item }: { item: FAQItem }) => {
    const isExpanded = expandedId === item.id;

    return (
      <TouchableOpacity
        style={styles.faqItem}
        onPress={() => setExpandedId(isExpanded ? null : item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.faqQuestion}>
          <MaterialCommunityIcons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={colors.primary}
          />
          <Text style={styles.faqQuestionText}>{item.question}</Text>
        </View>

        {isExpanded && (
          <View style={styles.faqAnswer}>
            <View style={styles.answerDivider} />
            <Text style={styles.faqAnswerText}>{item.answer}</Text>
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
          <Text style={styles.title}>Frequently Asked Questions</Text>
          <Text style={styles.subtitle}>Find answers to common questions</Text>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesList}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryPill,
                selectedCategory === cat && styles.categoryPillActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryPillText,
                  selectedCategory === cat && styles.categoryPillTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results Count */}
        <View style={styles.resultsInfo}>
          <Text style={styles.resultsText}>
            {filteredItems.length} question{filteredItems.length !== 1 ? 's' : ''}
          </Text>
        </View>

        {/* FAQ Items */}
        <View style={styles.faqList}>
          {filteredItems.map((item) => (
            <FAQItem key={item.id} item={item} />
          ))}
        </View>

        {/* Still Need Help */}
        <View style={styles.supportSection}>
          <MaterialCommunityIcons name="help-circle-outline" size={32} color={colors.primary} />
          <Text style={styles.supportTitle}>Still have questions?</Text>
          <Text style={styles.supportSubtitle}>Our support team is here to help</Text>
          <TouchableOpacity style={styles.contactButton}>
            <MaterialCommunityIcons name="email-outline" size={16} color="#fff" />
            <Text style={styles.contactButtonText}>Contact Support</Text>
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
  categoriesScroll: {
    marginVertical: 12,
    paddingLeft: 16,
  },
  categoriesList: {
    gap: 8,
    paddingRight: 16,
  },
  categoryPill: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryPillText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  categoryPillTextActive: {
    color: '#fff',
  },
  resultsInfo: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsText: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '500',
  },
  faqList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  faqItem: {
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  faqAnswer: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  answerDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 10,
  },
  faqAnswerText: {
    fontSize: 12,
    color: colors.textLight,
    lineHeight: 18,
  },
  supportSection: {
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
  supportTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginTop: 10,
  },
  supportSubtitle: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
    marginBottom: 12,
  },
  contactButton: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
