import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import Database from 'better-sqlite3'
import { drizzle as drizzleBetterSqlite } from 'drizzle-orm/better-sqlite3'
import * as schema from './db/schema'

const globalForDb = globalThis as unknown as {
  db: ReturnType<typeof drizzle> | ReturnType<typeof drizzleBetterSqlite> | undefined
  client: ReturnType<typeof createClient> | Database.Database | undefined
}

// Support both Turso (production) and local SQLite (development)
function createDatabaseClient() {
  const dbUrl = process.env.DATABASE_URL

  if (!dbUrl) {
    throw new Error('DATABASE_URL environment variable is required')
  }

  // Check if it's a Turso URL (libsql://) or local file
  if (dbUrl.startsWith('libsql://') || dbUrl.startsWith('https://') || dbUrl.startsWith('http://')) {
    // Turso remote database
    const authToken = process.env.TURSO_AUTH_TOKEN
    if (!authToken) {
      throw new Error('TURSO_AUTH_TOKEN environment variable is required for Turso database')
    }
    return createClient({
      url: dbUrl,
      authToken: authToken,
    })
  } else {
    // Local SQLite file (for development) - use better-sqlite3
    const filePath = dbUrl.replace(/^file:/, '')
    return new Database(filePath)
  }
}

const client =
  globalForDb.client ?? createDatabaseClient()

if (process.env.NODE_ENV !== 'production') globalForDb.client = client

// Create appropriate drizzle instance based on client type
const dbUrl = process.env.DATABASE_URL || ''
const isTurso = dbUrl.startsWith('libsql://') || dbUrl.startsWith('https://') || dbUrl.startsWith('http://')

export const db =
  globalForDb.db ??
  (isTurso
    ? drizzle(client as ReturnType<typeof createClient>, { schema })
    : drizzleBetterSqlite(client as Database.Database, { schema }))

if (process.env.NODE_ENV !== 'production') globalForDb.db = db

export { schema }
