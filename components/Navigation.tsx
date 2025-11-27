'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AdminLink } from '@/components/admin/AdminLink'
import { SearchBar } from '@/components/SearchBar'
import type { Book } from '@/lib/getBooks'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [books, setBooks] = useState<Book[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch('/api/auth/check')
      .then((res) => res.json())
      .then((data) => setIsAdmin(data.authenticated))
      .catch(() => setIsAdmin(false))
  }, [])

  useEffect(() => {
    // Fetch books for search suggestions
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBooks(data)
        }
      })
      .catch(() => setBooks([]))
  }, [])

  const handleSearch = (query: string) => {
    // If query is empty, navigate to /book to show all books
    if (!query.trim()) {
      router.push('/book')
      return
    }
    const params = new URLSearchParams()
    params.set('q', query)
    const newUrl = `/book?${params.toString()}`
    router.push(newUrl)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center shrink-0 hover:opacity-80 transition-opacity">
            <Image
              src="/Logo/PaschimaLogo.webp"
              alt="Paschima Publication"
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 shrink-0 ml-auto">
            <SearchBar
              onSearch={handleSearch}
              placeholder="ପୁସ୍ତକ ସନ୍ଧାନ କରନ୍ତୁ..."
              books={books}
              showSuggestions={true}
            />
            <Link
              href="/book"
              className="text-sm font-medium text-gray-600 hover:text-[#0A0A0A] transition-colors shrink-0"
            >
              ପୁସ୍ତକ
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-600 hover:text-[#0A0A0A] transition-colors shrink-0"
            >
              ଆମ ବିଷୟରେ
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-gray-600 hover:text-[#0A0A0A] transition-colors shrink-0"
            >
              ସମ୍ପର୍କ
            </Link>
            {isAdmin && <AdminLink />}
          </div>

          {/* Mobile Navigation - Search + Menu Button */}
          <div className="md:hidden flex items-center gap-3 shrink-0">
            <SearchBar
              onSearch={handleSearch}
              placeholder="ପୁସ୍ତକ ସନ୍ଧାନ କରନ୍ତୁ..."
              books={books}
              showSuggestions={true}
            />
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown - No Search Here */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/book"
                className="text-sm font-medium text-gray-600 hover:text-[#0A0A0A] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                ପୁସ୍ତକ
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-gray-600 hover:text-[#0A0A0A] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                ଆମ ବିଷୟରେ
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-gray-600 hover:text-[#0A0A0A] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                ସମ୍ପର୍କ
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="text-sm font-medium text-gray-600 hover:text-[#0A0A0A] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  ପ୍ରଶାସନ
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

