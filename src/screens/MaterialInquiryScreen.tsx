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
  Platform,
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

interface MaterialType {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const MATERIAL_TYPES: MaterialType[] = [
  { id: 'tmt', name: 'TMT Bars', icon: 'pipe', color: '#E8B4A4' },
  { id: 'hollow', name: 'MS Hollow Sections', icon: 'square-outline', color: '#C8A8D8' },
  { id: 'plywood', name: 'Plywood', icon: 'palette', color: '#D4A574' },
  { id: 'tiles', name: 'Tiles', icon: 'grid', color: '#A8B8C8' },
  { id: 'sand', name: 'Sand', icon: 'water', color: '#F4C896' },
  { id: 'grit', name: 'Grit', icon: 'circle', color: '#808080' },
  { id: 'brick', name: 'Brick', icon: 'square', color: '#C85A50' },
  { id: 'other', name: 'Other (Specify below)', icon: 'star-outline', color: '#FFB366' },
];

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
  const [showMaterialDropdown, setShowMaterialDropdown] = useState(false);
  const [selectedMaterialType, setSelectedMaterialType] = useState<MaterialType | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [successData, setSuccessData] = useState<{ inquiryNumber: string; phone: string } | null>(null);

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

  const handleMaterialSelect = (material: MaterialType) => {
    setSelectedMaterialType(material);
    setFormData({ ...formData, material: material.name });
    setShowMaterialDropdown(false);
  };

  const handleDateSelect = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event: any, selected?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selected) {
      setSelectedDate(selected);
      const formattedDate = selected.toLocaleDateString('en-GB'); // DD/MM/YYYY format
      setFormData({ ...formData, deliveryDate: formattedDate });
    }
  };

  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      options.push({
        day: days[date.getDay()],
        date: date.getDate().toString(),
        month: months[date.getMonth()],
        formatted: date.toLocaleDateString('en-GB'),
      });
    }
    return options;
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
      Alert.alert('Required Field', 'Please enter your full name');
      return false;
    }
    if (!formData.company.trim()) {
      Alert.alert('Required Field', 'Please enter your company name');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Required Field', 'Please enter your email address');
      return false;
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert('Required Field', 'Please enter your phone number');
      return false;
    }
    // Phone validation: Must be in format +XX XXXXXXXXXX (country code + 10 digits)
    const phoneRegex = /^\+\d{2}\s\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      Alert.alert(
        'Invalid Phone Format',
        'Please enter phone number in format: +91 9876543210\n(Country code + 10 digits)'
      );
      return false;
    }
    if (!formData.material.trim()) {
      Alert.alert('Required Field', 'Please specify the material type');
      return false;
    }
    if (!formData.quantity.trim()) {
      Alert.alert('Required Field', 'Please enter the quantity required');
      return false;
    }
    if (!formData.deliveryDate.trim()) {
      Alert.alert('Required Field', 'Please specify the required delivery date');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Parse quantity safely
      const parsedQuantity = parseFloat(formData.quantity);
      const safeQuantity = (parsedQuantity && parsedQuantity > 0) ? parsedQuantity : 1;
      
      console.log('DEBUG: formData.material:', formData.material);
      console.log('DEBUG: formData.quantity:', formData.quantity);
      console.log('DEBUG: parsedQuantity:', parsedQuantity);
      console.log('DEBUG: safeQuantity:', safeQuantity);

      // Prepare inquiry data for backend with correct structure
      const material = {
        materialName: formData.material.trim(), // Backend expects 'materialName'
        category: 'general',
        quantity: safeQuantity,
        unit: 'MT',
        specification: formData.specifications.trim() || 'As per standard',
      };
      
      // Validate material object before sending
      if (!material.materialName || material.materialName.length === 0) {
        Alert.alert('Error', 'Material name is required');
        setLoading(false);
        return;
      }
      if (!material.quantity || material.quantity <= 0) {
        Alert.alert('Error', 'Quantity must be greater than 0');
        setLoading(false);
        return;
      }
      
      const inquiryData = {
        customerName: formData.name.trim(),
        companyName: formData.company.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || 'Not provided',
        materials: [material],
        deliveryLocation: 'To be discussed',
        deliveryDate: formData.deliveryDate.trim(),
        additionalRequirements: formData.specifications.trim() || 'None',
      };

      console.log('Submitting inquiry data:', inquiryData);
      console.log('Materials array:', JSON.stringify(inquiryData.materials, null, 2));

      // Submit to backend
      const result = await submitMaterialInquiry(inquiryData);
      console.log('📋 Backend response:', result);
      console.log('📋 Result success:', result.success);
      console.log('📋 Result data:', result.data);

      setLoading(false);

      if (result.success) {
        console.log('✅ SUCCESS - Showing popup');
        // Extract inquiry number from response
        const inquiryNumber = result.data?.inquiryNumber || 'N/A';
        console.log('✅ Inquiry Number:', inquiryNumber);
        
        // Generate formatted WhatsApp message
        let whatsappMessage = `*🔧 Material Inquiry Request*\n`;
        whatsappMessage += `*Inquiry #:* ${inquiryNumber}\n\n`;
        whatsappMessage += `*👤 Customer Details*\n`;
        whatsappMessage += `📛 Name: ${formData.name}\n`;
        whatsappMessage += `🏢 Company: ${formData.company || 'Not specified'}\n`;
        whatsappMessage += `📧 Email: ${formData.email}\n`;
        whatsappMessage += `📱 Phone: ${formData.phone || 'Not provided'}\n\n`;
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

        // Show success modal instead of alert
        setSuccessData({
          inquiryNumber,
          phone: formData.phone,
        });
      } else {
        console.log('❌ ERROR - Backend returned success: false');
        console.log('❌ Error message:', result.message);
        Alert.alert('Error', result.message || 'Failed to submit inquiry');
      }
    } catch (error: any) {
      console.error('❌ Submission error:', error);
      setLoading(false);
      Alert.alert('Error', 'Failed to submit inquiry. Please try again.');
    }
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
      <LinearGradient
        colors={['#faf8f6', '#f5ede3']}
        style={styles.gradient}
      >
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
                <Text style={styles.title}>Material Quotation</Text>
                <Text style={styles.subtitle}>Get instant quotes from verified suppliers</Text>
              </View>
            </View>
          </View>

          {/* Form Sections with Glass Effect */}
          <View style={styles.glassCard}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="account-circle" size={24} color={colors.primary} />
              <Text style={styles.cardTitle}>Your Information</Text>
            </View>

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
              autoCapitalize="none"
            />

            <View style={styles.inputWithIcon}>
              <Ionicons name="call" size={20} color={colors.primary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.inputWithPadding]}
                placeholder="+91 9876543210 *"
                placeholderTextColor={colors.textLight}
                value={formData.phone}
                onChangeText={(value) => setFormData({ ...formData, phone: value })}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Material Details with Glass Effect */}
          <View style={styles.glassCard}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="package-variant" size={24} color={colors.primary} />
              <Text style={styles.cardTitle}>Material Requirements</Text>
            </View>

            {/* Material Type Dropdown */}
            <Text style={styles.label}>Select Material Type *</Text>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowMaterialDropdown(!showMaterialDropdown)}
            >
              <Text style={[styles.dropdownButtonText, !selectedMaterialType && styles.placeholderText]}>
                {selectedMaterialType ? selectedMaterialType.name : 'Choose material type'}
              </Text>
              <Ionicons
                name={showMaterialDropdown ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={colors.textLight}
              />
            </TouchableOpacity>

            {/* Material Type Dropdown List - Scrollable */}
            {showMaterialDropdown && (
              <ScrollView
                style={styles.dropdownList}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={true}
              >
                {MATERIAL_TYPES.map((material) => (
                  <TouchableOpacity
                    key={material.id}
                    style={[
                      styles.dropdownItem,
                      selectedMaterialType?.id === material.id && styles.selectedItem,
                    ]}
                    onPress={() => handleMaterialSelect(material)}
                  >
                    <View style={[styles.materialIcon, { backgroundColor: material.color }]}>
                      <MaterialCommunityIcons name={material.icon as any} size={18} color="#fff" />
                    </View>
                    <Text style={styles.dropdownItemText}>{material.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            {/* Specify Material Type if Other is selected */}
            {selectedMaterialType?.id === 'other' && (
              <TextInput
                style={[styles.input, { marginTop: 12 }]}
                placeholder="Specify Your Material Type *"
                placeholderTextColor={colors.textLight}
                value={formData.material !== 'Other (Specify below)' ? formData.material : ''}
                onChangeText={(value) => setFormData({ ...formData, material: value })}
              />
            )}

            <TextInput
              style={styles.input}
              placeholder="Quantity Required (MT/Units) *"
              placeholderTextColor={colors.textLight}
              value={formData.quantity}
              onChangeText={(value) => setFormData({ ...formData, quantity: value })}
              keyboardType="decimal-pad"
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Specifications (Grade, Size, Standards, etc.)"
              placeholderTextColor={colors.textLight}
              value={formData.specifications}
              onChangeText={(value) => setFormData({ ...formData, specifications: value })}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={styles.inputWithIcon}
              onPress={handleDateSelect}
              activeOpacity={0.7}
            >
              <Ionicons name="calendar" size={20} color={colors.primary} style={styles.inputIcon} />
              <View style={[styles.input, styles.inputWithPadding, styles.dateInputContainer]}>
                <Text style={formData.deliveryDate ? styles.dateText : styles.datePlaceholder}>
                  {formData.deliveryDate || 'Required Delivery Date *'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Date Picker Modal */}
            {showDatePicker && (
              <View style={styles.datePickerContainer}>
                <View style={styles.datePickerHeader}>
                  <Text style={styles.datePickerTitle}>Select Delivery Date</Text>
                  <TouchableOpacity
                    style={styles.datePickerClose}
                    onPress={() => setShowDatePicker(false)}
                  >
                    <Ionicons name="close" size={24} color={colors.text} />
                  </TouchableOpacity>
                </View>
                <View style={styles.dateOptionsGrid}>
                  {generateDateOptions().map((dateOption, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.dateOption,
                        formData.deliveryDate === dateOption.formatted && styles.selectedDateOption,
                      ]}
                      onPress={() => {
                        setFormData({ ...formData, deliveryDate: dateOption.formatted });
                        setShowDatePicker(false);
                      }}
                    >
                      <Text style={styles.dateOptionDay}>{dateOption.day}</Text>
                      <Text style={styles.dateOptionDate}>{dateOption.date}</Text>
                      <Text style={styles.dateOptionMonth}>{dateOption.month}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Document Upload with Glass Effect */}
          <View style={styles.glassCard}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="cloud-upload" size={24} color={colors.primary} />
              <View style={styles.cardTitleContainer}>
                <Text style={styles.cardTitle}>Attachments</Text>
                <Text style={styles.optionalBadge}>Optional</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.uploadBox} onPress={pickDocument}>
              <MaterialCommunityIcons name="cloud-upload-outline" size={36} color={colors.primary} />
              <Text style={styles.uploadText}>Upload Documents or Images</Text>
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

          {/* Info Box with Glass Effect */}
          <View style={styles.infoGlassBox}>
            <MaterialCommunityIcons name="information" size={22} color={colors.primary} />
            <Text style={styles.infoText}>
              ✓ Your inquiry will be saved to database{"\n"}
              ✓ Our team will contact you within 24 hours{"\n"}
              ✓ Verified suppliers will provide quotes{"\n"}
              ✓ All fields marked with * are mandatory
            </Text>
          </View>

          {/* Submit Button with Gradient */}
          <TouchableOpacity
            style={[styles.submitButtonWrapper, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryDark || '#8b3a25']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.submitButton}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <MaterialCommunityIcons name="send" size={20} color="#fff" />
                  <Text style={styles.submitButtonText}>Submit Inquiry</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>

      {/* Success Modal */}
      {successData && (
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            <View style={styles.successHeader}>
              <View style={styles.successIconBox}>
                <MaterialCommunityIcons name="check-circle" size={60} color="#4CAF50" />
              </View>
              <Text style={styles.successTitle}>Inquiry Submitted!</Text>
              <Text style={styles.successSubtitle}>Your request has been received</Text>
            </View>

            <View style={styles.successContent}>
              <View style={styles.inquiryDetails}>
                <View style={styles.detailRow}>
                  <MaterialCommunityIcons name="file-document" size={20} color={colors.primary} />
                  <View style={styles.detailText}>
                    <Text style={styles.detailLabel}>Inquiry Number</Text>
                    <Text style={styles.detailValue}>{successData.inquiryNumber}</Text>
                  </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.detailRow}>
                  <MaterialCommunityIcons name="phone" size={20} color={colors.primary} />
                  <View style={styles.detailText}>
                    <Text style={styles.detailLabel}>Contact Number</Text>
                    <Text style={styles.detailValue}>{successData.phone}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.messageBox}>
                <MaterialCommunityIcons name="information-outline" size={18} color={colors.primary} />
                <Text style={styles.messageText}>
                  Our team will review your inquiry and contact you within 24 hours with quotations from verified suppliers.
                </Text>
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.whatsappButton}
                onPress={() => {
                  // Generate WhatsApp message
                  let whatsappMessage = `*🔧 Material Inquiry Request*\n`;
                  whatsappMessage += `*Inquiry #:* ${successData.inquiryNumber}\n\n`;
                  whatsappMessage += `*👤 Customer Details*\n`;
                  whatsappMessage += `📛 Name: ${formData.name}\n`;
                  whatsappMessage += `🏢 Company: ${formData.company}\n`;
                  whatsappMessage += `📧 Email: ${formData.email}\n`;
                  whatsappMessage += `📱 Phone: ${formData.phone}\n\n`;
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
                  Linking.openURL(whatsappUrl);

                  // Reset and close
                  setSuccessData(null);
                  setFormData({ name: '', company: '', email: '', phone: '', material: '', quantity: '', specifications: '', deliveryDate: '' });
                  setFiles([]);
                  setSelectedMaterialType(null);
                  navigation?.goBack?.();
                }}
              >
                <Ionicons name="logo-whatsapp" size={20} color="#fff" />
                <Text style={styles.whatsappButtonText}>Contact on WhatsApp</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => {
                  setSuccessData(null);
                  setFormData({ name: '', company: '', email: '', phone: '', material: '', quantity: '', specifications: '', deliveryDate: '' });
                  setFiles([]);
                  setSelectedMaterialType(null);
                  navigation?.goBack?.();
                }}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    marginBottom: 16,
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
  glassCard: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(193, 87, 56, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  cardTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionalBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textLight,
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.text,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(193, 87, 56, 0.15)',
  },
  inputWithIcon: {
    position: 'relative',
    marginBottom: 14,
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    top: 17,
    zIndex: 1,
  },
  inputWithPadding: {
    paddingLeft: 46,
    marginBottom: 0,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 14,
  },
  uploadBox: {
    backgroundColor: 'rgba(245, 237, 227, 0.5)',
    borderRadius: 12,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(193, 87, 56, 0.2)',
    borderStyle: 'dashed',
  },
  uploadText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 10,
  },
  uploadSubtext: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 6,
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(193, 87, 56, 0.15)',
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
  infoGlassBox: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: 'rgba(193, 87, 56, 0.08)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(193, 87, 56, 0.2)',
    gap: 12,
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
    fontSize: 13,
    color: colors.text,
    flex: 1,
    lineHeight: 20,
  },
  submitButtonWrapper: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 20,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  submitButton: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  // Material Dropdown Styles
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  dropdownButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(193, 87, 56, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dropdownButtonText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
  },
  placeholderText: {
    color: colors.textLight,
    fontWeight: '400',
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(193, 87, 56, 0.15)',
    marginBottom: 16,
    maxHeight: 300,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    gap: 12,
  },
  selectedItem: {
    backgroundColor: 'rgba(193, 87, 56, 0.08)',
  },
  materialIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownItemText: {
    fontSize: 15,
    color: colors.text,
    flex: 1,
  },
  // Date Picker Styles
  dateInputContainer: {
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
  },
  datePlaceholder: {
    fontSize: 15,
    color: colors.textLight,
  },
  datePickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 12,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(193, 87, 56, 0.15)',
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  datePickerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  datePickerClose: {
    padding: 4,
  },
  dateOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  dateOption: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: 'rgba(193, 87, 56, 0.05)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(193, 87, 56, 0.2)',
    padding: 8,
  },
  selectedDateOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dateOptionDay: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: 2,
  },
  dateOptionDate: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  dateOptionMonth: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.textLight,
  },
  // Success Modal Styles
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  successModal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '85%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  successIconBox: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  successSubtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  successContent: {
    marginBottom: 24,
  },
  inquiryDetails: {
    backgroundColor: 'rgba(193, 87, 56, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 3,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(193, 87, 56, 0.1)',
  },
  messageBox: {
    backgroundColor: 'rgba(76, 175, 80, 0.08)',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    gap: 10,
  },
  messageText: {
    fontSize: 13,
    color: colors.text,
    flex: 1,
    lineHeight: 18,
  },
  modalButtons: {
    gap: 10,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  whatsappButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  doneButton: {
    backgroundColor: 'rgba(193, 87, 56, 0.1)',
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
  },
});
