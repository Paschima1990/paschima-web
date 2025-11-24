# Fixing Turso 401 Authentication Error

You're getting a 401 error, which means your Turso credentials are incorrect or expired. Here's how to fix it:

## Steps to Get Correct Credentials

### 1. Go to Turso Dashboard
Visit: https://turso.tech and log in

### 2. Select Your Database
- Click on your database: `paschima-web-paschima`

### 3. Get the Database URL
- Look for "Connection String" or "Database URL"
- It should look like: `libsql://paschima-web-paschima-xxx.turso.io`
- Make sure you copy the FULL URL

### 4. Get/Refresh Auth Token
- Look for "Auth Token" or "API Token"
- Click "Show" or "Reveal" to see the token
- **Important:** If the token doesn't work, try generating a new one:
  - Look for "Generate Token" or "Create Token" button
  - Create a new token
  - Copy the ENTIRE token (it's usually very long, starts with `eyJ...`)

### 5. Update .env.local
Open `.env.local` and update with the correct values:

```env
DATABASE_URL=libsql://your-correct-database-url.turso.io
TURSO_AUTH_TOKEN=your-complete-auth-token-here
```

**Common Issues:**
- ❌ Token is truncated (not copied fully)
- ❌ Database URL has extra spaces or characters
- ❌ Using an old/expired token
- ❌ Wrong database selected

### 6. Verify Credentials
After updating, test again:
```bash
npm run db:push
```

## Alternative: Use Turso CLI

If you have Turso CLI installed, you can get credentials easily:

```bash
# Install Turso CLI (if not installed)
curl -sSfL https://get.tur.so/install.sh | bash

# Login
turso auth login

# List databases
turso db list

# Get database URL
turso db show paschima-web-paschima --url

# Create a new token
turso db tokens create paschima-web-paschima
```

Then update your `.env.local` with the new credentials.

