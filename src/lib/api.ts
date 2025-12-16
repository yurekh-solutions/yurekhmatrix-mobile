// API Integration Service for yurekhmatrix Mobile
// Connects to backendmatrix for RFQ submissions

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
export const submitMaterialInquiry = async (inquiryData: any, token?: string): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('🚀 Submitting Material Inquiry to:', `${API_BASE_URL}/material-inquiries`);
    console.log('📊 Inquiry Data:', inquiryData);

    const headers: any = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/material-inquiries`, {
      method: 'POST',
      headers,
      body: JSON.stringify(inquiryData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Backend error:', data);
      throw new Error(data.message || `Failed to submit inquiry: ${response.status}`);
    }

    console.log('✅ Material Inquiry submitted successfully:', data);

    return {
      success: data.success || true,
      message: data.message || 'Inquiry submitted successfully. We will get back to you soon.',
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
    console.log('🚀 Fetching buyer profile');
    
    const response = await fetch(`${API_BASE_URL}/buyer/profile`, {
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
    
    return data;
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

// Get products from backend
export const getProducts = async (category?: string): Promise<any[]> => {
  try {
    const url = category 
      ? `${API_BASE_URL}/products?category=${category}`
      : `${API_BASE_URL}/products`;
    
    console.log('🚀 Fetching products from:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Products fetched:', data);
    
    return data;
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return [];
  }
};

// Get product details by ID
export const getProductById = async (productId: string): Promise<any> => {
  try {
    console.log('🚀 Fetching product:', productId);
    
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Product fetched:', data);
    
    return data;
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    return null;
  }
};

// Buyer login - for RitzYard mobile app
export const buyerLogin = async (email: string, password: string): Promise<{ success: boolean; token?: string; user?: any; message: string }> => {
  try {
    console.log('🚀 Buyer login attempt:', email);
    
    const response = await fetch(`${API_BASE_URL}/auth/buyer/login`, {
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
    
    console.log('✅ Buyer logged in successfully');
    
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
    
    const response = await fetch(`${API_BASE_URL}/auth/buyer/register`, {
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
    
    console.log('✅ Buyer registered successfully');
    
    return {
      success: true,
      message: 'Registration successful. Please check your email to verify your account.',
    };
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

// Export API URL for other modules
export { getApiUrl, API_BASE_URL };
