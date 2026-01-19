import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';

const { width } = Dimensions.get('window');

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon?: string;
}

const WHATSAPP_NUMBER = '+919136242706';

export default function FAQScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        // TODO: Fetch from backend API
        const defaultFAQs: FAQItem[] = [
          { id: '1', category: 'RFQ', question: 'How do I create an RFQ?', answer: 'Go to the RFQ section, add items with details, fill supplier information, and submit. Suppliers will respond within 24 hours.', icon: 'file-document-edit' },
          { id: '2', category: 'RFQ', question: 'Can I modify my RFQ after submission?', answer: 'You can modify open RFQs. Once suppliers respond with quotes, modifications may affect their responses.', icon: 'file-edit' },
          { id: '3', category: 'RFQ', question: 'How long are RFQs valid?', answer: 'RFQs remain active for 30 days by default. You can extend or close them anytime.', icon: 'calendar-clock' },
          { id: '4', category: 'Products', question: 'How can I search for specific products?', answer: 'Use the search bar with product name, category, or specifications. You can also filter by price range and supplier.', icon: 'magnify' },
          { id: '5', category: 'Products', question: 'Are product prices negotiable?', answer: 'Yes, submit an RFQ to get competitive quotes. Most suppliers offer volume discounts for bulk orders.', icon: 'tag-outline' },
          { id: '6', category: 'Suppliers', question: 'How are suppliers verified?', answer: 'All suppliers undergo KYC verification, GST validation, and quality checks before joining our platform.', icon: 'shield-check' },
          { id: '7', category: 'Suppliers', question: 'Can I chat with suppliers directly?', answer: 'Yes, you can message suppliers through the chat feature within the RFQ or product details page.', icon: 'message-text' },
          { id: '8', category: 'Payment', question: 'What payment methods are available?', answer: 'We support bank transfers, credit/debit cards, and UPI. Payments are secured through our platform.', icon: 'credit-card-check' },
          { id: '9', category: 'Delivery', question: 'How long does delivery take?', answer: 'Delivery time depends on supplier and location, typically 7-14 days. Express options available.', icon: 'truck-fast' },
          { id: '10', category: 'Account', question: 'How do I reset my password?', answer: 'Click on Forgot Password on login, enter your email, and follow the verification link sent to your inbox.', icon: 'lock-reset' },
        ];
        setFaqItems(defaultFAQs);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const categoryIcons: { [key: string]: string } = {
    'All': 'view-grid',
    'RFQ': 'file-document-outline',
    'Products': 'view-grid-outline',
    'Suppliers': 'account-group',
    'Payment': 'credit-card',
    'Delivery': 'truck-delivery',
    'Account': 'account-circle',
  };

  const categories: string[] = ['All', ...new Set(faqItems.map((item: FAQItem) => item.category))];
  const filteredItems = selectedCategory === 'All' ? faqItems : faqItems.filter((item: FAQItem) => item.category === selectedCategory);

  const handleWhatsAppSupport = () => {
    const message = encodeURIComponent('Hi RitzYard Support, I need help with...');
    Linking.openURL(`whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${message}`);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading FAQs...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const FAQItemComponent = ({ item }: { item: FAQItem }) => {
    const isExpanded = expandedId === item.id;

    return (
      <TouchableOpacity
        style={[styles.faqItem, isExpanded && styles.faqItemExpanded]}
        onPress={() => setExpandedId(isExpanded ? null : item.id)}
        activeOpacity={0.8}
      >
        <View style={styles.faqQuestion}>
          <View style={[styles.questionIcon, isExpanded && styles.questionIconActive]}>
            <MaterialCommunityIcons
              name={(item.icon || 'help-circle') as any}
              size={16}
              color={isExpanded ? '#fff' : colors.primary}
            />
          </View>
          <Text style={[styles.faqQuestionText, isExpanded && styles.faqQuestionTextActive]}>
            {item.question}
          </Text>
          <View style={styles.chevronContainer}>
            <MaterialCommunityIcons
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={isExpanded ? colors.primary : colors.textLight}
            />
          </View>
        </View>

        {isExpanded && (
          <View style={styles.faqAnswer}>
            <Text style={styles.faqAnswerText}>{item.answer}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>FAQ</Text>
          <Text style={styles.subtitle}>Find answers to common questions</Text>
        </View>

        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
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
              activeOpacity={0.8}
            >
              <View style={[
                styles.categoryIconBox,
                selectedCategory === cat && styles.categoryIconBoxActive,
              ]}>
                <MaterialCommunityIcons
                  name={(categoryIcons[cat] || 'help-circle') as any}
                  size={16}
                  color={selectedCategory === cat ? '#fff' : colors.primary}
                />
              </View>
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
            <FAQItemComponent key={item.id} item={item} />
          ))}
        </View>

        {/* Support Section */}
        <LinearGradient
          colors={['rgba(193, 87, 56, 0.08)', 'rgba(193, 87, 56, 0.15)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.supportSection}
        >
          <View style={styles.supportIconBox}>
            <MaterialCommunityIcons name="help-circle" size={28} color={colors.primary} />
          </View>
          <Text style={styles.supportTitle}>Still have questions?</Text>
          <Text style={styles.supportSubtitle}>Our support team is here to help</Text>
          
          <TouchableOpacity 
            style={styles.whatsappButton}
            onPress={handleWhatsAppSupport}
            activeOpacity={0.85}
          >
            <MaterialCommunityIcons name="whatsapp" size={20} color="#fff" />
            <Text style={styles.whatsappButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '500',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textLight,
    fontWeight: '500',
  },
  categoriesList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(193, 87, 56, 0.2)',
    gap: 6,
  },
  categoryPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryIconBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(193, 87, 56, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIconBoxActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  categoryPillText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
  },
  categoryPillTextActive: {
    color: '#fff',
  },
  resultsInfo: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  resultsText: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '500',
  },
  faqList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  faqItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(193, 87, 56, 0.12)',
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  faqItemExpanded: {
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
  },
  questionIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(193, 87, 56, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionIconActive: {
    backgroundColor: colors.primary,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 18,
  },
  faqQuestionTextActive: {
    color: colors.primary,
  },
  chevronContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(193, 87, 56, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  faqAnswer: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 4,
    marginLeft: 42,
    borderTopWidth: 1,
    borderTopColor: 'rgba(193, 87, 56, 0.1)',
    marginTop: 0,
  },
  faqAnswerText: {
    fontSize: 12,
    color: colors.textLight,
    lineHeight: 18,
    fontWeight: '400',
  },
  supportSection: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(193, 87, 56, 0.2)',
  },
  supportIconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(193, 87, 56, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  supportSubtitle: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 14,
    fontWeight: '500',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#25D366',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  whatsappButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
