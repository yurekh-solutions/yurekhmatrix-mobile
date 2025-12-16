import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { submitRFQ } from '@/src/lib/api';
import { colors } from '@/src/styles/colors';

const { width } = Dimensions.get('window');

interface RFQItem {
  id: string;
  productName: string;
  category: string;
  quantity: string;
  brand?: string;
  grade?: string;
}

export default function RFQScreen() {
  const [items, setItems] = useState<RFQItem[]>([
    { id: '1', productName: '', category: '', quantity: '', brand: '', grade: '' },
  ]);
  const [formData, setFormData] = useState({
    customerName: '',
    company: '',
    location: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'items' | 'details'>('items');

  const addItem = () => {
    const newItem: RFQItem = {
      id: Date.now().toString(),
      productName: '',
      category: '',
      quantity: '',
      brand: '',
      grade: '',
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length === 1) {
      Alert.alert('Error', 'You must have at least one item in your RFQ');
      return;
    }
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof RFQItem, value: string) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const validateForm = () => {
    if (!formData.customerName.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    if (!formData.company.trim()) {
      Alert.alert('Error', 'Please enter your company name');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return false;
    }
    if (items.some((item) => !item.productName.trim() || !item.quantity.trim())) {
      Alert.alert('Error', 'Please fill in all item details');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const rfqData = {
        ...formData,
        items: items.map((item) => ({
          productId: item.id,
          productName: item.productName,
          category: item.category,
          brand: item.brand,
          grade: item.grade,
          quantity: parseInt(item.quantity) || 0,
        })),
        totalItems: items.length,
      };

      const result = await submitRFQ(rfqData);

      if (result.success) {
        Alert.alert('Success', 'Your RFQ has been submitted successfully!');
        // Reset form
        setItems([
          { id: '1', productName: '', category: '', quantity: '', brand: '', grade: '' },
        ]);
        setFormData({
          customerName: '',
          company: '',
          location: '',
          email: '',
          phone: '',
        });
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to submit RFQ. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const ItemCard = ({ item }: { item: RFQItem }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemNumber}>Item #{items.indexOf(item) + 1}</Text>
        <TouchableOpacity onPress={() => removeItem(item.id)}>
          <MaterialCommunityIcons name="delete" size={18} color={colors.error} />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Product Name *"
        placeholderTextColor={colors.textLight}
        value={item.productName}
        onChangeText={(value) => updateItem(item.id, 'productName', value)}
      />

      <View style={styles.rowInputs}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Category"
          placeholderTextColor={colors.textLight}
          value={item.category}
          onChangeText={(value) => updateItem(item.id, 'category', value)}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Quantity *"
          placeholderTextColor={colors.textLight}
          value={item.quantity}
          onChangeText={(value) => updateItem(item.id, 'quantity', value)}
          keyboardType="number-pad"
        />
      </View>

      <View style={styles.rowInputs}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Brand"
          placeholderTextColor={colors.textLight}
          value={item.brand}
          onChangeText={(value) => updateItem(item.id, 'brand', value)}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Grade"
          placeholderTextColor={colors.textLight}
          value={item.grade}
          onChangeText={(value) => updateItem(item.id, 'grade', value)}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Request for Quote</Text>
          <Text style={styles.subtitle}>Get quotes from multiple suppliers</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'items' && styles.tabActive]}
            onPress={() => setActiveTab('items')}
          >
            <MaterialCommunityIcons name="package-multiple" size={18} color={activeTab === 'items' ? colors.primary : colors.textLight} />
            <Text style={[styles.tabText, activeTab === 'items' && styles.tabTextActive]}>
              Items ({items.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'details' && styles.tabActive]}
            onPress={() => setActiveTab('details')}
          >
            <MaterialCommunityIcons name="information" size={18} color={activeTab === 'details' ? colors.primary : colors.textLight} />
            <Text style={[styles.tabText, activeTab === 'details' && styles.tabTextActive]}>
              Details
            </Text>
          </TouchableOpacity>
        </View>

        {/* Items Tab */}
        {activeTab === 'items' && (
          <View style={styles.tabContent}>
            <View style={styles.itemsList}>
              {items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </View>

            <TouchableOpacity style={styles.addItemButton} onPress={addItem}>
              <MaterialCommunityIcons name="plus" size={20} color={colors.primary} />
              <Text style={styles.addItemButtonText}>Add Another Item</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Details Tab */}
        {activeTab === 'details' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionLabel}>Your Details</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name *"
              placeholderTextColor={colors.textLight}
              value={formData.customerName}
              onChangeText={(value) => setFormData({ ...formData, customerName: value })}
            />

            <TextInput
              style={styles.input}
              placeholder="Company Name *"
              placeholderTextColor={colors.textLight}
              value={formData.company}
              onChangeText={(value) => setFormData({ ...formData, company: value })}
            />

            <TextInput
              style={styles.input}
              placeholder="Location / City"
              placeholderTextColor={colors.textLight}
              value={formData.location}
              onChangeText={(value) => setFormData({ ...formData, location: value })}
            />

            <TextInput
              style={styles.input}
              placeholder="Email Address *"
              placeholderTextColor={colors.textLight}
              value={formData.email}
              onChangeText={(value) => setFormData({ ...formData, email: value })}
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="Phone Number *"
              placeholderTextColor={colors.textLight}
              value={formData.phone}
              onChangeText={(value) => setFormData({ ...formData, phone: value })}
              keyboardType="phone-pad"
            />

            <TouchableOpacity
              style={[styles.submitButton, loading && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <MaterialCommunityIcons name="send" size={18} color="#fff" />
                  <Text style={styles.submitButtonText}>Submit RFQ</Text>
                </>
              )}
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
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textLight,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    gap: 6,
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 13,
    color: colors.textLight,
    fontWeight: '500',
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  tabContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  itemsList: {
    gap: 12,
    marginBottom: 16,
  },
  itemCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  input: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 10,
  },
  halfInput: {
    flex: 1,
    marginBottom: 0,
  },
  addItemButton: {
    flexDirection: 'row',
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  addItemButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
