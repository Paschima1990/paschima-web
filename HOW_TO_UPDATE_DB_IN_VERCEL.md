# 🔄 How to Update Database in Vercel

This guide explains how to update your Turso database (used by Vercel) when you make schema changes or data updates.

---

## 📋 Two Types of Updates

### 1. **Schema Changes** (Adding/Modifying Tables/Columns)
When you modify `lib/db/schema.ts` or add new columns.

### 2. **Data Updates** (Adding/Updating Books)
When you add, edit, or delete books in your local database.

---

## 🔧 Scenario 1: Update Schema in Vercel

When you modify the database schema (e.g., add new columns, change table structure):

### Step 1: Update Schema File
Edit `lib/db/schema.ts` with your changes.

### Step 2: Push Schema to Turso

1. **Backup your current `.env.local`:**
   ```bash
   cp .env.local .env.local.backup
   ```

2. **Temporarily switch to Turso in `.env.local`:**
   ```bash
   # Edit .env.local to use Turso
   DATABASE_URL=libsql://paschima-web-paschima.aws-ap-south-1.turso.io
   TURSO_AUTH_TOKEN=your-turso-token-here
   ```

3. **Push schema to Turso:**
   ```bash
   npm run db:push
   ```
   
   This will:
   - Create new tables if they don't exist
   - Add new columns to existing tables
   - Update column types if needed

4. **Restore local database config:**
   ```bash
   # Restore your local dev.db setup
   cp .env.local.backup .env.local
   ```

### Step 3: Verify in Vercel
- Redeploy your Vercel app (or wait for auto-deploy)
- Check that new schema changes work correctly

---

## 📚 Scenario 2: Update Data in Vercel

When you add, edit, or delete books in your local database:

### Option A: Sync All Data (Recommended for First Time)

1. **Backup your current `.env.local`:**
   ```bash
   cp .env.local .env.local.backup
   ```

2. **Switch to Turso in `.env.local`:**
   ```bash
   DATABASE_URL=libsql://paschima-web-paschima.aws-ap-south-1.turso.io
   TURSO_AUTH_TOKEN=your-turso-token-here
   ```

3. **Sync all data from local to Turso:**
   ```bash
   npm run db:sync
   ```
   
   This will:
   - Read all books from `dev.db`
   - Insert new books into Turso
   - Update existing books (matched by slug)
   - Show a summary of changes

4. **Restore local database config:**
   ```bash
   cp .env.local.backup .env.local
   ```

### Option B: Manual Update via Admin Panel

1. **Deploy your changes to Vercel**
2. **Visit your admin panel:** `https://your-site.vercel.app/admin`
3. **Login and edit books directly** - changes save to Turso automatically

---

## 🚀 Quick Workflow: Schema + Data Update

If you need to update both schema and data:

```bash
# 1. Backup current config
cp .env.local .env.local.backup

# 2. Switch to Turso
echo "DATABASE_URL=libsql://paschima-web-paschima.aws-ap-south-1.turso.io" > .env.local
echo "TURSO_AUTH_TOKEN=your-token" >> .env.local

# 3. Push schema changes
npm run db:push

# 4. Sync data
npm run db:sync

# 5. Restore local config
cp .env.local.backup .env.local
```

---

## 🔍 Verify Updates

### Check Turso Database Directly

If you have Turso CLI installed:
```bash
turso db shell paschima-web-paschima "SELECT COUNT(*) FROM Book;"
turso db shell paschima-web-paschima "SELECT * FROM Book LIMIT 5;"
```

### Check Vercel Deployment

1. Visit your Vercel site
2. Check that books appear correctly
3. Test admin panel functionality
4. Check Vercel Function Logs for any errors

---

## ⚙️ Environment Variables in Vercel

Make sure these are set in **Vercel Dashboard** → **Settings** → **Environment Variables**:

| Variable | Value | Environments |
|----------|-------|--------------|
| `DATABASE_URL` | `libsql://paschima-web-paschima.aws-ap-south-1.turso.io` | All (Production, Preview, Development) |
| `TURSO_AUTH_TOKEN` | Your Turso token | All (Production, Preview, Development) |

**Important:** After updating environment variables, **redeploy** your app.

---

## 🛠️ Available Commands

| Command | Purpose |
|---------|---------|
| `npm run db:push` | Push schema changes to database |
| `npm run db:sync` | Sync all data from local to Turso |
| `npm run db:seed` | Seed local database with sample data |
| `npm run db:studio` | Open Drizzle Studio to view/edit database |

---

## 📝 Common Scenarios

### Adding a New Column

1. Edit `lib/db/schema.ts` - add new column
2. Run `npm run db:push` with Turso credentials
3. Update your code to use the new column
4. Deploy to Vercel

### Adding New Books Locally

1. Add books via admin panel locally (saves to `dev.db`)
2. Run `npm run db:sync` with Turso credentials
3. Books now appear on Vercel

### Updating Existing Books

1. Edit books via admin panel locally
2. Run `npm run db:sync` with Turso credentials
3. Changes appear on Vercel

### Deleting Books

Currently, `db:sync` only inserts/updates. To delete:
- Use admin panel on Vercel directly, OR
- Manually delete via Turso CLI or dashboard

---

## ⚠️ Important Notes

1. **Always backup `.env.local`** before switching to Turso
2. **Restore local config** after syncing to continue local development
3. **Schema changes** require `db:push` - `db:sync` only handles data
4. **Environment variables** must be set in Vercel for production to work
5. **Redeploy** after updating environment variables

---

## 🆘 Troubleshooting

### "Table not found" error
- Run `npm run db:push` first to create tables

### "TURSO_AUTH_TOKEN required" error
- Check `.env.local` has the token set
- Verify token is valid in Turso dashboard

### Data not showing on Vercel
- Verify environment variables are set in Vercel
- Check Vercel Function Logs for errors
- Run `npm run db:sync` to ensure data is in Turso

### Schema changes not applied
- Make sure you ran `npm run db:push` with Turso credentials
- Check that schema file is correct
- Verify in Turso dashboard that columns exist

---

## 🎯 Best Practices

1. **Test locally first** - Make sure changes work with `dev.db`
2. **Backup before syncing** - Always backup `.env.local`
3. **Use admin panel for small updates** - Faster than full sync
4. **Full sync for bulk changes** - Use `db:sync` when adding many books
5. **Keep environments in sync** - Update both local and Turso regularly

---

**Need help?** Check `VERCEL_DATABASE_SETUP.md` for more detailed troubleshooting.

