import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './db/schema'

const globalForDb = globalThis as unknown as {
  db: ReturnType<typeof drizzle> | undefined
  client: ReturnType<typeof createClient> | undefined
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
    // Local SQLite file (for development)
    return createClient({
      url: dbUrl.replace(/^file:/, ''),
    })
  }
}

const client =
  globalForDb.client ?? createDatabaseClient()

if (process.env.NODE_ENV !== 'production') globalForDb.client = client

export const db =
  globalForDb.db ??
  drizzle(client, { schema })

if (process.env.NODE_ENV !== 'production') globalForDb.db = db

export { schema }
export type { Book, NewBook } from './db/schema'
