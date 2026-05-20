# 🚀 Vercel CLI Quick Reference Guide

Your project is already linked and you're logged in as `paschima1990`.

---

## 📋 Most Useful Commands

### Deploy Commands

```bash
# Deploy to production
vercel

# Deploy to preview (staging)
vercel --preview

# Deploy with specific environment variables
vercel -e NODE_ENV=production

# Force a new deployment (ignore cache)
vercel --force
```

### View Deployments

```bash
# List recent deployments
vercel ls

# Open project in browser
vercel open

# View specific deployment details
vercel inspect [deployment-url]
```

### Environment Variables

```bash
# List all environment variables
vercel env ls

# Add environment variable
vercel env add DATABASE_URL production

# Pull environment variables to .env.local
vercel env pull .env.local
```

### Development

```bash
# Start local dev server (simulates Vercel)
vercel dev

# Build locally
vercel build
```

### Deployment Management

```bash
# View deployment details
vercel inspect [deployment-url-or-id]

# View logs for a deployment
vercel logs [deployment-url-or-id]

# Promote a preview to production
vercel promote [deployment-url-or-id]

# Rollback to previous deployment
vercel rollback [deployment-url-or-id]

# Redeploy a previous deployment
vercel redeploy [deployment-url-or-id]
```

### Project Management

```bash
# Link to a different project
vercel link

# Pull project settings
vercel pull

# Open project dashboard
vercel open
```

---

## 🎯 Common Workflows

### 1. Deploy Latest Changes

```bash
# Simple deployment
vercel

# Or deploy to preview first
vercel --preview
```

### 2. Pull Environment Variables

If you need to sync environment variables from Vercel to local:

```bash
vercel env pull .env.local
```

### 3. View Deployment Logs

```bash
# Get deployment URL from `vercel ls`, then:
vercel logs [deployment-url]
```

### 4. Test Locally with Vercel Environment

```bash
# This simulates Vercel's environment locally
vercel dev
```

---

## 🔧 Your Current Setup

- **Logged in as:** `paschima1990`
- **Project:** `stripe-press-style`
- **Project ID:** `prj_jHheloFIj1JGj0ptU2UkhvWVxmtf`

---

## 💡 Pro Tips

1. **Always deploy to preview first:**
   ```bash
   vercel --preview
   ```
   Test it, then promote to production.

2. **Use `vercel dev` for local testing:**
   - Simulates Vercel's serverless environment
   - Tests API routes locally
   - Uses Vercel environment variables

3. **Check logs for debugging:**
   ```bash
   vercel logs [your-deployment-url]
   ```

4. **Pull env vars when setting up on new machine:**
   ```bash
   vercel env pull .env.local
   ```

---

## 🆘 Troubleshooting

### Not logged in?
```bash
vercel login
```

### Project not linked?
```bash
vercel link
```

### Need to switch accounts?
```bash
vercel logout
vercel login
```

---

**Ready to deploy?** Just run `vercel` in your project directory! 🚀

