import type { books } from './db/schema'
import type { Book } from './types/book'

type DbBook = typeof books.$inferSelect

export function mapDbRowToBook(book: DbBook): Book {
  return {
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
    isBestseller: book.isBestseller === '1',
  }
}

export function mapDbRowsToBooks(rows: DbBook[]): Book[] {
  return rows.map(mapDbRowToBook)
}
