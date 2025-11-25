# 🚀 Quick Start: Deploy to Vercel

**Fastest way to get your site live on Vercel!**

---

## ⚡ Quick Steps (5 minutes)

### 1. Push Code to GitHub

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Ready for Vercel deployment"

# Create repo on GitHub, then:
git remote add origin https://github.com/yourusername/stripe-press-style.git
git branch -M main
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up/Login
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Click **"Deploy"** (we'll add env vars next)

### 3. Add Environment Variables

**In Vercel Dashboard:**
- Go to **Settings** → **Environment Variables**
- Add these two variables:

```
DATABASE_URL = libsql://paschima-web-paschima.aws-ap-south-1.turso.io
TURSO_AUTH_TOKEN = <generate-new-token>
```

**Generate new token:**
```bash
~/.turso/turso db tokens create paschima-web
```

### 4. Redeploy

- Go to **Deployments** tab
- Click **⋯** (three dots) on latest deployment
- Click **Redeploy**

### 5. Done! 🎉

Your site is live at: `https://your-project.vercel.app`

---

## ✅ Pre-Deployment Checklist

- [x] Build works locally (`npm run build` ✅)
- [x] Code pushed to GitHub
- [ ] Environment variables added in Vercel
- [ ] Production token generated
- [ ] Site deployed and tested

---

## 📖 Full Guide

See `VERCEL_DEPLOYMENT.md` for detailed instructions.

---

**That's it! Your site will be live in minutes!** 🚀



