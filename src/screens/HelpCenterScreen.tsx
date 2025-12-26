import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';

const { width } = Dimensions.get('window');

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface HelpTopic {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export default function HelpCenterScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFAQ, setFilteredFAQ] = useState<FAQItem[]>([]);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [helpTopics, setHelpTopics] = useState<HelpTopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHelpData();
  }, []);

  useEffect(() => {
    filterFAQ();
  }, [searchQuery, selectedCategory, faqData]);

  const fetchHelpData = async () => {
    try {
      // TODO: Fetch from backend API
      // For now, using fallback data
      const defaultTopics: HelpTopic[] = [
        { icon: 'account-help-outline', title: 'Account & Login', description: 'Help with account setup and login issues', color: colors.primary },
        { icon: 'file-document-outline', title: 'RFQ & Orders', description: 'Learn how to create and manage RFQs', color: colors.secondary },
        { icon: 'package-multiple', title: 'Products', description: 'Browse and search for materials', color: colors.success },
        { icon: 'credit-card-outline', title: 'Payments', description: 'Payment methods and billing issues', color: colors.warning },
        { icon: 'truck-delivery-outline', title: 'Shipping', description: 'Delivery tracking and shipping info', color: colors.info },
        { icon: 'shield-check-outline', title: 'Security', description: 'Account security and privacy', color: colors.error },
      ];

      const defaultFAQ: FAQItem[] = [
        { id: '1', question: 'How do I create an RFQ?', answer: 'Click on the RFQ tab in the app, select the materials you need, specify quantities, and submit. Suppliers will respond with quotes.', category: 'RFQ & Orders' },
        { id: '2', question: 'How long does it take to get quotes?', answer: 'Typically, suppliers respond within 24 hours. You can track quote status in real-time through the app.', category: 'RFQ & Orders' },
        { id: '3', question: 'Can I modify my RFQ after submission?', answer: 'You can modify open RFQs. Once quotes are received, editing may affect supplier responses.', category: 'RFQ & Orders' },
        { id: '4', question: 'What payment methods are accepted?', answer: 'We accept bank transfers, credit cards, and digital wallets. Payment terms vary by supplier.', category: 'Payments' },
        { id: '5', question: 'Is my information secure?', answer: 'Yes, we use industry-standard encryption and security measures to protect your data.', category: 'Security' },
        { id: '6', question: 'How do I track my order?', answer: 'Orders can be tracked in the Order History section. Suppliers provide real-time tracking updates.', category: 'Shipping' },
        { id: '7', question: 'What if I forgot my password?', answer: 'Click "Forgot Password" on the login screen and follow the email instructions to reset it.', category: 'Account & Login' },
        { id: '8', question: 'How do I contact a supplier?', answer: 'You can message suppliers directly through the app chat feature or use the contact information provided in quotes.', category: 'RFQ & Orders' },
        { id: '9', question: 'What are bulk discounts?', answer: 'Larger orders often qualify for volume discounts. Check individual supplier offerings when requesting quotes.', category: 'Products' },
        { id: '10', question: 'Can I return products?', answer: 'Return policies vary by supplier. Check the terms when placing an order or contact the supplier directly.', category: 'Orders' },
      ];

      setHelpTopics(defaultTopics);
      setFaqData(defaultFAQ);
    } catch (error) {
      console.error('Error fetching help data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterFAQ = () => {
    let filtered = faqData;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
      );
    }

    setFilteredFAQ(filtered);
  };

  const categories: string[] = [
    'All',
    ...new Set(faqData.map((item) => item.category)),
  ];

  const TopicCard = ({ topic }: { topic: HelpTopic }) => (
    <TouchableOpacity style={styles.topicCard}>
      <View style={[styles.topicIconBox, { backgroundColor: topic.color + '20' }]}>
        <MaterialCommunityIcons name={topic.icon as any} size={28} color={topic.color} />
      </View>
      <Text style={styles.topicTitle}>{topic.title}</Text>
      <Text style={styles.topicDescription}>{topic.description}</Text>
      <View style={styles.topicArrow}>
        <MaterialCommunityIcons name="arrow-right" size={16} color={topic.color} />
      </View>
    </TouchableOpacity>
  );

  const FAQItem = ({ item }: { item: FAQItem }) => {
    const isExpanded = expandedFAQ === item.id;

    return (
      <TouchableOpacity
        style={styles.faqItem}
        onPress={() => setExpandedFAQ(isExpanded ? null : item.id)}
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
            <Text style={styles.faqAnswerText}>{item.answer}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Help Center</Text>
          <Text style={styles.subtitle}>Find answers to your questions</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={20} color={colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search help topics..."
            placeholderTextColor={colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialCommunityIcons name="close" size={18} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Help Topics Grid */}
        <View style={styles.topicsSection}>
          <Text style={styles.sectionTitle}>Browse Topics</Text>
          <View style={styles.topicsGrid}>
            {helpTopics.map((topic, index) => (
              <TopicCard key={index} topic={topic} />
            ))}
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

          {/* Category Filter */}
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

          {/* FAQ List */}
          <View style={styles.faqList}>
            {filteredFAQ.length > 0 ? (
              filteredFAQ.map((item) => <FAQItem key={item.id} item={item} />)
            ) : (
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons name="help-circle-outline" size={48} color={colors.border} />
                <Text style={styles.emptyText}>No results found</Text>
                <Text style={styles.emptySubtext}>Try a different search or category</Text>
              </View>
            )}
          </View>
        </View>

        {/* Contact Support Section */}
        <View style={styles.supportSection}>
          <MaterialCommunityIcons name="headset" size={32} color={colors.primary} />
          <Text style={styles.supportTitle}>Still need help?</Text>
          <Text style={styles.supportSubtitle}>Our support team is ready to assist</Text>
          <TouchableOpacity style={styles.contactButton}>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 12,
    marginBottom: 4,
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
  searchContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 14,
    color: colors.text,
  },
  topicsSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  topicCard: {
    width: (width - 52) / 2,
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  topicIconBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  topicTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  topicDescription: {
    fontSize: 10,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 8,
  },
  topicArrow: {
    marginTop: 4,
  },
  faqSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoriesScroll: {
    marginBottom: 10,
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
  faqList: {
    gap: 8,
  },
  faqItem: {
    backgroundColor: colors.card,
    borderRadius: 8,
    marginBottom: 8,
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
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.backgroundAlt,
  },
  faqAnswerText: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 18,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 6,
  },
  supportSection: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingVertical: 16,
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
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
