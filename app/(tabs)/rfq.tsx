import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import CartService from '@/src/lib/cartService';
import LottieView from 'lottie-react-native';

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

export default function RFQTab() {
  const route = useRoute();
  const navigation = useNavigation();
  const productFromRoute = route.params?.product;

  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  
  // Step 2 - Customer Details
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Cart items from storage
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      const items = await CartService.getCartItems();
      
      // If product passed from route, add it to cart
      if (productFromRoute) {
        const newItem = {
          productId: productFromRoute.id,
          productName: productFromRoute.name,
          category: productFromRoute.category,
          brand: productFromRoute.selectedBrand,
          grade: productFromRoute.selectedGrade,
          quantity: productFromRoute.quantity || 1,
        };
        
        const updatedItems = await CartService.addToCart(newItem);
        setCartItems(updatedItems);
      } else {
        setCartItems(items);
      }
    } catch (error) {
      console.log('Error loading cart:', error);
    }
  };

  const handleDeleteItem = async (index: number) => {
    try {
      const itemToDelete = cartItems[index];
      const updatedItems = cartItems.filter((_, i) => i !== index);
      setCartItems(updatedItems);
      if (itemToDelete.id) {
        await CartService.removeFromCart(itemToDelete.id);
      }
    } catch (error) {
      console.log('Error deleting item:', error);
      Alert.alert('Error', 'Failed to remove item from cart');
    }
  };

  const handleCartItemClick = (index: number) => {
    setSelectedItemIndex(index);
    setStep(2);
  };

  const handleSubmitRFQ = async () => {
    // Validation
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

    if (cartItems.length === 0) {
      Alert.alert('Error', 'No items in cart');
      return;
    }

    setLoading(true);

    try {
      const rfqPayload = {
        customerName,
        company: companyName,
        location: deliveryLocation,
        email,
        phone,
        items: cartItems,
        totalItems: cartItems.length,
        submittedAt: new Date().toISOString(),
      };

      // Try to submit to backend (optional - offline mode still works)
      let backendSubmitted = false;
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/rfqs`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(rfqPayload),
            timeout: 5000,
          }
        );

        if (response.ok) {
          backendSubmitted = true;
          console.log('RFQ submitted to backend successfully at:', process.env.EXPO_PUBLIC_API_URL);
        }
      } catch (backendError) {
        // Backend failed - continue with offline mode
        console.log('Backend unavailable - continuing with WhatsApp submission', backendError?.message);
      }

      // Build WhatsApp message with all details - Material Requirements FIRST
      let whatsappMessage = `*NEW RFQ SUBMISSION*\n\n`;
      
      whatsappMessage += `*MATERIAL REQUIREMENTS*\n`;
      whatsappMessage += `Total Items: ${cartItems.length}\n\n`;
      
      cartItems.forEach((item, index) => {
        whatsappMessage += `*Item ${index + 1}*\n`;
        whatsappMessage += `Product: ${item.productName}\n`;
        whatsappMessage += `Category: ${item.category}\n`;
        whatsappMessage += `Brand: ${item.brand}\n`;
        whatsappMessage += `Grade: ${item.grade}\n`;
        whatsappMessage += `Quantity: ${item.quantity} MT\n`;
        whatsappMessage += `\n`;
      });
      
      whatsappMessage += `*CUSTOMER DETAILS*\n`;
      whatsappMessage += `Name: ${customerName}\n`;
      whatsappMessage += `Email: ${email}\n`;
      whatsappMessage += `Phone: ${phone}\n`;
      whatsappMessage += `Company: ${companyName}\n`;
      whatsappMessage += `Delivery Location: ${deliveryLocation}\n\n`;

      whatsappMessage += `_${backendSubmitted ? 'Also saved in system' : 'Offline submission'}_`;

      const whatsappUrl = `https://wa.me/919136242706?text=${encodeURIComponent(whatsappMessage)}`;

      // Automatically open WhatsApp immediately
      Linking.openURL(whatsappUrl).catch(err => {
        console.log('WhatsApp not available:', err);
        Alert.alert('WhatsApp Error', 'Could not open WhatsApp. Please install WhatsApp or manually message +919136242706');
      });

      // Show success animation
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        
        Alert.alert(
          '✅ RFQ Submitted Successfully!',
          `Your quotation request has been submitted via WhatsApp to +919136242706.\n\nWe'll contact you soon at ${email} or ${phone}.`,
          [
            {
              text: 'OK',
              onPress: () => {
                // Reset form and clear cart
                resetForm();
                setTimeout(() => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'index' }],
                  });
                }, 500);
              },
            },
          ]
        );
      }, 2000);
    } catch (outerError) {
      console.log('Unexpected RFQ submission error:', outerError);
      Alert.alert(
        'Error',
        'Something went wrong. Please try again or contact support.'
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedItemIndex(null);
    setCustomerName('');
    setCompanyName('');
    setDeliveryLocation('');
    setEmail('');
    setPhone('');
    setCartItems([]);
    // Clear cart from storage
    CartService.clearCart();
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.secondary, COLORS.background]} style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={step === 2 ? () => setStep(1) : () => navigation.goBack()}>
            <MaterialCommunityIcons
              name={step === 2 ? 'arrow-left' : 'arrow-left'}
              size={28}
              color={COLORS.primary}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Request for Quote</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Success Animation Overlay */}
        {showSuccess && (
          <View style={styles.successOverlay}>
            <View style={styles.successCard}>
              <MaterialCommunityIcons name="check-circle" size={80} color={COLORS.success} />
              <Text style={styles.successText}>RFQ Submitted!</Text>
              <Text style={styles.successSubtext}>We'll contact you soon</Text>
            </View>
          </View>
        )}

        {/* Step Indicator */}
        <View style={styles.stepContainer}>
          <View style={styles.stepIndicator}>
            <View style={[styles.stepCircle, step >= 1 && styles.stepCircleActive]}>
              <Text style={[styles.stepText, step >= 1 && styles.stepTextActive]}>1</Text>
            </View>
            <View style={[styles.stepLine, step === 2 && styles.stepLineActive]} />
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
            <View style={styles.cartSection}>
              <Text style={styles.sectionTitle}>Your Cart ({cartItems.length} items)</Text>
              
              {cartItems.length === 0 ? (
                <View style={styles.emptyCart}>
                  <MaterialCommunityIcons name="cart-off" size={64} color={COLORS.border} />
                  <Text style={styles.emptyCartText}>No items in cart</Text>
                  <TouchableOpacity 
                    style={styles.browseButton}
                    onPress={() => navigation.navigate('products')}
                  >
                    <Text style={styles.browseButtonText}>Browse Products</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  {cartItems.map((item, index) => {
                    // Prepare image source
                    const imageSource = (typeof item.image === 'object' && item.image !== null)
                      ? item.image
                      : (typeof item.image === 'number')
                        ? item.image
                        : (item.image ? { uri: item.image } : null);

                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.cartItem}
                        onPress={() => handleCartItemClick(index)}
                        activeOpacity={0.7}
                      >
                        <View style={styles.cartItemContent}>
                          {/* Product Image */}
                          <View style={styles.cartItemImageContainer}>
                            {imageSource ? (
                              <Image source={imageSource} style={styles.cartItemImage} resizeMode="cover" />
                            ) : (
                              <View style={styles.cartItemImagePlaceholder}>
                                <MaterialCommunityIcons name="package-variant-closed" size={28} color={COLORS.border} />
                              </View>
                            )}
                          </View>
                          <View style={styles.cartItemDetails}>
                            <Text style={styles.cartItemName}>{item.productName}</Text>
                            <Text style={styles.cartItemSpec}>Brand: {item.brand}</Text>
                            <Text style={styles.cartItemSpec}>Grade: {item.grade}</Text>
                            <Text style={styles.cartItemQuantity}>Qty: {item.quantity} MT</Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() => handleDeleteItem(index)}
                          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                          <MaterialCommunityIcons name="trash-can-outline" size={20} color={COLORS.primary} />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    );
                  })}
                  
                  <View style={styles.addMoreSection}>
                    <TouchableOpacity
                      style={styles.addMoreButton}
                      onPress={() => navigation.navigate('products')}
                    >
                      <MaterialCommunityIcons name="plus-circle" size={20} color={COLORS.primary} />
                      <Text style={styles.addMoreButtonText}>Add More Products</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <TouchableOpacity style={styles.nextButton} onPress={() => setStep(2)}>
                    <Text style={styles.nextButtonText}>Review All & Continue</Text>
                    <MaterialCommunityIcons name="arrow-right" size={20} color={COLORS.white} />
                  </TouchableOpacity>
                </>
              )}
            </View>
          ) : (
            // STEP 2 - Customer Information & All Cart Items Summary
            <View style={styles.formSection}>
              {/* Show All Cart Items Summary */}
              <View style={styles.cartSummaryCard}>
                <Text style={styles.cartSummaryTitle}>Cart Summary ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</Text>
                {cartItems.map((item, index) => {
                  const imageSource = (typeof item.image === 'object' && item.image !== null)
                    ? item.image
                    : (typeof item.image === 'number')
                      ? item.image
                      : (item.image ? { uri: item.image } : null);

                  return (
                    <View key={index} style={styles.summaryItem}>
                      <View style={styles.summaryItemImageBox}>
                        {imageSource ? (
                          <Image source={imageSource} style={styles.summaryItemImage} resizeMode="cover" />
                        ) : (
                          <View style={styles.summaryItemImagePlaceholder}>
                            <MaterialCommunityIcons name="package-variant-closed" size={20} color={COLORS.border} />
                          </View>
                        )}
                      </View>
                      <View style={styles.summaryItemInfo}>
                        <Text style={styles.summaryItemName}>{item.productName}</Text>
                        <Text style={styles.summaryItemSpec}>{item.brand} • {item.grade} • {item.quantity} MT</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
              
              <Text style={styles.sectionTitle}>Your Details</Text>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your name"
                  placeholderTextColor={COLORS.textLight}
                  value={customerName}
                  onChangeText={setCustomerName}
                />
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Company *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your company name"
                  placeholderTextColor={COLORS.textLight}
                  value={companyName}
                  onChangeText={setCompanyName}
                />
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Delivery Location *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Delivery location"
                  placeholderTextColor={COLORS.textLight}
                  value={deliveryLocation}
                  onChangeText={setDeliveryLocation}
                />
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Email *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your email"
                  placeholderTextColor={COLORS.textLight}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Phone *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your phone number"
                  placeholderTextColor={COLORS.textLight}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>

              <TouchableOpacity style={styles.backToCartButton} onPress={() => { setStep(1); setSelectedItemIndex(null); }}>
                <MaterialCommunityIcons name="arrow-left" size={20} color={COLORS.primary} />
                <Text style={styles.backToCartText}>Back to Cart</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.submitButton} 
                onPress={handleSubmitRFQ}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color={COLORS.white} />
                ) : (
                  <>
                    <MaterialCommunityIcons name="whatsapp" size={20} color={COLORS.white} />
                    <Text style={styles.submitButtonText}>Send via WhatsApp</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  successOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  successCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  successText: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 20,
  },
  successSubtext: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 8,
  },
  stepContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: COLORS.primary,
  },
  stepText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  stepTextActive: {
    color: COLORS.white,
  },
  stepLine: {
    width: 60,
    height: 2,
    backgroundColor: COLORS.border,
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: COLORS.primary,
  },
  stepDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  cartSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 16,
  },
  emptyCart: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyCartText: {
    fontSize: 16,
    color: COLORS.textLight,
    marginTop: 16,
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  browseButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  cartItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItemContent: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  cartItemIconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: 'rgba(193, 87, 56, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cartItemImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(193, 87, 56, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(193, 87, 56, 0.15)',
  },
  cartItemImage: {
    width: '100%',
    height: '100%',
  },
  cartItemImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(193, 87, 56, 0.05)',
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
  },
  cartItemSpec: {
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 3,
  },
  cartItemQuantity: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 4,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  formSection: {
    marginBottom: 20,
  },
  cartSummaryCard: {
    backgroundColor: 'rgba(193, 87, 56, 0.08)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(193, 87, 56, 0.25)',
  },
  cartSummaryTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  summaryItemImageBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(193, 87, 56, 0.15)',
  },
  summaryItemImage: {
    width: '100%',
    height: '100%',
  },
  summaryItemImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(193, 87, 56, 0.05)',
  },
  summaryItemInfo: {
    flex: 1,
  },
  summaryItemName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  summaryItemSpec: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  selectedItemCard: {
    backgroundColor: 'rgba(193, 87, 56, 0.08)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(193, 87, 56, 0.3)',
  },
  selectedItemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  selectedItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedItemIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedItemImageBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(193, 87, 56, 0.2)',
  },
  selectedItemImage: {
    width: '100%',
    height: '100%',
  },
  selectedItemImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  selectedItemInfo: {
    flex: 1,
  },
  selectedItemName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  selectedItemSpec: {
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  selectedItemQuantity: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 4,
  },
  formField: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: 'rgba(193, 87, 56, 0.2)',
  },
  backToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginBottom: 12,
  },
  backToCartText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addMoreSection: {
    marginVertical: 16,
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(193, 87, 56, 0.08)',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    marginBottom: 12,
  },
  addMoreButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '700',
  },
});
