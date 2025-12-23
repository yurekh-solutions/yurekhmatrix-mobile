import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';
import { API_BASE_URL } from '@/src/lib/api';
import * as DocumentPicker from 'expo-document-picker';

const { width } = Dimensions.get('window');

interface SupplierFormData {
  companyName: string;
  email: string;
  phone: string;
  contactPerson: string;
  businessType: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  businessDescription: string;
  productsOffered: string;
  yearsInBusiness: string;
}

interface UploadedFiles {
  pan?: any;
  aadhaar?: any;
  bankProof?: any;
}

export default function SupplierOnboardingScreen({ navigation }: any) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [files, setFiles] = useState<UploadedFiles>({});
  const [formData, setFormData] = useState<SupplierFormData>({
    companyName: '',
    email: '',
    phone: '',
    contactPerson: '',
    businessType: 'business',
    address: '',
    city: '',
    state: '',
    pincode: '',
    businessDescription: '',
    productsOffered: '',
    yearsInBusiness: '0',
  });

  const updateField = (field: keyof SupplierFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Validate all required fields
    if (!formData.companyName || !formData.email || !formData.phone || !formData.contactPerson) {
      Alert.alert(
        '⚠️ Required Fields',
        'Please fill in all required fields',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    if (!files.pan) {
      Alert.alert(
        '⚠️ Document Required',
        'PAN Card document is required to proceed',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    setLoading(true);
    try {
      console.log('🚀 Submitting to:', `${API_BASE_URL}/supplier/submit`);
      
      // Create FormData for file upload
      const uploadData = new FormData();
      uploadData.append('companyName', formData.companyName);
      uploadData.append('email', formData.email);
      uploadData.append('phone', formData.phone);
      uploadData.append('contactPerson', formData.contactPerson);
      uploadData.append('businessType', formData.businessType.toLowerCase());
      
      // Address as JSON string (backend expects this)
      const addressObj = {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      };
      uploadData.append('address', JSON.stringify(addressObj));
      
      uploadData.append('businessDescription', formData.businessDescription || '');
      
      // Products as JSON array (backend expects this)
      const productsArray = formData.productsOffered
        ? formData.productsOffered.split(',').map(p => p.trim()).filter(p => p)
        : [];
      uploadData.append('productsOffered', JSON.stringify(productsArray));
      
      uploadData.append('yearsInBusiness', formData.yearsInBusiness || '0');

      // Append files with proper format for web and native
      if (files.pan) {
        // For web, create a proper File/Blob object
        if (files.pan.file) {
          // Web platform - has file property
          uploadData.append('pan', files.pan.file, files.pan.name || 'pan.pdf');
        } else {
          // Native platform - use uri
          uploadData.append('pan', {
            uri: files.pan.uri,
            type: files.pan.mimeType || 'application/pdf',
            name: files.pan.name || 'pan.pdf',
          } as any);
        }
      }
      if (files.aadhaar) {
        if (files.aadhaar.file) {
          uploadData.append('aadhaar', files.aadhaar.file, files.aadhaar.name || 'aadhaar.pdf');
        } else {
          uploadData.append('aadhaar', {
            uri: files.aadhaar.uri,
            type: files.aadhaar.mimeType || 'application/pdf',
            name: files.aadhaar.name || 'aadhaar.pdf',
          } as any);
        }
      }
      if (files.bankProof) {
        if (files.bankProof.file) {
          uploadData.append('bankProof', files.bankProof.file, files.bankProof.name || 'bankProof.pdf');
        } else {
          uploadData.append('bankProof', {
            uri: files.bankProof.uri,
            type: files.bankProof.mimeType || 'application/pdf',
            name: files.bankProof.name || 'bankProof.pdf',
          } as any);
        }
      }

      console.log('📦 Form data prepared:', {
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        contactPerson: formData.contactPerson,
        businessType: formData.businessType.toLowerCase(),
        address: JSON.stringify(addressObj),
        productsOffered: JSON.stringify(productsArray),
        yearsInBusiness: formData.yearsInBusiness || '0',
        hasPAN: !!files.pan,
        hasAadhaar: !!files.aadhaar,
        hasBankProof: !!files.bankProof,
      });
      
      console.log('📋 Files details:', {
        pan: files.pan ? { name: files.pan.name, type: files.pan.mimeType, size: files.pan.size, hasFile: !!(files.pan as any).file } : null,
        aadhaar: files.aadhaar ? { name: files.aadhaar.name, type: files.aadhaar.mimeType, size: files.aadhaar.size, hasFile: !!(files.aadhaar as any).file } : null,
        bankProof: files.bankProof ? { name: files.bankProof.name, type: files.bankProof.mimeType, size: files.bankProof.size, hasFile: !!(files.bankProof as any).file } : null,
      });

      const response = await fetch(`${API_BASE_URL}/supplier/submit`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: uploadData,
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', response.headers);
      
      let data;
      try {
        const responseText = await response.text();
        console.log('📤 Raw response:', responseText);
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ JSON parse error:', parseError);
        throw new Error('Failed to parse server response');
      }
      
      console.log('📤 Parsed response:', data);

      if (response.ok && data.success) {
        // Show success message then auto-navigate
        Alert.alert(
          '🎉 Success!',
          'Your supplier application has been submitted successfully!\n\nOur team will review it within 24-48 hours and notify you via email.',
          [
            {
              text: 'Done',
              onPress: () => {
                // Clear form data
                setFormData({
                  companyName: '',
                  email: '',
                  phone: '',
                  contactPerson: '',
                  businessType: 'business',
                  address: '',
                  city: '',
                  state: '',
                  pincode: '',
                  businessDescription: '',
                  productsOffered: '',
                  yearsInBusiness: '0',
                });
                setFiles({});
                setCurrentStep(1);
                // Auto-navigate back to login/home
                setTimeout(() => {
                  navigation.goBack();
                }, 500);
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          '❌ Submission Failed',
          data.message || 'Failed to submit application. Please try again.',
          [{ text: 'OK', style: 'default' }]
        );
      }
    } catch (error) {
      console.error('Error submitting:', error);
      Alert.alert(
        '⚠️ Connection Error',
        'Failed to submit your application. Please check your internet connection and try again.',
        [{ text: 'OK', style: 'default' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < 3) setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.companyName || !formData.email || !formData.phone || !formData.contactPerson) {
        Alert.alert(
          '⚠️ Required Fields',
          'Please fill in all required fields to continue',
          [{ text: 'OK', style: 'default' }]
        );
        return false;
      }
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        Alert.alert(
          '⚠️ Invalid Email',
          'Please enter a valid email address',
          [{ text: 'OK', style: 'default' }]
        );
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.address || !formData.city || !formData.state || !formData.pincode) {
        Alert.alert(
          '⚠️ Required Fields',
          'Please fill in all required address fields',
          [{ text: 'OK', style: 'default' }]
        );
        return false;
      }
      if (!acceptedTerms) {
        Alert.alert(
          '⚠️ Terms & Conditions',
          'Please accept the Terms and Conditions to continue',
          [{ text: 'OK', style: 'default' }]
        );
        return false;
      }
    }
    return true;
  };

  const pickDocument = async (type: keyof UploadedFiles) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        console.log('📄 File picked:', {
          name: asset.name,
          type: asset.mimeType,
          size: asset.size,
          uri: asset.uri,
          hasFile: !!(asset as any).file,
        });
        
        // For web platform, fetch and convert URI to File object
        if ((asset as any).file) {
          // Already has file property on web
          setFiles(prev => ({ ...prev, [type]: asset }));
        } else if (asset.uri && asset.uri.startsWith('http')) {
          // Convert remote URI to File object
          try {
            const response = await fetch(asset.uri);
            const blob = await response.blob();
            const fileObj = new File([blob], asset.name || `${type}.pdf`, {
              type: asset.mimeType || 'application/octet-stream',
            });
            setFiles(prev => ({
              ...prev,
              [type]: {
                ...asset,
                file: fileObj,
              },
            }));
          } catch (e) {
            console.error('Error converting URI to file:', e);
            setFiles(prev => ({ ...prev, [type]: asset }));
          }
        } else {
          // Local URI on native
          setFiles(prev => ({ ...prev, [type]: asset }));
        }
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicatorContainer}>
      {[1, 2, 3].map((step) => {
        const isActive = currentStep >= step;
        const isCompleted = currentStep > step;
        
        return (
          <View key={step} style={styles.stepIndicatorItem}>
            <View style={styles.stepWrapper}>
              <View
                style={[
                  styles.stepCircle,
                  isActive && styles.stepCircleActive,
                ]}
              >
                {isCompleted ? (
                  <MaterialCommunityIcons name="check" size={18} color="#fff" />
                ) : (
                  <Text style={[styles.stepNumber, isActive && styles.stepNumberActive]}>
                    {step}
                  </Text>
                )}
              </View>
              {step < 3 && (
                <View style={[styles.stepConnector, isActive && styles.stepConnectorActive]} />
              )}
            </View>
            <Text style={[styles.stepLabel, isActive && styles.stepLabelActive]}>
              {step === 1 ? 'Basic Info' : step === 2 ? 'Business' : 'Details'}
            </Text>
          </View>
        );
      })}
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>Company Information</Text>
      <Text style={styles.sectionDesc}>Step 1 of 3 - Company Info</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Company Name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your company name"
          placeholderTextColor="#999"
          value={formData.companyName}
          onChangeText={(text) => updateField('companyName', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Email <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="company@example.com"
          placeholderTextColor="#999"
          value={formData.email}
          onChangeText={(text) => updateField('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Phone <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="+91 XXXXXXXXXX"
          placeholderTextColor="#999"
          value={formData.phone}
          onChangeText={(text) => updateField('phone', text)}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Contact Person <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Full name of contact person"
          placeholderTextColor="#999"
          value={formData.contactPerson}
          onChangeText={(text) => updateField('contactPerson', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Business Type *</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => updateField('businessType', 'business')}
          >
            <View style={[styles.radio, formData.businessType === 'business' && styles.radioActive]}>
              {formData.businessType === 'business' && (
                <View style={styles.radioDot} />
              )}
            </View>
            <Text style={styles.radioLabel}>Business/Company</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => updateField('businessType', 'individual')}
          >
            <View style={[styles.radio, formData.businessType === 'individual' && styles.radioActive]}>
              {formData.businessType === 'individual' && (
                <View style={styles.radioDot} />
              )}
            </View>
            <Text style={styles.radioLabel}>Individual/Sole Proprietor</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>Business Details</Text>
      <Text style={styles.sectionDesc}>Step 2 of 3 - Business Details</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          style={styles.input}
          placeholder="Street Address"
          placeholderTextColor="#999"
          value={formData.address}
          onChangeText={(text) => updateField('address', text)}
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.label}>City *</Text>
          <TextInput
            style={styles.input}
            placeholder="City"
            placeholderTextColor="#999"
            value={formData.city}
            onChangeText={(text) => updateField('city', text)}
          />
        </View>
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Text style={styles.label}>State *</Text>
          <TextInput
            style={styles.input}
            placeholder="State"
            placeholderTextColor="#999"
            value={formData.state}
            onChangeText={(text) => updateField('state', text)}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Pincode *</Text>
        <TextInput
          style={styles.input}
          placeholder="Pincode"
          placeholderTextColor="#999"
          value={formData.pincode}
          onChangeText={(text) => updateField('pincode', text)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Business Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your business and what you offer..."
          placeholderTextColor="#999"
          value={formData.businessDescription}
          onChangeText={(text) => updateField('businessDescription', text)}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Products/Services Offered *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter products separated by commas"
          placeholderTextColor="#999"
          value={formData.productsOffered}
          onChangeText={(text) => updateField('productsOffered', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Years in Business *</Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          placeholderTextColor="#999"
          value={formData.yearsInBusiness}
          onChangeText={(text) => updateField('yearsInBusiness', text)}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity 
        style={styles.checkboxContainer}
        onPress={() => setAcceptedTerms(!acceptedTerms)}
      >
        <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
          {acceptedTerms && <MaterialCommunityIcons name="check" size={16} color="#fff" />}
        </View>
        <Text style={styles.checkboxLabel}>
          I agree to the Terms and Conditions and Privacy Policy *
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>Upload Documents</Text>
      <Text style={styles.sectionDesc}>Step 3 of 3 - Documents</Text>
      <Text style={styles.docInfo}>📄 Upload required documents (PDF, JPG, PNG - Max 5MB each)</Text>

      {/* PAN Card */}
      <View style={styles.fileInputGroup}>
        <View style={styles.fileHeader}>
          <Text style={styles.fileLabel}>PAN Card <Text style={styles.required}>*</Text></Text>
          <Text style={styles.requiredBadge}>Required</Text>
        </View>
        <TouchableOpacity 
          style={styles.fileButton}
          onPress={() => pickDocument('pan')}
        >
          <MaterialCommunityIcons name="file-document-outline" size={20} color={colors.gradient1} />
          <Text style={styles.fileButtonText}>
            {files.pan ? files.pan.name : 'No file chosen'}
          </Text>
          <MaterialCommunityIcons name="upload" size={18} color={colors.textLight} />
        </TouchableOpacity>
      </View>

      {/* Aadhaar Card */}
      <View style={styles.fileInputGroup}>
        <Text style={styles.fileLabel}>Aadhaar Card</Text>
        <TouchableOpacity 
          style={styles.fileButton}
          onPress={() => pickDocument('aadhaar')}
        >
          <MaterialCommunityIcons name="file-document-outline" size={20} color={colors.gradient1} />
          <Text style={styles.fileButtonText}>
            {files.aadhaar ? files.aadhaar.name : 'No file chosen'}
          </Text>
          <MaterialCommunityIcons name="upload" size={18} color={colors.textLight} />
        </TouchableOpacity>
      </View>

      {/* Bank Proof */}
      <View style={styles.fileInputGroup}>
        <View style={styles.fileHeader}>
          <Text style={styles.fileLabel}>Bank Proof</Text>
          <Text style={styles.recommendedBadge}>Recommended</Text>
        </View>
        <TouchableOpacity 
          style={styles.fileButton}
          onPress={() => pickDocument('bankProof')}
        >
          <MaterialCommunityIcons name="file-document-outline" size={20} color={colors.gradient1} />
          <Text style={styles.fileButtonText}>
            {files.bankProof ? files.bankProof.name : 'No file chosen'}
          </Text>
          <MaterialCommunityIcons name="upload" size={18} color={colors.textLight} />
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <MaterialCommunityIcons name="information" size={16} color={colors.gradient1} />
        <Text style={styles.infoText}>
          Our team will review your application within 24-48 hours. You&apos;ll receive an email once approved.
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#f4d8c8', '#f5e6dc', '#ffffff']}
        style={styles.gradientBg}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.gradient1} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <LinearGradient
              colors={[colors.gradient1, colors.gradient2]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoBox}
            >
              <Text style={styles.logoText}>RY</Text>
            </LinearGradient>
            <View style={styles.brandTextContainer}>
              <Text style={styles.brandLine1}>PROCUREMENT</Text>
              <Text style={styles.brandLine2}>LEAGUE</Text>
            </View>
          </View>
        </View>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Form Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formCard}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </View>
        </ScrollView>

        {/* Navigation Buttons */}
        <View style={styles.navigationButtons}>
          {currentStep > 1 && (
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={prevStep}
            >
              <MaterialCommunityIcons name="chevron-left" size={20} color={colors.gradient1} />
              <Text style={styles.secondaryButtonText}>Previous</Text>
            </TouchableOpacity>
          )}

          {currentStep < 3 ? (
            <TouchableOpacity
              style={[styles.primaryButton, currentStep === 1 && styles.primaryButtonFull]}
              onPress={nextStep}
            >
              <LinearGradient
                colors={[colors.gradient1, colors.gradient2]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.primaryButtonText}>Next</Text>
                <MaterialCommunityIcons name="chevron-right" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSubmit}
              disabled={loading}
            >
              <LinearGradient
                colors={[colors.gradient1, colors.gradient2]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <MaterialCommunityIcons name="check-circle" size={20} color="#fff" />
                    <Text style={styles.primaryButtonText}>Submit Application</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4d8c8',
  },
  gradientBg: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  brandTextContainer: {
    justifyContent: 'center',
  },
  brandLine1: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.gradient1,
    letterSpacing: 0.5,
  },
  brandLine2: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textLight,
    letterSpacing: 0.3,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 24,
    gap: 8,
    justifyContent: 'space-between',
  },
  stepIndicatorItem: {
    flex: 1,
    alignItems: 'center',
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 8,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: colors.gradient1,
    borderColor: colors.gradient1,
    shadowColor: colors.gradient1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#999',
  },
  stepNumberActive: {
    color: '#fff',
  },
  stepConnector: {
    position: 'absolute',
    left: '50%',
    width: 100,
    height: 2,
    backgroundColor: '#ddd',
    marginLeft: 20,
  },
  stepConnectorActive: {
    backgroundColor: colors.gradient1,
  },
  stepLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    textAlign: 'center',
  },
  stepLabelActive: {
    color: colors.gradient1,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    paddingTop: 8,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  formSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.gradient1,
    marginBottom: 6,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  required: {
    color: colors.error,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.text,
    backgroundColor: '#fff',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(197, 78, 48, 0.08)',
    borderRadius: 12,
    padding: 14,
    gap: 10,
    marginTop: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: colors.textLight,
    lineHeight: 18,
  },
  navigationButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: colors.gradient1,
    gap: 6,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.gradient1,
  },
  primaryButton: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.gradient1,
  },
  primaryButtonFull: {
    flex: 2,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  sectionDesc: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.gradient1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.gradient1,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
  },
  docInfo: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 16,
  },
  fileInputGroup: {
    marginBottom: 16,
  },
  fileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fileLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  requiredBadge: {
    fontSize: 10,
    color: colors.error,
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    fontWeight: '600',
  },
  recommendedBadge: {
    fontSize: 10,
    color: colors.gradient1,
    backgroundColor: 'rgba(197, 78, 48, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    fontWeight: '600',
  },
  fileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: 'rgba(197, 78, 48, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  fileButtonText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
  },
  radioGroup: {
    flexDirection: 'column',
    gap: 10,
    marginTop: 12,
    width: '100%',
  },
  radioOption: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: colors.gradient1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.gradient1,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  radioActive: {
    borderColor: colors.gradient1,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gradient1,
  },
  radioLabel: {
    flex: 1,
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
    flexWrap: 'wrap',
  },
});
