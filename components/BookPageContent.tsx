'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/SearchBar'
import Book3DCard from './Book3DCard'
import { searchBooks } from '@/lib/search'
import { Pagination } from '@/components/ui/pagination'
import type { Book } from '@/lib/getBooks'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { QuickEditButton } from '@/components/admin/QuickEditButton'

type Props = {
  book: Book
  allBooks: Book[]
}

const ITEMS_PER_PAGE = 12

export function BookPageContent({ book, allBooks }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  // Initialize from searchParams to avoid hydration mismatch
  const query = searchParams.get('q') || ''
  const baseFiltered = allBooks.filter(b => b.slug !== book.slug)
  const [searchQuery, setSearchQuery] = useState(query)
  const [filteredBooks, setFilteredBooks] = useState(() => {
    return query ? searchBooks(baseFiltered, query) : baseFiltered
  })
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    // Update when search params change
    const newQuery = searchParams.get('q') || ''
    setSearchQuery(newQuery)

    const filtered = allBooks.filter(b => b.slug !== book.slug)
    if (newQuery) {
      setFilteredBooks(searchBooks(filtered, newQuery))
    } else {
      setFilteredBooks(filtered)
    }
  }, [searchParams, allBooks, book.slug])

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const handleSearch = useCallback((query: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (query) {
      params.set('q', query)
    } else {
      params.delete('q')
    }
    const newUrl = params.toString() ? `/book/${book.slug}?${params.toString()}` : `/book/${book.slug}`
    router.push(newUrl)
  }, [searchParams, router, book.slug])

  // Calculate pagination
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative w-full h-[60vh] min-h-[400px] md:min-h-[480px] bg-gradient-to-b from-gray-50 to-white overflow-hidden pt-16">
        <div className="absolute inset-0 top-16 flex items-center justify-center">
          <div className="relative w-full max-w-7xl mx-auto px-6 flex items-center justify-center">
            <div className="relative w-[280px] h-[400px] md:w-[360px] md:h-[520px] shadow-2xl">
              <Image
                src={book.cover}
                alt={book.title}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Back Link */}
      <div className="max-w-4xl mx-auto px-6 pt-8 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#0A0A0A] transition-colors text-sm font-medium cursor-pointer no-underline group"
            prefetch={true}
          >
            <ArrowLeft className="w-4 h-4 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
            <span className="whitespace-nowrap">ପୁସ୍ତକଗୁଡ଼ିକକୁ ଫେରନ୍ତୁ</span>
          </Link>
          <QuickEditButton slug={book.slug} />
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 pb-20">
        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-[#0A0A0A] tracking-tight">
            {book.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            {book.author} ଙ୍କ ଦ୍ୱାରା
          </p>
          {(book.isbn || book.type) && (
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
              {book.isbn && (
                <span className="inline-flex items-center">
                  <span className="font-medium mr-1">ISBN:</span>
                  {book.isbn}
                </span>
              )}
              {book.type && (
                <span className="inline-flex items-center">
                  <span className="font-medium mr-1">ଶ୍ରେଣୀ:</span>
                  {book.type}
                </span>
              )}
            </div>
          )}
          <div className="w-24 h-px bg-gray-300" />
        </header>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg leading-relaxed text-gray-700">
            {book.summary || book.description}
          </p>
        </div>

        {/* Buy Options */}
        {book.buyLinks && book.buyLinks.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-semibold mb-6 text-[#0A0A0A]">
              କିଣନ୍ତୁ
            </h2>
            <div className="flex flex-col gap-3">
              {book.buyLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full md:w-auto justify-between border-gray-300 hover:border-[#635BFF] hover:text-[#635BFF]"
                  asChild
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between"
                  >
                    <span>
                      {link.label}
                      {link.price && <span className="ml-2 text-gray-500">{link.price}</span>}
                    </span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Author Section */}
        {book.authorBio && (
          <div className="border-t border-gray-200 pt-12 mb-16">
            <h2 className="text-2xl font-serif font-semibold mb-4 text-[#0A0A0A]">
              ଲେଖକ ବିଷୟରେ
            </h2>
            <div className="prose prose-lg max-w-none mb-6">
              <p className="text-gray-700 leading-relaxed">
                {book.authorBio}
              </p>
            </div>
            {book.authorLinks && (book.authorLinks.twitter || book.authorLinks.website) && (
              <div className="flex gap-4 flex-wrap">
                {book.authorLinks.twitter && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={book.authorLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      Twitter
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                )}
                {book.authorLinks.website && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={book.authorLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      Website
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Search and Related Books Section */}
        <div className="border-t border-gray-200 pt-16">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-[#0A0A0A] tracking-tight">
              ଅନ୍ୟ ପୁସ୍ତକଗୁଡ଼ିକ
            </h2>
            <div className="mb-6">
              <SearchBar
                onSearch={handleSearch}
                placeholder="ପୁସ୍ତକ ସନ୍ଧାନ କରନ୍ତୁ..."
                className="max-w-md"
              />
            </div>
            {searchQuery && (
              <p className="text-lg text-gray-600 mb-6">
                &quot;{searchQuery}&quot; ପାଇଁ {filteredBooks.length} {filteredBooks.length === 1 ? 'ପୁସ୍ତକ' : 'ପୁସ୍ତକ'} ମିଳିଲା
              </p>
            )}
          </div>

          {paginatedBooks.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 md:gap-16 mb-12">
                {paginatedBooks.map((relatedBook, index) => (
                  <motion.div
                    key={relatedBook.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Book3DCard
                      title={relatedBook.title}
                      author={relatedBook.author}
                      cover={relatedBook.cover}
                      slug={relatedBook.slug}
                      description={relatedBook.description}
                      backgroundColor={relatedBook.backgroundColor}
                      textColor={relatedBook.textColor}
                    />
                  </motion.div>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center">
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
              <p className="text-xl text-gray-600 mb-4">
                {searchQuery ? 'କୌଣସି ପୁସ୍ତକ ମିଳିଲା ନାହିଁ' : 'କୌଣସି ପୁସ୍ତକ ମିଳିଲା ନାହିଁ'}
              </p>
              {searchQuery && (
                <p className="text-gray-500">ଆପଣଙ୍କର ସନ୍ଧାନ ଶବ୍ଦଗୁଡ଼ିକୁ ସଂଶୋଧନ କରି ଚେଷ୍ଟା କରନ୍ତୁ</p>
              )}
            </div>
          )}
        </div>
      </article>
    </div>
  )
}

