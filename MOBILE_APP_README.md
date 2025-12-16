# RitzYard Mobile App

A cross-platform mobile application for iOS and Android built with React Native and Expo. This app is the mobile version of the yurekhmatrix web application, providing buyers with a seamless experience for sourcing materials and managing RFQs.

## Features

### 📱 Bottom Tab Navigation (5 Primary Screens)
1. **Home** - Live statistics, hero section, quick actions, featured suppliers and products
2. **Products** - Real-time product listing with search, filters, and grid/list toggle
3. **RFQ** - Multi-item Request for Quote form with customer details and tabbed interface
4. **Material** - Material inquiry form with file upload support
5. **More** - Hub for accessing 15 additional screens

### 📚 Secondary Screens (15 Additional Features)

**Account & User Management**
- Profile - User avatar, statistics, contact information, account actions
- Settings - Notifications, security, appearance, and account preferences
- Notifications - 8 notification preferences with delivery method selection

**Information & Content**
- Blog - Featured carousel, article search, category filtering, newsletter
- About - Company mission, statistics, core values, differentiators
- Contact - Contact form, social media links, help resources
- Help Center - 6 help topics, 10 FAQs with category filtering
- FAQ - Expandable FAQ items with search functionality

**Features & Tools**
- Milo AI - Chat interface with suggested queries and quick actions
- Milo Guide - 6 step-by-step guides with pro tips
- Discover - 6 feature cards with expandable tips
- Careers - 6 job openings with modal details and benefits

**Product Information**
- Product Details - Complete product information with real backend data

**Legal**
- Terms & Conditions - 8 legal sections with comprehensive terms
- Privacy Policy - 8 privacy sections with data handling information

## Technology Stack

- **Frontend Framework**: React Native with Expo
- **Navigation**: React Navigation (bottom tabs + drawer)
- **Language**: TypeScript
- **Styling**: StyleSheet (React Native)
- **Icons**: Material Community Icons
- **State Management**: React Hooks + Context
- **HTTP Client**: Fetch API
- **File Upload**: expo-document-picker
- **Authentication**: JWT tokens

## Backend Integration

Connected to **backendmatrix** API at:
- Production: `https://backendmatrix.onrender.com/api`
- Development: `http://localhost:5000/api` (configurable via .env)

### API Endpoints Used

**Authentication**
- `POST /auth/buyer/login` - Buyer login
- `POST /auth/buyer/register` - Buyer registration
- `POST /auth/buyer/forgot-password` - Password reset

**RFQs**
- `POST /rfqs` - Submit RFQ
- `GET /rfqs/my-rfqs` - Get buyer's RFQ history

**Material Inquiries**
- `POST /material-inquiries` - Submit material inquiry
- `POST /material-inquiries/upload` - Upload files

**Products**
- `GET /products` - Get all products
- `GET /products/:id` - Get product details
- `GET /products?category=:category` - Get products by category

**Buyer Profile**
- `GET /buyer/profile` - Get buyer profile

## Project Structure

```
yurekhmatrix-mobile/
├── app/
│   ├── _layout.tsx              # Root layout with gesture handler
│   ├── modal.tsx                # Modal configuration
│   └── (tabs)/
│       ├── _layout.tsx          # Tab navigation (5 primary screens)
│       ├── index.tsx            # Home screen
│       ├── products.tsx         # Products screen
│       ├── rfq.tsx              # RFQ screen
│       ├── material.tsx         # Material inquiry screen
│       └── more.tsx             # More screens menu
├── src/
│   ├── screens/                 # All 20 screen components
│   │   ├── HomeScreenEnhanced.tsx
│   │   ├── ProductsScreen.tsx
│   │   ├── ProductDetailScreen.tsx
│   │   ├── RFQScreen.tsx
│   │   ├── MaterialInquiryScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   ├── NotificationsScreen.tsx
│   │   ├── BlogScreen.tsx
│   │   ├── AboutScreen.tsx
│   │   ├── ContactScreen.tsx
│   │   ├── HelpCenterScreen.tsx
│   │   ├── FAQScreen.tsx
│   │   ├── MiloAIScreen.tsx
│   │   ├── MiloGuideScreen.tsx
│   │   ├── DiscoverScreen.tsx
│   │   ├── CareersScreen.tsx
│   │   ├── TermsScreen.tsx
│   │   └── PrivacyScreen.tsx
│   ├── components/
│   │   └── CustomDrawer.tsx     # Navigation drawer
│   ├── lib/
│   │   └── api.ts              # API integration layer
│   └── styles/
│       └── colors.ts           # RitzYard theme colors
├── assets/                      # Images, icons, fonts
├── app.json                     # Expo configuration
├── package.json                 # Dependencies
└── .env                         # Environment variables
```

## Theme Colors

The app uses the RitzYard earth-tone palette:

```
PRIMARY:    #c15738 (Rust Orange/Terracotta)
SECONDARY:  #5c2d23 (Deep Earth Brown)
BACKGROUND: #f7f5f2 (Warm Cream)
SUCCESS:    #10b981
WARNING:    #f59e0b
ERROR:      #ef4444
```

## Setup & Installation

### Prerequisites
- Node.js 16+ and npm
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator
- Expo Go app (for testing on physical device)

### Installation Steps

1. **Install dependencies**
   ```bash
   cd yurekhmatrix-mobile
   npm install
   ```

2. **Configure environment variables**
   Create a `.env` file:
   ```
   EXPO_PUBLIC_API_URL=https://backendmatrix.onrender.com/api
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/emulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app for physical device

## API Integration

### Buyer Login
```typescript
import { buyerLogin } from '@/src/lib/api';

const result = await buyerLogin('user@example.com', 'password');
if (result.success) {
  const { token, user } = result;
  // Store token for authenticated requests
}
```

### Submit RFQ
```typescript
import { submitRFQ } from '@/src/lib/api';

const rfqData = {
  customerName: 'John Doe',
  company: 'Acme Corp',
  location: 'New York',
  email: 'john@acme.com',
  phone: '555-0100',
  items: [
    {
      productId: '123',
      productName: 'TMT Bars',
      category: 'Steel',
      brand: 'JSW',
      grade: 'Fe 500D',
      quantity: 100,
    }
  ],
  totalItems: 1,
};

const result = await submitRFQ(rfqData);
```

### Submit Material Inquiry
```typescript
import { submitMaterialInquiry } from '@/src/lib/api';

const inquiryData = {
  name: 'John Doe',
  company: 'Acme Corp',
  email: 'john@acme.com',
  phone: '555-0100',
  materialType: 'Steel',
  quantity: 1000,
  specifications: 'Grade A, 10mm diameter',
  deliveryDate: '2025-03-01',
};

const result = await submitMaterialInquiry(inquiryData, authToken);
```

## Building & Deployment

### Build APK (Android)
```bash
eas build --platform android --profile preview
```

### Build IPA (iOS)
```bash
eas build --platform ios --profile preview
```

### Deploy to App Store / Play Store
1. Configure EAS project
2. Build for production
3. Submit to respective stores

See [Expo EAS Build documentation](https://docs.expo.dev/eas-build/introduction/) for detailed instructions.

## Error Handling

The app includes comprehensive error handling:

- Network error detection with user-friendly messages
- API response validation
- Fallback data for offline scenarios
- Form validation on all input screens
- Try-catch blocks for async operations

## Performance Optimizations

- Lazy loading of screens via navigation
- Image optimization with local caching
- Efficient state management with Hooks
- Memoized components to prevent unnecessary re-renders
- Responsive design without excessive white space

## Development Tips

### Debug Logs
All API calls include console logs with emojis for easy tracking:
```
🚀 API request
✅ Success
❌ Error
📊 Data received
```

### Testing
```bash
# Lint check
npm run lint

# Run tests (when configured)
npm test
```

### File Upload Testing
Material Inquiry supports file uploads. Test with:
- PDF documents
- Images (JPG, PNG)
- Word documents (DOC, DOCX)

## Contributing

1. Create a feature branch
2. Make changes following the existing code style
3. Test thoroughly on both platforms
4. Submit pull request with description

## License

Copyright © 2025 RitzYard. All rights reserved.

## Support

For issues or questions:
- Email: support@ritzyard.com
- Help Center: Available in app
- Contact Form: Available in app

## Changelog

### v1.0.0 (Initial Release)
- 20 fully functional screens
- Bottom tab navigation with drawer menu
- Complete backend API integration
- RFQ and Material Inquiry forms
- Product listing with filters
- Milo AI chat interface
- User profile management
- RitzYard theme colors and branding
