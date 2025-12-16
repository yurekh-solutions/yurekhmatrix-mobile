import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Linking,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';

const { width } = Dimensions.get('window');

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  action?: string;
}

const contactDetails: ContactInfo[] = [
  {
    icon: 'phone',
    label: 'Phone',
    value: '+1 (555) 123-4567',
    action: 'tel:+15551234567',
  },
  {
    icon: 'email',
    label: 'Email',
    value: 'support@ritzyard.com',
    action: 'mailto:support@ritzyard.com',
  },
  {
    icon: 'map-marker',
    label: 'Address',
    value: '123 Industry Lane, Business Park, USA',
  },
  {
    icon: 'clock-outline',
    label: 'Business Hours',
    value: 'Mon-Fri: 9:00 AM - 6:00 PM EST',
  },
];

export default function ContactScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleContactAction = (action?: string) => {
    if (action) {
      Linking.openURL(action).catch(() =>
        Alert.alert('Error', 'Unable to open the requested action')
      );
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    if (!formData.subject.trim()) {
      Alert.alert('Error', 'Please enter a subject');
      return false;
    }
    if (!formData.message.trim()) {
      Alert.alert('Error', 'Please enter your message');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert(
        'Success',
        'Your message has been sent! We will get back to you within 24 hours.'
      );

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const ContactCard = ({ info }: { info: ContactInfo }) => (
    <TouchableOpacity
      style={styles.contactCard}
      onPress={() => handleContactAction(info.action)}
      activeOpacity={info.action ? 0.7 : 1}
    >
      <View style={styles.contactIconBox}>
        <MaterialCommunityIcons name={info.icon as any} size={24} color={colors.primary} />
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactLabel}>{info.label}</Text>
        <Text style={styles.contactValue}>{info.value}</Text>
      </View>
      {info.action && (
        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textLight} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.subtitle}>Get in touch with our support team</Text>
        </View>

        {/* Contact Info Cards */}
        <View style={styles.contactCardsContainer}>
          {contactDetails.map((info, index) => (
            <ContactCard key={index} info={info} />
          ))}
        </View>

        {/* Social Media Section */}
        <View style={styles.socialSection}>
          <Text style={styles.sectionTitle}>Follow Us</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <MaterialCommunityIcons name="facebook" size={24} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <MaterialCommunityIcons name="twitter" size={24} color="#1DA1F2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <MaterialCommunityIcons name="linkedin" size={24} color="#0A66C2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <MaterialCommunityIcons name="instagram" size={24} color="#E1306C" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Contact Form */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Send us a Message</Text>

          <TextInput
            style={styles.input}
            placeholder="Your Name *"
            placeholderTextColor={colors.textLight}
            value={formData.name}
            onChangeText={(value) => setFormData({ ...formData, name: value })}
          />

          <TextInput
            style={styles.input}
            placeholder="Email Address *"
            placeholderTextColor={colors.textLight}
            value={formData.email}
            onChangeText={(value) => setFormData({ ...formData, email: value })}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Phone (Optional)"
            placeholderTextColor={colors.textLight}
            value={formData.phone}
            onChangeText={(value) => setFormData({ ...formData, phone: value })}
            keyboardType="phone-pad"
          />

          <TextInput
            style={styles.input}
            placeholder="Subject *"
            placeholderTextColor={colors.textLight}
            value={formData.subject}
            onChangeText={(value) => setFormData({ ...formData, subject: value })}
          />

          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Your Message *"
            placeholderTextColor={colors.textLight}
            value={formData.message}
            onChangeText={(value) => setFormData({ ...formData, message: value })}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <MaterialCommunityIcons name="send" size={18} color="#fff" />
                <Text style={styles.submitButtonText}>Send Message</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* FAQ Quick Link */}
        <View style={styles.faqSection}>
          <MaterialCommunityIcons name="help-circle-outline" size={24} color={colors.primary} />
          <Text style={styles.faqTitle}>Looking for quick answers?</Text>
          <Text style={styles.faqSubtitle}>Check our FAQ section for common questions</Text>
          <TouchableOpacity style={styles.faqButton}>
            <Text style={styles.faqButtonText}>Go to FAQ</Text>
            <MaterialCommunityIcons name="arrow-right" size={16} color={colors.primary} />
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
  contactCardsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contactIconBox: {
    width: 44,
    height: 44,
    backgroundColor: colors.accent,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '500',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
  },
  socialSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  formSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  faqSection: {
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
  faqTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginTop: 10,
  },
  faqSubtitle: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
    marginBottom: 12,
    textAlign: 'center',
  },
  faqButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
    gap: 6,
  },
  faqButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
