import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { books } from '@/lib/db/schema'
import { isAuthenticated } from '@/lib/auth'
import { z } from 'zod'
import { eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

const bookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  slug: z.string().min(1),
  cover: z.string().url().or(z.string().startsWith('/')),
  description: z.string().min(1),
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  textColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  summary: z.string().optional(),
  authorBio: z.string().optional(),
  authorTwitter: z.string().url().optional().or(z.literal('')),
  authorWebsite: z.string().url().optional().or(z.literal('')),
  buyLinks: z.array(z.object({
    label: z.string(),
    url: z.string(),
    price: z.string().optional(),
  })).optional(),
  isbn: z.string().optional().or(z.literal('')),
  type: z.string().optional().or(z.literal('')),
  isBestseller: z.boolean().optional().default(false),
})

// GET - Get single book
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const [book] = await db.select().from(books).where(eq(books.slug, slug)).limit(1)

    if (!book) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      )
    }

    // Transform to match Book type
    const transformedBook = {
      slug: book.slug,
      title: book.title,
      author: book.author,
      cover: book.cover,
      description: book.description,
      backgroundColor: book.backgroundColor,
      textColor: book.textColor,
      summary: book.summary || undefined,
      authorBio: book.authorBio || undefined,
      authorLinks: {
        twitter: book.authorTwitter || undefined,
        website: book.authorWebsite || undefined,
      },
      buyLinks: book.buyLinks ? JSON.parse(book.buyLinks) : undefined,
      isbn: book.isbn || undefined,
      type: book.type || undefined,
      isBestseller: book.isBestseller === '1' || book.isBestseller === 'true',
    }

    return NextResponse.json(transformedBook)
  } catch (error) {
    console.error('Error fetching book:', error)
    return NextResponse.json(
      { error: 'Failed to fetch book' },
      { status: 500 }
    )
  }
}

// PUT - Update book
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Check authentication
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { slug } = await params
    const body = await request.json()
    const validatedData = bookSchema.parse(body)

    // Check if book exists
    const [existing] = await db.select().from(books).where(eq(books.slug, slug)).limit(1)

    if (!existing) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      )
    }

    // If slug is being changed, check if new slug exists
    if (validatedData.slug !== slug) {
      const [slugExists] = await db.select().from(books).where(eq(books.slug, validatedData.slug)).limit(1)
      if (slugExists) {
        return NextResponse.json(
          { error: 'Book with this slug already exists' },
          { status: 400 }
        )
      }
    }

    // Update book
    const [book] = await db.update(books)
      .set({
        slug: validatedData.slug,
        title: validatedData.title,
        author: validatedData.author,
        cover: validatedData.cover,
        description: validatedData.description,
        backgroundColor: validatedData.backgroundColor,
        textColor: validatedData.textColor,
        summary: validatedData.summary || null,
        authorBio: validatedData.authorBio || null,
        authorTwitter: validatedData.authorTwitter || null,
        authorWebsite: validatedData.authorWebsite || null,
        buyLinks: validatedData.buyLinks ? JSON.stringify(validatedData.buyLinks) : null,
        isbn: validatedData.isbn || null,
        type: validatedData.type || null,
        isBestseller: validatedData.isBestseller ? '1' : '0',
        updatedAt: new Date().toISOString(),
      })
      .where(eq(books.slug, slug))
      .returning()

    return NextResponse.json({ success: true, book })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error updating book:', error)
    return NextResponse.json(
      { error: 'Failed to update book' },
      { status: 500 }
    )
  }
}

// DELETE - Delete book
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Check authentication
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { slug } = await params
    // Check if book exists
    const [existing] = await db.select().from(books).where(eq(books.slug, slug)).limit(1)

    if (!existing) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      )
    }

    // Delete book
    await db.delete(books).where(eq(books.slug, slug))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting book:', error)
    return NextResponse.json(
      { error: 'Failed to delete book' },
      { status: 500 }
    )
  }
}
