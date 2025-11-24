'use client'
import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Plus, X } from 'lucide-react'
import type { Book } from '@/lib/getBooks'
import { BOOK_TYPES } from '@/lib/bookTypes'

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  cover: z.string().min(1, 'Cover image URL is required'),
  description: z.string().min(1, 'Description is required'),
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  textColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  summary: z.string().optional(),
  authorBio: z.string().optional(),
  authorTwitter: z.string().url().optional().or(z.literal('')),
  authorWebsite: z.string().url().optional().or(z.literal('')),
  buyLinks: z.array(z.object({
    label: z.string().min(1),
    url: z.string().url(),
    price: z.string().optional(),
  })).optional(),
  isbn: z.string().optional().or(z.literal('')),
  type: z.string().optional().or(z.literal('')),
  isBestseller: z.boolean().optional(),
})

type BookFormData = z.infer<typeof bookSchema>

type Props = {
  book?: Book
  onSubmit: (data: BookFormData) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

export function BookForm({ book, onSubmit, onCancel, loading = false }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: book
      ? {
        title: book.title,
        author: book.author,
        slug: book.slug,
        cover: book.cover,
        description: book.description,
        backgroundColor: book.backgroundColor,
        textColor: book.textColor,
        summary: book.summary || '',
        authorBio: book.authorBio || '',
        authorTwitter: book.authorLinks?.twitter || '',
        authorWebsite: book.authorLinks?.website || '',
        buyLinks: book.buyLinks || [],
        isbn: book.isbn || '',
        type: book.type || '',
        isBestseller: book.isBestseller || false,
      }
      : {
        buyLinks: [],
        isbn: '',
        type: '',
        isBestseller: false,
      },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'buyLinks',
  })

  const title = watch('title')
  const backgroundColor = watch('backgroundColor')
  const textColor = watch('textColor')

  // Auto-generate slug from title
  useEffect(() => {
    if (!book && title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setValue('slug', slug)
    }
  }, [title, book, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            {...register('title')}
            error={errors.title?.message}
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="author">Author *</Label>
          <Input
            id="author"
            {...register('author')}
            error={errors.author?.message}
          />
          {errors.author && (
            <p className="text-sm text-red-600 mt-1">{errors.author.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            {...register('slug')}
            error={errors.slug?.message}
            disabled={!!book}
          />
          {errors.slug && (
            <p className="text-sm text-red-600 mt-1">{errors.slug.message}</p>
          )}
          {book && (
            <p className="text-xs text-gray-500 mt-1">Slug cannot be changed after creation</p>
          )}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="cover">Cover Image URL *</Label>
          <Input
            id="cover"
            {...register('cover')}
            placeholder="/covers/book1.jpg or https://..."
            error={errors.cover?.message}
          />
          {errors.cover && (
            <p className="text-sm text-red-600 mt-1">{errors.cover.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="backgroundColor">Background Color *</Label>
          <div className="flex gap-2">
            <Input
              id="backgroundColor"
              {...register('backgroundColor')}
              placeholder="#6E665B"
              error={errors.backgroundColor?.message}
              className="flex-1"
            />
            <div
              className="w-12 h-10 rounded border border-gray-300"
              style={{ backgroundColor }}
            />
          </div>
          {errors.backgroundColor && (
            <p className="text-sm text-red-600 mt-1">{errors.backgroundColor.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="textColor">Text Color *</Label>
          <div className="flex gap-2">
            <Input
              id="textColor"
              {...register('textColor')}
              placeholder="#DFC78E"
              error={errors.textColor?.message}
              className="flex-1"
            />
            <div
              className="w-12 h-10 rounded border border-gray-300"
              style={{ backgroundColor: textColor }}
            />
          </div>
          {errors.textColor && (
            <p className="text-sm text-red-600 mt-1">{errors.textColor.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            {...register('description')}
            rows={3}
            error={errors.description?.message}
          />
          {errors.description && (
            <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            {...register('summary')}
            rows={5}
            error={errors.summary?.message}
          />
          {errors.summary && (
            <p className="text-sm text-red-600 mt-1">{errors.summary.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="authorBio">Author Bio</Label>
          <Textarea
            id="authorBio"
            {...register('authorBio')}
            rows={4}
            error={errors.authorBio?.message}
          />
          {errors.authorBio && (
            <p className="text-sm text-red-600 mt-1">{errors.authorBio.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="authorTwitter">Author Twitter URL</Label>
          <Input
            id="authorTwitter"
            type="url"
            {...register('authorTwitter')}
            placeholder="https://twitter.com/username"
            error={errors.authorTwitter?.message}
          />
          {errors.authorTwitter && (
            <p className="text-sm text-red-600 mt-1">{errors.authorTwitter.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="authorWebsite">Author Website URL</Label>
          <Input
            id="authorWebsite"
            type="url"
            {...register('authorWebsite')}
            placeholder="https://example.com"
            error={errors.authorWebsite?.message}
          />
          {errors.authorWebsite && (
            <p className="text-sm text-red-600 mt-1">{errors.authorWebsite.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            id="isbn"
            {...register('isbn')}
            placeholder="978-0-123456-78-9"
            error={errors.isbn?.message}
          />
          {errors.isbn && (
            <p className="text-sm text-red-600 mt-1">{errors.isbn.message}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">10 or 13 digit ISBN number</p>
        </div>

        <div>
          <Label htmlFor="type">Book Type / Category</Label>
          <Select
            id="type"
            {...register('type')}
            error={errors.type?.message}
          >
            <option value="">Select a category (optional)</option>
            {BOOK_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          {errors.type && (
            <p className="text-sm text-red-600 mt-1">{errors.type.message}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">Select book category or type</p>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <input
              type="checkbox"
              id="isBestseller"
              {...register('isBestseller')}
              className="w-5 h-5 text-[#635BFF] border-gray-300 rounded focus:ring-[#635BFF] focus:ring-2"
            />
            <Label htmlFor="isBestseller" className="text-base font-medium cursor-pointer">
              Mark as Bestseller
            </Label>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Books marked as bestseller will appear in the bestseller section on the homepage
          </p>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <Label>Buy Links</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ label: '', url: '', price: '' })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Link
            </Button>
          </div>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-start p-3 border border-gray-200 rounded-lg">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                  <Input
                    placeholder="Label (e.g., Purchase on Amazon)"
                    {...register(`buyLinks.${index}.label`)}
                  />
                  <Input
                    placeholder="URL"
                    type="url"
                    {...register(`buyLinks.${index}.url`)}
                  />
                  <Input
                    placeholder="Price (optional)"
                    {...register(`buyLinks.${index}.price`)}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {fields.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                No buy links added. Click &quot;Add Link&quot; to add one.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : book ? 'Update Book' : 'Create Book'}
        </Button>
      </div>
    </form>
  )
}

