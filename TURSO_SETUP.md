# Turso Database Setup Guide

This guide will help you set up Turso database for your project, both for local development and production deployment.

## 📋 Prerequisites

- Node.js installed
- A Turso account (free at [turso.tech](https://turso.tech))

## 🚀 Step-by-Step Setup

### Step 1: Create Turso Account & Database

1. **Sign up** at [turso.tech](https://turso.tech)
   - Click "Sign Up" or "Get Started"
   - You can sign up with GitHub, Google, or email

2. **Create a new database:**
   - In the Turso dashboard, click "Create Database"
   - Choose a name (e.g., `stripe-press-style`)
   - Select a region closest to you
   - Click "Create"

3. **Get your database credentials:**
   - After creating the database, you'll see connection details
   - Copy the **Database URL** (looks like: `libsql://your-db-name-xxx.turso.io`)
   - Copy the **Auth Token** (click "Show" to reveal it)

### Step 2: Install Turso CLI (Optional but Recommended)

The Turso CLI makes it easier to manage your database locally:

```bash
# macOS/Linux
curl -sSfL https://get.tur.so/install.sh | bash

# Or using Homebrew
brew install tursodatabase/tap/turso

# Verify installation
turso --version
```

### Step 3: Configure Environment Variables

1. **Create a `.env.local` file** in your project root (if it doesn't exist):

```bash
touch .env.local
```

2. **Add your Turso credentials:**

```env
# Turso Database Configuration
DATABASE_URL=libsql://your-db-name-xxx.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here
```

**⚠️ Important:** 
- Never commit `.env.local` to Git (it should be in `.gitignore`)
- Replace `your-db-name-xxx.turso.io` with your actual database URL
- Replace `your-auth-token-here` with your actual auth token

### Step 4: Set Up Local Development Database (Optional)

For local development, you can use a local SQLite file or connect to Turso:

#### Option A: Use Local SQLite for Development

```env
# .env.local
DATABASE_URL=file:./dev.db
# TURSO_AUTH_TOKEN not needed for local file
```

#### Option B: Use Turso for Development (Recommended)

```env
# .env.local
DATABASE_URL=libsql://your-db-name-xxx.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here
```

### Step 5: Push Database Schema

Now that your database is configured, push your schema:

```bash
npm run db:push
```

This will create all the tables in your Turso database based on your schema in `lib/db/schema.ts`.

### Step 6: Seed Database (Optional)

If you have seed data, run:

```bash
npm run db:seed
```

### Step 7: Verify Setup

1. **Test the connection:**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` and check if the app loads without database errors.

2. **Check database in Turso dashboard:**
   - Go to your Turso dashboard
   - Click on your database
   - You should see your tables (e.g., `Book`)

## 🌐 Production Deployment

### For Vercel

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables in Vercel dashboard:
     - `DATABASE_URL` = Your Turso database URL
     - `TURSO_AUTH_TOKEN` = Your Turso auth token
   - Deploy

3. **After deployment, push schema:**
   ```bash
   # Set environment variables locally
   export DATABASE_URL="libsql://your-db-name-xxx.turso.io"
   export TURSO_AUTH_TOKEN="your-auth-token"
   
   # Push schema
   npm run db:push
   ```

### For Other Platforms

Add the same environment variables (`DATABASE_URL` and `TURSO_AUTH_TOKEN`) in your hosting platform's environment variable settings.

## 🔧 Troubleshooting

### Error: "DATABASE_URL environment variable is required"

**Solution:** Make sure `.env.local` exists and contains `DATABASE_URL`

### Error: "TURSO_AUTH_TOKEN environment variable is required"

**Solution:** 
- If using Turso, add `TURSO_AUTH_TOKEN` to `.env.local`
- If using local SQLite file, use `file:./dev.db` format for `DATABASE_URL`

### Error: "Database connection failed"

**Solutions:**
- Verify your `DATABASE_URL` is correct
- Check that your `TURSO_AUTH_TOKEN` is valid
- Ensure your database exists in Turso dashboard
- Check your internet connection (Turso requires network access)

### Schema not updating

**Solution:**
```bash
# Regenerate and push schema
npm run db:push
```

## 📚 Useful Commands

```bash
# Push schema to database
npm run db:push

# Seed database with sample data
npm run db:seed

# Open Drizzle Studio (database GUI)
npm run db:studio

# Generate migration files
npm run db:migrate
```

## 🔐 Security Best Practices

1. **Never commit `.env.local`** - It should be in `.gitignore`
2. **Rotate auth tokens** periodically in Turso dashboard
3. **Use different databases** for development and production
4. **Keep auth tokens secret** - Don't share them publicly

## 📖 Additional Resources

- [Turso Documentation](https://docs.turso.tech/)
- [Turso CLI Reference](https://docs.turso.tech/cli)
- [Drizzle ORM with Turso](https://orm.drizzle.team/docs/get-started-sqlite#turso)
- [Turso Free Tier Limits](https://docs.turso.tech/pricing)

## ✅ Setup Checklist

- [ ] Created Turso account
- [ ] Created database in Turso
- [ ] Copied database URL and auth token
- [ ] Created `.env.local` file
- [ ] Added `DATABASE_URL` to `.env.local`
- [ ] Added `TURSO_AUTH_TOKEN` to `.env.local`
- [ ] Ran `npm run db:push` successfully
- [ ] Tested app locally (`npm run dev`)
- [ ] Set environment variables in production platform
- [ ] Deployed to production

---

**Need help?** Check the [Turso Discord](https://discord.gg/turso) or [Turso Documentation](https://docs.turso.tech/)

