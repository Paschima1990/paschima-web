import type { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load .env.local first (Next.js convention), then .env as fallback
dotenv.config({ path: resolve(process.cwd(), '.env.local') })
dotenv.config() // This will load .env but won't override .env.local values

const dbUrl = process.env.DATABASE_URL || './dev.db'
const isTurso = dbUrl.startsWith('libsql://') || dbUrl.startsWith('https://') || dbUrl.startsWith('http://')

// For Turso, we need to include authToken, but drizzle-kit types don't support it directly
// So we use type assertion for Turso connections
const config: Config = {
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: isTurso && process.env.TURSO_AUTH_TOKEN
    ? ({
        url: dbUrl,
        authToken: process.env.TURSO_AUTH_TOKEN,
      } as any) // Type assertion needed for Turso authToken support
    : {
        url: dbUrl,
      },
}

export default config

