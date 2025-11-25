# 🔧 Fix: Vercel Database Not Showing Data

If your Vercel deployment is not showing any database data, follow these steps:

---

## 🎯 Quick Fix (5 minutes)

### Step 1: Sync Local Data to Turso

Your local database (`dev.db`) has 846 books, but Turso (used by Vercel) might be empty.

1. **Temporarily switch to Turso in `.env.local`:**

   ```bash
   # Backup your current .env.local
   cp .env.local .env.local.backup
   ```

2. **Update `.env.local` with Turso credentials:**

   ```env
   DATABASE_URL=libsql://paschima-web-paschima.aws-ap-south-1.turso.io
   TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjQwMTM5NzUsImlkIjoiNWVjOGNhOWUtZTc2YS00YWQ5LWJmZDUtMGM4NDE5M2EyYTg1IiwicmlkIjoiNzMwZjMyMDEtNjE3My00OGJjLWJmZmYtMmI3NTc5YTk0YTYwIn0.NYp2_6qW-r9WwH0QicOi4bdK-_PQAjb5L1gF9KRIzIWjGvsTw4F1lTZcvHaeD7hCjgheiUzC3EiiqmzlSRdSAA
   ```

3. **Ensure Turso database schema exists:**

   ```bash
   npm run db:push
   ```

4. **Sync all data from local to Turso:**

   ```bash
   npm run db:sync
   ```

   This will:
   - Read all 846 books from `dev.db`
   - Upload them to Turso
   - Update existing books if they already exist

5. **Restore local database config:**

   ```bash
   # Restore local database for development
   echo "DATABASE_URL=file:/Users/sritam/Downloads/stripe-press-style/dev.db" > .env.local
   ```

---

### Step 2: Configure Vercel Environment Variables

1. **Go to Vercel Dashboard:**
   - Visit [vercel.com](https://vercel.com)
   - Select your project
   - Go to **Settings** → **Environment Variables**

2. **Add/Update these variables:**

   | Name | Value | Environments |
   |------|-------|--------------|
   | `DATABASE_URL` | `libsql://paschima-web-paschima.aws-ap-south-1.turso.io` | Production, Preview, Development |
   | `TURSO_AUTH_TOKEN` | `eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...` (your token) | Production, Preview, Development |

   **Important:** 
   - Make sure to select **all three environments** (Production, Preview, Development)
   - Use the same token or generate a new one for production

3. **Generate a new production token (recommended):**

   ```bash
   # If you have Turso CLI installed
   turso db tokens create paschima-web-paschima
   ```

   Or get it from [Turso Dashboard](https://turso.tech)

---

### Step 3: Redeploy on Vercel

After adding environment variables:

1. Go to **Deployments** tab
2. Click the **⋯** (three dots) on the latest deployment
3. Click **Redeploy**

Or push a new commit to trigger automatic deployment.

---

## ✅ Verification

After redeploying, check:

1. **Visit your Vercel site:** `https://your-project.vercel.app`
2. **Check homepage:** Should show featured book and bestsellers
3. **Check books page:** Should show all 846 books
4. **Check admin panel:** Should be able to view/edit books

---

## 🔍 Troubleshooting

### Still no data showing?

1. **Check Vercel Function Logs:**
   - Go to **Deployments** → Click on deployment → **Functions** tab
   - Look for database connection errors

2. **Verify Turso has data:**
   ```bash
   # With Turso CLI
   turso db shell paschima-web-paschima "SELECT COUNT(*) FROM Book;"
   ```

3. **Test database connection:**
   ```bash
   # Temporarily set Turso credentials
   export DATABASE_URL="libsql://paschima-web-paschima.aws-ap-south-1.turso.io"
   export TURSO_AUTH_TOKEN="your-token"
   
   # Test connection
   node test-db-connection.js
   ```

4. **Check environment variables in Vercel:**
   - Make sure variables are set for **all environments**
   - Check for typos in variable names
   - Verify token is not expired

### Error: "TURSO_AUTH_TOKEN environment variable is required"

- ✅ Solution: Add `TURSO_AUTH_TOKEN` in Vercel environment variables

### Error: "401 Unauthorized"

- ✅ Solution: Generate a new token from Turso dashboard
- ✅ Solution: Verify token is copied completely (no truncation)

### Error: "Database table not found"

- ✅ Solution: Run `npm run db:push` with Turso credentials set
- ✅ Solution: Ensure schema is pushed to Turso

---

## 📝 Summary

**The Problem:**
- Local development uses `dev.db` (has 846 books)
- Vercel uses Turso (was empty or missing data)

**The Solution:**
1. ✅ Sync local data to Turso using `npm run db:sync`
2. ✅ Configure Vercel environment variables
3. ✅ Redeploy

**Result:**
- ✅ Vercel now has all 846 books
- ✅ Website displays data correctly
- ✅ Local development still uses `dev.db`

---

## 🔄 Keeping Data in Sync

**Option 1: Manual Sync (when needed)**
```bash
# Switch to Turso, sync, switch back
cp .env.local .env.local.backup
echo "DATABASE_URL=libsql://..." > .env.local
npm run db:sync
cp .env.local.backup .env.local
```

**Option 2: Use Turso for Both (Recommended for Production)**
- Use Turso for both local development and production
- Update `.env.local` to use Turso URL
- All changes sync automatically

---

## 🆘 Need Help?

- Check Vercel deployment logs
- Verify Turso dashboard shows your database
- Test connection locally with Turso credentials
- Check this guide's troubleshooting section

---

**After completing these steps, your Vercel deployment should show all your books!** 🎉

