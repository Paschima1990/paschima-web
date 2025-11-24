import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

// Helper function to generate CUID-like ID
function generateId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 15)
  return `${timestamp}${random}`
}

export const books = sqliteTable('Book', {
  id: text('id').primaryKey().$defaultFn(generateId),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  cover: text('cover').notNull(),
  description: text('description').notNull(),
  backgroundColor: text('backgroundColor').notNull(),
  textColor: text('textColor').notNull(),
  summary: text('summary'),
  authorBio: text('authorBio'),
  authorTwitter: text('authorTwitter'),
  authorWebsite: text('authorWebsite'),
  buyLinks: text('buyLinks'), // JSON string array of {label, url, price}
  isbn: text('isbn'),
  type: text('type'), // Book type/category (e.g., ଗଳ୍ପ, କବିତା, etc.)
  isBestseller: text('isBestseller').default('0'), // '1' for true, '0' for false (SQLite boolean)
  createdAt: text('createdAt').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updatedAt').notNull().default(sql`CURRENT_TIMESTAMP`),
})

export type Book = typeof books.$inferSelect
export type NewBook = typeof books.$inferInsert

