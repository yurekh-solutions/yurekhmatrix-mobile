import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Dimensions,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#c15738',
  primaryLight: '#d66f4f',
  secondary: '#f5ede3',
  background: '#faf8f6',
  white: '#ffffff',
  text: '#683627',
  textLight: '#8b7355',
  border: '#e8dfd5',
  success: '#22c55e',
};

interface Product {
  id?: string;
  name: string;
  category: string;
  description: string;
  image?: any;
  applications?: string[];
  features?: string[];
  specifications?: {
    materialStandard?: string;
    packaging?: string;
    testingCertificate?: string;
    brand?: string[];
    grades?: string[];
    delivery?: string;
    quality?: string;
    availability?: string;
  };
  stock?: {
    available: boolean;
    quantity?: number;
  };
}

interface RFQScreenProps {
  visible: boolean;
  product: Product | null;
  onClose: () => void;
  onAddToCart?: (rfqData: any) => void;
}

export interface RFQData {
  productId: string;
  productName: string;
  selectedBrand: string;
  selectedGrade: string;
  quantity: number;
}

const RFQScreen: React.FC<RFQScreenProps> = ({ visible, product, onClose, onAddToCart }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<string>('1');
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showGradeDropdown, setShowGradeDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  // Step 2 - Customer Details
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  if (!product) return null;

  const imageSource =
    typeof product.image === 'object' && product.image !== null
      ? product.image
      : typeof product.image === 'number'
        ? product.image
        : product.image
          ? { uri: product.image }
          : null;

  const brands = product.specifications?.brand || [];
  const grades = product.specifications?.grades || [];

  const handleNextStep = () => {
    if (!selectedBrand) {
      Alert.alert('Required', 'Please select a brand');
      return;
    }
    if (!selectedGrade) {
      Alert.alert('Required', 'Please select a material grade');
      return;
    }
    if (!quantity || parseInt(quantity) < 1) {
      Alert.alert('Required', 'Please enter a valid quantity');
      return;
    }
    setStep(2);
  };

  const handleSubmitRFQ = async () => {
    if (!customerName.trim()) {
      Alert.alert('Required', 'Please enter your name');
      return;
    }
    if (!companyName.trim()) {
      Alert.alert('Required', 'Please enter your company name');
      return;
    }
    if (!deliveryLocation.trim()) {
      Alert.alert('Required', 'Please enter delivery location');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Required', 'Please enter your email');
      return;
    }
    if (!phone.trim()) {
      Alert.alert('Required', 'Please enter your phone number');
      return;
    }

    setLoading(true);
    try {
      const rfqData = {
        productId: product.id,
        productName: product.name,
        category: product.category,
        brand: selectedBrand,
        grade: selectedGrade,
        quantity: parseInt(quantity),
        customerName,
        companyName,
        deliveryLocation,
        email,
        phone,
        createdAt: new Date(),
      };

      // Post to backend RFQ endpoint
      const response = await fetch(
        'https://suppliermatrix-backend.onrender.com/api/rfq/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(rfqData),
        }
      );

      if (response.ok) {
        // Send WhatsApp message to admin
        const whatsappMessage = `I need quotation for below materials:

MATERIAL REQUIREMENTS
Total Items: 1

Item 1
Product: ${rfqData.productName}
Category: ${rfqData.category}
Brand: ${rfqData.brand}
Material/Grade: ${rfqData.grade}
Quantity: ${rfqData.quantity} MT

CUSTOMER DETAILS
Name: ${rfqData.customerName}
Company: ${rfqData.companyName}
Delivery Location: ${rfqData.deliveryLocation}
Email: ${rfqData.email}
Phone: ${rfqData.phone}`;
        
        const whatsappUrl = `https://wa.me/919136242706?text=${encodeURIComponent(whatsappMessage)}`;
        
        Alert.alert(
          'Success!',
          'Your RFQ has been submitted successfully!\n\nWe will contact you at +91 91362 42706 with a quotation.',
          [
            {
              text: 'Share on WhatsApp',
              onPress: () => {
                // Open WhatsApp
                window.open(whatsappUrl, '_blank');
                // Call the onAddToCart callback
                onAddToCart(rfqData);
                resetForm();
                onClose();
              },
            },
            {
              text: 'OK',
              onPress: () => {
                // Call the onAddToCart callback
                onAddToCart(rfqData);
                resetForm();
                onClose();
              },
            },
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to submit RFQ. Please try again.');
      }
    } catch (error) {
      console.log('RFQ Submission Error:', error);
      Alert.alert('Error', 'Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedBrand(null);
    setSelectedGrade(null);
    setQuantity('1');
    setShowBrandDropdown(false);
    setShowGradeDropdown(false);
    setCustomerName('');
    setCompanyName('');
    setDeliveryLocation('');
    setEmail('');
    setPhone('');
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={[COLORS.secondary, COLORS.background]} style={styles.gradient}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={step === 2 ? () => setStep(1) : onClose}>
              <MaterialCommunityIcons
                name={step === 2 ? 'arrow-left' : 'close'}
                size={28}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Request for Quote</Text>
            <View style={{ width: 28 }} />
          </View>

          {/* Step Indicator */}
          <View style={styles.stepContainer}>
            <View style={styles.stepIndicator}>
              <View style={[styles.stepCircle, step >= 1 && styles.stepCircleActive]}>
                <Text style={[styles.stepText, step >= 1 && styles.stepTextActive]}>1</Text>
              </View>
              <View
                style={[styles.stepLine, step === 2 && styles.stepLineActive]}
              />
              <View style={[styles.stepCircle, step >= 2 && styles.stepCircleActive]}>
                <Text style={[styles.stepText, step >= 2 && styles.stepTextActive]}>2</Text>
              </View>
            </View>
            <Text style={styles.stepDescription}>
              {step === 1 ? 'Review your cart' : 'Enter your details'}
            </Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {step === 1 ? (
              // STEP 1 - Review Cart
              <>
                {/* Product Image */}
                <View style={styles.imageContainer}>
                  {imageSource ? (
                    <Image source={imageSource} style={styles.productImage} resizeMode="cover" />
                  ) : (
                    <View style={styles.imagePlaceholder}>
                      <MaterialCommunityIcons name="package-variant" size={60} color={COLORS.border} />
                    </View>
                  )}
                </View>

                {/* Product Name & Category */}
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productCategory}>
                  {product.category?.replace('-', ' ').toUpperCase()}
                </Text>

                {/* Review Cart Section */}
                <View style={styles.cartSection}>
                  <Text style={styles.sectionTitle}>Your Cart</Text>

                  {/* Cart Item */}
                  <View style={styles.cartItem}>
                    <View style={styles.cartItemLeft}>
                      <MaterialCommunityIcons name="package-variant-closed" size={32} color={COLORS.primary} />
                    </View>
                    <View style={styles.cartItemDetails}>
                      <Text style={styles.cartItemName}>{product.name}</Text>
                      <Text style={styles.cartItemCategory}>{product.category?.replace('-', ' ')}</Text>
                      <Text style={styles.cartItemSpec}>Category: {product.category?.replace('-', ' ').toUpperCase()}</Text>
                    </View>
                  </View>

                  {/* Selection Section */}
                  <View style={styles.formSection}>
                    {/* Select Brand */}
                    <View style={styles.formField}>
                      <Text style={styles.fieldLabel}>
                        Select Brand <Text style={styles.required}>*</Text>
                      </Text>
                      <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => setShowBrandDropdown(!showBrandDropdown)}
                      >
                        <Text style={[styles.dropdownText, !selectedBrand && styles.placeholder]}>
                          {selectedBrand || 'Choose a preferred brand'}
                        </Text>
                        <MaterialCommunityIcons
                          name={showBrandDropdown ? 'chevron-up' : 'chevron-down'}
                          size={20}
                          color={COLORS.primary}
                        />
                      </TouchableOpacity>

                      {showBrandDropdown && (
                        <View style={styles.dropdownList}>
                          {brands.map((brand, idx) => (
                            <TouchableOpacity
                              key={idx}
                              style={[
                                styles.dropdownItem,
                                selectedBrand === brand && styles.dropdownItemSelected,
                              ]}
                              onPress={() => {
                                setSelectedBrand(brand);
                                setShowBrandDropdown(false);
                              }}
                            >
                              <Text
                                style={[
                                  styles.dropdownItemText,
                                  selectedBrand === brand && styles.dropdownItemTextSelected,
                                ]}
                              >
                                {brand}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>

                    {/* Select Material Grade */}
                    <View style={styles.formField}>
                      <Text style={styles.fieldLabel}>
                        Select Material Grade <Text style={styles.required}>*</Text>
                      </Text>
                      <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => setShowGradeDropdown(!showGradeDropdown)}
                      >
                        <Text style={[styles.dropdownText, !selectedGrade && styles.placeholder]}>
                          {selectedGrade || 'Choose material specification'}
                        </Text>
                        <MaterialCommunityIcons
                          name={showGradeDropdown ? 'chevron-up' : 'chevron-down'}
                          size={20}
                          color={COLORS.primary}
                        />
                      </TouchableOpacity>

                      {showGradeDropdown && (
                        <View style={styles.dropdownList}>
                          {grades.map((grade, idx) => (
                            <TouchableOpacity
                              key={idx}
                              style={[
                                styles.dropdownItem,
                                selectedGrade === grade && styles.dropdownItemSelected,
                              ]}
                              onPress={() => {
                                setSelectedGrade(grade);
                                setShowGradeDropdown(false);
                              }}
                            >
                              <Text
                                style={[
                                  styles.dropdownItemText,
                                  selectedGrade === grade && styles.dropdownItemTextSelected,
                                ]}
                              >
                                {grade}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>

                    {/* Quantity */}
                    <View style={styles.formField}>
                      <Text style={styles.fieldLabel}>
                        Quantity (Metric Tons) <Text style={styles.required}>*</Text>
                      </Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter quantity"
                        placeholderTextColor={COLORS.textLight}
                        value={quantity}
                        onChangeText={setQuantity}
                        keyboardType="decimal-pad"
                      />
                      <Text style={styles.minimumOrder}>
                        Delivery: {product.specifications?.delivery || 'Pan India'}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Next Button */}
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={handleNextStep}
                  activeOpacity={0.8}
                >
                  <Text style={styles.nextButtonText}>Next</Text>
                  <MaterialCommunityIcons name="arrow-right" size={20} color={COLORS.white} />
                </TouchableOpacity>
              </>
            ) : (
              // STEP 2 - Customer Details
              <>
                <View style={styles.customerSection}>
                  <Text style={styles.sectionTitle}>Customer Information</Text>

                  {/* Name */}
                  <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>
                      Name <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Your name"
                      placeholderTextColor={COLORS.textLight}
                      value={customerName}
                      onChangeText={setCustomerName}
                    />
                  </View>

                  {/* Company */}
                  <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>
                      Company <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Your company name"
                      placeholderTextColor={COLORS.textLight}
                      value={companyName}
                      onChangeText={setCompanyName}
                    />
                  </View>

                  {/* Delivery Location */}
                  <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>
                      Delivery Location <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput
                      style={styles.input}
                      placeholder="City / Location"
                      placeholderTextColor={COLORS.textLight}
                      value={deliveryLocation}
                      onChangeText={setDeliveryLocation}
                    />
                  </View>

                  {/* Email */}
                  <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>
                      Email <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Your email"
                      placeholderTextColor={COLORS.textLight}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                    />
                  </View>

                  {/* Phone */}
                  <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>
                      Phone <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Your phone number"
                      placeholderTextColor={COLORS.textLight}
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                  onPress={handleSubmitRFQ}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <>
                      <Text style={styles.submitButtonText}>Submitting...</Text>
                    </>
                  ) : (
                    <>
                      <MaterialCommunityIcons name="check-circle" size={20} color={COLORS.white} />
                      <Text style={styles.submitButtonText}>Submit RFQ</Text>
                    </>
                  )}
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  gradient: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(193, 87, 56, 0.1)',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    fontFamily: 'sans-serif',
  },

  stepContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },

  stepCircleActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  stepText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textLight,
    fontFamily: 'sans-serif',
  },

  stepTextActive: {
    color: COLORS.white,
  },

  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: COLORS.border,
    marginHorizontal: 8,
  },

  stepLineActive: {
    backgroundColor: COLORS.primary,
  },

  stepDescription: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textLight,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  imageContainer: {
    width: '100%',
    height: 180,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 14,
    backgroundColor: COLORS.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },

  productImage: {
    width: '100%',
    height: '100%',
  },

  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
  },

  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
    fontFamily: 'sans-serif',
  },

  productCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 16,
    letterSpacing: 0.5,
    fontFamily: 'sans-serif',
  },

  cartSection: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
    fontFamily: 'sans-serif',
  },

  cartItem: {
    flexDirection: 'row',
    padding: 14,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    gap: 12,
  },

  cartItemLeft: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: 'rgba(193, 87, 56, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cartItemDetails: {
    flex: 1,
  },

  cartItemName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    fontFamily: 'sans-serif',
  },

  cartItemCategory: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textLight,
    marginTop: 2,
    fontFamily: 'sans-serif',
  },

  cartItemSpec: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 2,
    fontFamily: 'sans-serif',
  },

  formSection: {
    marginTop: 12,
  },

  customerSection: {
    marginBottom: 20,
  },

  formField: {
    marginBottom: 16,
  },

  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
    fontFamily: 'sans-serif',
  },

  required: {
    color: COLORS.primary,
  },

  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderRadius: 9,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },

  dropdownText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
    fontFamily: 'sans-serif',
  },

  placeholder: {
    color: COLORS.textLight,
    fontWeight: '500',
  },

  dropdownList: {
    marginTop: 6,
    borderRadius: 9,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },

  dropdownItemSelected: {
    backgroundColor: 'rgba(193, 87, 56, 0.08)',
  },

  dropdownItemText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    fontFamily: 'sans-serif',
  },

  dropdownItemTextSelected: {
    color: COLORS.primary,
    fontWeight: '700',
  },

  input: {
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderRadius: 9,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    fontFamily: 'sans-serif',
  },

  minimumOrder: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textLight,
    marginTop: 5,
    fontFamily: 'sans-serif',
  },

  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 9,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },

  nextButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: 'sans-serif',
  },

  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 9,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },

  submitButtonDisabled: {
    opacity: 0.6,
  },

  submitButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: 'sans-serif',
  },
});

export default RFQScreen;
