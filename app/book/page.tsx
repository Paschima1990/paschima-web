import { Suspense } from 'react'
import { getBooks } from '../../lib/getBooks'
import { BooksSection } from '@/components/BooksSection'

export const metadata = {
  title: 'All Books | Paschima Publications',
  description: 'Browse our complete collection of Odia language books',
}

export default async function BooksPage() {
  const books = await getBooks()

  return (
    <main className="min-h-screen bg-white pt-20">
      <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
        <BooksSection books={books} />
      </Suspense>
    </main>
  )
}

