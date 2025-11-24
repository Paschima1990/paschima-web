# 🚀 Vercel Deployment Guide

Complete step-by-step guide to deploy your Stripe-Press-Style website to Vercel.

---

## 📋 Prerequisites

- ✅ Turso database set up (already done!)
- ✅ Code ready to deploy
- ✅ GitHub/GitLab/Bitbucket account
- ✅ Vercel account (free at [vercel.com](https://vercel.com))

---

## 🎯 Step 1: Prepare Your Code

### 1.1 Ensure Git Repository is Set Up

```bash
# Check if git is initialized
git status

# If not initialized, run:
git init
git add .
git commit -m "Initial commit - ready for deployment"
```

### 1.2 Push to GitHub/GitLab/Bitbucket

**Option A: Create New Repository on GitHub**

1. Go to [github.com](https://github.com) and create a new repository
2. Name it (e.g., `stripe-press-style`)
3. **Don't** initialize with README (you already have code)
4. Copy the repository URL

**Option B: Use Existing Repository**

If you already have a repository, just push your code:

```bash
# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/stripe-press-style.git

# Push code
git branch -M main
git push -u origin main
```

---

## 🚀 Step 2: Deploy to Vercel

### Method 1: Via Vercel Dashboard (Recommended)

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub (easiest) or email

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Select your repository (`stripe-press-style`)
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)
   - Click "Deploy" (we'll add environment variables next)

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (preview)
vercel

# Deploy to production
vercel --prod
```

---

## 🔐 Step 3: Configure Environment Variables

**⚠️ CRITICAL:** You must add your Turso credentials before the first deployment!

### 3.1 Get Production Database Token

Generate a new token for production (recommended for security):

```bash
~/.turso/turso db tokens create paschima-web
```

Copy the token that's generated.

### 3.2 Add Environment Variables in Vercel

1. **In Vercel Dashboard:**
   - Go to your project
   - Click **Settings** → **Environment Variables**

2. **Add These Variables:**

   | Name | Value | Environment |
   |------|-------|-------------|
   | `DATABASE_URL` | `libsql://paschima-web-paschima.aws-ap-south-1.turso.io` | Production, Preview, Development |
   | `TURSO_AUTH_TOKEN` | `your-new-production-token` | Production, Preview, Development |

3. **For Each Variable:**
   - Click "Add New"
   - Enter the name
   - Paste the value
   - Select all environments (Production, Preview, Development)
   - Click "Save"

### 3.3 Redeploy After Adding Variables

After adding environment variables:
- Go to **Deployments** tab
- Click the **three dots** (⋯) on the latest deployment
- Click **Redeploy**

Or trigger a new deployment by pushing a commit.

---

## ✅ Step 4: Verify Deployment

1. **Check Build Logs**
   - Go to **Deployments** tab
   - Click on your deployment
   - Check the build logs for any errors

2. **Visit Your Site**
   - Your site will be at: `https://your-project-name.vercel.app`
   - Or your custom domain if configured

3. **Test Functionality**
   - ✅ Homepage loads
   - ✅ Book pages work (`/book/[slug]`)
   - ✅ Admin login works (`/admin/login`)
   - ✅ Can create/edit books

---

## 🔧 Step 5: Post-Deployment Setup

### 5.1 Verify Database Connection

Your app should automatically connect to Turso. Test by:
- Visiting your deployed site
- Trying to add a book via admin panel
- Checking if data persists

### 5.2 (Optional) Seed Initial Data

If you have seed data, you can run it via Vercel CLI:

```bash
# Set environment variables locally
vercel env pull .env.local

# Run seed script (if you have one)
npm run db:seed
```

Or create a temporary API route to seed data, then delete it.

---

## 🌐 Step 6: Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to **Settings** → **Domains**
   - Enter your domain name
   - Follow DNS configuration instructions

2. **Update DNS Records:**
   - Add CNAME record pointing to Vercel
   - Wait for DNS propagation

---

## 🔄 Step 7: Continuous Deployment

Vercel automatically deploys when you push to your main branch:

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically builds and deploys!
```

---

## 🐛 Troubleshooting

### Build Fails

**Error: "DATABASE_URL not found"**
- ✅ Solution: Add environment variables in Vercel dashboard

**Error: "Module not found"**
- ✅ Solution: Check `package.json` dependencies are correct
- ✅ Run `npm install` locally to verify

**Error: "Build timeout"**
- ✅ Solution: Check build logs for specific errors
- ✅ Verify `next.config.js` is correct

### Database Connection Issues

**Error: "401 Unauthorized"**
- ✅ Solution: Verify `TURSO_AUTH_TOKEN` is correct in Vercel
- ✅ Generate a new token if needed

**Error: "Database not found"**
- ✅ Solution: Verify `DATABASE_URL` is correct
- ✅ Check database exists in Turso dashboard

### App Works But Database Doesn't

- ✅ Check environment variables are set for **all environments**
- ✅ Verify token has correct permissions
- ✅ Check Vercel function logs for errors

---

## 📊 Monitoring & Analytics

### View Logs

1. **In Vercel Dashboard:**
   - Go to **Deployments**
   - Click on a deployment
   - Click **Functions** tab
   - View real-time logs

### Check Function Performance

- Go to **Analytics** tab
- View request metrics, response times, etc.

---

## 🔐 Security Best Practices

1. **Never commit `.env.local`** ✅ (already in `.gitignore`)
2. **Use different tokens** for development and production
3. **Rotate tokens** periodically
4. **Review environment variables** regularly
5. **Use Vercel's built-in secrets** management

---

## 📝 Quick Reference

### Essential Commands

```bash
# Deploy via CLI
vercel                    # Preview deployment
vercel --prod            # Production deployment

# Pull environment variables
vercel env pull .env.local

# View deployments
vercel ls

# View logs
vercel logs
```

### Important URLs

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Your Site:** `https://your-project.vercel.app`
- **Turso Dashboard:** https://turso.tech

---

## ✅ Deployment Checklist

Before deploying:
- [ ] Code pushed to Git repository
- [ ] `.env.local` is in `.gitignore` ✅
- [ ] `vercel.json` is configured ✅
- [ ] All dependencies in `package.json`
- [ ] Build works locally (`npm run build`)

After deploying:
- [ ] Environment variables added in Vercel
- [ ] Production token generated
- [ ] Site loads successfully
- [ ] Database connection works
- [ ] Admin panel accessible
- [ ] Can create/edit books

---

## 🎉 Success!

Once deployed, your site will be:
- ✅ Live at `https://your-project.vercel.app`
- ✅ Automatically updated on every push
- ✅ Fast and globally distributed
- ✅ Connected to Turso database

---

## 🆘 Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Discord](https://vercel.com/discord)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Ready to deploy?** Follow the steps above and your site will be live in minutes! 🚀
