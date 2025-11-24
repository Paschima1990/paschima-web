'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
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
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<Book[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
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

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
    setIsFocused(false)
  }

  const showSuggestionsDropdown = isFocused && suggestions.length > 0 && query.trim()

  return (
    <div ref={containerRef} className={cn('relative w-full max-w-md', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setHasUserInteracted(true)
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className="pl-10 pr-10 h-9 w-full"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestionsDropdown && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          <div className="py-2">
            {suggestions.map((book) => (
              <Link
                key={book.slug}
                href={`/book/${book.slug}`}
                onClick={() => handleSuggestionClick(book)}
                className="block px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-[#0A0A0A] text-sm mb-1">
                  {book.title}
                </div>
                <div className="text-xs text-gray-600">
                  {book.author}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

