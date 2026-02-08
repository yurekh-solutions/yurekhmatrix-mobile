import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Products & Material Inquiry WhatsApp number
const WHATSAPP_NUMBER = '919559434242';

const COLORS = {
  primary: '#c15738',
  primaryLight: '#d66f4f',
  secondary: '#f5ede3',
  background: '#faf8f6',
  white: '#ffffff',
  text: '#683627',
  textLight: '#8b7355',
  border: '#e8dfd5',
  success: '#10b981',
  error: '#ef4444',
};

interface ProductNotFoundFormProps {
  searchQuery?: string;
  onClose?: () => void;
}

export default function ProductNotFoundForm({ searchQuery = '', onClose }: ProductNotFoundFormProps) {
  const [formData, setFormData] = useState({
    productName: searchQuery,
    customerName: '',
    phone: '',
    email: '',
    quantity: '',
    specifications: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Your name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Format WhatsApp message
      let message = '*Product Inquiry - Not Found*\n\n';
      message += `*Product:* ${formData.productName}\n`;
      message += `*Name:* ${formData.customerName}\n`;
      message += `*Phone:* ${formData.phone}\n`;
      if (formData.email) message += `*Email:* ${formData.email}\n`;
      if (formData.quantity) message += `*Quantity:* ${formData.quantity}\n`;
      if (formData.specifications) message += `*Specifications:*\n${formData.specifications}\n`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

      // Open WhatsApp
      const canOpen = await Linking.canOpenURL(whatsappUrl);
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
        Alert.alert(
          'Success!',
          'Your inquiry has been sent via WhatsApp. We\'ll get back to you shortly.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Reset form
                setFormData({
                  productName: '',
                  customerName: '',
                  phone: '',
                  email: '',
                  quantity: '',
                  specifications: '',
                });
                if (onClose) onClose();
              },
            },
          ]
        );
      } else {
        Alert.alert('Error', 'WhatsApp is not installed on your device');
      }
    } catch (error) {
      console.error('Error sending inquiry:', error);
      Alert.alert('Error', 'Failed to send inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.primaryLight]}
              style={styles.iconGradient}
            >
              <MaterialCommunityIcons name="message-alert" size={32} color={COLORS.white} />
            </LinearGradient>
          </View>
          <Text style={styles.title}>Product Not Found?</Text>
          <Text style={styles.subtitle}>
            Don&apos;t worry! Tell us what you&apos;re looking for and we&apos;ll get back to you with the best options.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Product Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              <MaterialCommunityIcons name="package-variant" size={16} color={COLORS.primary} />
              {' '}What product are you looking for? <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.productName && styles.inputError]}
              value={formData.productName}
              onChangeText={(text) => {
                setFormData({ ...formData, productName: text });
                if (errors.productName) setErrors({ ...errors, productName: '' });
              }}
              placeholder="e.g., TMT Bars, Cement, Steel Sheets"
              placeholderTextColor={COLORS.textLight}
            />
            {errors.productName && <Text style={styles.errorText}>{errors.productName}</Text>}
          </View>

          {/* Customer Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              <MaterialCommunityIcons name="account" size={16} color={COLORS.primary} />
              {' '}Your Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.customerName && styles.inputError]}
              value={formData.customerName}
              onChangeText={(text) => {
                setFormData({ ...formData, customerName: text });
                if (errors.customerName) setErrors({ ...errors, customerName: '' });
              }}
              placeholder="Enter your full name"
              placeholderTextColor={COLORS.textLight}
            />
            {errors.customerName && <Text style={styles.errorText}>{errors.customerName}</Text>}
          </View>

          {/* Phone */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              <MaterialCommunityIcons name="phone" size={16} color={COLORS.primary} />
              {' '}Phone Number <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              value={formData.phone}
              onChangeText={(text) => {
                setFormData({ ...formData, phone: text });
                if (errors.phone) setErrors({ ...errors, phone: '' });
              }}
              placeholder="+91 XXXXX XXXXX"
              placeholderTextColor={COLORS.textLight}
              keyboardType="phone-pad"
              maxLength={10}
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              <MaterialCommunityIcons name="email" size={16} color={COLORS.primary} />
              {' '}Email Address
            </Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              value={formData.email}
              onChangeText={(text) => {
                setFormData({ ...formData, email: text });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              placeholder="your.email@example.com"
              placeholderTextColor={COLORS.textLight}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Quantity */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              <MaterialCommunityIcons name="package-variant-closed" size={16} color={COLORS.primary} />
              {' '}Quantity Required
            </Text>
            <TextInput
              style={styles.input}
              value={formData.quantity}
              onChangeText={(text) => setFormData({ ...formData, quantity: text })}
              placeholder="e.g., 10 tons, 500 pieces"
              placeholderTextColor={COLORS.textLight}
            />
          </View>

          {/* Specifications */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              <MaterialCommunityIcons name="file-document-outline" size={16} color={COLORS.primary} />
              {' '}Additional Specifications
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.specifications}
              onChangeText={(text) => setFormData({ ...formData, specifications: text })}
              placeholder="Describe size, grade, brand preference, or any other requirements..."
              placeholderTextColor={COLORS.textLight}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            style={styles.submitButtonContainer}
          >
            <LinearGradient
              colors={['#10b981', '#059669']}
              style={styles.submitButton}
            >
              {loading ? (
                <Text style={styles.submitButtonText}>Sending...</Text>
              ) : (
                <>
                  <MaterialCommunityIcons name="whatsapp" size={20} color={COLORS.white} />
                  <Text style={styles.submitButtonText}>Send Inquiry via WhatsApp</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.footerNote}>
            Your inquiry will be sent directly to our team via WhatsApp for immediate assistance
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  card: {
    margin: 16,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(193, 87, 56, 0.1)',
  },

  header: {
    alignItems: 'center',
    marginBottom: 24,
  },

  iconContainer: {
    marginBottom: 16,
  },

  iconGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },

  form: {
    gap: 16,
  },

  inputGroup: {
    gap: 8,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },

  required: {
    color: COLORS.error,
  },

  input: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: 'rgba(193, 87, 56, 0.1)',
  },

  inputError: {
    borderColor: COLORS.error,
    borderWidth: 1.5,
  },

  textArea: {
    height: 100,
    paddingTop: 14,
  },

  errorText: {
    fontSize: 12,
    color: COLORS.error,
    marginTop: 4,
  },

  submitButtonContainer: {
    marginTop: 8,
  },

  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },

  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },

  footerNote: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 16,
  },
});
