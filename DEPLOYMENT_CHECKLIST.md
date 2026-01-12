# ✅ Pre-Deployment Checklist

Quick checklist before deploying your Gyaviira site to production.

## 🚀 Ready to Deploy?

### Step 1: Clean Up Git Repository

- [ ] Remove `node_modules` from git tracking (if previously committed):
  ```bash
  git rm -r --cached node_modules
  git rm -r --cached dist
  ```

- [ ] Verify `.gitignore` includes:
  - [x] `node_modules`
  - [x] `dist`
  - [x] `.env.local`
  - [x] `.env`

- [ ] Commit and push changes:
  ```bash
  git add .
  git commit -m "Prepare for deployment"
  git push origin main
  ```

### Step 2: Verify Supabase Setup

- [ ] Database tables created (profiles, messages, products, orders)
- [ ] Row Level Security (RLS) policies enabled
- [ ] Realtime enabled for `messages` table
- [ ] Admin accounts configured in trigger function
- [ ] Sample products inserted (optional)

See [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md) for details.

### Step 3: Test Locally

- [ ] Run `npm run build` successfully
- [ ] Test production build: `npm run preview`
- [ ] Verify all pages load correctly
- [ ] Test authentication (signup/login)
- [ ] Test community chat
- [ ] Test shopping cart

### Step 4: Choose Deployment Platform

Pick one:

#### Option A: Netlify (Recommended)
- [ ] Connect GitHub repository
- [ ] Set build command: `npm run build`
- [ ] Set publish directory: `dist`
- [ ] (Optional) Add environment variables
- [ ] Deploy

#### Option B: Vercel
- [ ] Import GitHub repository
- [ ] Auto-detect Vite settings
- [ ] (Optional) Add environment variables
- [ ] Deploy

#### Option C: GitHub Pages
- [ ] Run `npm run build`
- [ ] Install `gh-pages`: `npm i -D gh-pages`
- [ ] Add deploy script to `package.json`
- [ ] Run `npm run deploy`
- [ ] Enable Pages in repo settings

### Step 5: Post-Deployment Testing

Once deployed, test:

- [ ] Navigate to `/store`, `/about`, `/chat`
- [ ] Press F5 to reload - stays on same page ✅
- [ ] Sign up for new account
- [ ] Log in with credentials
- [ ] Send chat message
- [ ] Add item to cart
- [ ] View account dashboard
- [ ] Log out and back in

### Step 6: Final Verification

- [ ] All Supabase features working
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Fast load times
- [ ] SSL certificate active (HTTPS)

---

## 📋 Files to Commit

**Required files** (must be in git):
- ✅ `package.json`
- ✅ `package-lock.json`
- ✅ `vite.config.ts`
- ✅ `src/` directory
- ✅ `public/` directory
- ✅ `.gitignore`
- ✅ `README.md`

**Should NOT be committed**:
- ❌ `node_modules/` (ignored)
- ❌ `dist/` (ignored)
- ❌ `.env.local` (ignored)

---

## 🎯 Quick Commands

```bash
# Build and test locally
npm run build && npm run preview

# Check for errors
npm run lint

# Deploy to GitHub
git add .
git commit -m "Deploy to production"
git push

# Deploy to GitHub Pages (after setup)
npm run deploy
```

---

## 🆘 Having Issues?

See [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) for detailed troubleshooting.

---

**You're all set! 🚀 Choose your platform and deploy!**
