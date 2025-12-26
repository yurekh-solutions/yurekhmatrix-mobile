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
  Alert,
  Linking,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/src/styles/colors';

const WHATSAPP_NUMBER = '919136242706';
const { width } = Dimensions.get('window');

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  action?: string;
}

export default function ContactScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [contactDetails, setContactDetails] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      // TODO: Fetch from backend API
      // For now, using fallback data
      const defaultContacts: ContactInfo[] = [
        { icon: 'phone', label: 'Phone', value: '+1 (555) 123-4567', action: 'tel:+15551234567' },
        { icon: 'email', label: 'Email', value: 'support@ritzyard.com', action: 'mailto:support@ritzyard.com' },
        { icon: 'map-marker', label: 'Address', value: '123 Industry Lane, Business Park, USA' },
        { icon: 'clock-outline', label: 'Business Hours', value: 'Mon-Fri: 9:00 AM - 6:00 PM EST' },
      ];
      setContactDetails(defaultContacts);
    } catch (error) {
      console.error('Error fetching contact data:', error);
    } finally {
      setLoading(false);
    }
  };

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

    setSubmitting(true);
    try {
      // TODO: Send to backend API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert(
        'Success',
        'Your message has been sent! We will get back to you within 24 hours.'
      );

      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

      const whatsappMessage = `Hi, I just sent a contact message:

Subject: ${formData.subject}
Message: ${formData.message.substring(0, 100)}...

Please get back to me.`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
      
      setTimeout(() => {
        Alert.alert(
          'Need Faster Response?',
          'Would you like to also reach us via WhatsApp?',
          [
            { text: 'No Thanks', style: 'cancel' },
            { text: 'Open WhatsApp', onPress: () => Linking.openURL(whatsappUrl) },
          ]
        );
      }, 500);
    } catch (error) {
      Alert.alert('Error', 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
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
          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.subtitle}>Get in touch with our support team</Text>
          
          {/* Quick WhatsApp Contact */}
          <TouchableOpacity 
            style={styles.whatsappQuickBtn}
            onPress={() => {
              const msg = 'Hi, I need help with a query. Please assist.';
              Linking.openURL(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`);
            }}
          >
            <Ionicons name="logo-whatsapp" size={18} color="#25D366" />
            <Text style={styles.whatsappQuickText}>Chat on WhatsApp</Text>
          </TouchableOpacity>
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
            style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <MaterialCommunityIcons name="send" size={18} color="#fff" />
                <Text style={styles.submitButtonText}>Send Message</Text>
              </>
            )}
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
    marginBottom: 10,
  },
  whatsappQuickBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    alignSelf: 'flex-start',
  },
  whatsappQuickText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#25D366',
  },
  contactCardsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 8,
  },
  contactCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  contactIconBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '500',
  },
  contactValue: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
  },
  socialSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
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
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  formSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    fontSize: 13,
  },
  messageInput: {
    height: 100,
    paddingTop: 10,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
