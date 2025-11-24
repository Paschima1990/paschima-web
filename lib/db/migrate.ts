import Database from 'better-sqlite3'
import * as dotenv from 'dotenv'

dotenv.config()

function getDatabasePath(): string {
  const dbUrl = process.env.DATABASE_URL
  if (dbUrl) {
    return dbUrl.replace(/^file:/, '')
  }
  return './dev.db'
}

const db = new Database(getDatabasePath())

try {
  console.log('Adding isbn and type columns to books table...')

  // Add isbn column
  try {
    db.exec('ALTER TABLE Book ADD COLUMN isbn TEXT')
    console.log('✓ Added isbn column')
  } catch (error: any) {
    if (error.message?.includes('duplicate column name') || error.message?.includes('already exists')) {
      console.log('✓ isbn column already exists')
    } else {
      throw error
    }
  }

  // Add type column
  try {
    db.exec('ALTER TABLE Book ADD COLUMN type TEXT')
    console.log('✓ Added type column')
  } catch (error: any) {
    if (error.message?.includes('duplicate column name') || error.message?.includes('already exists')) {
      console.log('✓ type column already exists')
    } else {
      throw error
    }
  }

  // Add isBestseller column
  try {
    db.exec("ALTER TABLE Book ADD COLUMN isBestseller TEXT DEFAULT '0'")
    console.log('✓ Added isBestseller column')
  } catch (error: any) {
    if (error.message?.includes('duplicate column name') || error.message?.includes('already exists')) {
      console.log('✓ isBestseller column already exists')
    } else {
      throw error
    }
  }

  console.log('Migration completed!')
  db.close()
  process.exit(0)
} catch (error) {
  console.error('Migration error:', error)
  db.close()
  process.exit(1)
}

