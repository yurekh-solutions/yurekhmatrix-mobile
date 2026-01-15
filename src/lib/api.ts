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
  
  console.log('🌐 API URL:', apiUrl);
  return apiUrl;
};

const API_BASE_URL = getApiUrl();

// Convert local product to backend-compatible format - PRESERVE IMAGES!
const convertLocalProductToBackend = (product: LocalProduct): any => {
  const imageType = typeof product.image;
  console.log('🔄 Converting:', product.name?.substring(0, 30), '| Image type:', imageType);
  
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
    console.log('🚀 Submitting Material Inquiry to:', `${API_BASE_URL}/material-inquiries`);
    console.log('📊 Inquiry Data:', inquiryData);
    console.log('📊 Materials in inquiry:', JSON.stringify(inquiryData.materials, null, 2));

    const headers: any = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const bodyData = JSON.stringify(inquiryData);
    console.log('📦 Request body:', bodyData);

    const response = await fetch(`${API_BASE_URL}/material-inquiries`, {
      method: 'POST',
      headers,
      body: bodyData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Backend error:', data);
      throw new Error(data.message || `Failed to submit inquiry: ${response.status}`);
    }

    console.log('✅ Material Inquiry submitted successfully:', data);

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
    console.error('❌ Error submitting inquiry:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit inquiry. Please try again.',
    };
  }
};

// Get RFQ history for buyer
export const getRFQHistory = async (token: string): Promise<any[]> => {
  try {
    console.log('🚀 Fetching RFQ history');
    
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
    console.log('✅ RFQs fetched:', data);
    
    return data || [];
  } catch (error) {
    console.error('❌ Error fetching RFQs:', error);
    return [];
  }
};

// Get buyer profile
export const getBuyerProfile = async (token: string): Promise<any> => {
  try {
    console.log('🚀 Fetching buyer profile from:', `${API_BASE_URL}/user/profile`);
    
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
    console.log('✅ Profile fetched:', data);
    
    return data.user || data.data || data;
  } catch (error) {
    console.error('❌ Error fetching profile:', error);
    return null;
  }
};

// Upload files for material inquiry
export const uploadMaterialFiles = async (formData: FormData, token?: string): Promise<{ success: boolean; files?: string[]; message: string }> => {
  try {
    console.log('🚀 Uploading material files');
    
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
    
    console.log('✅ Files uploaded successfully');
    
    return {
      success: true,
      files: data.files,
      message: 'Files uploaded successfully',
    };
  } catch (error) {
    console.error('❌ Error uploading files:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'File upload failed',
    };
  }
};

// Submit RFQ (Request for Quote)
export const submitRFQ = async (rfqData: RFQSubmission): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('🚀 Submitting RFQ to:', `${API_BASE_URL}/rfqs`);
    console.log('📦 RFQ Data:', rfqData);

    const response = await fetch(`${API_BASE_URL}/rfqs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rfqData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Backend error:', data);
      throw new Error(data.message || `Failed to submit RFQ: ${response.status}`);
    }

    console.log('✅ RFQ submitted successfully:', data);

    return {
      success: data.success || true,
      message: data.message || 'RFQ submitted successfully. Admin will contact you soon.',
    };
  } catch (error) {
    console.error('❌ Error submitting RFQ:', error);
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
    
    console.log('🚀 Fetching products from:', url);
    
    const response = await fetch(url, { 
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    const data = await response.json();
    const backendProducts = Array.isArray(data) ? data : (data.products || data.data || []);
    
    console.log('✅ Products fetched from backend:', backendProducts.length, 'items');
    
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
    console.log('✅ Total products (backend + local):', mergedProducts.length, 'items');
    console.log('   - Backend products:', backendProducts.length);
    console.log('   - Local products:', convertedLocalProducts.length);
    console.log('   - Merged unique products:', mergedProducts.length);
    
    return mergedProducts;
  } catch (error) {
    console.error('❌ Error fetching products from backend:', error);
    console.log('📦 Using local products as fallback');
    
    // Filter by category if specified
    let localProducts = allLocalProducts;
    if (category && category !== 'all') {
      localProducts = allLocalProducts.filter(p => p.category === category);
    }
    
    // Convert local products to backend format
    const convertedProducts = localProducts.map(convertLocalProductToBackend);
    console.log('✅ Loaded', convertedProducts.length, 'local products');
    
    return convertedProducts;
  }
};

// Get product details by ID (public endpoint) with local fallback
export const getProductById = async (productId: string): Promise<any> => {
  try {
    console.log('🚀 Fetching product:', productId);
    
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
      console.log('✅ Product fetched from backend:', product.name);
      return product;
    }
    
    throw new Error('Product not found in backend');
  } catch (error) {
    console.error('❌ Error fetching product from backend:', error);
    console.log('📦 Searching in local products');
    
    // Search in local products
    const localProduct = allLocalProducts.find(p => p.id === productId);
    
    if (localProduct) {
      const converted = convertLocalProductToBackend(localProduct);
      console.log('✅ Found local product:', converted.name);
      return converted;
    }
    
    console.log('❌ Product not found in local storage');
    return null;
  }
};

// Buyer login - for RitzYard mobile app
export const buyerLogin = async (email: string, password: string): Promise<{ success: boolean; token?: string; user?: any; message: string }> => {
  try {
    console.log('🚀 Buyer login attempt:', email);
    
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
    
    console.log('✅ Supplier logged in successfully');
    
    return {
      success: true,
      token: data.token,
      user: data.user,
      message: 'Login successful',
    };
  } catch (error) {
    console.error('❌ Error logging in:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Login failed',
    };
  }
};

// Buyer registration - for RitzYard mobile app
export const buyerRegister = async (userData: any): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('🚀 Buyer registration:', userData.email);
    console.log('📊 Registration Fields:', Object.keys(userData));
    
    // TEMPORARY FIX: Register without image first, then upload image separately
    // This works around the backend FormData parsing issue
    console.log('📝 Using JSON registration (image upload disabled temporarily)');
    
    const registrationData = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      company: userData.company,
    };
    
    console.log('📦 Sending JSON to:', `${API_BASE_URL}/auth/user/signup`);
    const response = await fetch(`${API_BASE_URL}/auth/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    });
    
    console.log('✅ Response status:', response.status, response.statusText);
    const data = await response.json();
    console.log('📝 Response data:', data);
    
    if (!response.ok) {
      console.error('❌ Registration failed:', data.message);
      throw new Error(data.message || 'Registration failed');
    }
    
    console.log('✅ Registration successful!');
    return {
      success: true,
      message: data.message || 'Registration successful',
    };
    
    /* ORIGINAL CODE WITH IMAGE UPLOAD - WILL BE RE-ENABLED AFTER BACKEND FIX
    // Check if userData contains images (profile or business)
    const hasImages = userData.profileImage || userData.businessImage;
    
    if (hasImages) {
      console.log('🖼️ Images detected - using FormData');
      const formData = new FormData();
      
      // Add all basic fields to FormData - EXPLICITLY set as text
      const textFields = ['name', 'email', 'password', 'company', 'phone'];
      textFields.forEach(key => {
        if (userData[key]) {
          formData.append(key, String(userData[key]));
          console.log(`  ✓ Added field: ${key} = ${userData[key]}`);
        }
      });

      // Add profile image to FormData
      if (userData.profileImage) {  
        console.log('📸 Profile Image detected:', typeof userData.profileImage);
        // Handle different profileImage formats
        if (typeof userData.profileImage === 'object' && userData.profileImage.uri) {
          // Object with uri (from AuthScreen)
          if (Platform.OS === 'web' && userData.profileImage.blob) {
            // Web: Use blob directly with proper filename
            formData.append('profileImage', userData.profileImage.blob, `profile-${Date.now()}.jpg`);
            console.log('  ✓ Added profile image (Web Blob)');
          } else {
            // Mobile: Create proper file object
            const uriParts = userData.profileImage.uri.split('.');
            const fileType = uriParts[uriParts.length - 1];
            
            formData.append('profileImage', {
              uri: userData.profileImage.uri,
              type: `image/${fileType}`,
              name: `profile-${Date.now()}.${fileType}`,
            } as any);
            console.log('  ✓ Added profile image (Mobile URI):', userData.profileImage.uri);
          }
        } else if (typeof userData.profileImage === 'string') {
          // String URI (direct path)
          formData.append('profileImage', {
            uri: userData.profileImage,
            type: 'image/jpeg',
            name: `profile-${Date.now()}.jpg`,
          } as any);
          console.log('  ✓ Added profile image (String URI):', userData.profileImage);
        }
      }

      // Add business image to FormData
      if (userData.businessImage) {
        console.log('🏬 Business Image detected:', typeof userData.businessImage);
        // Handle different businessImage formats
        if (typeof userData.businessImage === 'object' && userData.businessImage.uri) {
          // Object with uri (from AuthScreen)
          if (Platform.OS === 'web' && userData.businessImage.blob) {
            formData.append('businessImage', userData.businessImage.blob, 'business.jpg');
            console.log('  ✓ Added business image (Web Blob)');
          } else {
            formData.append('businessImage', {
              uri: userData.businessImage.uri,
              type: 'image/jpeg',
              name: 'business.jpg',
            } as any);
            console.log('  ✓ Added business image (Mobile URI):', userData.businessImage.uri);
          }
        } else if (typeof userData.businessImage === 'string') {
          // String URI (direct path)
          formData.append('businessImage', {
            uri: userData.businessImage,
            type: 'image/jpeg',
            name: 'business.jpg',
          } as any);
          console.log('  ✓ Added business image (String URI):', userData.businessImage);
        }
      }

      console.log('📦 Sending FormData to:', `${API_BASE_URL}/auth/user/signup`);
      
      // Log FormData contents for debugging
      console.log('🔍 FormData contents:');
      for (const pair of (formData as any).entries()) {
        console.log(`  - ${pair[0]}:`, typeof pair[1] === 'object' ? 'File/Blob' : pair[1]);
      }
      
      const response = await fetch(`${API_BASE_URL}/auth/user/signup`, {
        method: 'POST',
        body: formData,
        // DO NOT set Content-Type header - let browser set it automatically with boundary
      });

      console.log('✅ Response status:', response.status, response.statusText);
      const data = await response.json();
      console.log('📝 Response data:', data);
      
      if (!response.ok) {
        console.error('❌ Registration failed:', data.message || response.statusText);
        throw new Error(data.message || 'Registration failed');
      }
      
      console.log('✅ Registration successful!');
      return {
        success: true,
        message: 'Registration successful. Welcome aboard!',
      };
    } else {
      // Normal JSON registration if no image
      console.log('📝 No images - using JSON');
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
      };
    }
    */
  } catch (error) {
    console.error('❌ Error registering:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Registration failed',
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
    console.log('🚀 Registering user');
    
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
    
    console.log('✅ User registered successfully');
    
    return {
      success: true,
      message: 'Registration successful',
    };
  } catch (error) {
    console.error('❌ Error registering:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Registration failed',
    };
  }
};

// Update buyer profile
export const updateBuyerProfile = async (token: string, userData: any): Promise<{ success: boolean; data?: any; message: string }> => {
  try {
    console.log('🚀 Updating buyer profile to:', `${API_BASE_URL}/user/profile`);
    
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
    
    console.log('✅ Profile updated successfully');
    
    return {
      success: true,
      data: data.user || data.data,
      message: 'Profile updated successfully',
    };
  } catch (error) {
    console.error('❌ Error updating profile:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update profile',
    };
  }
};

// Upload profile picture
export const uploadProfilePicture = async (token: string, formData: FormData): Promise<{ success: boolean; profilePicture?: string; message: string }> => {
  try {
    console.log('🚀 Uploading profile picture to:', `${API_BASE_URL}/user/profile-picture`);
    
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
    
    console.log('✅ Profile picture uploaded successfully');
    
    return {
      success: true,
      profilePicture: data.profilePicture || data.data?.profileImage,
      message: 'Profile picture uploaded successfully',
    };
  } catch (error) {
    console.error('❌ Error uploading profile picture:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to upload profile picture',
    };
  }
};

// Export API URL for other modules
export { getApiUrl, API_BASE_URL };
