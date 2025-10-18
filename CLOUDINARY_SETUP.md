# 📸 Cloudinary Image Upload Setup Guide

## ✅ What's Been Implemented

Image upload functionality is now integrated in your portfolio!

### Features:

- ✅ Image upload widget in admin
- ✅ Drag & drop support
- ✅ Image preview
- ✅ Remove image functionality
- ✅ Displays images on frontend
- ✅ Works for Projects (can add to Testimonials too)

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Cloudinary Account

1. Go to: https://cloudinary.com
2. Click "**Sign Up**" (it's FREE!)
3. Choose the **Free Plan** (25 GB storage, 25 GB bandwidth/month)
4. Verify your email

### Step 2: Get Your Credentials

After signing up:

1. Go to **Dashboard**: https://console.cloudinary.com
2. You'll see your credentials:
   - **Cloud Name** (e.g., `dxxxxx123`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (click "👁️ View" to reveal)

### Step 3: Update `.env` File

Add these to your `.env` file:

```env
# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name-here"
CLOUDINARY_API_KEY="your-api-key-here"
CLOUDINARY_API_SECRET="your-api-secret-here"
```

**Replace with your actual values!**

### Step 4: Create Upload Preset

1. In Cloudinary Dashboard, go to: **Settings** → **Upload**
2. Scroll to "**Upload presets**"
3. Click "**Add upload preset**"
4. Set:
   - **Preset name:** `portfolio_uploads` (or any name)
   - **Signing Mode:** `Unsigned`
   - **Folder:** `portfolio` (optional, for organization)
5. Click "**Save**"

### Step 5: Update Image Upload Component

Open `src/components/admin/ImageUpload.tsx` and change:

```typescript
// Line 58: Update this line
uploadPreset = "ml_default"; // ← Change this

// To your preset name:
uploadPreset = "portfolio_uploads"; // ← Your preset name
```

### Step 6: Restart Dev Server

Stop the server (Ctrl+C) and restart:

```bash
npm run dev
```

---

## ✅ Testing Image Upload

### **1. Go to Projects Admin:**

```
http://localhost:3001/admin/dashboard/projects
```

### **2. Click "Add Project" or "Edit"**

### **3. Scroll to "Project Image" field**

### **4. Click the Upload Area**

- Cloudinary widget opens
- Drag & drop image OR browse
- Image uploads automatically
- Preview appears

### **5. Save Project**

### **6. View Homepage**

```
http://localhost:3001
```

**Your project now has the image!** 🎉

---

## 🎨 Supported Image Formats

- ✅ PNG
- ✅ JPG/JPEG
- ✅ GIF
- ✅ WebP
- ✅ SVG

**Max size:** 10 MB (can be changed in Cloudinary settings)

---

## 🔧 Advanced Configuration (Optional)

### **Enable Transformations:**

In `src/components/admin/ImageUpload.tsx`, you can add:

```typescript
<CldUploadWidget
  uploadPreset="portfolio_uploads"
  options={{
    maxFileSize: 10000000, // 10MB
    maxImageWidth: 2000,
    maxImageHeight: 2000,
    sources: ['local', 'url', 'camera'],
    multiple: false,
    resourceType: 'image',
  }}
  onUpload={handleUpload}
>
```

### **Auto-Optimization:**

Cloudinary automatically:

- ✅ Optimizes image size
- ✅ Converts to WebP (modern browsers)
- ✅ Lazy loads images
- ✅ Responsive sizing
- ✅ CDN delivery (fast worldwide)

---

## 💰 Free Tier Limits

Cloudinary Free Plan:

- ✅ 25 GB storage
- ✅ 25 GB monthly bandwidth
- ✅ 25,000 transformations/month
- ✅ Unlimited images

**More than enough for a portfolio!**

---

## 🎯 Where Image Upload Works

Currently implemented in:

- ✅ **Projects admin page** (fully working)

Can easily be added to:

- ⏳ Testimonials (for client photos)
- ⏳ Hero section (for profile photo)
- ⏳ About section (for custom images)

---

## 🐛 Troubleshooting

### **Error: "Upload preset not found"**

- Create unsigned upload preset in Cloudinary
- Update preset name in `ImageUpload.tsx`

### **Error: "Invalid cloud name"**

- Check `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` in `.env`
- Must start with `NEXT_PUBLIC_` to work in browser
- Restart dev server after changing `.env`

### **Upload button doesn't work:**

- Check `.env` has correct cloud name
- Preset must be "unsigned"
- Restart dev server

### **Images not showing:**

- Check image URL is saved to database
- Check `next.config.ts` has Cloudinary in `images.domains`

---

## 🔒 Security Notes

### **Why "Unsigned" Preset?**

- Allows browser uploads without exposing API secret
- Safe for public forms
- Cloudinary validates on their end

### **Folder Organization:**

Set folder in upload preset to organize images:

- `portfolio/projects`
- `portfolio/testimonials`
- `portfolio/profile`

---

## 📝 Next.js Image Configuration

Add to `next.config.ts`:

```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};
```

---

## ✨ How It Works

```
User selects image
    ↓
Cloudinary widget opens
    ↓
Image uploads to Cloudinary
    ↓
Returns secure URL
    ↓
Saves URL to database
    ↓
Next.js Image component displays it
```

---

## 🎉 Benefits

- ✅ **No local storage** - Images on Cloudinary CDN
- ✅ **Auto-optimization** - Faster load times
- ✅ **Transformations** - Resize, crop, format conversion
- ✅ **Global CDN** - Fast worldwide
- ✅ **Free tier** - No cost for portfolios
- ✅ **Easy integration** - Works out of the box

---

## 📚 Resources

- Cloudinary Dashboard: https://console.cloudinary.com
- Cloudinary Docs: https://cloudinary.com/documentation
- Next-Cloudinary Docs: https://next-cloudinary.dev

---

## 🎯 Quick Start Summary

1. ✅ Sign up at cloudinary.com
2. ✅ Get cloud name, API key, secret
3. ✅ Add to `.env`
4. ✅ Create unsigned upload preset
5. ✅ Update preset name in code
6. ✅ Restart dev server
7. ✅ Upload images in admin!

**That's it! Image upload is ready to use!** 📸

---

## 🚀 Alternative: Local File Upload (Advanced)

If you don't want to use Cloudinary, you can:

1. Use Next.js API routes for file upload
2. Store in `/public/uploads` folder
3. Serve from your server

**But Cloudinary is recommended for:**

- Better performance
- Auto-optimization
- CDN delivery
- No server storage needed
