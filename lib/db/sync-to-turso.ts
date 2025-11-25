/**
 * Script to sync data from local SQLite database to Turso
 * Run this before deploying to Vercel to ensure production has data
 * 
 * Usage:
 * 1. Set DATABASE_URL and TURSO_AUTH_TOKEN in .env.local for Turso
 * 2. Run: npx tsx lib/db/sync-to-turso.ts
 */

import { config } from 'dotenv'
import { createClient } from '@libsql/client'
import Database from 'better-sqlite3'
import * as readline from 'readline'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
}

function log(message: string, color: string = colors.reset) {
  console.log(`${color}${message}${colors.reset}`)
}

async function confirmSync(): Promise<boolean> {
  // Skip confirmation if --yes flag is passed
  if (process.argv.includes('--yes') || process.env.SKIP_CONFIRM === 'true') {
    return true
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question(
      `${colors.yellow}⚠️  This will sync data from local dev.db to Turso. Continue? (yes/no): ${colors.reset}`,
      (answer) => {
        rl.close()
        resolve(answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y')
      }
    )
  })
}

async function syncToTurso() {
  try {
    log('\n🔄 Starting database sync from local to Turso...\n', colors.blue)

    // Check environment variables
    const tursoUrl = process.env.DATABASE_URL
    const tursoToken = process.env.TURSO_AUTH_TOKEN

    if (!tursoUrl || !tursoUrl.startsWith('libsql://')) {
      log('❌ Error: DATABASE_URL must be a Turso URL (libsql://...)', colors.red)
      log('   Please set DATABASE_URL in .env.local to your Turso database URL', colors.yellow)
      process.exit(1)
    }

    if (!tursoToken) {
      log('❌ Error: TURSO_AUTH_TOKEN is required', colors.red)
      log('   Please set TURSO_AUTH_TOKEN in .env.local', colors.yellow)
      process.exit(1)
    }

    // Connect to local database
    const localDbPath = './dev.db'
    log(`📂 Reading from local database: ${localDbPath}`, colors.blue)
    const localDb = new Database(localDbPath)

    // Connect to Turso
    log(`🌐 Connecting to Turso: ${tursoUrl.substring(0, 50)}...`, colors.blue)
    const tursoClient = createClient({
      url: tursoUrl,
      authToken: tursoToken,
    })

    // Test Turso connection
    try {
      await tursoClient.execute('SELECT 1')
      log('✅ Connected to Turso successfully', colors.green)
    } catch (error) {
      log(`❌ Failed to connect to Turso: ${error}`, colors.red)
      process.exit(1)
    }

    // Check if Book table exists in Turso
    const tableCheck = await tursoClient.execute(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='Book';"
    )

    if (tableCheck.rows.length === 0) {
      log('⚠️  Book table does not exist in Turso. Please run: npm run db:push', colors.yellow)
      process.exit(1)
    }

    // Get all books from local database
    const localBooks = localDb.prepare('SELECT * FROM Book').all() as any[]
    log(`\n📚 Found ${localBooks.length} books in local database`, colors.blue)

    if (localBooks.length === 0) {
      log('⚠️  No books found in local database. Nothing to sync.', colors.yellow)
      process.exit(0)
    }

    // Confirm before proceeding
    const confirmed = await confirmSync()
    if (!confirmed) {
      log('❌ Sync cancelled by user', colors.red)
      process.exit(0)
    }

    // Get existing books from Turso
    const tursoBooks = await tursoClient.execute('SELECT slug FROM Book')
    const existingSlugs = new Set(tursoBooks.rows.map((row: any) => row.slug))
    log(`📊 Found ${existingSlugs.size} existing books in Turso`, colors.blue)

    let inserted = 0
    let updated = 0
    let skipped = 0

    // Sync each book
    log('\n🔄 Syncing books...\n', colors.blue)

    for (const book of localBooks) {
      const exists = existingSlugs.has(book.slug)

      if (exists) {
        // Update existing book
        await tursoClient.execute({
          sql: `UPDATE Book SET 
            title = ?,
            author = ?,
            cover = ?,
            description = ?,
            backgroundColor = ?,
            textColor = ?,
            summary = ?,
            authorBio = ?,
            authorTwitter = ?,
            authorWebsite = ?,
            buyLinks = ?,
            isbn = ?,
            type = ?,
            isBestseller = ?,
            updatedAt = CURRENT_TIMESTAMP
            WHERE slug = ?`,
          args: [
            book.title,
            book.author,
            book.cover,
            book.description,
            book.backgroundColor,
            book.textColor,
            book.summary || null,
            book.authorBio || null,
            book.authorTwitter || null,
            book.authorWebsite || null,
            book.buyLinks || null,
            book.isbn || null,
            book.type || null,
            book.isBestseller || '0',
            book.slug,
          ],
        })
        updated++
        log(`  ✓ Updated: ${book.title}`, colors.green)
      } else {
        // Insert new book
        await tursoClient.execute({
          sql: `INSERT INTO Book (
            id, slug, title, author, cover, description, backgroundColor, textColor,
            summary, authorBio, authorTwitter, authorWebsite, buyLinks,
            isbn, type, isBestseller, createdAt, updatedAt
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [
            book.id,
            book.slug,
            book.title,
            book.author,
            book.cover,
            book.description,
            book.backgroundColor,
            book.textColor,
            book.summary || null,
            book.authorBio || null,
            book.authorTwitter || null,
            book.authorWebsite || null,
            book.buyLinks || null,
            book.isbn || null,
            book.type || null,
            book.isBestseller || '0',
            book.createdAt || new Date().toISOString(),
            book.updatedAt || new Date().toISOString(),
          ],
        })
        inserted++
        log(`  + Inserted: ${book.title}`, colors.green)
      }
    }

    // Summary
    log('\n' + '='.repeat(50), colors.blue)
    log('📊 Sync Summary:', colors.blue)
    log(`   ✅ Inserted: ${inserted} books`, colors.green)
    log(`   🔄 Updated: ${updated} books`, colors.green)
    log(`   ⏭️  Skipped: ${skipped} books`, colors.yellow)
    log(`   📚 Total in Turso: ${existingSlugs.size + inserted} books`, colors.blue)
    log('='.repeat(50) + '\n', colors.blue)

    // Verify sync
    const finalCount = await tursoClient.execute('SELECT COUNT(*) as count FROM Book')
    log(`✅ Verification: Turso now has ${(finalCount.rows[0] as any).count} books`, colors.green)

    localDb.close()
    log('\n🎉 Sync completed successfully!', colors.green)
    log('   Your Vercel deployment should now show all books.\n', colors.blue)

  } catch (error) {
    log(`\n❌ Error during sync: ${error}`, colors.red)
    if (error instanceof Error) {
      log(`   ${error.message}`, colors.red)
    }
    process.exit(1)
  }
}

// Run sync
syncToTurso()

