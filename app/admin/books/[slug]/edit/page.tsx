'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { AdminNav } from '@/components/admin/AdminNav'
import { BookForm, type BookFormData } from '@/components/admin/BookForm'
import { useToast } from '@/components/ui/use-toast'
import type { Book } from '@/lib/getBooks'

export default function EditBookPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (slug) {
      fetchBook()
    }
  }, [slug])

  const fetchBook = async () => {
    if (!slug) return
    try {
      const response = await fetch(`/api/books/${slug}`)
      if (response.ok) {
        const data = await response.json()
        setBook(data)
      } else {
        toast({
          title: 'Error',
          description: 'Book not found',
          variant: 'destructive',
        })
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to load book',
        variant: 'destructive',
      })
      console.error('Error fetching book:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (data: BookFormData) => {
    if (!slug) return
    setSaving(true)

    try {
      const response = await fetch(`/api/books/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Book updated successfully',
        })
        router.push('/admin')
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to update book',
          variant: 'destructive',
        })
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      })
      console.error('Error updating book:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    router.push('/admin')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNav />
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-600">Loading book...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#0A0A0A] mb-2">
            Edit Book
          </h1>
          <p className="text-gray-600">
            Update book details.
          </p>
        </div>

        {book && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <BookForm
              book={book}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              loading={saving}
            />
          </div>
        )}
      </div>
    </div>
  )
}

