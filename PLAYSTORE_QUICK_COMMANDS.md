# Play Store Publishing: Quick Command Guide

## 🎯 Quick Timeline

```
Day 1:  Icon setup → Local test → Build production → Submit ($25)
Day 2:  Review complete → App goes live!
```

---

## 📱 PHASE 1: SETUP ICONS (5 mins)

### Get Icon Files
```
Option A (Easiest): https://easyappicon.com/
- Upload your logo
- Download Android Icon Pack
- Extract files

Option B (Manual):
- Create 1024×1024 PNG files
- Use Canva, Pixlr, or Photoshop
```

### Replace Files
```
Location: yurekhmatrix-mobile/assets/images/

Delete old files:
- icon.png
- android-icon-foreground.png
- android-icon-background.png
- android-icon-monochrome.png

Copy your new files with same names
```

**Time**: 5 minutes

---

## 🔧 PHASE 2: BUILD FOR PRODUCTION (30 mins)

### Install EAS CLI
```powershell
npm install -g eas-cli
```

### Login to Expo
```powershell
eas login
# Enter your Expo email and password
# Create account at https://expo.dev if needed
```

### Test Locally (Optional)
```powershell
cd c:\Users\yurek\OneDrive\Desktop\suppliermatrix\yurekhmatrix-mobile
npm run android
# Check icons, test features
# Press 'q' to exit
```

### Build Production App
```powershell
cd c:\Users\yurek\OneDrive\Desktop\suppliermatrix\yurekhmatrix-mobile
eas build --platform android --profile production
```

**What to do while waiting** (10-20 mins):
- The build uploads to cloud
- You'll get a download link
- Download the `.aab` file
- Save to Desktop

**Output**: `.aab` file (30-50 MB)

---

## 💳 PHASE 3: CREATE PLAY STORE ACCOUNT (10 mins, $25)

### Go to Google Play Console
```
https://play.google.com/console
```

### Create Account
1. Click "Create account"
2. Sign in with Google
3. Enter info:
   - Developer name
   - Email
   - Phone
4. **Pay $25**
5. Accept agreements

---

## 📝 PHASE 4: CREATE APP IN CONSOLE (5 mins)

### Create New App
```
In Google Play Console:
1. Click "Create app"
2. App name: "RitzYard"
3. Default language: English
4. App type: Apps
5. Click "Create"
```

---

## 🧪 PHASE 5: UPLOAD TO INTERNAL TESTING (10 mins)

### Test Upload
```
In Google Play Console:

1. Go to: Testing → Internal Testing
2. Click: "Create new release"
3. Click: "Upload APK or App Bundle"
4. Select: Your .aab file
5. Review the details
6. Click: "Create release"
7. Add notes: "Initial test release"
8. Click: "Submit"

Done! Wait for upload to complete.
```

### Invite Testers
```
1. Go to: Internal Testing
2. Click: "Manage testers"
3. Add your email
4. Get test link
5. Open link on Android device
6. Install app
7. Test everything works
```

**Time**: 10 minutes

---

## 🎨 PHASE 6: FILL STORE LISTING (20 mins)

### Add Screenshots
```
In Google Play Console:

1. Go to: Store presence → App store listing
2. Scroll to: "Manage screenshots"
3. Upload 2-8 screenshots (1080×1920 px)
4. Examples:
   - Login screen
   - Dashboard
   - Product browsing
   - Quote management
5. Add captions (optional)
```

### Add Feature Graphic
```
Size: 1024×500 px
- Show app name
- Show main benefit
- Show logo/branding
- Upload to console
```

### Write Descriptions
```
Short description (80 chars max):
"Premium B2B procurement platform"

Full description (up to 4000 chars):
RitzYard: Your B2B Procurement Platform

Features:
✓ Search products
✓ Request quotes
✓ AI recommendations
✓ Payment processing
✓ Order tracking
✓ 24/7 support

Perfect for construction, manufacturing, distributors.
```

### Add Privacy Policy
```
1. Create privacy policy (use template from PrivacyPolicies.com)
2. Upload to website or Google Sites
3. Get URL
4. In console: Add privacy policy URL
```

### Set Content Rating
```
1. Click "Manage content rating"
2. Answer questionnaire (20 questions)
3. Submit
4. Get rating (Everyone, 12+, 16+, 18+)
```

### Configure Pricing
```
1. Go to: Pricing and distribution
2. Select: "Free" (or "Paid")
3. Select: Countries (all by default)
4. Save
```

**Time**: 20 minutes

---

## 🚀 PHASE 7: SUBMIT FOR REVIEW (2 minutes)

### Upload Production Build
```
In Google Play Console:

1. Go to: Releases → Production
2. Click: "Create new release"
3. Upload: Your .aab file (same file)
4. Review everything
```

### Final Checklist
```
Before submitting, verify:
✅ App icon shows your logo
✅ Screenshots added (2-8)
✅ Feature graphic added
✅ Description filled
✅ Content rating done
✅ Privacy policy added
✅ Pricing set
✅ Countries selected
✅ No major bugs
```

### Submit!
```
1. Click: "Review release"
2. Review summary
3. Click: "Submit for review"

Status changes to: "Pending review"
```

**Time**: 2 minutes

---

## ⏳ PHASE 8: WAIT FOR APPROVAL (2-24 hours)

### Monitor Status
```
Check Google Play Console:
- Dashboard shows submission status
- Email updates sent to you
- Usually approved in 2-24 hours
```

### If Approved ✅
```
Status changes to: "Approved"
Your app is now LIVE!
- Users can download
- View in Play Store
- Install on their devices
```

### If Rejected ❌
```
You'll get email explaining why
Common reasons:
- Misleading description
- Copyright/trademark issue
- Poor quality screenshots
- Missing information

Fix and resubmit - faster next time!
```

---

## 📊 AFTER LAUNCH

### View Analytics
```
In Google Play Console:
- Downloads count
- User ratings
- Reviews
- Crash reports
- Performance metrics
```

### Publish Updates
```
When you want to update:

1. Edit app code
2. Increment version:
   {
     "version": "1.0.1",
     "versionCode": 2
   }
3. Rebuild: eas build --platform android
4. Upload new .aab
5. Update release notes
6. Submit (usually faster)
```

---

## 🐛 TROUBLESHOOTING QUICK FIXES

### Build Fails
```powershell
npm install
npm cache clean --force
npm install -g eas-cli@latest
eas build --platform android --profile production
```

### Icon Wrong
```
1. Check PNG is 1024×1024 px
2. Ensure transparent background (foreground)
3. Replace files again
4. Clear app cache
```

### Can't Find Console
```
Direct link: https://play.google.com/console
```

### Email Not Received
```
Check:
1. Spam folder
2. Google account settings
3. Try direct link to console
```

---

## 💰 COST BREAKDOWN

| Item | Cost |
|------|------|
| Developer Account (one-time) | $25 |
| App listing | Free |
| Google Play fees (per transaction) | 15-30% |
| EAS Build | Free (up to 30 builds/month) |
| **Total to publish** | **$25** |

---

## ⏱️ TOTAL TIME ESTIMATE

```
Icon creation:           15-30 mins
Build production:        15-20 mins (mostly waiting)
Play Store setup:        5-10 mins
Fill store listing:      20-30 mins
Submit:                  2-5 mins
                         ─────────
Total:                   1-1.5 hours
(then wait 2-24h for approval)
```

---

## 📋 CHECKLIST

- [ ] Icon files ready (4 PNG files)
- [ ] Icons replaced in `assets/images/`
- [ ] EAS CLI installed
- [ ] Logged in to Expo
- [ ] Local test passed
- [ ] Production build downloaded
- [ ] Google Play Developer account created ($25)
- [ ] App created in Play Console
- [ ] Internal testing completed
- [ ] Screenshots ready (2-8 images)
- [ ] Feature graphic ready
- [ ] Description written
- [ ] Privacy policy ready
- [ ] Content rating completed
- [ ] Pricing configured
- [ ] Production build uploaded
- [ ] Submitted for review
- [ ] Waiting for approval... ⏳

---

## COMMAND COPY-PASTE

```powershell
# Install tools
npm install -g eas-cli

# Login
eas login

# Go to project
cd c:\Users\yurek\OneDrive\Desktop\suppliermatrix\yurekhmatrix-mobile

# Test locally (optional)
npm run android

# Build production
eas build --platform android --profile production

# Then go to Play Console:
# https://play.google.com/console
```

---

## KEY LINKS

- **EAS Build Docs**: https://docs.expo.dev/eas-update/getting-started/
- **Google Play Console**: https://play.google.com/console
- **Icon Generator**: https://easyappicon.com/
- **Privacy Policy Template**: https://www.privacypolicies.com/
- **Android Guidelines**: https://developer.android.com/guide/practices/ui_guidelines

---

## SUPPORT

If stuck:
1. Check Expo docs: https://docs.expo.dev
2. Google Play Help: https://support.google.com/googleplay
3. Stack Overflow: Search your error
4. Expo Forums: https://forums.expo.dev

---

**Ready? Let's get your app published! 🚀**
