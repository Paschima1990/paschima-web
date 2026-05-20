import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { books } from '@/lib/db/schema'
import { isAuthenticated } from '@/lib/auth'
import { eq } from 'drizzle-orm'
import * as XLSX from 'xlsx'
import {
  generateSlug,
  generateDefaultCover,
  generateDefaultDescription,
  generateDefaultColors,
} from '@/lib/bookDefaults'
import { BOOK_TYPES } from '@/lib/bookTypes'

export const dynamic = 'force-dynamic'

const VALID_TYPES = BOOK_TYPES

interface ExcelRow {
  'Book Name'?: string
  'Author Name'?: string
  'Book ISBN'?: string
  'Type'?: string
  // Also handle variations
  'book name'?: string
  'author name'?: string
  'book isbn'?: string
  'type'?: string
  'Book name'?: string
  'Author name'?: string
  'Book isbn'?: string
  [key: string]: string | undefined
}

interface ImportResult {
  success: number
  errors: Array<{ row: number; message: string }>
  duplicates: number
  skipped: number
}

function normalizeColumnName(name: string): string {
  return name.trim().toLowerCase()
}

function findColumn(headerRow: string[], possibleNames: string[]): number {
  for (const name of possibleNames) {
    const index = headerRow.findIndex(
      (h) => normalizeColumnName(h) === normalizeColumnName(name)
    )
    if (index !== -1) return index
  }
  return -1
}

function validateISBN(isbn: string | undefined): boolean {
  if (!isbn) return true // Optional field
  // Basic ISBN validation (10 or 13 digits, with or without hyphens)
  const cleaned = isbn.replace(/[-\s]/g, '')
  return /^(\d{10}|\d{13})$/.test(cleaned)
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload an Excel file (.xlsx or .xls)' },
        { status: 400 }
      )
    }

    // Read file buffer
    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer, { type: 'buffer' })

    // Get first sheet
    const sheetName = workbook.SheetNames[0]
    if (!sheetName) {
      return NextResponse.json(
        { error: 'Excel file has no sheets' },
        { status: 400 }
      )
    }

    const worksheet = workbook.Sheets[sheetName]
    const data = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, { raw: false })

    if (data.length === 0) {
      return NextResponse.json(
        { error: 'Excel file is empty' },
        { status: 400 }
      )
    }

    // Find column indices
    const firstRow = data[0]
    const headerKeys = Object.keys(firstRow)

    const titleIndex = findColumn(headerKeys, ['Book Name', 'book name', 'Book name', 'title', 'Title'])
    const authorIndex = findColumn(headerKeys, ['Author Name', 'author name', 'Author name', 'author', 'Author'])
    const isbnIndex = findColumn(headerKeys, ['Book ISBN', 'book isbn', 'Book isbn', 'isbn', 'ISBN'])
    const typeIndex = findColumn(headerKeys, ['Type', 'type', 'category', 'Category'])

    if (titleIndex === -1 || authorIndex === -1) {
      return NextResponse.json(
        { error: 'Excel file must contain "Book Name" and "Author Name" columns' },
        { status: 400 }
      )
    }

    const result: ImportResult = {
      success: 0,
      errors: [],
      duplicates: 0,
      skipped: 0,
    }

    // Process each row
    for (let i = 0; i < data.length; i++) {
      const row = data[i]
      const rowNumber = i + 2 // +2 because Excel rows start at 1 and we skip header

      try {
        // Extract values
        const title = String(row[headerKeys[titleIndex]] || '').trim()
        const author = String(row[headerKeys[authorIndex]] || '').trim()
        const isbn = isbnIndex !== -1 ? String(row[headerKeys[isbnIndex]] || '').trim() : undefined
        const type = typeIndex !== -1 ? String(row[headerKeys[typeIndex]] || '').trim() : undefined

        // Validate required fields
        if (!title) {
          result.errors.push({ row: rowNumber, message: 'Book name is required' })
          result.skipped++
          continue
        }

        if (!author) {
          result.errors.push({ row: rowNumber, message: 'Author name is required' })
          result.skipped++
          continue
        }

        // Validate ISBN if provided
        if (isbn && !validateISBN(isbn)) {
          result.errors.push({ row: rowNumber, message: `Invalid ISBN format: ${isbn}` })
          // Continue anyway, just log the warning
        }

        // Validate type if provided
        if (type && !VALID_TYPES.includes(type)) {
          result.errors.push({ row: rowNumber, message: `Unknown book type: ${type}. Will be saved as-is.` })
          // Continue anyway
        }

        // Generate slug
        const slug = generateSlug(title)

        // Check for duplicates
        const [existing] = await db.select().from(books).where(eq(books.slug, slug)).limit(1)
        if (existing) {
          result.duplicates++
          result.errors.push({ row: rowNumber, message: `Book with slug "${slug}" already exists. Skipped.` })
          continue
        }

        // Generate defaults
        const colors = generateDefaultColors(title)
        const cover = generateDefaultCover()
        const description = generateDefaultDescription(title, author)

        // Insert book
        const now = new Date().toISOString()
        await db.insert(books).values({
          slug,
          title,
          author,
          cover,
          description,
          backgroundColor: colors.backgroundColor,
          textColor: colors.textColor,
          isbn: isbn || null,
          type: type || null,
          summary: null,
          authorBio: null,
          authorTwitter: null,
          authorWebsite: null,
          buyLinks: null,
          createdAt: now,
          updatedAt: now,
        })

        result.success++
      } catch (error) {
        result.errors.push({
          row: rowNumber,
          message: error instanceof Error ? error.message : 'Unknown error',
        })
        result.skipped++
      }
    }

    return NextResponse.json({
      success: true,
      result,
      message: `Import completed: ${result.success} books imported, ${result.duplicates} duplicates skipped, ${result.errors.length} errors.`,
    })
  } catch (error) {
    console.error('Error processing bulk upload:', error)
    return NextResponse.json(
      {
        error: 'Failed to process file',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

