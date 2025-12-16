import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from 'react-native';
import { getProducts } from '@/src/lib/api';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeQuotes: 108,
    processing: 52,
    completedToday: 137,
    avgResponse: 20,
    totalOrders: 1163,
    pendingApprovals: 29,
    suppliers: 96,
    avgDelivery: 4.4,
  });

  const suppliers = [
    'Ceigall India',
    'VRC Constructions',
    'RCC Developers',
    'HMM Infra',
    'Kaluwala',
    'Himalayan Infra',
    'Rashmi Metals',
    'JSW Steel',
    'Tata Steel',
    'Ultratech Cement',
    'ACC Limited',
  ];

  useEffect(() => {
    fetchProducts();
    
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        activeQuotes: prev.activeQuotes + Math.floor(Math.random() * 3) - 1,
        processing: prev.processing + Math.floor(Math.random() * 3) - 1,
        completedToday: prev.completedToday + Math.floor(Math.random() * 2),
        suppliers: Math.max(prev.suppliers + Math.floor(Math.random() * 2) - 1, 90),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  const StatCard = ({ icon, value, label }: any) => (
    <View style={styles.statCard}>
      <MaterialCommunityIcons name={icon} size={24} color={colors.primary} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const SupplierPill = ({ name }: { name: string }) => (
    <View style={styles.supplierPill}>
      <Text style={styles.supplierText}>{name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome to RitzYard</Text>
          <Text style={styles.subtitle}>AI-Powered Procurement</Text>
        </View>

        {/* Hero CTA Section */}
        <View style={styles.heroSection}>
          <View style={styles.gradientBox}>
            <MaterialCommunityIcons name="lightning-bolt" size={32} color="#fff" />
            <Text style={styles.heroTitle}>Smart Material Procurement</Text>
            <Text style={styles.heroDesc}>
              Get instant quotes from 500+ verified suppliers
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Live Statistics</Text>
          <View style={styles.statsGrid}>
            <StatCard icon="file-document" value={stats.activeQuotes} label="Active Quotes" />
            <StatCard icon="clock-outline" value={stats.avgResponse} label="Avg Response" />
            <StatCard icon="package-multiple" value={stats.completedToday} label="Completed" />
            <StatCard icon="check-circle" value={stats.suppliers} label="Suppliers" />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="file-plus" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Create RFQ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="magnify" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Search Products</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="comment-multiple" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Material Inquiry</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="robot" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Chat with Milo AI</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Suppliers */}
        <View style={styles.suppliersContainer}>
          <Text style={styles.sectionTitle}>Featured Suppliers</Text>
          <View style={styles.suppliersGrid}>
            {suppliers.map((supplier, index) => (
              <SupplierPill key={index} name={supplier} />
            ))}
          </View>
        </View>

        {/* Featured Products */}
        <View style={styles.productsContainer}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 20 }} />
          ) : products.length > 0 ? (
            <View style={styles.productsList}>
              {products.map((product: any) => (
                <View key={product._id} style={styles.productCard}>
                  <View style={styles.productHeader}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryBadgeText}>{product.category}</Text>
                    </View>
                  </View>
                  {product.price && (
                    <Text style={styles.productPrice}>₹{product.price}</Text>
                  )}
                  {product.supplier && (
                    <Text style={styles.productSupplier}>{product.supplier}</Text>
                  )}
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noDataText}>No products available</Text>
          )}
        </View>

        {/* Info Cards */}
        <View style={styles.infoCardsContainer}>
          <View style={styles.infoCard}>
            <MaterialCommunityIcons name="check-circle" size={32} color={colors.primary} />
            <Text style={styles.infoCardTitle}>500+ Verified</Text>
            <Text style={styles.infoCardDesc}>Trusted suppliers across India</Text>
          </View>

          <View style={styles.infoCard}>
            <MaterialCommunityIcons name="lightning-bolt" size={32} color={colors.primary} />
            <Text style={styles.infoCardTitle}>Instant Quotes</Text>
            <Text style={styles.infoCardDesc}>20 minute responses</Text>
          </View>

          <View style={styles.infoCard}>
            <MaterialCommunityIcons name="robot" size={32} color={colors.primary} />
            <Text style={styles.infoCardTitle}>AI-Powered</Text>
            <Text style={styles.infoCardDesc}>Smart sourcing with Milo</Text>
          </View>

          <View style={styles.infoCard}>
            <MaterialCommunityIcons name="truck-delivery" size={32} color={colors.primary} />
            <Text style={styles.infoCardTitle}>98% On-Time</Text>
            <Text style={styles.infoCardDesc}>Reliable delivery</Text>
          </View>
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
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: colors.background,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  heroSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  gradientBox: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
  heroDesc: {
    fontSize: 13,
    color: '#fff',
    marginTop: 6,
    textAlign: 'center',
    opacity: 0.9,
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 12,
    width: (width - 48) / 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 6,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textLight,
    marginTop: 4,
    textAlign: 'center',
  },
  actionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
    flex: 1,
  },
  suppliersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  suppliersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  supplierPill: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  supplierText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  productsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  productsList: {
    gap: 8,
  },
  productCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: colors.accent,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  categoryBadgeText: {
    fontSize: 10,
    color: colors.text,
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  productSupplier: {
    fontSize: 11,
    color: colors.textLight,
  },
  noDataText: {
    color: colors.textLight,
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 20,
  },
  infoCardsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
  },
  infoCardDesc: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
    textAlign: 'center',
  },
});
