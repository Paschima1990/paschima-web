import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { books } from '@/lib/db/schema'
import { isAuthenticated } from '@/lib/auth'
import { z } from 'zod'
import { eq, desc } from 'drizzle-orm'

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

// GET - List all books
export async function GET() {
  try {
    const dbBooks = await db.select().from(books).orderBy(desc(books.createdAt))

    // Transform database books to match Book type
    const transformedBooks = dbBooks.map((book) => ({
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
    }))

    return NextResponse.json(transformedBooks)
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    )
  }
}

// POST - Create new book
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = bookSchema.parse(body)

    // Check if slug already exists
    const existing = await db.select().from(books).where(eq(books.slug, validatedData.slug)).limit(1)

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Book with this slug already exists' },
        { status: 400 }
      )
    }

    // Create book
    const now = new Date().toISOString()
    const [book] = await db.insert(books).values({
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
      createdAt: now,
      updatedAt: now,
    }).returning()

    return NextResponse.json({ success: true, book }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error creating book:', error)
    return NextResponse.json(
      { error: 'Failed to create book' },
      { status: 500 }
    )
  }
}
