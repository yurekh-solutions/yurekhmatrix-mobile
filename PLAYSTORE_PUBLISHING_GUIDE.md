# Complete Guide: Publishing RitzYard App to Google Play Store

This guide will walk you through the complete process of publishing your yurekhmatrix-mobile app to Google Play Store with your custom logo as the app icon.

---

## Table of Contents
1. [Step 1: Prepare Your Logo Files](#step-1-prepare-your-logo-files)
2. [Step 2: Update App Configuration](#step-2-update-app-configuration)
3. [Step 3: Build for Production](#step-3-build-for-production)
4. [Step 4: Set Up Google Play Developer Account](#step-4-set-up-google-play-developer-account)
5. [Step 5: Create App in Google Play Console](#step-5-create-app-in-google-play-console)
6. [Step 6: Upload Build to Play Store](#step-6-upload-build-to-play-store)
7. [Step 7: Fill App Store Listing Details](#step-7-fill-app-store-listing-details)
8. [Step 8: Submit for Review](#step-8-submit-for-review)

---

## Step 1: Prepare Your Logo Files

### What You Need
Your logo needs to be converted into multiple formats and sizes for different purposes:

| Purpose | Format | Size | Details |
|---------|--------|------|---------|
| **App Icon** | PNG | 1024×1024 px | Main app icon (transparent background) |
| **Adaptive Icon Foreground** | PNG | 1024×1024 px | Logo/symbol (center, transparent background) |
| **Adaptive Icon Background** | PNG | 1024×1024 px | Solid color or gradient background |
| **Google Play Feature Graphic** | PNG/JPG | 1024×500 px | Hero image (optional, for store listing) |

### Current Icon Files in Your Project
Your project already has these icon files that need to be replaced with your logo:

```
assets/images/
├── icon.png                          (1024×1024) - Main app icon
├── android-icon-foreground.png      (1024×1024) - Adaptive icon foreground
├── android-icon-background.png      (1024×1024) - Adaptive icon background  
├── android-icon-monochrome.png      (1024×1024) - Monochrome version
└── splash-icon.png                  (for splash screen)
```

### How to Create Icon Files

#### Option A: Using Online Tools (Easiest)
1. **Go to**: https://easyappicon.com/ or https://appicon.co/
2. **Upload your logo** (PNG or SVG with transparent background)
3. **Download the Android Icon Pack**
4. **Extract and replace** the files in `assets/images/`

#### Option B: Using Figma (Recommended)
1. Create a 1024×1024 canvas in Figma
2. Place your logo in the center (safe zone: center 66% of canvas)
3. Export foreground image (your logo)
4. Create background layer (solid color matching your brand)
5. Export as PNG files

#### Option C: Using Adobe/Photoshop
1. Create 1024×1024 PNG files
2. Logo should be centered and leave 20% padding around edges
3. Use transparent backgrounds for foreground images
4. Solid color for background image

### Icon Requirements Checklist
- ✅ PNG format (24-bit with alpha channel)
- ✅ Minimum size: 512×512 px (recommended: 1024×1024 px)
- ✅ Foreground: transparent background with logo centered
- ✅ Background: solid color (e.g., #E6F4FE for your brand)
- ✅ No rounded corners (system handles this)
- ✅ Logo should fit in center 66% of canvas

---

## Step 2: Update App Configuration

### 2.1 Replace Icon Files
1. Save your new logo files with these exact names:
   - `icon.png` (main icon)
   - `android-icon-foreground.png` (logo)
   - `android-icon-background.png` (background color)
   - `android-icon-monochrome.png` (black & white version)

2. Place them in: `yurekhmatrix-mobile/assets/images/`

3. Also update: `assets/ritzlogo.png` for web favicon

### 2.2 Update app.json (Already Configured)
Your `app.json` already has the correct icon references:

```json
{
  "expo": {
    "name": "RitzYard",
    "icon": "./assets/images/icon.png",
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      }
    }
  }
}
```

**No changes needed** - just replace the image files!

### 2.3 Customize App Metadata (Optional)
If you want to change the app name, update in `app.json`:

```json
{
  "expo": {
    "name": "YourAppName",        // Change this
    "slug": "yourappslug",         // Change this
    "version": "1.0.0",            // Your version
    "description": "Your app description for Play Store"
  }
}
```

### 2.4 Update Package Name (if needed)
The current package name is: `com.yurekhsolutions.ritzyard`

To change it, update in `app.json`:
```json
{
  "android": {
    "package": "com.yourcompany.appname"
  }
}
```

⚠️ **Warning**: Cannot be changed after first Play Store submission!

---

## Step 3: Build for Production

### 3.1 Prerequisites
- Node.js and npm installed
- EAS CLI installed: `npm install -g eas-cli`
- Expo account created at https://expo.dev
- GitHub account (optional but recommended for backup)

### 3.2 Login to Expo
```powershell
eas login
# Enter your Expo email and password
```

### 3.3 Build APK/App Bundle
Run this command from the `yurekhmatrix-mobile` directory:

```powershell
# Build production-ready app bundle (recommended for Play Store)
eas build --platform android --profile production

# OR build APK for testing first
eas build --platform android --profile preview
```

This will:
- Compile your React Native app
- Generate the APK/App Bundle
- Upload to EAS Build servers
- Send you a download link when ready

⏱️ **Timing**: Usually takes 10-20 minutes

### 3.4 Download Build
When ready, you'll get a URL. Download the `.aab` file (App Bundle).

---

## Step 4: Set Up Google Play Developer Account

### 4.1 Create Developer Account
1. Go to: https://play.google.com/console
2. Click "Create account"
3. Pay the one-time $25 registration fee
4. Fill in your developer profile:
   - Developer name (can be individual or company)
   - Email address
   - Phone number
   - Payment method

### 4.2 Complete Account Setup
- Accept Google Play Developer Agreement
- Set up payment method
- Set up store listing contact email

### 4.3 Generate Signing Key (Important!)
You need to sign your app. Two options:

**Option A: Google Play App Signing (Recommended)**
- Let Google manage your signing key
- Safer and easier
- You upload unsigned APK, Google signs it

**Option B: Self-Signed**
- You manage the signing key
- Create with: `keytool -genkey -v -keystore my-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias`
- Keep this file safe - don't lose it!

---

## Step 5: Create App in Google Play Console

### 5.1 Create New App
1. Go to Google Play Console (https://play.google.com/console)
2. Click "Create app"
3. Fill in details:
   - **App name**: "RitzYard" (or your app name)
   - **Default language**: English
   - **App type**: Select "Apps"
   - **Category**: Select "Business" or "Shopping"
   - **Content rating**: Fill questionnaire
   - **Target audience**: Select "Teens and Adults"

### 5.2 Complete App Creation
- Accept agreements
- Create the app

### 5.3 Navigate to "Releases" Section
In Google Play Console, on left sidebar:
- Go to **All apps** → Select your app
- Navigate to **Testing** → **Internal Testing** (for first test)

---

## Step 6: Upload Build to Play Store

### 6.1 Upload to Internal Testing (First)
1. In Google Play Console, go to **Testing → Internal Testing**
2. Click "Create new release"
3. Click "Upload APK or App Bundle"
4. Select your `.aab` file (downloaded from EAS)
5. Review the app bundle details (icons, permissions, etc.)
6. Add release notes: "Initial release"
7. Click "Review release"

### 6.2 Test Before Live Release
- Invite testers (at least yourself)
- Use test link to install on device
- Test all features, especially:
  - Logo/icon display
  - Login and authentication
  - API connections
  - Payment features (if applicable)

### 6.3 Create Release for Play
1. Go to **Releases → Production**
2. Click "Create new release"
3. Upload the same `.aab` file
4. Add release notes
5. Proceed to next step

---

## Step 7: Fill App Store Listing Details

### 7.1 Fill Main Store Listing
In Google Play Console, left sidebar:
1. Go to **Store presence → App store listing**

### 7.2 Upload Graphics
You need these images:

| Item | Size | Count | Details |
|------|------|-------|---------|
| **App icon** | 512×512 px | 1 | Your logo |
| **Screenshots** | 1080×1920 px | 2-8 | Landscape or portrait |
| **Feature graphic** | 1024×500 px | 1 | Header image for store |
| **Promo graphic** | 180×120 px | 1 | Small promotional image |

**Where to upload:**
- Click "Manage screenshots and images"
- Upload at least 2 screenshots
- Upload feature graphic
- Upload promo graphic (optional)

### 7.3 Fill Text Fields
- **App name**: "RitzYard"
- **Short description**: "Premium B2B procurement platform" (80 chars max)
- **Full description**: Detailed description of your app (4000 chars max)
- **Category**: Business or Shopping
- **Content rating**: Complete the questionnaire
- **Privacy policy URL**: Add your privacy policy link

### 7.4 Set Content Rating
1. Click "Manage content rating"
2. Complete the questionnaire
3. Submit for rating

### 7.5 Configure Pricing & Distribution
1. Go to **Pricing & distribution**
2. Select regions where app is available
3. Set pricing (Free or Paid)
4. Configure content restrictions if needed

---

## Step 8: Submit for Review

### 8.1 Final Checklist
Before submitting, verify:

- ✅ App icons are correct and clear
- ✅ All screenshots uploaded
- ✅ App name, description filled
- ✅ Content rating completed
- ✅ Privacy policy provided
- ✅ All required permissions listed
- ✅ App builds and runs without errors
- ✅ No crashes or major bugs

### 8.2 Complete Release Form
1. In **Production Release**, review all details
2. Ensure app bundle is uploaded
3. Complete store listing
4. Set release date (can be immediate)

### 8.3 Submit for Review
1. Click "Review release"
2. Verify all information
3. Click "Submit for review"

### 8.4 Monitor Review Status
- Go to **Releases → Production**
- Check status section
- You'll receive email updates
- Usually takes 2-24 hours for review

### 8.5 Once Approved
- Your app becomes live on Play Store
- Users can search for and download it
- You can track downloads and ratings

---

## Troubleshooting

### Icon Not Showing Correctly
- Ensure PNG files are exactly 1024×1024 px
- Check transparent background for foreground
- Verify solid color for background
- Re-upload from console

### Build Fails
- Run `npm install` in project directory
- Clear cache: `npm cache clean --force`
- Update EAS CLI: `npm install -g eas-cli@latest`
- Check Node.js version (should be 14+)

### Review Rejected
- Check rejection email for specific reasons
- Common issues:
  - Unclear app purpose
  - Missing privacy policy
  - Misleading screenshots
  - Copyright/trademark issues
- Fix issues and resubmit

### App Not Appearing on Play Store
- Wait up to 24 hours after approval
- App might be geo-filtered
- Check content rating restrictions
- Verify pricing is set correctly

---

## Important Notes

### Security
- Never commit signing keys to GitHub
- Keep `.jks` files in `.gitignore`
- Use environment variables for sensitive data

### Versioning
- Each build must have higher `versionCode`
- Format: `versionCode` (integer), `version` (string like "1.0.0")
- Increment `versionCode` with each update

### Testing
- Always test on real device before uploading
- Test on Android 8.0 and higher
- Test all user flows

### Updates
To submit app updates:
1. Increment `versionCode` in `app.json`
2. Rebuild with EAS
3. Upload new `.aab` to Play Store
4. Approval usually faster for updates

---

## Next Steps

1. **Prepare your logo files** (see Step 1)
2. **Replace icon files** in `assets/images/`
3. **Build and test locally**: `npm run android`
4. **Build for production**: `eas build --platform android --profile production`
5. **Create Play Store developer account** ($25)
6. **Upload build and complete listing**
7. **Submit for review**

---

## Useful Links

- EAS Build Docs: https://docs.expo.dev/eas-update/getting-started/
- Google Play Console: https://play.google.com/console
- Android Icon Guidelines: https://developer.android.com/guide/practices/ui_guidelines
- Icon Generator: https://easyappicon.com/
- Expo Docs: https://docs.expo.dev/

---

## Support

If you encounter issues:
1. Check Expo docs: https://docs.expo.dev
2. Google Play Help: https://support.google.com/googleplay
3. Stack Overflow: Search your error message
4. Expo Community: https://forums.expo.dev

---

**Version**: 1.0  
**Last Updated**: February 2026  
**App**: RitzYard (yurekhmatrix-mobile)
