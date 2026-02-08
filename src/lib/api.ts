// API Integration Service for yurekhmatrix Mobile
// Connects to backendmatrix for RFQ submissions
// Uses local products as fallback when API is unavailable

import { Platform } from 'react-native';
import { allLocalProducts, LocalProduct } from '@/src/data/localProducts';

/**
 * Get the appropriate API URL based on environment
 * - Production: Uses https://backendmatrix.onrender.com/api
 * - Development: Uses http://localhost:5000/api (if ENV is set)
 * - Fallback: Uses environment variable or defaults to production
 */
const getApiUrl = (): string => {
  // For React Native Expo, we use environment variables from .env
  const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'https://backendmatrix.onrender.com/api';
  return apiUrl;
};

const API_BASE_URL = getApiUrl();

// Convert local product to backend-compatible format - PRESERVE IMAGES!
const convertLocalProductToBackend = (product: LocalProduct): any => {
  const imageType = typeof product.image;
  
  return {
    _id: product.id,
    id: product.id,
    name: product.name,
    category: product.category,
    subcategory: product.subcategory,
    description: product.description,
    // CRITICAL: Preserve require() image (object/number) completely unchanged
    image: product.image,  // Keep the exact require() result (object or number)
    images: product.image ? [product.image] : [],  // Array with same require() reference
    applications: product.applications || [],
    features: product.features || [],
    specifications: product.specifications,
    price: product.price,
    stock: product.stock,
    status: product.stock?.available ? 'active' : 'inactive'
  };
};

export interface RFQSubmission {
  customerName: string;
  company: string;
  location: string;
  email: string;
  phone: string;
  items: Array<{
    productId: string;
    productName: string;
    category: string;
    brand: string;
    grade: string;
    quantity: number;
  }>;
  totalItems: number;
}

// Submit Material Inquiry
export const submitMaterialInquiry = async (inquiryData: any, token?: string): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    const headers: any = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Create an AbortController for timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const bodyData = JSON.stringify(inquiryData);
    const response = await fetch(`${API_BASE_URL}/material-inquiries`, {
      method: 'POST',
      headers,
      body: bodyData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Failed to submit inquiry: ${response.status}`);
    }
    // Extract inquiry number from message if present
    const inquiryNumberMatch = data.message?.match(/Inquiry Number: (MI\d+)/);
    const inquiryNumber = inquiryNumberMatch ? inquiryNumberMatch[1] : null;

    return {
      success: data.success || true,
      message: data.message || 'Inquiry submitted successfully. We will get back to you soon.',
      data: {
        ...data.data,
        inquiryNumber: inquiryNumber || data.data?.inquiryNumber || 'N/A',
      },
    };
  } catch (error) {
    // Handle specific error types
    let errorMessage = 'Failed to submit inquiry. Please try again.';
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. The backend may be waking up. Please try again in a moment.';
      } else if (error.message.includes('Network request failed')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else {
        errorMessage = error.message;
      }
    }
    
    return {
      success: false,
      message: errorMessage,
    };
  }
};

// Get RFQ history for buyer
export const getRFQHistory = async (token: string): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/rfqs/my-rfqs`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RFQs: ${response.status}`);
    }
    
    const data = await response.json();
    return data || [];
  } catch (error) {
    return [];
  }
};

// Get buyer profile
export const getBuyerProfile = async (token: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status}`);
    }
    
    const data = await response.json();
    return data.user || data.data || data;
  } catch (error) {
    return null;
  }
};

// Upload files for material inquiry
export const uploadMaterialFiles = async (formData: FormData, token?: string): Promise<{ success: boolean; files?: string[]; message: string }> => {
  try {
    const headers: any = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/material-inquiries/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'File upload failed');
    }
    return {
      success: true,
      files: data.files,
      message: 'Files uploaded successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'File upload failed',
    };
  }
};

// Submit RFQ (Request for Quote)
export const submitRFQ = async (rfqData: RFQSubmission): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/rfqs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rfqData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Failed to submit RFQ: ${response.status}`);
    }
    return {
      success: data.success || true,
      message: data.message || 'RFQ submitted successfully. Admin will contact you soon.',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit RFQ. Please try again.',
    };
  }
};

// Get products from backend (public endpoint) with local fallback
export const getProducts = async (category?: string): Promise<any[]> => {
  try {
    const url = category 
      ? `${API_BASE_URL}/products/public?category=${category}`
      : `${API_BASE_URL}/products/public`;
    const response = await fetch(url, { 
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    const data = await response.json();
    const backendProducts = Array.isArray(data) ? data : (data.products || data.data || []);
    // Always merge backend products with local products for complete catalog
    let localProducts = allLocalProducts;
    if (category && category !== 'all') {
      localProducts = allLocalProducts.filter(p => p.category === category);
    }
    
    // Convert local products to backend format
    const convertedLocalProducts = localProducts.map(convertLocalProductToBackend);
    
    // Merge: Prefer local products with valid images, supplement with backend
    // Remove duplicates based on product name
    const productMap = new Map<string, any>();
    
    // Add local products FIRST (they have valid bundled images)
    convertedLocalProducts.forEach((p: any) => {
      productMap.set(p.name?.toLowerCase(), p);
    });
    
    // Add backend products that don't exist in local OR have better data
    backendProducts.forEach((p: any) => {
      const key = p.name?.toLowerCase();
      const existing = productMap.get(key);
      
      if (!existing) {
        // Product not in local, add from backend
        productMap.set(key, p);
      } else if (p.image && p.image.startsWith('http')) {
        // Backend has valid URL image, merge data but keep local image as fallback
        productMap.set(key, {
          ...existing,
          ...p,
          image: existing.image || p.image, // Prefer local image
          _id: p._id || existing._id,
          supplierId: p.supplierId || existing.supplierId
        });
      }
    });
    
    const mergedProducts = Array.from(productMap.values());
    return mergedProducts;
  } catch (error) {
    // Filter by category if specified
    let localProducts = allLocalProducts;
    if (category && category !== 'all') {
      localProducts = allLocalProducts.filter(p => p.category === category);
    }
    
    // Convert local products to backend format
    const convertedProducts = localProducts.map(convertLocalProductToBackend);
    return convertedProducts;
  }
};

// Get product details by ID (public endpoint) with local fallback
export const getProductById = async (productId: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/public/${productId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }
    
    const data = await response.json();
    const product = data.product || data;
    
    if (product && product._id) {
      return product;
    }
    
    throw new Error('Product not found in backend');
  } catch (error) {
    // Search in local products
    const localProduct = allLocalProducts.find(p => p.id === productId);
    
    if (localProduct) {
      const converted = convertLocalProductToBackend(localProduct);
      return converted;
    }
    return null;
  }
};

// Buyer login - for RitzYard mobile app
export const buyerLogin = async (email: string, password: string): Promise<{ success: boolean; token?: string; user?: any; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    return {
      success: true,
      token: data.token,
      user: data.user,
      message: 'Login successful',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Login failed',
    };
  }
};

// Buyer registration - for RitzYard mobile app
export const buyerRegister = async (userData: any): Promise<{ success: boolean; message: string; token?: string; user?: any }> => {
  try {
    // Check if userData contains images (profile or business)
    const hasImages = userData.profileImage || userData.businessImage;
    
    if (hasImages) {
      const formData = new FormData();
      
      // Add all basic fields to FormData - EXPLICITLY set as text
      const textFields = ['name', 'email', 'password', 'company', 'phone'];
      textFields.forEach(key => {
        if (userData[key]) {
          formData.append(key, String(userData[key]));
        }
      });

      // Add profile image to FormData
      if (userData.profileImage) {
        console.log('📸 Processing profile image for registration, type:', typeof userData.profileImage);
        
        // Handle different profileImage formats
        if (userData.profileImage instanceof Blob) {
          // Direct blob (from web)
          formData.append('profileImage', userData.profileImage, `profile-${Date.now()}.jpg`);
        } else if (typeof userData.profileImage === 'object' && userData.profileImage.uri) {
          // Object with uri (from AuthScreen)
          if (Platform.OS === 'web' && userData.profileImage.blob) {
            // Web: Use blob directly with proper filename
            formData.append('profileImage', userData.profileImage.blob, `profile-${Date.now()}.jpg`);
          } else {
            // Mobile: Create proper file object
            const uriParts = userData.profileImage.uri.split('.');
            const fileType = uriParts[uriParts.length - 1] || 'jpg';
            
            formData.append('profileImage', {
              uri: userData.profileImage.uri,
              type: `image/${fileType}`,
              name: `profile-${Date.now()}.${fileType}`,
            } as any);
          }
        } else if (typeof userData.profileImage === 'string') {
          // String URI (direct path from mobile)
          const uriParts = userData.profileImage.split('.');
          const fileType = uriParts[uriParts.length - 1] || 'jpg';
          
          formData.append('profileImage', {
            uri: userData.profileImage,
            type: `image/${fileType}`,
            name: `profile-${Date.now()}.${fileType}`,
          } as any);
        }
      }

      // Add business image to FormData
      if (userData.businessImage) {
        // Handle different businessImage formats
        if (userData.businessImage instanceof Blob) {
          formData.append('businessImage', userData.businessImage, 'business.jpg');
        } else if (typeof userData.businessImage === 'object' && userData.businessImage.uri) {
          if (Platform.OS === 'web' && userData.businessImage.blob) {
            formData.append('businessImage', userData.businessImage.blob, 'business.jpg');
          } else {
            formData.append('businessImage', {
              uri: userData.businessImage.uri,
              type: 'image/jpeg',
              name: 'business.jpg',
            } as any);
          }
        } else if (typeof userData.businessImage === 'string') {
          formData.append('businessImage', {
            uri: userData.businessImage,
            type: 'image/jpeg',
            name: 'business.jpg',
          } as any);
        }
      }
      
      console.log('🚀 Sending registration with image...');
      
      // Create an AbortController for timeout handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout for free-tier backend wake-up
      
      const response = await fetch(`${API_BASE_URL}/auth/user/signup`, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
        // DO NOT set Content-Type header - let browser set it automatically with boundary
      });
      
      clearTimeout(timeoutId);
      const data = await response.json();
      console.log('📥 Registration response:', data.success ? 'Success' : data.message);
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      return {
        success: true,
        message: 'Registration successful. Welcome aboard!',
        token: data.token,
        user: data.user,
      };
    } else {
      // Normal JSON registration if no image
      const response = await fetch(`${API_BASE_URL}/auth/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      return {
        success: true,
        message: 'Registration successful. Welcome aboard!',
        token: data.token,
        user: data.user,
      };
    }
  } catch (error) {
    console.error('❌ Registration error:', error);
    
    // Handle specific error types
    let errorMessage = 'Registration failed';
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = 'Backend is waking up. Free-tier servers take 1-2 minutes to start. Please try again.';
      } else if (error.message.includes('Network request failed')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else {
        errorMessage = error.message;
      }
    }
    
    return {
      success: false,
      message: errorMessage,
    };
  }
};

// User login (legacy)
export const loginUser = async (email: string, password: string): Promise<{ success: boolean; token?: string; message: string }> => {
  return buyerLogin(email, password);
};

// User registration
export const registerUser = async (userData: any): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    return {
      success: true,
      message: 'Registration successful',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Registration failed',
    };
  }
};

// Update buyer profile
export const updateBuyerProfile = async (token: string, userData: any): Promise<{ success: boolean; data?: any; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update profile');
    }
    return {
      success: true,
      data: data.user || data.data,
      message: 'Profile updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update profile',
    };
  }
};

// Upload profile picture
export const uploadProfilePicture = async (token: string, formData: FormData): Promise<{ success: boolean; profilePicture?: string; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/profile-picture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to upload profile picture');
    }
    return {
      success: true,
      profilePicture: data.profilePicture || data.data?.profileImage,
      message: 'Profile picture uploaded successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to upload profile picture',
    };
  }
};

// Export API URL for other modules
export { getApiUrl, API_BASE_URL };
