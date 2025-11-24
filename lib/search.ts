import type { Book } from './getBooks'

export function searchBooks(books: Book[], query: string): Book[] {
  if (!query.trim()) {
    return books
  }

  const searchTerm = query.toLowerCase().trim()
  
  return books.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(searchTerm)
    const authorMatch = book.author.toLowerCase().includes(searchTerm)
    const descriptionMatch = book.description.toLowerCase().includes(searchTerm)
    const summaryMatch = book.summary?.toLowerCase().includes(searchTerm) || false
    
    return titleMatch || authorMatch || descriptionMatch || summaryMatch
  })
}

