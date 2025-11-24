import { db } from './db'
import { books } from './db/schema'
import { eq } from 'drizzle-orm'
import { desc } from 'drizzle-orm'
import type { Book } from './getBooks'

export async function getBestsellers(): Promise<Book[]> {
  try {
    // Fetch books marked as bestsellers from database
    const dbBooks = await db
      .select()
      .from(books)
      .where(eq(books.isBestseller, '1'))
      .orderBy(desc(books.createdAt))
      .limit(5)

    // Transform database books to match Book type
    const bestsellers = dbBooks.map((book) => ({
      slug: book.slug,
      title: book.title,
      author: book.author,
      cover: book.cover,
      description: book.description,
      backgroundColor: book.backgroundColor,
      textColor: book.textColor,
      summary: book.summary || undefined,
      authorBio: book.authorBio || undefined,
      authorLinks: {
        twitter: book.authorTwitter || undefined,
        website: book.authorWebsite || undefined,
      },
      buyLinks: book.buyLinks ? JSON.parse(book.buyLinks) : undefined,
      isbn: book.isbn || undefined,
      type: book.type || undefined,
      isBestseller: true,
    }))

    return bestsellers
  } catch (error) {
    console.error('Error fetching bestsellers from database:', error)
    // Return empty array on error
    return []
  }
}

