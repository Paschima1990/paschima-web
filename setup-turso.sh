#!/bin/bash

echo "🚀 Turso Database Setup"
echo "======================"
echo ""
echo "Please provide your Turso database credentials:"
echo ""
read -p "Enter your Turso Database URL (libsql://...): " DATABASE_URL
read -p "Enter your Turso Auth Token: " TURSO_AUTH_TOKEN
echo ""
echo "Creating .env.local file..."

cat > .env.local << EOF
# Turso Database Configuration
DATABASE_URL=$DATABASE_URL
TURSO_AUTH_TOKEN=$TURSO_AUTH_TOKEN
EOF

echo "✅ Created .env.local file"
echo ""
echo "Next steps:"
echo "1. Run: npm run db:push  (to push schema to Turso)"
echo "2. Run: npm run dev      (to test the connection)"
echo ""

