import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { API_BASE_URL } from '../lib/api';

const { width } = Dimensions.get('window');

export default function ProductsListScreen({ navigation, route }: any) {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categoryFromRoute = route?.params?.category;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (categoryFromRoute) {
      setSelectedCategory(categoryFromRoute);
    }
  }, [categoryFromRoute]);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, products]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/products`),
        fetch(`${API_BASE_URL}/categories`),
      ]);

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();

      if (productsData.success) {
        setProducts(productsData.products || []);
      }

      if (categoriesData.success) {
        setCategories(['All', ...(categoriesData.categories || []).map((c: any) => c.name)]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const filterProducts = () => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const renderProductCard = (product: any) => (
    <TouchableOpacity
      key={product._id}
      style={styles.productCard}
      onPress={() => navigation?.navigate?.('ProductDetail', { productId: product._id })}
    >
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.98)', 'rgba(255, 255, 255, 0.95)']}
        style={styles.cardGradient}
      >
        {product.image ? (
          <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="cover" />
        ) : (
          <View style={styles.placeholderImage}>
            <MaterialCommunityIcons name="package-variant" size={48} color={colors.primary} />
          </View>
        )}

        <View style={styles.productInfo}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name}
          </Text>
          <Text style={styles.productDesc} numberOfLines={2}>
            {product.description}
          </Text>

          {product.price && product.price.amount > 0 ? (
            <Text style={styles.productPrice}>
              ₹{product.price.amount}/{product.price.unit}
            </Text>
          ) : (
            <View style={styles.rfqBadge}>
              <MaterialCommunityIcons name="file-document-outline" size={14} color={colors.primary} />
              <Text style={styles.rfqText}>Request Quote</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[colors.gradient1, colors.gradient2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation?.goBack?.()} style={styles.backBtn}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Browse Products</Text>
          <TouchableOpacity onPress={() => navigation?.navigate?.('Cart')} style={styles.cartBtn}>
            <MaterialCommunityIcons name="cart-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={20} color={colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialCommunityIcons name="close-circle" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>
      </LinearGradient>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryChip, selectedCategory === cat && styles.categoryChipActive]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.categoryChipText, selectedCategory === cat && styles.categoryChipTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products Grid or Empty State */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredProducts.length > 0 ? (
          <View style={styles.productsGrid}>
            {filteredProducts.map((prod) => renderProductCard(prod))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="package-variant-closed" size={80} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No Products Found</Text>
            <Text style={styles.emptyDesc}>Try adjusting your search or filters</Text>
            <TouchableOpacity
              style={styles.rfqButton}
              onPress={() => navigation?.navigate?.('MaterialInquiry')}
            >
              <LinearGradient
                colors={[colors.gradient1, colors.gradient2]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.rfqButtonGradient}
              >
                <MaterialCommunityIcons name="file-document-edit-outline" size={20} color="#fff" />
                <Text style={styles.rfqButtonText}>Submit Material Inquiry</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backBtn: {
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  cartBtn: {
    width: 40,
    alignItems: 'flex-end',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  categoriesContainer: {
    marginVertical: 16,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  productCard: {
    width: (width - 52) / 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardGradient: {
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: 140,
    backgroundColor: colors.background,
  },
  placeholderImage: {
    width: '100%',
    height: 140,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accentLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '600',
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  productDesc: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  rfqBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rfqText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 20,
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 24,
  },
  rfqButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  rfqButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    gap: 8,
  },
  rfqButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
