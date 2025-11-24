// Test script to verify Turso database connection
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@libsql/client');

async function testConnection() {
  try {
    console.log('🔍 Testing Turso Database Connection...\n');
    
    // Check environment variables
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL not found in .env.local');
    }
    if (!process.env.TURSO_AUTH_TOKEN) {
      throw new Error('TURSO_AUTH_TOKEN not found in .env.local');
    }
    
    console.log('✅ Environment variables loaded');
    console.log('   DATABASE_URL:', process.env.DATABASE_URL.substring(0, 50) + '...');
    console.log('   TURSO_AUTH_TOKEN:', process.env.TURSO_AUTH_TOKEN.substring(0, 30) + '...\n');
    
    // Create client
    const client = createClient({
      url: process.env.DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    
    console.log('✅ Turso client created');
    
    // Test connection
    const result = await client.execute('SELECT 1 as test');
    console.log('✅ Database connection successful');
    console.log('   Test query result:', result.rows[0]);
    
    // Check if Book table exists
    const tableCheck = await client.execute(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='Book';"
    );
    
    if (tableCheck.rows.length > 0) {
      console.log('✅ Book table exists');
      
      // Count books
      const countResult = await client.execute('SELECT COUNT(*) as count FROM Book');
      console.log('   Books in database:', countResult.rows[0].count);
    } else {
      console.log('⚠️  Book table not found');
    }
    
    console.log('✅ All database checks passed\n');
    
    console.log('🎉 All checks passed! Your Turso setup is working correctly.\n');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Connection test failed:');
    console.error('   Error:', error.message);
    if (error.cause) {
      console.error('   Status:', error.cause.status);
    }
    process.exit(1);
  }
}

testConnection();

