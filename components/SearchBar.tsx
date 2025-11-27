'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { searchBooks } from '@/lib/search'
import type { Book } from '@/lib/getBooks'

type Props = {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
  books?: Book[]
  showSuggestions?: boolean
}

export function SearchBar({ onSearch, placeholder = 'ପୁସ୍ତକ ସନ୍ଧାନ କରନ୍ତୁ...', className, books = [], showSuggestions = true }: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Book[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const onSearchRef = useRef(onSearch)

  const [hasUserInteracted, setHasUserInteracted] = useState(false)

  // Keep onSearch ref up to date
  useEffect(() => {
    onSearchRef.current = onSearch
  }, [onSearch])

  // Initialize from URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const urlQuery = params.get('q') || ''
      if (urlQuery) {
        setQuery(urlQuery)
      }
    }
  }, [])

  // Update suggestions as user types
  useEffect(() => {
    if (query.trim() && books.length > 0 && showSuggestions) {
      const results = searchBooks(books, query).slice(0, 5) // Show max 5 suggestions
      setSuggestions(prev => {
        // Only update if results actually changed
        if (prev.length !== results.length ||
          prev.some((book, i) => book.slug !== results[i]?.slug)) {
          return results
        }
        return prev
      })
    } else {
      setSuggestions(prev => prev.length > 0 ? [] : prev)
    }
  }, [query, books, showSuggestions])

  // Debounce the actual search - only call onSearch when user has interacted
  useEffect(() => {
    if (!hasUserInteracted) return

    const timer = setTimeout(() => {
      onSearchRef.current(query)
    }, 300) // Debounce search

    return () => clearTimeout(timer)
  }, [query, hasUserInteracted])

  // Handle ESC key to close overlay
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open])

  const handleClear = () => {
    setQuery('')
    onSearch('')
    setSuggestions([])
    inputRef.current?.focus()
  }

  const handleSuggestionClick = (book: Book) => {
    setQuery(book.title)
    onSearch(book.title)
    setSuggestions([])
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className={cn('relative', className)}>
      {/* Search Button Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full px-3 py-2 border border-gray-200 bg-white hover:bg-gray-50 hover:shadow-md transition-all duration-200"
        aria-label="Search"
      >
        <Search size={18} className="text-gray-600" />
        <span className="hidden md:inline text-sm font-medium text-gray-600">Search</span>
      </button>

      {/* Overlay Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start pt-20 z-50"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#0A0A0A]">ସନ୍ଧାନ କରନ୍ତୁ</h2>
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-lg hover:bg-gray-100"
                  aria-label="Close search"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search Input */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  ref={inputRef}
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setHasUserInteracted(true)
                  }}
                  placeholder={placeholder}
                  className="pl-10 pr-10 h-12 text-base"
                />
                {query && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-9 w-9"
                    onClick={handleClear}
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Results */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {suggestions.length > 0 ? (
                  suggestions.map((book) => (
                    <Link
                      key={book.slug}
                      href={`/book/${book.slug}`}
                      onClick={() => handleSuggestionClick(book)}
                      className="block p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-200"
                    >
                      <div className="font-medium text-[#0A0A0A] mb-1">
                        {book.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {book.author}
                      </div>
                    </Link>
                  ))
                ) : query.trim() ? (
                  <p className="text-gray-500 text-center py-8">କୌଣସି ଫଳାଫଳ ମିଳିଲା ନାହିଁ</p>
                ) : (
                  <p className="text-gray-400 text-center py-8 text-sm">ପୁସ୍ତକ ଖୋଜିବା ପାଇଁ ଟାଇପ୍ କରନ୍ତୁ...</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

