# 🎵 Gyaviira Music Foundation - Official Website

A premium Next-Gen music foundation platform built with React, TypeScript, and Supabase, featuring real-time chat, e-commerce, and comprehensive user management.

![Status](https://img.shields.io/badge/status-production%20ready-success)
![Framework](https://img.shields.io/badge/framework-React%2019-blue)
![Backend](https://img.shields.io/badge/backend-Supabase-green)

---

## ✨ Features

### 🎨 Premium Black & Gold Design
- Stunning glassmorphism effects
- Smooth animations with Framer Motion
- Mobile-responsive across all pages
- Dynamic background effects

### 🔐 Authentication System
- Email/password signup and login
- Username or email login support
- User profiles with avatars and bios
- Role-based access control (User/Admin)
- Pre-configured admin accounts

### 💬 Real-Time Community Chat
- Live messaging with Supabase Realtime
- Multiple channels (General, Music, Events)
- User profile pictures and badges
- Admin moderation tools
- Row Level Security (RLS)

### 🛒 E-Commerce Store
- Product catalog powered by Supabase
- Shopping cart with persistence
- Checkout system
- Order history tracking
- Stock management
- **Merch Store**: Digital storefront with cart and checkout integration.
- **Extensions Suite**: **New!** Professional-grade instrument tuner (Guitar, Bass, Violin, Cello) running on the Web Audio API.
- **Admin Dashboard**: Comprehensive management for orders and community moderation.

### 👤 User Dashboard
- Profile management
- Order history
- Notification preferences
- Account settings

### 🤖 Rhythm AI Chatbot
- Advanced knowledge base
- Content moderation system
- Slash commands
- Context-aware responses

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier works)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd "Gyaviira Official Site"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase** (if not already done)
   - Follow instructions in [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md)
   - Your database schema and policies are already configured

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   - Navigate to `http://localhost:5173`

---

## 📦 Deployment

**Ready to deploy?** See the comprehensive [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) for step-by-step instructions.

### Quick Deploy Options:

#### Netlify (Recommended)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

- Build command: `npm run build`
- Publish directory: `dist`

#### Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

- Framework: Vite
- Auto-detected configuration

---

## 🗂️ Project Structure

```
Gyaviira Official Site/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── RhythmChat.tsx
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── Home.tsx
│   │   ├── Store.tsx
│   │   ├── CommunityChat.tsx
│   │   ├── AccountHub.tsx
│   │   └── ...
│   ├── context/           # React contexts
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   ├── lib/
│   │   └── supabase.ts    # Supabase client config
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── public/                # Static assets
├── SUPABASE_SETUP.md      # Database setup guide
├── DEPLOYMENT_GUIDE.md    # Deployment instructions
└── package.json           # Dependencies
```

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Supabase
  - Authentication
  - PostgreSQL Database
  - Real-time Subscriptions
  - Row Level Security
- **Routing**: React Router v7

---

## 🔧 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

---

## 🔐 Admin Access

Pre-configured admin accounts:
- `jeromemoses220@gmail.com`
- `assist@gyaviira.com` (Password: `Luganda_pop_345`)

**Keyboard Shortcut**: Press `Ctrl + Shift + A` to access admin panel

---

## 🌐 Key Pages

- **Home** (`/`) - Landing page with hero section
- **About** (`/about`) - Mission and team information
- **Store** (`/store`) - E-commerce product catalog
- **Community Chat** (`/chat`) - Real-time messaging
- **Gallery** (`/gallery`) - Media showcase
- **Account Hub** (`/account`) - User dashboard
- **Admin Panel** (`/admin`) - Administrative tools

---

## 📝 Environment Variables

The app uses fallback values but you can optionally create `.env.local`:

```env
VITE_SUPABASE_URL=https://gxrfxbjqlbaexbxmfvdi.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

See [`.env.example`](./.env.example) for template.

> **Note**: The Supabase anon key is safe to expose in frontend code. Your data is protected by Row Level Security (RLS) policies.

---

## 🐛 Troubleshooting

### Node Modules Issue
If you see errors about missing modules:
```bash
npm install
```

### Page Refresh Goes to Home
This is fixed! The app now properly handles client-side routing.

### Supabase Connection Issues
1. Verify your Supabase project is active
2. Check credentials in `src/lib/supabase.ts`
3. See [`GET_SUPABASE_KEY.md`](./GET_SUPABASE_KEY.md) for key instructions

---

## 📄 License

All rights reserved © 2026 Gyaviira Music Foundation

---

## 👨‍💻 Developer

**Jerome Moses**
- GitHub: [@your-github]
- Email: jeromemoses220@gmail.com

---

## 🤝 Contributing

This is a private project for the Gyaviira Music Foundation. For inquiries, contact the development team.

---

## 📚 Additional Resources

- [Supabase Setup Guide](./SUPABASE_SETUP.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Get Supabase Key](./GET_SUPABASE_KEY.md)

---

**Built with ❤️ for the Gyaviira Music Foundation**
