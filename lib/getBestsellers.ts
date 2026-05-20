import { db } from './db'
import { books } from './db/schema'
import { eq, and, isNotNull, desc } from 'drizzle-orm'
import { mapDbRowsToBooks } from './mapBook'
import type { Book } from './types/book'

export async function getBestsellers(): Promise<Book[]> {
  try {
    const dbBooks = await db
      .select()
      .from(books)
      .where(and(isNotNull(books.isBestseller), eq(books.isBestseller, '1')))
      .orderBy(desc(books.createdAt))
      .limit(5)

    return mapDbRowsToBooks(dbBooks)
  } catch (error) {
    console.error('Error fetching bestsellers from database:', error)
    return []
  }
}
