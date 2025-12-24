import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Share,
  Alert,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CartService from '../lib/cartService';
import { useAuth } from '../contexts/AuthContext';

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

interface ProductDetailsScreenProps {
  product: Product;
  onBack: () => void;
  navigation?: any;
}

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({ product, onBack, navigation }) => {
  const { isAuthenticated } = useAuth();
  const [selectedBrand, setSelectedBrand] = React.useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = React.useState<string | null>(null);
  const [quantity, setQuantity] = React.useState('1');
  const [brandDropdownVisible, setBrandDropdownVisible] = React.useState(false);
  const [gradeDropdownVisible, setGradeDropdownVisible] = React.useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = React.useState(false);

  const imageSource = (typeof product.image === 'object' && product.image !== null)
    ? product.image
    : (typeof product.image === 'number')
      ? product.image
      : (product.image ? { uri: product.image } : null);

  const brands = product.specifications?.brand || [];
  const grades = product.specifications?.grades || [];

  const handleShare = async () => {
    try {
      const shareMessage = `Check out this product: ${product.name}

Category: ${product.category}
${product.description}

ID: ${product.id}

Available on RitzYard - Smart Material Procurement Platform`;
      
      await Share.share({
        message: shareMessage,
        title: `Share ${product.name}`,
      });
    } catch (error) {
      Alert.alert('Share Error', 'Could not share product. Please try again.');
    }
  };

  const handleAddToCart = async () => {
    // Check authentication first
    if (!isAuthenticated) {
      Alert.alert(
        'Login Required',
        'Please log in to add items to your cart.',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Go to Login',
            onPress: () => {
              if (navigation && navigation.navigate) {
                navigation.navigate('auth');
              }
            },
          },
        ]
      );
      return;
    }

    if (!selectedBrand) {
      Alert.alert('Required', 'Please select a brand');
      return;
    }
    if (!selectedGrade) {
      Alert.alert('Required', 'Please select a material grade');
      return;
    }
    if (!quantity || quantity === '0') {
      Alert.alert('Required', 'Please enter a valid quantity');
      return;
    }

    try {
      // Create cart item
      const cartItem = {
        productId: product.id,
        productName: product.name,
        category: product.category,
        brand: selectedBrand,
        grade: selectedGrade,
        quantity: parseInt(quantity),
        image: product.image,  // Include product image
      };

      // Add to cart storage
      await CartService.addToCart(cartItem);

      // Show success popup (glass morphism)
      setShowSuccessPopup(true);
      
      // Auto hide after 3 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
        // Reset form after popup closes
        setSelectedBrand(null);
        setSelectedGrade(null);
        setQuantity('1');
      }, 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Error', 'Failed to add item to cart. Please try again.');
    }
  };

  // Check if add to cart button should be enabled
  const isAddToCartEnabled = !!selectedBrand && !!selectedGrade && quantity && quantity !== '0';

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.secondary, COLORS.background]} style={styles.gradient}>
        {/* Success Popup - Glass Morphism */}
        {showSuccessPopup && (
          <View style={styles.successPopupOverlay}>
            <View style={styles.successPopupCard}>
              {/* Success Icon */}
              <View style={styles.successIconContainer}>
                <MaterialCommunityIcons name="check-circle" size={64} color={COLORS.primary} />
              </View>
              
              {/* Success Message */}
              <Text style={styles.successPopupTitle}>✅ Added to Cart!</Text>
              <Text style={styles.successPopupSubtitle}>{product.name}</Text>
              
              {/* Product Details */}
              <View style={styles.successPopupDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Brand:</Text>
                  <Text style={styles.detailValue}>{selectedBrand}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Grade:</Text>
                  <Text style={styles.detailValue}>{selectedGrade}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Qty:</Text>
                  <Text style={styles.detailValue}>{quantity} MT</Text>
                </View>
              </View>
              
              {/* Action Buttons */}
              <View style={styles.successPopupButtons}>
                <TouchableOpacity 
                  style={styles.popupButtonSecondary}
                  onPress={() => {
                    setShowSuccessPopup(false);
                  }}
                >
                  <Text style={styles.popupButtonSecondaryText}>Continue Shopping</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.popupButtonPrimary}
                  onPress={() => {
                    setShowSuccessPopup(false);
                    if (navigation && navigation.navigate) {
                      navigation.navigate('rfq', {
                        product: {
                          ...product,
                          selectedBrand,
                          selectedGrade,
                          quantity: parseInt(quantity),
                        },
                      });
                    }
                  }}
                >
                  <MaterialCommunityIcons name="arrow-right" size={18} color={COLORS.white} />
                  <Text style={styles.popupButtonPrimaryText}>Go to RFQ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.primary} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Details</Text>
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="share-variant" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Product Image */}
          <View style={styles.imageContainer}>
            {imageSource ? (
              <Image source={imageSource} style={styles.productImage} resizeMode="cover" />
            ) : (
              <View style={styles.placeholderImage}>
                <MaterialCommunityIcons name="package-variant" size={80} color={COLORS.border} />
              </View>
            )}
            
            {/* Category Badge */}
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>
                {product.category?.replace('-', ' ').toUpperCase()}
              </Text>
            </View>
          </View>

          {/* Product Info */}
          <View style={styles.infoSection}>
            {/* Product ID */}
            {product.id && (
              <View style={styles.productIdContainer}>
                <Text style={styles.productIdLabel}>Product ID</Text>
                <Text style={styles.productIdValue}>{product.id}</Text>
              </View>
            )}

            {/* Name */}
            <Text style={styles.productName}>{product.name}</Text>

            {/* Stock Status */}
            {product.stock && (
              <View style={[styles.stockStatus, { backgroundColor: product.stock.available ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)' }]}>
                <MaterialCommunityIcons 
                  name={product.stock.available ? 'check-circle' : 'alert-circle'} 
                  size={16} 
                  color={product.stock.available ? '#22c55e' : '#ef4444'} 
                />
                <Text style={[styles.stockText, { color: product.stock.available ? '#22c55e' : '#ef4444' }]}>
                  {product.stock.available ? 'In Stock' : 'Out of Stock'}
                </Text>
              </View>
            )}

            {/* Description */}
            <Text style={styles.description}>{product.description}</Text>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>✨ Key Features</Text>
                {product.features.map((feature, idx) => (
                  <View key={idx} style={styles.featureItem}>
                    <MaterialCommunityIcons name="check-circle" size={18} color={COLORS.primary} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Applications */}
            {product.applications && product.applications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🏗️ Applications</Text>
                {product.applications.map((app, idx) => (
                  <View key={idx} style={styles.appItem}>
                    <MaterialCommunityIcons name="arrow-right" size={16} color={COLORS.primary} />
                    <Text style={styles.appText}>{app}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Specifications */}
            {product.specifications && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>📋 Specifications</Text>
                
                {product.specifications.materialStandard && (
                  <View style={styles.specRow}>
                    <Text style={styles.specLabel}>Material Standard</Text>
                    <Text style={styles.specValue}>{product.specifications.materialStandard}</Text>
                  </View>
                )}
                
                {product.specifications.quality && (
                  <View style={styles.specRow}>
                    <Text style={styles.specLabel}>Quality</Text>
                    <Text style={styles.specValue}>{product.specifications.quality}</Text>
                  </View>
                )}
                
                {product.specifications.delivery && (
                  <View style={styles.specRow}>
                    <Text style={styles.specLabel}>Delivery</Text>
                    <Text style={styles.specValue}>{product.specifications.delivery}</Text>
                  </View>
                )}
                
                {product.specifications.packaging && (
                  <View style={styles.specRow}>
                    <Text style={styles.specLabel}>Packaging</Text>
                    <Text style={styles.specValue}>{product.specifications.packaging}</Text>
                  </View>
                )}

                {product.specifications.testingCertificate && (
                  <View style={styles.specRow}>
                    <Text style={styles.specLabel}>Testing Certificate</Text>
                    <Text style={styles.specValue}>{product.specifications.testingCertificate}</Text>
                  </View>
                )}

                {product.specifications.availability && (
                  <View style={styles.specRow}>
                    <Text style={styles.specLabel}>Availability</Text>
                    <Text style={styles.specValue}>{product.specifications.availability}</Text>
                  </View>
                )}
              </View>
            )}

            {/* Brands - Hidden (shown in dropdown) */}
            {false && product.specifications?.brand && product.specifications.brand.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🏭 Available Brands</Text>
                {product.specifications.brand.map((brand, idx) => (
                  <View key={idx} style={styles.brandItem}>
                    <MaterialCommunityIcons name="check-circle" size={16} color={COLORS.primary} />
                    <Text style={styles.brandText}>{brand}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Grades - Hidden (shown in dropdown) */}
            {false && product.specifications?.grades && product.specifications.grades.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>⭐ Available Grades</Text>
                {product.specifications.grades.map((grade, idx) => (
                  <View key={idx} style={styles.gradeItem}>
                    <MaterialCommunityIcons name="badge-check" size={16} color={COLORS.primary} />
                    <Text style={styles.gradeText}>{grade}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Request Quote Section */}
            <View style={styles.requestQuoteSection}>
              <View style={styles.quoteSectionHeader}>
                <MaterialCommunityIcons name="cart" size={24} color={COLORS.primary} />
                <Text style={styles.quoteSectionTitle}>Request Quote</Text>
              </View>

              {/* Brand Selection */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Select Brand *</Text>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => setBrandDropdownVisible(true)}
                  activeOpacity={0.7}
                >
                  <Text style={selectedBrand ? styles.dropdownButtonText : styles.dropdownButtonPlaceholder}>
                    {selectedBrand || 'Choose a preferred brand'}
                  </Text>
                  <MaterialCommunityIcons name="chevron-down" size={20} color={COLORS.textLight} />
                </TouchableOpacity>
              </View>

              {/* Brand Dropdown Modal - MINIMAL BLUR */}
              <Modal visible={brandDropdownVisible} transparent animationType="fade" onRequestClose={() => setBrandDropdownVisible(false)}>
                <TouchableOpacity 
                  style={styles.dropdownOverlay} 
                  activeOpacity={1}
                  onPress={() => setBrandDropdownVisible(false)}
                >
                  <View style={styles.dropdownList}>
                    <FlatList
                      data={brands.length > 0 ? brands : ['Standard Brand']}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={[
                            styles.dropdownItem,
                            selectedBrand === item && styles.dropdownItemSelected,
                          ]}
                          onPress={() => {
                            setSelectedBrand(item);
                            setBrandDropdownVisible(false);
                          }}
                        >
                          <Text style={[
                            styles.dropdownItemText,
                            selectedBrand === item && styles.dropdownItemSelectedText,
                          ]}>{item}</Text>
                          {selectedBrand === item && (
                            <MaterialCommunityIcons name="cart" size={18} color={COLORS.white} />
                          )}
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item, idx) => idx.toString()}
                      scrollEnabled={true}
                    />
                  </View>
                </TouchableOpacity>
              </Modal>

              {/* Grade Selection */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Select Material Grade *</Text>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => setGradeDropdownVisible(true)}
                  activeOpacity={0.7}
                >
                  <Text style={selectedGrade ? styles.dropdownButtonText : styles.dropdownButtonPlaceholder}>
                    {selectedGrade || 'Choose a material specification'}
                  </Text>
                  <MaterialCommunityIcons name="chevron-down" size={20} color={COLORS.textLight} />
                </TouchableOpacity>
              </View>

              {/* Grade Dropdown Modal - MINIMAL BLUR */}
              <Modal visible={gradeDropdownVisible} transparent animationType="fade" onRequestClose={() => setGradeDropdownVisible(false)}>
                <TouchableOpacity 
                  style={styles.dropdownOverlay} 
                  activeOpacity={1}
                  onPress={() => setGradeDropdownVisible(false)}
                >
                  <View style={styles.dropdownList}>
                    <FlatList
                      data={grades.length > 0 ? grades : ['Standard Grade']}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={[
                            styles.dropdownItem,
                            selectedGrade === item && styles.dropdownItemSelected,
                          ]}
                          onPress={() => {
                            setSelectedGrade(item);
                            setGradeDropdownVisible(false);
                          }}
                        >
                          <Text style={[
                            styles.dropdownItemText,
                            selectedGrade === item && styles.dropdownItemSelectedText,
                          ]}>{item}</Text>
                          {selectedGrade === item && (
                            <MaterialCommunityIcons name="cart" size={18} color={COLORS.white} />
                          )}
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item, idx) => idx.toString()}
                      scrollEnabled={true}
                    />
                  </View>
                </TouchableOpacity>
              </Modal>

              {/* Quantity Input */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Quantity (Metric Tons) *</Text>
                <TextInput
                  style={styles.quantityInput}
                  placeholder="1"
                  value={quantity}
                  onChangeText={setQuantity}
                  keyboardType="decimal-pad"
                  placeholderTextColor={COLORS.textLight}
                />
                <Text style={styles.minimumOrderText}>Minimum order quantity: 1 MT</Text>
              </View>

              {/* Add to Cart Button - Disabled until all fields filled */}
              <TouchableOpacity
                style={[
                  styles.addToCartButton,
                  !isAddToCartEnabled && styles.addToCartButtonDisabled
                ]}
                onPress={handleAddToCart}
                activeOpacity={isAddToCartEnabled ? 0.8 : 0.6}
                disabled={!isAddToCartEnabled}
              >
                <MaterialCommunityIcons name="cart" size={20} color={COLORS.white} />
                <Text style={styles.addToCartText}>
                  {isAddToCartEnabled ? 'Add to Cart' : 'Fill All Fields'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  backText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'sans-serif',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },

  shareButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  imageContainer: {
    width: width,
    height: 300,
    backgroundColor: COLORS.secondary,
    position: 'relative',
    marginBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },

  productImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
  },

  categoryBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: 'rgba(193, 87, 56, 0.9)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 0.5,
  },

  infoSection: {
    paddingHorizontal: 20,
  },

  productIdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'rgba(193, 87, 56, 0.08)',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
    marginBottom: 16,
  },

  productIdLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  productIdValue: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'monospace',
  },

  productName: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 12,
    fontFamily: 'sans-serif',
  },

  stockStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
  },

  stockText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'sans-serif',
  },

  description: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textLight,
    lineHeight: 20,
    marginBottom: 20,
    fontFamily: 'sans-serif',
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 12,
    fontFamily: 'sans-serif',
  },

  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },

  featureText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
    fontFamily: 'sans-serif',
  },

  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },

  appText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
    fontFamily: 'sans-serif',
  },

  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(193, 87, 56, 0.05)',
    borderRadius: 8,
    marginBottom: 8,
  },

  specLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
    fontFamily: 'sans-serif',
  },

  specValue: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: 'sans-serif',
  },

  addToRfqButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: 'rgba(193, 87, 56, 0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(193, 87, 56, 0.3)',
    marginTop: 24,
    justifyContent: 'center',
  },

  addToRfqText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: 'sans-serif',
  },

  brandItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },

  brandText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
    fontFamily: 'sans-serif',
  },

  gradeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },

  gradeText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
    fontFamily: 'sans-serif',
  },

  productIdContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'rgba(193, 87, 56, 0.08)',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(193, 87, 56, 0.2)',
  },

  productIdLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
    letterSpacing: 0.5,
    fontFamily: 'sans-serif',
  },

  productIdValue: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    fontFamily: 'sans-serif',
  },

  requestQuoteSection: {
    marginTop: 32,
    paddingHorizontal: 0,
    paddingVertical: 24,
    backgroundColor: 'rgba(245, 237, 227, 0.5)',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(193, 87, 56, 0.15)',
  },

  quoteSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(193, 87, 56, 0.15)',
  },

  quoteSectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    fontFamily: 'sans-serif',
    letterSpacing: 0.3,
  },

  fieldContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  fieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
    fontFamily: 'sans-serif',
  },

  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },

  dropdownButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
    fontFamily: 'sans-serif',
  },

  dropdownButtonPlaceholder: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textLight,
    flex: 1,
    fontFamily: 'sans-serif',
  },

  dropdownOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 20,
  },

  dropdownList: {
    width: '100%',
    maxHeight: 300,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(193, 87, 56, 0.1)',
  },

  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(193, 87, 56, 0.08)',
  },

  dropdownItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
    fontFamily: 'sans-serif',
  },

  dropdownItemSelected: {
    backgroundColor: COLORS.primary,
    borderBottomColor: COLORS.primary,
  },

  dropdownItemSelectedText: {
    color: COLORS.white,
    fontWeight: '700',
  },

  quantityInput: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    fontFamily: 'sans-serif',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  minimumOrderText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textLight,
    marginTop: 8,
    fontFamily: 'sans-serif',
  },

  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 20,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  addToCartButtonDisabled: {
    opacity: 0.5,
    backgroundColor: '#d4a574',
    shadowOpacity: 0.15,
  },

  successPopupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  },

  successPopupCard: {
    width: '85%',
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 20,
    alignItems: 'center',
  },

  successIconContainer: {
    marginBottom: 20,
  },

  successPopupTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.primary,
    marginBottom: 8,
    fontFamily: 'sans-serif',
  },

  successPopupSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },

  successPopupDetails: {
    width: '100%',
    backgroundColor: 'rgba(193, 87, 56, 0.08)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(193, 87, 56, 0.1)',
  },

  detailLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textLight,
    fontFamily: 'sans-serif',
  },

  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'sans-serif',
  },

  successPopupButtons: {
    width: '100%',
    gap: 12,
  },

  popupButtonSecondary: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: 'rgba(193, 87, 56, 0.1)',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    alignItems: 'center',
  },

  popupButtonSecondaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'sans-serif',
  },

  popupButtonPrimary: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  popupButtonPrimaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
    fontFamily: 'sans-serif',
  },

  addToCartText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
    fontFamily: 'sans-serif',
  },

  successPopupOverlay: {
    position: 'absolute' as any,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1000,
  },

  successPopupCard: {
    width: '82%',
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 25,
    alignItems: 'center',
  },

  successIconContainer: {
    marginBottom: 20,
  },

  successPopupTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.primary,
    marginBottom: 8,
    fontFamily: 'sans-serif',
  },

  successPopupSubtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },

  successPopupDetails: {
    width: '100%',
    backgroundColor: 'rgba(193, 87, 56, 0.08)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(193, 87, 56, 0.1)',
  },

  detailLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textLight,
    fontFamily: 'sans-serif',
  },

  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'sans-serif',
  },

  successPopupButtons: {
    width: '100%',
    gap: 12,
  },

  popupButtonSecondary: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: 'rgba(193, 87, 56, 0.08)',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    alignItems: 'center',
  },

  popupButtonSecondaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'sans-serif',
  },

  popupButtonPrimary: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  popupButtonPrimaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
    fontFamily: 'sans-serif',
  },
});

export default ProductDetailsScreen;
