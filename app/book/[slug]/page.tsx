import { Suspense } from 'react'
import { getBooks } from '../../../lib/getBooks'
import { BookPageContent } from '@/components/BookPageContent'

export async function generateStaticParams() {
  const books = await getBooks()
  return books.map((b) => ({ slug: b.slug }))
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const books = await getBooks()
  const book = books.find((b) => b.slug === slug)
  if (!book) return <div className="p-8">Not found</div>

  return (
    <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
      <BookPageContent book={book} allBooks={books} />
    </Suspense>
  )
}
