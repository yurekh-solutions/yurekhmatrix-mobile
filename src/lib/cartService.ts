// Cart Service for managing RFQ/Cart items
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  category: string;
  brand: string;
  grade: string;
  quantity: number;
  image?: string | number | { uri: string } | any;  // Added product image
  customerName?: string;
  companyName?: string;
  deliveryLocation?: string;
  email?: string;
  phone?: string;
  createdAt?: Date;
}

const CART_STORAGE_KEY = '@rfq_cart';
const CART_API_URL = 'https://suppliermatrix-backend.onrender.com/api/rfq';

class CartService {
  // Get all cart items from local storage
  static async getCartItems(): Promise<CartItem[]> {
    try {
      const data = await AsyncStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.log('Error getting cart items:', error);
      return [];
    }
  }

  // Get cart count
  static async getCartCount(): Promise<number> {
    const items = await this.getCartItems();
    return items.length;
  }

  // Add item to cart
  static async addToCart(item: CartItem): Promise<CartItem[]> {
    try {
      const items = await this.getCartItems();
      const newItem = {
        ...item,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      items.push(newItem);
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      
      // Sync with backend (fire and forget - don't await)
      this.syncCartToBackend(items).catch(() => {
        // Silently fail if sync fails - user can still add to cart offline
      });
      
      return items;
    } catch (error) {
      console.log('Error adding to cart:', error);
      throw error;
    }
  }

  // Remove item from cart
  static async removeFromCart(itemId: string): Promise<CartItem[]> {
    try {
      const items = await this.getCartItems();
      const filtered = items.filter(item => item.id !== itemId);
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(filtered));
      
      // Sync with backend (fire and forget - don't await)
      this.syncCartToBackend(filtered).catch(() => {
        // Silently fail if sync fails
      });
      
      return filtered;
    } catch (error) {
      console.log('Error removing from cart:', error);
      throw error;
    }
  }

  // Clear cart
  static async clearCart(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.log('Error clearing cart:', error);
      throw error;
    }
  }

  // Sync cart to backend (disabled - causes CORS issues)
  // Cart works offline and syncs when RFQ is submitted
  static async syncCartToBackend(items: CartItem[]): Promise<void> {
    try {
      // Don't sync cart - it will be submitted as RFQ instead
      // This avoids CORS and endpoint issues
      return;
    } catch (error) {
      // Silently ignore
    }
  }

  // Submit RFQ (send to backend)
  static async submitRFQ(item: CartItem): Promise<any> {
    try {
      const response = await fetch(`${CART_API_URL}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error('Failed to submit RFQ');
      }

      return await response.json();
    } catch (error) {
      console.log('Error submitting RFQ:', error);
      throw error;
    }
  }
}

export default CartService;
