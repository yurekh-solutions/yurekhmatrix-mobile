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

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 52) / 2;

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
    { id: '1', name: 'Mild Steel', icon: 'hammer', color: '#c15738', value: 'mild-steel' },
    { id: '2', name: 'Stainless', icon: 'water-check', color: '#4ECDC4', value: 'stainless-steel' },
    { id: '3', name: 'Construction', icon: 'home-city', color: '#FFB84D', value: 'construction' },
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

  const trimText = (text: string, wordLimit: number): string => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
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
          <View>
            <Text style={styles.greeting}>Products</Text>
            <Text style={styles.location}>Browse All Materials</Text>
          </View>
          <TouchableOpacity 
            style={styles.cartButton}
            onPress={() => {
              // Navigate to cart view - for now show cart count
              console.log('Cart items:', cartCount);
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
            <Text style={styles.productCount}>{filteredProducts.length} items</Text>
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
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },

  greeting: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
  },

  location: {
    fontSize: 22,
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
    gap: 10,
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

  // Sections
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

  productCount: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textLight,
  },

  // Categories
  categoriesScroll: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 12,
  },

  categoryButton: {
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
  },

  categoryButtonActive: {},

  categoryIconBox: {
    width: 64,
    height: 64,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(193, 87, 56, 0.2)',
  },

  categoryButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textLight,
    textAlign: 'center',
    maxWidth: 70,
  },

  categoryButtonTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },

  // Scroll Content
  scrollContent: {
    paddingBottom: 20,
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
    paddingBottom: 20,
  },

  productCard: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  productImageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: COLORS.secondary,
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
