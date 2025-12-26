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
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
// import MaskedView from "@react-native-masked-view/masked-view";
// import LinearGradient from "react-native-linear-gradient";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getProducts } from '../lib/api';
import CartService from '../lib/cartService';
import ProductDetailsScreen from './ProductDetailsScreen';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

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

interface HomeScreenProps {
  navigation?: any;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  value: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const categories: Category[] = [
    { id: '1', name: 'Mild Steel', icon: 'hammer', color: '#c15738', value: 'mild-steel' },
    { id: '2', name: 'Stainless', icon: 'water-check', color: '#4ECDC4', value: 'stainless-steel' },
    { id: '3', name: 'Constructio', icon: 'home-city', color: '#FFB84D', value: 'construction' },
    { id: '4', name: 'Electrical', icon: 'lightning-bolt', color: '#9B59B6', value: 'electrical' },
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

  const loadCartCount = async () => {
    try {
      const count = await CartService.getCartCount();
      setCartCount(count);
    } catch (error) {
      console.log('Error loading cart count:', error);
    }
  };

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, products]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data && data.length > 0 ? data : []);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
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
  };

  const renderCategoryButton = (category: Category) => (
    <TouchableOpacity
      key={category.id}
      onPress={() => setSelectedCategory(category.value)}
      style={[
        styles.categoryButton,
        selectedCategory === category.value && styles.categoryButtonActive,
      ]}
    >
      <View
        style={[
          styles.categoryIconBox,
          { backgroundColor: category.color + '20' },
          selectedCategory === category.value && {
            backgroundColor: category.color + '40',
          },
        ]}
      >
        <MaterialCommunityIcons
          name={category.icon as any}
          size={24}
          color={category.color}
        />
      </View>
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === category.value && styles.categoryButtonTextActive,
        ]}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
  
  const trimText = (text: string, wordLimit: number): string => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };
  
  const renderFeaturedCard = (item: Product, idx: number) => {
    const imageSource = (typeof item.image === 'object' && item.image !== null)
      ? item.image
      : (typeof item.image === 'number')
        ? item.image
        : (item.image ? { uri: item.image } : null);

    return (
      <View key={idx} style={styles.featuredCard}>
        {/* Product Image - FIRST */}
        <View style={styles.featuredImageContainer}>
          {imageSource ? (
            <Image source={imageSource} style={styles.featuredImage} resizeMode="cover" />
          ) : (
            <View style={styles.featuredPlaceholder}>
              <MaterialCommunityIcons name="package-variant" size={48} color={COLORS.border} />
            </View>
          )}
        </View>

        {/* Category Badge - BELOW IMAGE */}
        <View style={styles.categoryBadgeContainer}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{item.category?.replace('-', ' ').toUpperCase()}</Text>
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.featuredInfo}>
          <Text style={styles.featuredName} numberOfLines={1}>{trimText(item.name, 10)}</Text>
          {item.description && (
            <Text style={styles.featuredDescription} numberOfLines={2}>{trimText(item.description, 15)}</Text>
          )}
          
          {/* Add to RFQ Button */}
          <TouchableOpacity
            style={styles.addToRfqButton}
            onPress={() => {
              // Navigate to product details screen to view full product info
              setSelectedProduct(item);
            }}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="cart-plus" size={18} color={COLORS.white} />
            <Text style={styles.addToRfqText}>Request Quote</Text>
          </TouchableOpacity>
        </View>
      </View>
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
          <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.productCategory}>{item.category?.replace('-', ' ')}</Text>
          <View style={styles.productFooter}>
            <Text style={styles.productPrice}>View Details</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {selectedProduct ? (
        <ProductDetailsScreen 
          product={selectedProduct} 
          onBack={() => setSelectedProduct(null)}
          navigation={navigation}
        />
      ) : (
        <View style={styles.container}>
          <LinearGradient colors={[COLORS.secondary, COLORS.background]} style={styles.gradient}>
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.greeting}>Welcome Back!</Text>
                <Text style={styles.location}>RitzYard</Text>
              </View>
              
              <TouchableOpacity
                style={styles.cartButton}
                onPress={() => {
                  // Navigate to RFQ (cart) with empty state ready
                  if (navigation && navigation.navigate) {
                    navigation.navigate('rfq');
                  }
                }}
              >
                <MaterialCommunityIcons name="cart" size={24} color={COLORS.primary} />
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
  
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
              scrollEventThrottle={16}
            >
              {/* Hero Banner Section */}
              <View style={styles.bannerSection}>
                <LinearGradient
                  colors={['rgba(193, 87, 56, 0.92)', 'rgba(139, 58, 37, 0.88)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.bannerContainer}
                >
                  {/* Glass Overlay Effect */}
                  <View style={styles.bannerGlassOverlay} />
                    
                  {/* Decorative Gradient Circles */}
                  <View style={styles.decorativeCircle1} />
                  <View style={styles.decorativeCircle2} />
  
                  {/* Banner Content */}
                  <View style={styles.bannerContent}>
                    <View style={styles.bannerText}>
                      {/* Badge */}
                      <View style={styles.badgeContainer}>
                        <MaterialCommunityIcons name="star-circle" size={18} color={COLORS.white} />
                        <Text style={styles.badgeText}>Next-Gen Procurement Platform</Text>
                      </View>
  
                      {/* Title */}
                      <Text style={styles.bannerTitle}>
                        Smart Material{'\n'}Procurement
                      </Text>
  
                      {/* Description */}
                      <Text style={styles.bannerDescription}>
                        AI-powered procurement platform revolutionizing how businesses source construction materials
                      </Text>
  
                      {/* Call to Action Button */}
                      <TouchableOpacity 
                        style={styles.ctalButton}
                        onPress={() => {
                          // Navigate to Products tab
                          if (navigation && navigation.navigate) {
                            navigation.navigate('products');
                          }
                        }}
                        activeOpacity={0.85}
                      >
                        <LinearGradient
                          colors={['#ffffff', '#f5f5f5']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.ctaGradient}
                        >
                          <MaterialCommunityIcons name="arrow-right-circle" size={20} color={COLORS.primary} />
                          <Text style={styles.ctaButtonText}>Explore Now</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                </LinearGradient>
              </View>
  
              {/* Featured Products Section */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Featured Products</Text>
                <TouchableOpacity
                  onPress={() => {
                    // Navigate to Products tab
                    if (navigation && navigation.navigate) {
                      navigation.navigate('products');
                    }
                  }}
                >
                  <Text style={styles.seeAll}>See All →</Text>
                </TouchableOpacity>
              </View>
  
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.featuredScroll}
                scrollEventThrottle={16}
              >
                {products.slice(0, 6).map((item, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setSelectedProduct(item)}
                  >
                    {renderFeaturedCard(item, idx)}
                  </TouchableOpacity>
                ))}
              </ScrollView>
  
              {/* Categories */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Categories</Text>
              </View>
  
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesScroll}
                scrollEventThrottle={16}
              >
                <TouchableOpacity
                  onPress={() => setSelectedCategory('all')}
                  style={[
                    styles.categoryButton,
                    selectedCategory === 'all' && styles.categoryButtonActive,
                  ]}
                >
                  <View
                    style={[
                      styles.categoryIconBox,
                      { backgroundColor: COLORS.primary + '20' },
                      selectedCategory === 'all' && {
                        backgroundColor: COLORS.primary + '40',
                      },
                    ]}
                  >
                    <MaterialCommunityIcons name="grid" size={24} color={COLORS.primary} />
                  </View>
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === 'all' && styles.categoryButtonTextActive,
                    ]}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                {categories.map(renderCategoryButton)}
              </ScrollView>
  
              {/* Products List */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  {selectedCategory === 'all' ? 'All Products' : 'Available Products'}
                </Text>
              </View>
  
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={COLORS.primary} />
                  <Text style={styles.loadingText}>Loading products...</Text>
                </View>
              ) : filteredProducts.length > 0 ? (
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
          </LinearGradient>
        </View>
      )}
    </>
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

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },

  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(193, 87, 56, 0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(193, 87, 56, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  greeting: {
    fontSize: 16,
    color: COLORS.textLight,
    fontWeight: '500',
  },

  location: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 2,
  },

  cartButton: {
    position: 'relative',
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

  notificationIcon: {
    position: 'relative',
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
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
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 0,
  },

  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.primary,
    gap: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
    borderWidth: 0,
    borderColor: 'transparent',
  },

  // Scroll Content
  scrollContent: {
    paddingBottom: 40,
  },

  // Banner Section
  bannerSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 8,
  },

  bannerContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    minHeight: 280,
    padding: 28,
    backgroundColor: 'rgba(193, 87, 56, 0.92)',
  },

  bannerGlassOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },

  decorativeCircle1: {
    position: 'absolute',
    top: -40,
    left: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },

  decorativeCircle2: {
    position: 'absolute',
    bottom: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },

  bannerContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 10,
  },

  bannerText: {
    flex: 1,
    gap: 14,
  },

  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },

  bannerSubtitle: {
    display: 'none',
  },

  bannerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.white,
    lineHeight: 32,
    marginTop: 8,
  },

  bannerDescription: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 16,
  },

  trustBadge: {
    display: 'none',
  },

  trustText: {
    display: 'none',
  },

  ctalButton: {
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    marginTop: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  ctaGradient: {
    paddingHorizontal: 22,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  ctaButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
  },

  // Banner Image Section
  bannerImageSection: {
    display: 'none',
  },

  bannerImageContainer: {
    display: 'none',
  },

  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 237, 227, 0.95)',
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },

  seeAll: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '700',
  },

  // Featured
  featuredScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },

  featuredCard: {
    width: 180,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(193, 87, 56, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    minHeight: 320,
  },

  categoryBadgeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  categoryBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: 'rgb(234, 206, 195)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },

  featuredImageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: COLORS.secondary,
    borderBottomWidth: 0,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    overflow: 'hidden',
  },

  featuredImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },

  featuredPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },

  featuredInfo: {
    padding: 12,
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    flex: 1,
    justifyContent: 'flex-start',
  },

  featuredName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 16,
    fontFamily: 'sans-serif',
  },

  featuredDescription: {
    fontSize: 11,
    fontWeight: '400',
    color: COLORS.textLight,
    lineHeight: 14,
    fontFamily: 'sans-serif',
  },

  addToRfqButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    borderWidth: 0,
    marginTop: 6,
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  addToRfqText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.white,
    fontFamily: 'sans-serif',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  ratingText: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '600',
  },

  // Categories
  categoriesScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },

  categoryButton: {
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 4,
  },

  categoryButtonActive: {
    opacity: 1,
  },

  categoryIconBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryButtonText: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '600',
    width: 64,
    textAlign: 'center',
  },

  categoryButtonTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },

  // Products Grid
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 12,
  },

  gridContent: {
    paddingHorizontal: 0,
  },

  productCard: {
    width: CARD_WIDTH,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: 'rgba(193, 87, 56, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  productImageContainer: {
    width: '100%',
    height: CARD_WIDTH,
    backgroundColor: COLORS.secondary,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(193, 87, 56, 0.12)',
  },

  productImage: {
    width: '100%',
    height: '100%',
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
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
  },

  productName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
  },

  productCategory: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '500',
    textTransform: 'capitalize',
  },

  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },

  productPrice: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '700',
  },

  // Loading & Empty
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginVertical: 60,
  },

  loadingText: {
    fontSize: 16,
    color: COLORS.textLight,
    fontWeight: '500',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginVertical: 60,
    paddingHorizontal: 20,
  },

  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },

  emptySubtext: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default HomeScreen;
