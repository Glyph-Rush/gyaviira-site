# 🚀 Deployment Guide - Gyaviira Official Site

This guide ensures your Supabase integration works properly when deploying to production (Netlify, Vercel, GitHub Pages, etc.).

## ✅ Pre-Deployment Checklist

### 1. **Git Configuration (IMPORTANT)**

Make sure `node_modules` is NOT being tracked by git:

```bash
# If you previously committed node_modules, remove it from git:
git rm -r --cached node_modules
git rm -r --cached dist

# Commit the changes
git add .gitignore
git commit -m "Remove node_modules and dist from version control"
git push
```

Your [`.gitignore`](file:///F:/jEROEM%20mOSES/Gyaviira%20Official%20Site/.gitignore) already includes:
- ✅ `node_modules`
- ✅ `dist`
- ✅ `.env.local`
- ✅ `.env`

### 2. **Supabase Configuration**

Your Supabase credentials are configured in [`src/lib/supabase.ts`](file:///F:/jEROEM%20mOSES/Gyaviira%20Official%20Site/src/lib/supabase.ts):

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gxrfxbjqlbaexbxmfvdi.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGci...';
```

**This works both ways:**
- ✅ **Local Development**: Uses fallback hardcoded values
- ✅ **Production**: Can use environment variables from hosting platform

---

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)

#### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### Step 2: Deploy on Netlify

1. Go to [Netlify](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub account
4. Select your `Gyaviira Official Site` repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

#### Step 3: Set Environment Variables (Optional)

In Netlify Dashboard → Site Settings → Environment Variables, add:
- `VITE_SUPABASE_URL` = `https://gxrfxbjqlbaexbxmfvdi.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (your full key)

> **Note**: This step is optional since fallback values are already in the code.

#### Step 4: Deploy

Click **"Deploy site"** and Netlify will:
1. Clone your repository
2. Run `npm install` (installs all dependencies from `package.json`)
3. Run `npm run build` (creates production build)
4. Deploy the `dist` folder

**Your site will be live!** 🎉

---

### Option 2: Vercel

#### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### Step 2: Deploy on Vercel

1. Go to [Vercel](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Vite configuration
5. Click **"Deploy"**

#### Step 3: Environment Variables (Optional)

In Vercel Dashboard → Settings → Environment Variables:
- `VITE_SUPABASE_URL` = `https://gxrfxbjqlbaexbxmfvdi.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

### Option 3: GitHub Pages (Manual Build)

#### Step 1: Build Locally
```bash
npm run build
```

#### Step 2: Deploy to GitHub Pages

1. Install `gh-pages` package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add deploy script to `package.json`:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

4. Enable GitHub Pages:
   - Go to your repository → **Settings** → **Pages**
   - Source: `gh-pages` branch
   - Save

---

## 🗄️ Supabase Features Configured

Your deployment includes these Supabase-powered features:

### 1. **Authentication System** ([`AuthContext.tsx`](file:///F:/jEROEM%20mOSES/Gyaviira%20Official%20Site/src/context/AuthContext.tsx))
- ✅ Email/Password signup and login
- ✅ Username or email login support
- ✅ User profiles with avatars and bios
- ✅ Admin role system
- ✅ Pre-configured admin accounts:
  - `jeromemoses220@gmail.com`
  - `assist@gyaviira.com` (Password: `Luganda_pop_345`)

### 2. **Community Chat** ([`CommunityChat.tsx`](file:///F:/jEROEM%20mOSES/Gyaviira%20Official%20Site/src/pages/CommunityChat.tsx))
- ✅ Real-time messaging with Supabase Realtime
- ✅ Multiple channels (General, Music, Events)
- ✅ User profile pictures in chat
- ✅ Admin badges
- ✅ Row Level Security (RLS) policies

### 3. **Store & Cart System** ([`CartContext.tsx`](file:///F:/jEROEM%20mOSES/Gyaviira%20Official%20Site/src/context/CartContext.tsx))
- ✅ Product catalog from Supabase
- ✅ Shopping cart with localStorage
- ✅ Order history tracking
- ✅ Cart persistence across sessions

### 4. **Account Dashboard** ([`AccountHub.tsx`](file:///F:/jEROEM%20mOSES/Gyaviira%20Official%20Site/src/pages/AccountHub.tsx))
- ✅ User profile management
- ✅ Order history
- ✅ Notification preferences
- ✅ Profile picture updates

---

## 🔐 Security Notes

### What's Safe to Commit:

✅ **Supabase anon/public key** - Safe to expose in frontend code  
✅ **Supabase URL** - Public endpoint  
✅ `package.json` and `package-lock.json` - Dependency manifest

### What's Protected:

❌ **`node_modules`** - Ignored by `.gitignore`  
❌ **`.env.local`** - Ignored by `.gitignore`  
❌ **`dist`** - Ignored by `.gitignore` (build output)  
❌ **Supabase service role key** - NEVER commit this (not used in frontend)

> **Note**: The anon key is designed to be public. Row Level Security (RLS) policies in your Supabase database protect your data.

---

## 🧪 Testing Deployment

After deployment, test these features:

1. ✅ Navigate to different pages (`/store`, `/about`, `/chat`)
2. ✅ Press **F5** to reload - should stay on same page
3. ✅ Sign up for a new account
4. ✅ Log in with existing credentials
5. ✅ Send a message in Community Chat
6. ✅ Add items to cart
7. ✅ View account dashboard
8. ✅ Log out and log back in

---

## 🛠️ Troubleshooting

### Issue: "Failed to fetch" errors

**Solution**: Check Supabase project status at https://supabase.com/dashboard

### Issue: Authentication not working

**Solution**: Verify database schema is set up correctly (see [`SUPABASE_SETUP.md`](file:///F:/jEROEM%20mOSES/Gyaviira%20Official%20Site/SUPABASE_SETUP.md))

### Issue: Chat messages not appearing

**Solution**: Enable Realtime replication for `messages` table in Supabase Dashboard

### Issue: Deploy fails with "module not found"

**Solution**: Make sure you committed `package.json` and `package-lock.json`:
```bash
git add package.json package-lock.json
git commit -m "Add dependency files"
git push
```

---

## 📦 What Gets Deployed

When you push to GitHub and deploy:

1. **GitHub stores**: Source code only (no `node_modules`)
2. **Hosting platform downloads**: Your repository
3. **Hosting platform runs**: `npm install` (recreates `node_modules`)
4. **Hosting platform builds**: `npm run build` (creates `dist` folder)
5. **Hosting platform serves**: The `dist` folder to visitors

This is why `node_modules` doesn't need to be in GitHub! 🎯

---

## 🎉 You're Ready!

Your Gyaviira site is configured for production deployment with:
- ✅ Supabase backend integration
- ✅ Authentication system
- ✅ Real-time community chat
- ✅ Shopping cart and orders
- ✅ User profiles and admin panel
- ✅ Proper SPA routing (page reload fix)
- ✅ Optimized for hosting platforms

**Choose your deployment platform above and go live!** 🚀
