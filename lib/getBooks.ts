import { db } from './db'
import { books } from './db/schema'
import { desc } from 'drizzle-orm'
import { mapDbRowsToBooks } from './mapBook'

export type { Book } from './types/book'

export async function getBooks() {
  try {
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL environment variable is not set')
      return []
    }

    const dbBooks = await db.select().from(books).orderBy(desc(books.createdAt))

    if (dbBooks.length === 0) {
      console.log('No books found in database')
    } else {
      console.log(`Successfully fetched ${dbBooks.length} books from database`)
    }

    return mapDbRowsToBooks(dbBooks)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorName = error instanceof Error ? error.name : 'Error'
    console.error('Error fetching books from database:', {
      name: errorName,
      message: errorMessage,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasTursoToken: !!process.env.TURSO_AUTH_TOKEN,
      databaseUrlType: process.env.DATABASE_URL?.startsWith('libsql://')
        ? 'Turso'
        : process.env.DATABASE_URL?.startsWith('file:')
          ? 'Local SQLite'
          : 'Unknown',
    })
    return []
  }
}
