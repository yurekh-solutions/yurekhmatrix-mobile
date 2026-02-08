# RitzYard - Google Play Store Publishing Guide

## Overview
This guide provides step-by-step instructions for publishing the RitzYard mobile app to the Google Play Store.

---

## Prerequisites

### 1. Google Play Developer Account
- **URL**: https://play.google.com/console
- **Cost**: $25 one-time registration fee
- **Requirements**: Google account, credit/debit card for payment
- **Verification**: May take 1-2 business days

### 2. Required Assets Checklist

| Asset | Specifications | Status |
|-------|---------------|--------|
| App Icon | 512x512 PNG, 32-bit PNG (with alpha) | [ ] Ready |
| Feature Graphic | 1024x500 PNG or JPEG | [ ] Ready |
| Phone Screenshots | 1080x1920 (min 2, max 8) | [ ] Ready |
| Tablet Screenshots | 2048x2732 (optional, max 8) | [ ] Ready |
| Short Description | Max 80 characters | [ ] Ready |
| Full Description | Max 4000 characters | [ ] Ready |
| Privacy Policy URL | Required - public URL | [ ] Ready |

---

## Step 1: Build Production AAB

### Command
```bash
eas build -p android --profile production
```

### What This Does
- Generates Android App Bundle (AAB) - required for Play Store
- Optimized for different device configurations
- Smaller download size for users

### Build Output
- File: `ritzyard.aab`
- Location: EAS Build dashboard or download link

---

## Step 2: Prepare Store Listing Content

### App Details

**App Name**: RitzYard

**Short Description** (80 chars max):
```
B2B procurement platform for construction materials and industrial supplies.
```

**Full Description** (4000 chars max):
```
RitzYard - Where Value Meets Velocity

RitzYard is a premium B2B procurement platform connecting buyers with verified suppliers of construction materials, industrial supplies, and manufacturing components.

Key Features:

🔧 Smart Material Procurement
Browse thousands of products across categories including TMT Bars, MS Hollow Sections, Plywood, Tiles, Sand, Grit, Bricks, and more.

📋 Request for Quotation (RFQ)
Submit RFQs for bulk orders and receive competitive quotes from multiple verified suppliers within 24 hours.

💬 Material Inquiry
Can't find what you're looking for? Submit a material inquiry and our team will source it for you.

✅ Verified Suppliers
All suppliers on RitzYard are verified and vetted to ensure quality and reliability.

📱 Real-time Tracking
Track your orders, view quotation history, and manage your procurement pipeline.

🔒 Secure & Reliable
Enterprise-grade security for your business data and transactions.

Categories Available:
- Mild Steel Products (TMT Bars, MS Angles, MS Beams, MS Channels)
- Stainless Steel (SS Pipes, SS Sheets)
- Construction Materials (Cement, Sand, Bricks, Tiles)
- Electrical & Plumbing
- Safety Equipment
- And much more...

Perfect for:
- Construction companies
- Manufacturing units
- Contractors
- Builders
- Industrial buyers

Download RitzYard today and streamline your procurement process!
```

---

## Step 3: Create Privacy Policy

### Option 1: Use Privacy Policy Generator
**URL**: https://www.privacypolicygenerator.info/

### Required Information for Generator
- **Website Name**: RitzYard
- **Website URL**: (Your website URL)
- **Email**: ritzyard.ai@gmail.com
- **Address**: (Your business address)

### Option 2: Simple Privacy Policy Template

```html
<!DOCTYPE html>
<html>
<head>
    <title>RitzYard Privacy Policy</title>
</head>
<body>
    <h1>Privacy Policy for RitzYard</h1>
    <p><strong>Last Updated:</strong> February 2026</p>
    
    <h2>1. Information We Collect</h2>
    <p>We collect the following information:</p>
    <ul>
        <li>Name and company information</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Business address</li>
        <li>Profile images (optional)</li>
    </ul>
    
    <h2>2. How We Use Your Information</h2>
    <p>Your information is used for:</p>
    <ul>
        <li>Processing material inquiries and RFQs</li>
        <li>Connecting buyers with suppliers</li>
        <li>Account management</li>
        <li>Customer support</li>
    </ul>
    
    <h2>3. Data Storage</h2>
    <p>Data is stored securely on Render cloud servers with encryption.</p>
    
    <h2>4. Third-Party Services</h2>
    <p>We use WhatsApp for inquiry sharing with your consent.</p>
    
    <h2>5. Contact Us</h2>
    <p>Email: ritzyard.ai@gmail.com</p>
</body>
</html>
```

### Hosting Options
1. **GitHub Pages**: Free hosting
2. **Netlify**: Free hosting
3. **Your own website**: If you have one

---

## Step 4: Play Console Setup

### 4.1 Create New App
1. Go to https://play.google.com/console
2. Click "Create app"
3. Select:
   - App name: **RitzYard**
   - Default language: **English (United States)**
   - App or game: **App**
   - Free or paid: **Free**
   - Declarations: Check all required boxes
   - Click "Create app"

### 4.2 Set Up Store Listing

**Main Store Listing Tab:**

1. **App Details**
   - Short description: (Copy from above)
   - Full description: (Copy from above)

2. **Graphics**
   - Upload app icon (512x512)
   - Upload feature graphic (1024x500)
   - Upload phone screenshots (min 2)
   - Upload tablet screenshots (optional)

3. **Categorization**
   - Application type: **Applications**
   - Category: **Business**
   - Tags: Procurement, B2B, Construction, Industrial

### 4.3 Content Rating

1. Go to "Content rating" tab
2. Click "Start questionnaire"
3. Answer questions:
   - Category: **Business/Finance**
   - Violence: **No**
   - Sexual content: **No**
   - Language: **No**
   - Controlled substances: **No**
   - Gambling: **No**
   - In-app purchases: **No**
4. Click "Save" then "Calculate rating"

### 4.4 App Content

1. **Privacy Policy**
   - Add privacy policy URL

2. **App Access**
   - All functionality available without special access: **Yes**

3. **Ads**
   - Does your app contain ads? **No**

4. **Content Ratings**
   - Complete content rating questionnaire

5. **Target Audience**
   - Primary audience: **18+**
   - Not designed for children: **Yes**

6. **News Apps**
   - Is this a news app? **No**

7. **COVID-19**
   - Is this a COVID-19 app? **No**

### 4.5 Pricing & Distribution

1. **Countries/Regions**
   - Select: **India** (or all countries where you operate)

2. **Device Categories**
   - Phones: **Yes**
   - Tablets: **Yes**
   - Android TV: **No**
   - Wear OS: **No**

3. **User Programs**
   - Google Play Pass: Optional
   - Designed for families: **No**

---

## Step 5: Create Release

### 5.1 Production Release

1. Go to "Production" tab
2. Click "Create new release"
3. Click "Continue"

### 5.2 Upload AAB

1. Upload your AAB file from EAS build
2. Wait for processing (may take a few minutes)
3. Review app bundle details

### 5.3 Release Notes

**English (United States)**:
```
Initial release of RitzYard - B2B procurement platform.

Features:
- Browse construction materials and industrial supplies
- Submit RFQs for bulk orders
- Material inquiry system
- Verified supplier network
- Real-time order tracking
- WhatsApp integration for inquiries
```

### 5.4 Review and Rollout

1. Click "Review release"
2. Check all details are correct
3. Click "Start rollout to Production"

---

## Step 6: Wait for Review

### Review Timeline
- **Standard review**: 1-3 business days
- **Extended review**: Up to 7 days (if issues found)

### Common Rejection Reasons
1. Missing privacy policy
2. Incorrect content rating
3. App crashes on launch
4. Misleading app description
5. Missing app icon or screenshots

---

## Quick Reference Commands

### Build Commands
```bash
# Development build
eas build -p android --profile development

# Preview APK (for testing)
eas build -p android --profile preview

# Production AAB (for Play Store)
eas build -p android --profile production

# Submit to Play Store (after setup)
eas submit -p android --profile production
```

### Git Commands
```bash
# Push changes
git add .
git commit -m "Prepare for Play Store release"
git push origin master
```

---

## Post-Launch Checklist

- [ ] Monitor crash reports in Play Console
- [ ] Respond to user reviews
- [ ] Track app analytics
- [ ] Plan regular updates
- [ ] Update screenshots with new features

---

## Support Contacts

- **Google Play Developer Support**: https://support.google.com/googleplay/android-developer
- **Expo EAS Documentation**: https://docs.expo.dev/build/introduction/
- **RitzYard Developer Email**: ritzyard.ai@gmail.com

---

## Document Information
- **Created**: February 2026
- **App Version**: 1.0.0
- **Package Name**: com.yurekhsolutions.ritzyard
- **Target SDK**: Android 14 (API 34)
