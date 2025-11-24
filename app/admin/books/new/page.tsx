'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminNav } from '@/components/admin/AdminNav'
import { BookForm } from '@/components/admin/BookForm'
import { useToast } from '@/components/ui/use-toast'

type BookFormData = {
  title: string
  author: string
  slug: string
  cover: string
  description: string
  backgroundColor: string
  textColor: string
  summary?: string
  authorBio?: string
  authorTwitter?: string
  authorWebsite?: string
  buyLinks?: Array<{ label: string; url: string; price?: string }>
}

export default function NewBookPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (data: BookFormData) => {
    setLoading(true)

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Book created successfully',
        })
        router.push('/admin')
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to create book',
          variant: 'destructive',
        })
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      })
      console.error('Error creating book:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#0A0A0A] mb-2">
            Create New Book
          </h1>
          <p className="text-gray-600">
            Add a new book to your collection.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <BookForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}

