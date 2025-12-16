import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';

const { width } = Dimensions.get('window');

interface ProductDetail {
  _id: string;
  name: string;
  category: string;
  description: string;
  image?: string;
  price?: {
    amount: number;
    currency: string;
    unit: string;
  };
  stock?: {
    available: boolean;
    quantity?: number;
    minimumOrder?: number;
  };
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
  applications?: string[];
  features?: string[];
  supplierId?: {
    _id: string;
    companyName: string;
    email: string;
  };
}

// Mock product data
const mockProduct: ProductDetail = {
  _id: 'prod-001',
  name: 'TMT Bars Fe 500D',
  category: 'mild-steel',
  description: 'High-strength Thermo-Mechanically Treated reinforcement bars conforming to IS 1786 Fe 500D grade. Superior ductility, weldability, and earthquake resistance for modern construction projects.',
  image: 'https://via.placeholder.com/400x300/c15738/ffffff?text=TMT+Bars',
  price: {
    amount: 52000,
    currency: 'INR',
    unit: 'MT',
  },
  stock: {
    available: true,
    quantity: 250,
    minimumOrder: 5,
  },
  specifications: {
    materialStandard: 'IS 1786 Fe 500D',
    packaging: 'Bundle / Loose',
    testingCertificate: 'Mill Test Certificate Available',
    brand: ['JSW Steel', 'Tata Steel', 'SAIL', 'Jindal Steel'],
    grades: ['Fe 500D', 'Fe 550D', 'Fe 600'],
    delivery: 'Pan India',
    quality: 'ISI Certified',
    availability: 'In Stock',
  },
  applications: [
    'High-Rise Buildings',
    'Bridge Construction',
    'Industrial Structures',
    'Seismic Zone Projects',
  ],
  features: [
    'Fe 500D Grade',
    'Earthquake Resistant',
    'Superior Ductility',
    'Corrosion Resistant',
  ],
  supplierId: {
    _id: 'supplier-001',
    companyName: 'Premium Steel Supplies',
    email: 'contact@premiumsteel.com',
  },
};

export default function ProductDetailScreen() {
  const [quantity, setQuantity] = useState('5');
  const [selectedGrade, setSelectedGrade] = useState(mockProduct.specifications?.grades?.[0] || '');
  const [selectedBrand, setSelectedBrand] = useState(mockProduct.specifications?.brand?.[0] || '');

  const handleAddToRFQ = () => {
    if (!quantity || parseInt(quantity) < (mockProduct.stock?.minimumOrder || 1)) {
      Alert.alert(
        'Minimum Order',
        `Minimum order quantity is ${mockProduct.stock?.minimumOrder || 1} MT`
      );
      return;
    }
    Alert.alert('Success', `${quantity} MT added to RFQ`);
  };

  const SpecificationRow = ({ label, value }: { label: string; value: string | string[] | undefined }) => {
    const displayValue = Array.isArray(value) ? value.join(', ') : value || 'N/A';
    return (
      <View style={styles.specRow}>
        <Text style={styles.specLabel}>{label}</Text>
        <Text style={styles.specValue}>{displayValue}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: mockProduct.image }}
            style={styles.productImage}
          />
          <TouchableOpacity style={styles.favoriteButton}>
            <MaterialCommunityIcons name="heart-outline" size={24} color={colors.error} />
          </TouchableOpacity>
        </View>

        {/* Product Header */}
        <View style={styles.headerSection}>
          <View style={styles.titleRow}>
            <View style={styles.titleCol}>
              <Text style={styles.productName}>{mockProduct.name}</Text>
              <View style={styles.categoryTag}>
                <Text style={styles.categoryTagText}>{mockProduct.category}</Text>
              </View>
            </View>
            <View style={styles.ratingBox}>
              <MaterialCommunityIcons name="star" size={16} color="#FFB800" />
              <Text style={styles.ratingText}>4.8</Text>
            </View>
          </View>

          <Text style={styles.description}>{mockProduct.description}</Text>

          {/* Price & Stock */}
          <View style={styles.priceStockRow}>
            <View style={styles.priceBox}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.price}>
                ₹{mockProduct.price?.amount?.toLocaleString() || '0'} {mockProduct.price?.unit}
              </Text>
            </View>
            <View style={[styles.stockBox, mockProduct.stock?.available ? styles.stockAvailable : styles.stockUnavailable]}>
              <MaterialCommunityIcons
                name={mockProduct.stock?.available ? 'check-circle' : 'close-circle'}
                size={20}
                color={mockProduct.stock?.available ? colors.success : colors.error}
              />
              <Text style={[styles.stockText, { color: mockProduct.stock?.available ? colors.success : colors.error }]}>
                {mockProduct.stock?.available ? 'In Stock' : 'Out of Stock'}
              </Text>
              {mockProduct.stock?.quantity && (
                <Text style={styles.quantityText}>({mockProduct.stock.quantity} MT available)</Text>
              )}
            </View>
          </View>
        </View>

        {/* Supplier Info */}
        <View style={styles.supplierSection}>
          <View style={styles.supplierCard}>
            <View style={styles.supplierIcon}>
              <MaterialCommunityIcons name="warehouse" size={24} color={colors.primary} />
            </View>
            <View style={styles.supplierInfo}>
              <Text style={styles.supplierLabel}>Supplier</Text>
              <Text style={styles.supplierName}>{mockProduct.supplierId?.companyName}</Text>
              <Text style={styles.supplierEmail}>{mockProduct.supplierId?.email}</Text>
            </View>
            <TouchableOpacity style={styles.contactButton}>
              <MaterialCommunityIcons name="message-reply-outline" size={18} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Features */}
        {mockProduct.features && mockProduct.features.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            <View style={styles.featuresList}>
              {mockProduct.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <MaterialCommunityIcons name="check-circle" size={16} color={colors.success} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Applications */}
        {mockProduct.applications && mockProduct.applications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Applications</Text>
            <View style={styles.applicationsList}>
              {mockProduct.applications.map((app, index) => (
                <View key={index} style={styles.applicationBadge}>
                  <MaterialCommunityIcons name="check" size={12} color="#fff" />
                  <Text style={styles.applicationText}>{app}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Specifications */}
        {mockProduct.specifications && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            <View style={styles.specificationsBox}>
              <SpecificationRow label="Material Standard" value={mockProduct.specifications.materialStandard} />
              <View style={styles.divider} />
              <SpecificationRow label="Packaging" value={mockProduct.specifications.packaging} />
              <View style={styles.divider} />
              <SpecificationRow label="Grades Available" value={mockProduct.specifications.grades} />
              <View style={styles.divider} />
              <SpecificationRow label="Brands" value={mockProduct.specifications.brand} />
              <View style={styles.divider} />
              <SpecificationRow label="Quality Certification" value={mockProduct.specifications.quality} />
              <View style={styles.divider} />
              <SpecificationRow label="Delivery" value={mockProduct.specifications.delivery} />
              <View style={styles.divider} />
              <SpecificationRow label="Testing Certificate" value={mockProduct.specifications.testingCertificate} />
            </View>
          </View>
        )}

        {/* Order Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Place Order</Text>

          {/* Grade Selection */}
          {mockProduct.specifications?.grades && (
            <View style={styles.selectionBox}>
              <Text style={styles.selectionLabel}>Select Grade</Text>
              <View style={styles.optionsList}>
                {mockProduct.specifications.grades.map((grade) => (
                  <TouchableOpacity
                    key={grade}
                    style={[
                      styles.optionButton,
                      selectedGrade === grade && styles.optionButtonActive,
                    ]}
                    onPress={() => setSelectedGrade(grade)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedGrade === grade && styles.optionTextActive,
                      ]}
                    >
                      {grade}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Brand Selection */}
          {mockProduct.specifications?.brand && (
            <View style={styles.selectionBox}>
              <Text style={styles.selectionLabel}>Select Brand</Text>
              <View style={styles.optionsList}>
                {mockProduct.specifications.brand.slice(0, 3).map((brand) => (
                  <TouchableOpacity
                    key={brand}
                    style={[
                      styles.optionButton,
                      selectedBrand === brand && styles.optionButtonActive,
                    ]}
                    onPress={() => setSelectedBrand(brand)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedBrand === brand && styles.optionTextActive,
                      ]}
                    >
                      {brand}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Quantity Input */}
          <View style={styles.quantitySection}>
            <Text style={styles.selectionLabel}>
              Quantity (Minimum: {mockProduct.stock?.minimumOrder} MT)
            </Text>
            <View style={styles.quantityInput}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => {
                  const curr = parseInt(quantity) || 0;
                  if (curr > 1) setQuantity((curr - 1).toString());
                }}
              >
                <MaterialCommunityIcons name="minus" size={18} color={colors.primary} />
              </TouchableOpacity>

              <Text style={styles.quantityValue}>{quantity} MT</Text>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => {
                  const curr = parseInt(quantity) || 0;
                  setQuantity((curr + 1).toString());
                }}
              >
                <MaterialCommunityIcons name="plus" size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.totalPrice}>
              Total: ₹{((mockProduct.price?.amount || 0) * (parseInt(quantity) || 0)).toLocaleString()}
            </Text>
          </View>

          {/* Add to RFQ Button */}
          <TouchableOpacity style={styles.addToRFQButton} onPress={handleAddToRFQ}>
            <MaterialCommunityIcons name="file-document-outline" size={18} color="#fff" />
            <Text style={styles.addToRFQText}>Add to RFQ</Text>
          </TouchableOpacity>

          {/* Contact Supplier Button */}
          <TouchableOpacity style={styles.contactSupplierButton}>
            <MaterialCommunityIcons name="phone" size={18} color={colors.primary} />
            <Text style={styles.contactSupplierText}>Contact Supplier</Text>
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
  },
  imageContainer: {
    width: '100%',
    height: 280,
    backgroundColor: colors.card,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    backgroundColor: colors.background,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  titleCol: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  categoryTag: {
    backgroundColor: colors.accent,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  categoryTagText: {
    fontSize: 10,
    color: colors.text,
    fontWeight: '600',
  },
  ratingBox: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  description: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 18,
    marginBottom: 12,
  },
  priceStockRow: {
    flexDirection: 'row',
    gap: 10,
  },
  priceBox: {
    flex: 1,
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  priceLabel: {
    fontSize: 11,
    color: colors.textLight,
    marginBottom: 4,
    fontWeight: '500',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  stockBox: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    alignItems: 'center',
    gap: 4,
  },
  stockAvailable: {
    backgroundColor: colors.success + '15',
    borderColor: colors.success + '30',
  },
  stockUnavailable: {
    backgroundColor: colors.error + '15',
    borderColor: colors.error + '30',
  },
  stockText: {
    fontSize: 12,
    fontWeight: '600',
  },
  quantityText: {
    fontSize: 10,
    color: colors.textLight,
  },
  supplierSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  supplierCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
  },
  supplierIcon: {
    width: 44,
    height: 44,
    backgroundColor: colors.accent,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  supplierInfo: {
    flex: 1,
  },
  supplierLabel: {
    fontSize: 10,
    color: colors.textLight,
    marginBottom: 2,
    fontWeight: '500',
  },
  supplierName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  supplierEmail: {
    fontSize: 10,
    color: colors.textLight,
    marginTop: 2,
  },
  contactButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
    flex: 1,
  },
  applicationsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  applicationBadge: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  applicationText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '500',
  },
  specificationsBox: {
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  specLabel: {
    fontSize: 11,
    color: colors.textLight,
    fontWeight: '500',
    flex: 1,
  },
  specValue: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  selectionBox: {
    marginBottom: 14,
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  optionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    backgroundColor: colors.accent,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: 11,
    color: colors.text,
    fontWeight: '500',
  },
  optionTextActive: {
    color: '#fff',
  },
  quantitySection: {
    marginBottom: 14,
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quantityInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 6,
    marginVertical: 10,
  },
  quantityButton: {
    flex: 0.2,
    paddingVertical: 10,
    alignItems: 'center',
  },
  quantityValue: {
    flex: 0.6,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  totalPrice: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 8,
  },
  addToRFQButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 10,
  },
  addToRFQText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  contactSupplierButton: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  contactSupplierText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});
