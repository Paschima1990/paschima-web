'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Book3DCard from './Book3DCard'
import { searchBooks } from '@/lib/search'
import type { Book } from '@/lib/getBooks'
import { Pagination } from '@/components/ui/pagination'

type Props = {
  books: Book[]
}

const ITEMS_PER_PAGE = 12

export function BookList({ books }: Props) {
  const searchParams = useSearchParams()
  // Initialize from searchParams to avoid hydration mismatch
  const query = searchParams.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(query)
  const [filteredBooks, setFilteredBooks] = useState(() => {
    return query ? searchBooks(books, query) : books
  })
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    // Update when search params change
    const newQuery = searchParams.get('q') || ''
    setSearchQuery(newQuery)
    
    if (newQuery) {
      setFilteredBooks(searchBooks(books, newQuery))
    } else {
      setFilteredBooks(books)
    }
  }, [searchParams, books])

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  // Calculate pagination
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex)

  return (
    <>
      {searchQuery && (
        <motion.div
          className="mb-12 text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg text-gray-600">
            &quot;{searchQuery}&quot; ପାଇଁ {filteredBooks.length} {filteredBooks.length === 1 ? 'ପୁସ୍ତକ' : 'ପୁସ୍ତକ'} ମିଳିଲା
          </p>
        </motion.div>
      )}

      {paginatedBooks.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 md:gap-16">
            {paginatedBooks.map((book, index) => (
              <motion.div
                key={book.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Book3DCard
                  title={book.title}
                  author={book.author}
                  cover={book.cover}
                  slug={book.slug}
                  description={book.description}
                  backgroundColor={book.backgroundColor}
                  textColor={book.textColor}
                />
              </motion.div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 mb-4">କୌଣସି ପୁସ୍ତକ ମିଳିଲା ନାହିଁ</p>
          <p className="text-gray-500">ଆପଣଙ୍କର ସନ୍ଧାନ ଶବ୍ଦଗୁଡ଼ିକୁ ସଂଶୋଧନ କରି ଚେଷ୍ଟା କରନ୍ତୁ</p>
        </div>
      )}
    </>
  )
}
