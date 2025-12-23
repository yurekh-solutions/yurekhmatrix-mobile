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
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/src/styles/colors';
import { submitMaterialInquiry } from '@/src/lib/api';

// WhatsApp contact number for inquiries
const WHATSAPP_NUMBER = '919136242706';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

export default function MaterialInquiryScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    material: '',
    quantity: '',
    specifications: '',
    deliveryDate: '',
  });

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(false);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf', 'application/msword'],
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const newFile: UploadedFile = {
          id: Date.now().toString(),
          name: asset.name,
          size: asset.size || 0,
          type: asset.mimeType || 'unknown',
        };
        setFiles([...files, newFile]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const removeFile = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    if (!formData.company.trim()) {
      Alert.alert('Error', 'Please enter your company name');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    if (!formData.material.trim()) {
      Alert.alert('Error', 'Please specify the material');
      return false;
    }
    if (!formData.quantity.trim()) {
      Alert.alert('Error', 'Please enter the quantity');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Prepare inquiry data for backend with ALL fields
      const inquiryData = {
        customerName: formData.name.trim(),
        companyName: formData.company.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || 'Not provided',
        materials: [{
          materialName: formData.material.trim(),
          category: 'general',
          quantity: parseFloat(formData.quantity) || 0,
          unit: 'units',
          specification: formData.specifications.trim(),
        }],
        deliveryLocation: formData.deliveryDate.trim() || 'Not specified',
        additionalRequirements: formData.specifications.trim(),
      };

      console.log('Submitting inquiry data:', inquiryData);

      // Submit to backend
      const result = await submitMaterialInquiry(inquiryData);

      if (result.success) {
        // Generate formatted WhatsApp message WITH PHONE NUMBER
        let whatsappMessage = `*🔧 Material Inquiry Request*\n\n`;
        whatsappMessage += `*👤 Customer Details*\n`;
        whatsappMessage += `📛 Name: ${formData.name}\n`;
        whatsappMessage += `🏢 Company: ${formData.company || 'Not specified'}\n`;
        whatsappMessage += `📧 Email: ${formData.email}\n`;
        whatsappMessage += `📱 WhatsApp: ${formData.phone || 'Not provided'}\n\n`;
        whatsappMessage += `*🔨 Material Details*\n`;
        whatsappMessage += `📦 Material: ${formData.material}\n`;
        whatsappMessage += `📊 Quantity: ${formData.quantity}\n`;
        if (formData.specifications) {
          whatsappMessage += `📝 Specs: ${formData.specifications}\n`;
        }
        if (formData.deliveryDate) {
          whatsappMessage += `📅 Delivery Date: ${formData.deliveryDate}\n`;
        }
        whatsappMessage += `\n_✅ Submitted via RitzYard Platform_`;

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

        Alert.alert(
          '✅ Inquiry Submitted!',
          'Your material inquiry has been saved in our system. Click "Send via WhatsApp" to connect with our sales team immediately.',
          [
            {
              text: '💬 Send via WhatsApp',
              onPress: () => {
                Linking.openURL(whatsappUrl).catch(err => {
                  console.log('WhatsApp not available:', err);
                  Alert.alert('Info', 'Please manually message +919136242706 on WhatsApp');
                });
                // Reset form
                setFormData({
                  name: '',
                  company: '',
                  email: '',
                  phone: '',
                  material: '',
                  quantity: '',
                  specifications: '',
                  deliveryDate: '',
                });
                setFiles([]);
              },
              style: 'default',
            },
            {
              text: 'Done',
              onPress: () => {
                // Reset form
                setFormData({
                  name: '',
                  company: '',
                  email: '',
                  phone: '',
                  material: '',
                  quantity: '',
                  specifications: '',
                  deliveryDate: '',
                });
                setFiles([]);
              },
              style: 'cancel',
            },
          ]
        );

        // Reset form
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          material: '',
          quantity: '',
          specifications: '',
          deliveryDate: '',
        });
        setFiles([]);
      } else {
        Alert.alert('Error', result.message || 'Failed to submit inquiry');
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      Alert.alert('Error', 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickWhatsApp = () => {
    const message = `Hi, I need materials:

• Material: ${formData.material || 'Not specified'}
• Quantity: ${formData.quantity || 'Not specified'}

Please contact me.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    Linking.openURL(whatsappUrl);
  };

  const FileItem = ({ file }: { file: UploadedFile }) => (
    <View style={styles.fileItem}>
      <View style={styles.fileInfo}>
        <MaterialCommunityIcons name="file-document" size={20} color={colors.primary} />
        <View style={styles.fileDetails}>
          <Text style={styles.fileName} numberOfLines={1}>
            {file.name}
          </Text>
          <Text style={styles.fileSize}>{formatFileSize(file.size)}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeFile(file.id)}>
        <MaterialCommunityIcons name="close" size={18} color={colors.error} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation?.goBack?.()} style={styles.backBtn}>
              <LinearGradient
                colors={[colors.primary, colors.gradient2 || '#a84a2f']}
                style={styles.backBtnGradient}
              >
                <Ionicons name="chevron-back" size={22} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>Material Inquiry</Text>
              <Text style={styles.subtitle}>Request materials from suppliers</Text>
            </View>
          </View>
          
          {/* Quick WhatsApp Button */}
          <TouchableOpacity style={styles.quickWhatsAppBtn} onPress={handleQuickWhatsApp}>
            <Ionicons name="logo-whatsapp" size={18} color="#25D366" />
            <Text style={styles.quickWhatsAppText}>Quick Inquiry</Text>
          </TouchableOpacity>
        </View>

        {/* Form Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Information</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name *"
            placeholderTextColor={colors.textLight}
            value={formData.name}
            onChangeText={(value) => setFormData({ ...formData, name: value })}
          />

          <TextInput
            style={styles.input}
            placeholder="Company Name *"
            placeholderTextColor={colors.textLight}
            value={formData.company}
            onChangeText={(value) => setFormData({ ...formData, company: value })}
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
            placeholder="Phone Number"
            placeholderTextColor={colors.textLight}
            value={formData.phone}
            onChangeText={(value) => setFormData({ ...formData, phone: value })}
            keyboardType="phone-pad"
          />
        </View>

        {/* Material Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Material Details</Text>

          <TextInput
            style={styles.input}
            placeholder="Material Type *"
            placeholderTextColor={colors.textLight}
            value={formData.material}
            onChangeText={(value) => setFormData({ ...formData, material: value })}
          />

          <TextInput
            style={styles.input}
            placeholder="Quantity Required *"
            placeholderTextColor={colors.textLight}
            value={formData.quantity}
            onChangeText={(value) => setFormData({ ...formData, quantity: value })}
            keyboardType="decimal-pad"
          />

          <TextInput
            style={styles.input}
            placeholder="Specifications (optional)"
            placeholderTextColor={colors.textLight}
            value={formData.specifications}
            onChangeText={(value) => setFormData({ ...formData, specifications: value })}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          <TextInput
            style={styles.input}
            placeholder="Required Delivery Date"
            placeholderTextColor={colors.textLight}
            value={formData.deliveryDate}
            onChangeText={(value) => setFormData({ ...formData, deliveryDate: value })}
          />
        </View>

        {/* Document Upload */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Attachments</Text>
            <Text style={styles.optionalLabel}>(Optional)</Text>
          </View>

          <TouchableOpacity style={styles.uploadBox} onPress={pickDocument}>
            <MaterialCommunityIcons name="cloud-upload-outline" size={32} color={colors.primary} />
            <Text style={styles.uploadText}>Upload documents or images</Text>
            <Text style={styles.uploadSubtext}>PDF, Images, or Word documents</Text>
          </TouchableOpacity>

          {files.length > 0 && (
            <View style={styles.filesList}>
              <Text style={styles.filesLabel}>
                {files.length} {files.length === 1 ? 'file' : 'files'} attached
              </Text>
              {files.map((file) => (
                <FileItem key={file.id} file={file} />
              ))}
            </View>
          )}
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <MaterialCommunityIcons name="information-outline" size={18} color={colors.primary} />
          <Text style={styles.infoText}>
            We will contact you within 24 hours with quotes from verified suppliers.
          </Text>
        </View>

        {/* Submit Button */}
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
              <Text style={styles.submitButtonText}>Submit Inquiry</Text>
            </>
          )}
        </TouchableOpacity>
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
    backgroundColor: colors.background,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  backBtnGradient: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textLight,
  },
  quickWhatsAppBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7F9ED',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  quickWhatsAppText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#25D366',
  },
  section: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  optionalLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 6,
    fontStyle: 'italic',
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
  uploadBox: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 8,
  },
  uploadSubtext: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
  },
  filesList: {
    marginTop: 12,
  },
  filesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  fileItem: {
    backgroundColor: colors.card,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileDetails: {
    marginLeft: 10,
    flex: 1,
  },
  fileName: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.text,
  },
  fileSize: {
    fontSize: 11,
    color: colors.textLight,
    marginTop: 2,
  },
  infoBox: {
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: colors.accent,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoText: {
    fontSize: 12,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  submitButton: {
    marginHorizontal: 16,
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
});
