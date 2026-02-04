# GitHub Upload Procedure

This guide explains exactly what files should be uploaded to GitHub and which ones must stay local to ensure your project is secure and efficient.

## ⛔  What NOT to Upload (Ignored Files)

These files/folders should **NEVER** be committed to GitHub. Your `.gitignore` file already handles this, but it's good to know why.

| Folder / File | Why Ignore? |
| :--- | :--- |
| **`node_modules/`** | Contains thousands of heavy dependency files. Users install these themselves with `npm install`. |
| **`dist/`** | The "build" folder. It is auto-generated every time you build. We commit *source code*, not built code. |
| **`.env`** | **CRITICAL!** Contains your secret API keys (Supabase keys). Never share this publicly. |
| **`.DS_Store`** | Useless Mac system file. |
| **`.vscode/`** | Your personal editor settings (optional, but usually ignored). |

---

## ✅ What TO Upload (Source Code)

These are the files that make up your application. These **MUST** be on GitHub.

- **`src/`** (All your React code, components, pages)
- **`public/`** (Static assets like images, icons, and **Extensions**)
  - *Ensure `public/extensions/` (Guitar Tuner) is included!*
  - *Ensure `public/assets/` (Tuner Backgrounds) is included!*
- **`package.json`** & **`package-lock.json`** (Tells others which dependencies to install)
- **`vite.config.ts`** (Build configuration)
- **`tsconfig.json`** (TypeScript configuration)
- **`index.html`** (Main entry point)
- **`*.md`** (Readme, setup guides, docs)

---

## 🚀 How to Upload (Step-by-Step)

Open your terminal in the project folder (`F:\jEROEM mOSES\Gyaviira Official Site`) and run these commands.

### 1. Check Status
See what has changed.
```bash
git status
```
*Ref: You should see modified files in red.*

### 2. Stage Changes
Prepare ALL safe files for upload. (Because `.gitignore` exists, this command safely ignores the bad stuff).
```bash
git add .
```

### 3. Commit Changes
Save the snapshot with a message.
```bash
git commit -m "Update account system and fix build scripts"
```

### 4. Push to GitHub
Send everything to the cloud.
```bash
git push origin main
```

---

## ❓ FAQ

**Q: "I see `node_modules` in my git status!"**
**A:** This means it wasn't ignored properly before. Run this one-time fix:
```bash
git rm -r --cached node_modules
git commit -m "Remove node_modules from git tracking"
```

**Q: "How do I deploy if `dist` isn't on GitHub?"**
**A:** Hosting services like Netlify or Vercel will effectively run `npm install` and `npm run build` on their own servers using your source code. They build the `dist` folder themselves!
- [ ] `src/pages/AdminPanel.tsx`
- [ ] `src/pages/extensions/*`
- [ ] `SQL_UPDATE.md`
- [ ] `UPLOAD_PROCEDURE.md` (Update self)
