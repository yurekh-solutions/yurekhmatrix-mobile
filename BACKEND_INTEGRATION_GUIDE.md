# RitzYard Mobile App - Backend Integration Guide

## 🎯 Overview

The yurekhmatrix-mobile app is fully integrated with the backendmatrix API. This guide explains the API endpoints, authentication flow, and how to extend the integration.

## 🔐 Authentication Flow

### Buyer Login
```
POST /api/auth/buyer/login
Request:
{
  "email": "buyer@example.com",
  "password": "password123"
}

Response (Success):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "email": "buyer@example.com",
    "name": "John Doe",
    "company": "Acme Corp"
  }
}

Response (Error):
{
  "success": false,
  "message": "Invalid credentials"
}
```

### Storing Authentication Token
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buyerLogin } from '@/src/lib/api';

const handleLogin = async (email: string, password: string) => {
  const result = await buyerLogin(email, password);
  
  if (result.success && result.token) {
    // Store token for future requests
    await AsyncStorage.setItem('authToken', result.token);
    // Store user data
    await AsyncStorage.setItem('user', JSON.stringify(result.user));
    // Navigate to main app
  }
};
```

### Using Stored Token in Authenticated Requests
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const getStoredToken = async () => {
  const token = await AsyncStorage.getItem('authToken');
  return token;
};

// In any API call that requires auth:
const token = await getStoredToken();
const result = await getRFQHistory(token);
```

## 📋 API Endpoints

### Authentication Endpoints

#### 1. Buyer Login
```
POST /api/auth/buyer/login
```

**Used in**: LoginScreen.tsx, SettingsScreen.tsx (logout)

**Response**:
- Returns JWT token
- Returns user object with id, email, name, company

#### 2. Buyer Register
```
POST /api/auth/buyer/register
```

**Used in**: Registration screens (when implemented)

**Body**:
```json
{
  "email": "buyer@example.com",
  "password": "securepassword",
  "name": "John Doe",
  "company": "Acme Corp",
  "phone": "+1-555-0100",
  "location": "New York"
}
```

#### 3. Forgot Password
```
POST /api/auth/buyer/forgot-password
```

**Body**:
```json
{
  "email": "buyer@example.com"
}
```

---

### RFQ (Request for Quote) Endpoints

#### 1. Submit RFQ
```
POST /api/rfqs
```

**Used in**: RFQScreen.tsx

**Body**:
```json
{
  "customerName": "John Doe",
  "company": "Acme Corp",
  "location": "New York",
  "email": "john@acme.com",
  "phone": "+1-555-0100",
  "items": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "productName": "TMT Bars Fe 500D",
      "category": "Steel",
      "brand": "JSW",
      "grade": "Fe 500D",
      "quantity": 100
    }
  ],
  "totalItems": 1
}
```

**Response**:
```json
{
  "success": true,
  "message": "RFQ submitted successfully",
  "rfqId": "507f1f77bcf86cd799439012"
}
```

#### 2. Get RFQ History (Authenticated)
```
GET /api/rfqs/my-rfqs
Header: Authorization: Bearer {token}
```

**Used in**: ProfileScreen.tsx (order history)

**Response**:
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "rfqNumber": "RFQ-2025-001",
    "customerName": "John Doe",
    "company": "Acme Corp",
    "items": [...],
    "status": "pending",
    "submittedAt": "2025-12-16T10:30:00Z"
  }
]
```

---

### Product Endpoints

#### 1. Get All Products
```
GET /api/products
```

**Used in**: ProductsScreen.tsx, HomeScreenEnhanced.tsx

**Query Parameters**:
- `category`: Filter by category (e.g., `?category=Steel`)
- `page`: Pagination (e.g., `?page=1`)
- `limit`: Items per page (e.g., `?limit=20`)

**Response**:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "TMT Bars Fe 500D",
    "category": "Steel",
    "description": "High-strength reinforcement bars...",
    "image": "https://cdn.example.com/product.jpg",
    "price": {
      "amount": 45000,
      "currency": "INR",
      "unit": "MT"
    },
    "stock": {
      "available": true,
      "quantity": 500,
      "minimumOrder": 10
    },
    "specifications": {
      "materialStandard": "IS 1786:2015",
      "packaging": "Bundles of 2 MT",
      "testingCertificate": "Available",
      "brand": ["JSW", "TATA"],
      "grades": ["Fe 500D"],
      "delivery": "5-7 days",
      "quality": "Premium",
      "availability": "In Stock"
    }
  }
]
```

#### 2. Get Product Details
```
GET /api/products/{productId}
```

**Used in**: ProductDetailScreen.tsx

**Response**: Single product object with full specifications

#### 3. Get Products by Category
```
GET /api/products?category={categoryName}
```

**Used in**: ProductsScreen.tsx (filtering)

---

### Material Inquiry Endpoints

#### 1. Submit Material Inquiry
```
POST /api/material-inquiries
```

**Used in**: MaterialInquiryScreen.tsx

**Body**:
```json
{
  "name": "John Doe",
  "company": "Acme Corp",
  "email": "john@acme.com",
  "phone": "+1-555-0100",
  "materialType": "Steel",
  "quantity": 1000,
  "quantityUnit": "MT",
  "specifications": "Grade A, 10mm diameter, ISI certified",
  "deliveryDate": "2025-03-01",
  "location": "Mumbai",
  "files": ["file_id_1", "file_id_2"]
}
```

**Response**:
```json
{
  "success": true,
  "message": "Material inquiry submitted successfully",
  "inquiryId": "507f1f77bcf86cd799439013"
}
```

#### 2. Upload Material Files
```
POST /api/material-inquiries/upload
Content-Type: multipart/form-data
```

**Used in**: MaterialInquiryScreen.tsx

**Body**: FormData with files

**Response**:
```json
{
  "success": true,
  "files": [
    {
      "filename": "specification.pdf",
      "url": "https://cdn.example.com/files/specification.pdf",
      "size": 2048576,
      "uploadedAt": "2025-12-16T10:30:00Z"
    }
  ]
}
```

---

### Buyer Profile Endpoints

#### 1. Get Buyer Profile (Authenticated)
```
GET /api/buyer/profile
Header: Authorization: Bearer {token}
```

**Used in**: ProfileScreen.tsx

**Response**:
```json
{
  "_id": "user_id",
  "email": "buyer@example.com",
  "name": "John Doe",
  "company": "Acme Corp",
  "phone": "+1-555-0100",
  "location": "New York",
  "avatar": "https://cdn.example.com/avatar.jpg",
  "stats": {
    "activeRFQs": 5,
    "completedOrders": 23,
    "totalSpent": 1250000,
    "avgResponseTime": "2 hours"
  },
  "createdAt": "2025-01-01T00:00:00Z"
}
```

---

## 🔌 Implementation Examples

### Example 1: Implementing Login Screen
```typescript
import { buyerLogin } from '@/src/lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = await buyerLogin(email, password);
    setLoading(false);

    if (result.success && result.token) {
      // Store credentials
      await AsyncStorage.setItem('authToken', result.token);
      await AsyncStorage.setItem('user', JSON.stringify(result.user));
      
      // Navigate to main app
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } else {
      Alert.alert('Login Failed', result.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
```

### Example 2: Submitting RFQ with Authentication
```typescript
import { submitRFQ } from '@/src/lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleSubmitRFQ = async (rfqData: any) => {
  try {
    // Optionally add token if needed for buyer attribution
    const token = await AsyncStorage.getItem('authToken');
    
    const result = await submitRFQ({
      ...rfqData,
      // Token can be added to track buyer
    });

    if (result.success) {
      Alert.alert('Success', 'Your RFQ has been submitted successfully');
      // Clear form or navigate
    } else {
      Alert.alert('Error', result.message);
    }
  } catch (error) {
    Alert.alert('Error', 'Failed to submit RFQ');
  }
};
```

### Example 3: Fetching Products with Error Handling
```typescript
import { getProducts } from '@/src/lib/api';

const [products, setProducts] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  fetchProducts();
}, []);

const fetchProducts = async () => {
  try {
    setLoading(true);
    const data = await getProducts();
    
    if (data && data.length > 0) {
      setProducts(data);
      setError(null);
    } else {
      setError('No products available');
      setProducts([]);
    }
  } catch (err) {
    setError('Failed to fetch products');
    setProducts([]);
  } finally {
    setLoading(false);
  }
};
```

---

## 🛠️ Environment Configuration

### Development Setup
Create `.env` file in project root:

```env
# Local Development
EXPO_PUBLIC_API_URL=http://localhost:5000/api

# Or Production
EXPO_PUBLIC_API_URL=https://backendmatrix.onrender.com/api
```

### Change API URL in Code
```typescript
// In src/lib/api.ts
const getApiUrl = (): string => {
  // For development: http://localhost:5000/api
  // For production: https://backendmatrix.onrender.com/api
  return process.env.EXPO_PUBLIC_API_URL || 'https://backendmatrix.onrender.com/api';
};
```

---

## 📊 Error Handling

All API functions return consistent error responses:

```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  message: string;
}
```

### Common Error Codes

| Code | Message | Action |
|------|---------|--------|
| 400 | Bad Request | Validate form fields |
| 401 | Unauthorized | Prompt user to login |
| 403 | Forbidden | Show permission error |
| 404 | Not Found | Show "Not found" message |
| 500 | Server Error | Suggest retry or contact support |

---

## 🔄 Adding New API Endpoints

### Step 1: Define Interface
```typescript
// In src/lib/api.ts
export interface NewFeatureRequest {
  field1: string;
  field2: number;
}
```

### Step 2: Create API Function
```typescript
export const submitNewFeature = async (
  data: NewFeatureRequest,
  token?: string
): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('🚀 Submitting new feature');
    
    const headers: any = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}/new-endpoint`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Request failed');
    }

    return {
      success: true,
      message: result.message || 'Operation successful',
    };
  } catch (error) {
    console.error('❌ Error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
    };
  }
};
```

### Step 3: Use in Component
```typescript
import { submitNewFeature } from '@/src/lib/api';

const result = await submitNewFeature(data, authToken);
if (result.success) {
  // Handle success
} else {
  // Handle error
}
```

---

## 🧪 Testing API Integration

### Using Postman
1. Import API endpoints
2. Set Authorization header: `Bearer {token}`
3. Test each endpoint with sample data

### Using Mobile App
1. Start backend: `npm start` in backendmatrix
2. Start mobile app: `npm start` in yurekhmatrix-mobile
3. Use Expo Go to test
4. Check console logs for API calls

---

## 🚀 Deployment Checklist

- [ ] Update `EXPO_PUBLIC_API_URL` to production backend
- [ ] Test all API endpoints on production
- [ ] Verify token refresh mechanism
- [ ] Test error handling on poor connections
- [ ] Build APK and IPA for distribution
- [ ] Test on iOS TestFlight and Android Play Store

---

## 📞 Support

For backend issues or questions:
- Email: support@ritzyard.com
- API Documentation: [Backend README]
- Issue Tracker: GitHub Issues
