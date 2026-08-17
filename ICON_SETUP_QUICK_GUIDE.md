# Quick Icon Setup Guide - RitzYard

## 📱 What You Need to Do

Replace 4 logo image files with your custom logo. That's it!

---

## Step-by-Step Instructions

### Step 1: Get Your Logo Ready

Your logo file should be:
- ✅ **Format**: PNG
- ✅ **Size**: 1024 × 1024 pixels  
- ✅ **Background**: Transparent (for foreground images)
- ✅ **Logo centered** with 20% padding around edges

**Don't have the right size?** Use: https://easyappicon.com/

1. Upload your logo
2. Download Android Icon Pack
3. Extract the files

---

### Step 2: Locate the Icon Folder

Navigate to:
```
yurekhmatrix-mobile/assets/images/
```

You'll see these files (these are what we're replacing):
```
📁 assets/images/
├── icon.png                      ← REPLACE THIS
├── android-icon-foreground.png  ← REPLACE THIS
├── android-icon-background.png  ← REPLACE THIS
├── android-icon-monochrome.png  ← REPLACE THIS
└── splash-icon.png              ← (optional, for splash screen)
```

---

### Step 3: Replace the Files

Use your prepared logo files:

| File to Replace | Your Logo File | Purpose |
|-----------------|----------------|---------|
| `icon.png` | Your main logo | App icon in launcher |
| `android-icon-foreground.png` | Your logo (transparent bg) | Logo displayed on top |
| `android-icon-background.png` | Solid color PNG | Background color layer |
| `android-icon-monochrome.png` | Black & white logo | Monochrome version |

**How to replace:**
1. Delete old files (or backup first)
2. Copy your new logo files into the folder
3. Rename them to match the names above exactly

**Example:**
```
If you have: my-logo.png
Rename to: icon.png
Place in: yurekhmatrix-mobile/assets/images/
```

---

### Step 4: Create Background File

If you don't have a background image file:

**Option A: Use Online Generator**
1. Go to: https://www.pixlr.com/ or similar
2. Create 1024×1024 canvas
3. Fill with your brand color (e.g., #E6F4FE)
4. Export as PNG
5. Save as `android-icon-background.png`

**Option B: Use Simple Command** (Windows)
Create a simple solid color background using Python or any image editor.

---

### Step 5: Create Monochrome Version

This is a black & white version of your logo.

**How to create:**
1. Open your logo in any image editor (Photoshop, GIMP, Canva, etc.)
2. Convert to grayscale/black & white
3. Save as PNG
4. Rename to `android-icon-monochrome.png`

**Or use online tool:**
- https://pixlr.com (has B&W filter)
- https://photopea.com (free Photoshop clone)

---

### Step 6: Verify Your Changes

After replacing files, your folder should look like:
```
📁 assets/images/
├── icon.png                      ✅ (your logo)
├── android-icon-foreground.png  ✅ (your logo)
├── android-icon-background.png  ✅ (solid color)
├── android-icon-monochrome.png  ✅ (black & white)
└── ...other files...
```

---

### Step 7: Test the Icons

Before building, test locally:

```powershell
cd yurekhmatrix-mobile
npm run android
# Or test on web:
npm run web
```

When you run the app, you should see your new logo as the app icon!

---

## Icon Requirements Checklist

- ✅ PNG format (24-bit with alpha for transparency)
- ✅ Size: 1024×1024 pixels minimum
- ✅ Foreground: Logo centered, transparent background
- ✅ Background: Solid color PNG
- ✅ Monochrome: Black and white version
- ✅ No rounded corners (system adds them)
- ✅ Clear and recognizable at small sizes
- ✅ Logo positioned in center 66% of canvas

---

## App Icon Appearance

### How Icons Look on Android

Your adaptive icon will appear as:

```
      [Dark background]
              |
      [Your logo centered]
              |
         (Android rounds corners)
              |
      [Final icon shown to user]
```

---

## File Location Reference

```
yurekhmatrix-mobile/
├── app.json                    ← Already configured!
├── assets/
│   ├── images/
│   │   ├── icon.png           ← Replace
│   │   ├── android-icon-foreground.png    ← Replace
│   │   ├── android-icon-background.png    ← Replace
│   │   ├── android-icon-monochrome.png    ← Replace
│   │   └── splash-icon.png               ← (optional)
│   └── ritzlogo.png                       ← Web favicon (optional)
└── ...other files...
```

---

## Common Issues & Fixes

### ❌ Icon still shows old logo
- **Solution**: Clear app cache and reinstall
  ```powershell
  npm run android -- --clear
  ```

### ❌ Icon looks blurry
- **Solution**: Ensure PNG is exactly 1024×1024 px
- Use image editor to check dimensions

### ❌ Logo cut off or distorted
- **Solution**: Ensure logo is centered with padding
- Logo should fit in center 66% of canvas

### ❌ Background color wrong
- **Solution**: Edit `app.json` and change `backgroundColor`
  ```json
  "android": {
    "adaptiveIcon": {
      "backgroundColor": "#E6F4FE"  ← Change this
    }
  }
  ```

### ❌ Error: "File not found"
- **Solution**: Check file names match exactly (case-sensitive)
- Ensure files are in: `assets/images/` folder

---

## Next Steps

1. ✅ Prepare your logo files (4 files)
2. ✅ Replace icon files in `assets/images/`
3. ✅ Test locally: `npm run android`
4. ✅ When ready to publish:
   - See: `PLAYSTORE_PUBLISHING_GUIDE.md`

---

## File Sizes

Typical file sizes:
- `icon.png`: 100-400 KB
- `android-icon-foreground.png`: 20-100 KB
- `android-icon-background.png`: 5-20 KB
- `android-icon-monochrome.png`: 5-20 KB

---

## Still Need Help?

**Create Icon Files Online (Easiest)**
1. https://easyappicon.com/
2. https://appicon.co/
3. Upload your logo once, download all sizes

**Design Software**
- Free: Canva.com, Pixlr.com, GIMP
- Paid: Photoshop, Adobe Creative Suite

**Documentation**
- Expo: https://docs.expo.dev/
- Android: https://developer.android.com/guide/practices/ui_guidelines

---

**Remember**: Your icon files are just PNG images - no coding needed! Just replace the 4 files and you're done. 🎉
