# 🚀 RitzYard Mobile App - Quick Start Guide

## ✅ Current Status
- ✅ Backend configured for localhost + production
- ✅ Mobile app environment variables set
- ✅ Expo running and ready

## 🎯 Test Login/Signup Flow

### Step 1: Hard Refresh Browser
**Press:** `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

### Step 2: Verify API URL in Console
Should show:
```
🌐 API URL: http://localhost:5000/api
```

### Step 3: Test Signup (Recommended for First Time)
1. Click "Sign Up" button
2. Fill Company Info (Step 1):
   - Company Name: Test Company
   - Email: test@example.com
   - Phone: +91 9999999999
   - Contact Person: Test Person
   - Business Type: Business/Company

3. Click "Continue" → Step 2
4. Fill Business Details:
   - Address: 123 Main St
   - City: Mumbai
   - State: Maharashtra
   - Pincode: 400001
   - Business Description: Testing RitzYard
   - Products: Steel, Cement
   - Years in Business: 2

5. Click "Continue" → Step 3
6. Upload PAN Card (required)
7. Accept Terms & Conditions
8. Click "Submit"

### Step 4: Success!
- 🎉 Success Modal appears
- Click "Continue"
- Auto-redirect to Login Screen

### Step 5: Login with Created Account
- Email: test@example.com
- Password: (use the password you set during signup)
- Click "Login"
- 🎉 Success Modal
- Click "Continue"
- 🏠 Home Screen appears

## 🔄 Switch Between Environments

### Use Local Backend:
```bash
# .env should have:
EXPO_PUBLIC_API_URL=http://localhost:5000/api

# Make sure backend is running:
cd C:\Users\yurek\OneDrive\Desktop\suppliermatrix\backendmatrix
npm run dev
```

### Use Production Backend:
```bash
# .env should have:
EXPO_PUBLIC_API_URL=https://backendmatrix.onrender.com/api

# Restart Expo:
npx expo start --clear
```

## 📱 Test Credentials (Production)
- Email: soniajaiswal2222@gmail.com
- Password: (ask for password or use signup)

## ✨ Features Implemented
- ✅ Step-by-step supplier onboarding
- ✅ File uploads (PAN, Aadhaar, Bank Proof)
- ✅ Enhanced UI with gradients & glass effects
- ✅ Success modals after login/signup
- ✅ Local + production backend support
- ✅ Form validation
- ✅ Email validation
- ✅ Radio button business type selector

## 🐛 Troubleshooting

### Still seeing production API URL?
1. Hard refresh browser: `Ctrl + Shift + R`
2. Check `.env` file: `EXPO_PUBLIC_API_URL=http://localhost:5000/api`
3. Restart Expo: `npx expo start --clear`

### Getting 401 Unauthorized?
- You're on the correct endpoint ✅
- The email/password doesn't exist
- Create a new account via signup

### Getting 400 Bad Request?
- Check PAN file is uploaded
- Verify all required fields are filled
- Check console for detailed error

## 📞 Support
For issues, check:
1. Console logs (browser developer tools)
2. Backend logs (terminal running `npm run dev`)
3. Network tab (check API requests)
