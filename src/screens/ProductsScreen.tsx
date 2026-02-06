import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getProducts } from '../lib/api';
import CartService from '../lib/cartService';
import ProductDetailsScreen from './ProductDetailsScreen';
import ProductNotFoundForm from '../components/ProductNotFoundForm';

// Import logo
const ritzyardLogo = require('../../assets/ritzyard3.svg');

const { width } = Dimensions.get('window');
const isSmallScreen = width < 360;
const CARD_WIDTH = width * 0.44; // 44% of screen width for perfect spacing
const CARD_HEIGHT = CARD_WIDTH * 1.15; // Maintain aspect ratio

// Design System Colors
const COLORS = {
  primary: '#c15738',
  primaryLight: '#d66f4f',
  primaryDark: '#8b3a25',
  secondary: '#f5ede3',
  background: '#faf8f6',
  white: '#ffffff',
  text: '#683627',
  textLight: '#8b7355',
  border: '#e8dfd5',
  glass: 'rgba(255, 255, 255, 0.8)',
  glassLight: 'rgba(255, 255, 255, 0.6)',
};

interface Product {
  _id?: string;
  id?: string;
  name: string;
  category: string;
  description: string;
  image?: string | number | { uri: string } | any;
  price?: any;
  rating?: number;
  reviews?: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  value: string;
}

export default function ProductsScreen({ navigation }: any) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const categories: Category[] = [
    { id: '1', name: 'Mild Steel', icon: 'iron', color: '#c15738', value: 'mild-steel' },
    { id: '2', name: 'Stainless', icon: 'shield-star', color: '#4ECDC4', value: 'stainless-steel' },
    { id: '3', name: 'Construction', icon: 'office-building-cog', color: '#FFB84D', value: 'construction' },
    { id: '4', name: 'Electrical', icon: 'flash-triangle', color: '#9B59B6', value: 'electrical' },
  ];

  useEffect(() => {
    loadProducts();
    loadCartCount();
  }, []);

  // Reload cart count whenever screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadCartCount();
    }, [])
  );

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data && data.length > 0 ? data : []);
    } catch (error) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCartCount = async () => {
    try {
      const count = await CartService.getCartCount();
      setCartCount(count);
    } catch (error) {
    }
  };

  const filterProducts = React.useCallback(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  const trimText = (text: string, wordLimit: number): string => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  const renderCategoryButton = (category: Category) => {
    const isActive = selectedCategory === category.value;
    return (
      <TouchableOpacity
        key={category.id}
        onPress={() => setSelectedCategory(category.value)}
        style={styles.categoryButton}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.categoryIconBox,
            { 
              backgroundColor: isActive ? category.color : COLORS.white,
              borderColor: isActive ? category.color : COLORS.border,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={category.icon as any}
            size={22}
            color={isActive ? '#FFFFFF' : category.color}
          />
        </View>
        <Text
          style={[
            styles.categoryButtonText,
            isActive && { color: category.color, fontWeight: '700' },
          ]}
          numberOfLines={1}
        >
          {category.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderProductCard = (item: Product) => {
    const imageSource = (typeof item.image === 'object' && item.image !== null)
      ? item.image
      : (typeof item.image === 'number')
        ? item.image
        : (item.image ? { uri: item.image } : null);

    return (
      <TouchableOpacity 
        style={styles.productCard} 
        activeOpacity={0.85}
        onPress={() => setSelectedProduct(item)}
      >
        <View style={styles.productImageContainer}>
          {imageSource ? (
            <Image source={imageSource} style={styles.productImage} resizeMode="cover" />
          ) : (
            <View style={styles.placeholderImage}>
              <MaterialCommunityIcons name="package-variant" size={48} color={COLORS.border} />
            </View>
          )}
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {trimText(item.name, 5)}
          </Text>
          <Text style={styles.productCategory}>
            {item.category?.replace('-', ' ')}
          </Text>
          <TouchableOpacity 
            style={styles.viewDetailsButton}
            onPress={() => setSelectedProduct(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.viewDetailsText}>View Details</Text>
            <MaterialCommunityIcons name="arrow-right" size={14} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  // If product is selected, show details screen
  if (selectedProduct) {
    return (
      <ProductDetailsScreen
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
        navigation={navigation}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={[COLORS.secondary, COLORS.background]} style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoBox}>
              <Image source={ritzyardLogo} style={styles.logoImage} resizeMode="cover" />
            </View>
            <View>
              <Text style={styles.brandName}>
                <Text style={styles.brandR}>r</Text>
                <Text style={styles.brandText}>itz</Text>
                <Text style={styles.brandText}> yard</Text>
              </Text>
              <Text style={styles.tagline}>Where Value Meets Velocity</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.cartButton}
            onPress={() => {}}
          >
            <MaterialCommunityIcons name="cart" size={22} color={COLORS.primary} />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={COLORS.textLight} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search materials..."
              placeholderTextColor={COLORS.textLight}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* Conditional Rendering: Form takes full screen when no results */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Loading products...</Text>
          </View>
        ) : searchQuery.trim() && filteredProducts.length === 0 ? (
          <View style={styles.formFullContainer}>
            <ProductNotFoundForm searchQuery={searchQuery} />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            scrollEventThrottle={16}
          >
            {/* Categories */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categories</Text>
            </View>

            <View style={styles.categoriesContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesScroll}
                scrollEventThrottle={16}
              >
                <TouchableOpacity
                  onPress={() => setSelectedCategory('all')}
                  style={styles.categoryButton}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.categoryIconBox,
                      { 
                        backgroundColor: selectedCategory === 'all' ? COLORS.primary : COLORS.white,
                        borderColor: selectedCategory === 'all' ? COLORS.primary : COLORS.border,
                      },
                    ]}
                  >
                    <MaterialCommunityIcons name="apps" size={22} color={selectedCategory === 'all' ? '#FFFFFF' : COLORS.primary} />
                  </View>
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === 'all' && { color: COLORS.primary, fontWeight: '700' },
                    ]}
                    numberOfLines={1}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                {categories.map(renderCategoryButton)}
              </ScrollView>
            </View>

            {/* Products List */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {selectedCategory === 'all' ? 'All Products' : 'Available Products'}
              </Text>
              <Text style={styles.productCount}>{filteredProducts.length} items</Text>
            </View>

            {filteredProducts.length > 0 ? (
              <FlatList
                data={filteredProducts}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                renderItem={({ item }) => renderProductCard(item)}
                keyExtractor={(item) => item._id || item.id || item.name}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                contentContainerStyle={styles.gridContent}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons name="inbox-multiple" size={64} color={COLORS.border} />
                <Text style={styles.emptyText}>No products found</Text>
                <Text style={styles.emptySubtext}>Try a different search or category</Text>
              </View>
            )}
          </ScrollView>
        )}
      </LinearGradient>
    </SafeAreaView>
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

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  logoBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  logoImage: {
    width: '100%',
    height: '100%',
  },

  brandName: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },

  brandR: {
    color: COLORS.primary,
    fontWeight: '800',
  },

  brandText: {
    color: '#452a21',
  },

  tagline: {
    fontSize: 10,
    color: '#452a21',
    fontWeight: '500',
    marginTop: 1,
  },

  cartButton: {
    position: 'relative',
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.white,
  },

  // Search
  searchSection: {
    paddingHorizontal: 0,
    paddingVertical: 15,
    gap: 10,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 0,
    height: 44,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    gap: 8,
    marginHorizontal: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 0.5,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '400',
    borderWidth: 0,
    borderColor: 'transparent',
    padding: 0,
    height: 44,
  },

  // Sections
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 28,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },

  productCount: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textLight,
  },

  // Categories
  categoriesContainer: {
    marginBottom: 8,
  },

  categoriesScroll: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 16,
  },

  categoryButton: {
    alignItems: 'center',
    gap: 6,
    marginRight: 16,
  },

  categoryIconBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },

  categoryButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textLight,
    marginTop: 2,
  },

  // Scroll Content
  scrollContent: {
    paddingBottom: 60,
  },

  // Products Grid
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 20,
  },

  gridContent: {
    paddingHorizontal: 0,
    paddingBottom: 20,
  },

  productCard: {
    width: CARD_WIDTH,
    minHeight: CARD_HEIGHT,
    backgroundColor: COLORS.white,
    borderRadius: isSmallScreen ? 12 : 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(193, 87, 56, 0.12)',
  },

  productImageContainer: {
    width: '100%',
    height: CARD_WIDTH * 0.85,
    backgroundColor: 'rgba(245, 237, 227, 0.4)',
    position: 'relative',
    overflow: 'hidden',
  },

  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
  },

  productInfo: {
    padding: 12,
    gap: 6,
  },

  productName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 18,
  },

  productCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primary,
    textTransform: 'capitalize',
  },

  viewDetailsButton: {
    marginTop: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },

  viewDetailsText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },

  // Loading & Empty States
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },

  formFullContainer: {
    flex: 1,
    paddingTop: 0,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
  },

  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    gap: 12,
  },

  emptyText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },

  emptySubtext: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: '500',
  },
});
