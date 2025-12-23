# Build APK for Android Testing

## Option 1: Using Expo Development Build (Recommended for Testing)

1. **Install Expo Go on your Android phone**
   - Download from Google Play Store: https://play.google.com/store/apps/details?id=host.exp.exponent

2. **Start the development server**
   ```bash
   cd c:\Users\yurek\OneDrive\Desktop\suppliermatrix\yurekhmatrix-mobile
   npm start
   ```

3. **Scan QR code**
   - Open Expo Go app on your phone
   - Scan the QR code displayed in terminal
   - App will load on your phone

## Option 2: Build Standalone APK with EAS Build (Production)

### Prerequisites
- Create Expo account at https://expo.dev/signup
- Login to EAS CLI

### Steps

1. **Login to Expo**
   ```bash
   eas login
   ```

2. **Build APK**
   ```bash
   cd c:\Users\yurek\OneDrive\Desktop\suppliermatrix\yurekhmatrix-mobile
   eas build --platform android --profile preview
   ```

3. **Download APK**
   - Once build completes, you'll get a download link
   - Download the APK file
   - Transfer to your Android phone
   - Install and test

## Option 3: Local Build with Android Studio (Advanced)

### Prerequisites
- Install Android Studio
- Install Java JDK 17
- Set up Android SDK

### Steps

1. **Generate native Android project**
   ```bash
   cd c:\Users\yurek\OneDrive\Desktop\suppliermatrix\yurekhmatrix-mobile
   npx expo prebuild --platform android
   ```

2. **Build APK**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

3. **Find APK**
   - Location: `android/app/build/outputs/apk/release/app-release.apk`
   - Transfer to phone and install

## Quick Test (Recommended)

For quick testing, use **Option 1** (Expo Go):

```bash
# Navigate to project
cd c:\Users\yurek\OneDrive\Desktop\suppliermatrix\yurekhmatrix-mobile

# Start development server
npm start

# Scan QR code with Expo Go app on your phone
```

---

## Current Configuration

- **Package Name**: `com.yurekhsolutions.ritzyard`
- **App Name**: RitzYard
- **Version**: 1.0.0
- **Version Code**: 1

---

## Notes

- EAS Build requires an Expo account (free)
- Expo Go is fastest for testing
- Standalone APK is best for production distribution
- Make sure your phone and computer are on the same WiFi network for Expo Go
