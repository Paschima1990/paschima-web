import { db } from './db'
import { books } from './db/schema'
import { desc } from 'drizzle-orm'

export type Book = {
  slug: string
  title: string
  author: string
  cover: string
  description: string
  backgroundColor: string
  textColor: string
  summary?: string
  authorBio?: string
  authorLinks?: {
    twitter?: string
    website?: string
  }
  buyLinks?: {
    label: string
    url: string
    price?: string
  }[]
  isbn?: string
  type?: string
  isBestseller?: boolean
}

// Mock data as fallback
const mockBooks: Book[] = [
  {
    slug: 'payments-design',
    title: 'Payments Design',
    author: 'Jane Doe',
    cover: '/covers/book1.jpg',
    description: 'Exploring the design of payments.',
    backgroundColor: '#6E665B',
    textColor: '#DFC78E',
    summary: 'A comprehensive exploration of payment system design, examining how financial transactions are structured, secured, and optimized for both users and businesses. This book delves into the principles that make payment systems reliable, user-friendly, and scalable.',
    authorBio: 'Jane Doe is a leading expert in financial technology and user experience design. With over 15 years of experience in the payments industry, she has worked with major financial institutions and fintech startups to design intuitive and secure payment experiences.',
    authorLinks: {
      twitter: 'https://twitter.com/janedoe',
      website: 'https://janedoe.com'
    },
    buyLinks: [
      { label: 'Purchase on Bookshop', url: '#', price: '$35' },
      { label: 'Purchase on Amazon', url: '#', price: '$35' },
      { label: 'Purchase on Barnes & Noble', url: '#', price: '$35' }
    ]
  },
  {
    slug: 'platform-thinking',
    title: 'Platform Thinking',
    author: 'John Smith',
    cover: '/covers/book2.jpg',
    description: 'How platforms shape business.',
    backgroundColor: '#0d121f',
    textColor: '#D0D1D4',
    summary: 'An in-depth examination of how platform business models transform industries and create new value networks. This book explores the strategic thinking behind successful platforms and how they leverage network effects to build sustainable competitive advantages.',
    authorBio: 'John Smith is a business strategist and author specializing in platform economics and digital transformation. He has advised Fortune 500 companies and startups on platform strategy and business model innovation.',
    authorLinks: {
      twitter: 'https://twitter.com/johnsmith',
      website: 'https://johnsmith.com'
    },
    buyLinks: [
      { label: 'Purchase on Bookshop', url: '#', price: '$40' },
      { label: 'Purchase on Amazon', url: '#', price: '$40' },
      { label: 'Purchase on Barnes & Noble', url: '#', price: '$40' }
    ]
  },
  {
    slug: 'scientific-freedom',
    title: 'Scientific Freedom',
    author: 'Donald W. Braben',
    cover: '/covers/book1.jpg',
    description: 'A powerful argument for scientific freedom.',
    backgroundColor: '#FFB55E',
    textColor: '#0B1743',
    summary: 'A compelling argument for the importance of scientific freedom and curiosity-driven research. This book makes the case that allowing scientists to pursue their own research interests leads to the most significant breakthroughs and discoveries.',
    authorBio: 'Donald W. Braben is a distinguished scientist and advocate for scientific research freedom. He has spent decades studying the conditions that lead to scientific breakthroughs.',
    buyLinks: [
      { label: 'Purchase on Bookshop', url: '#', price: '$30' },
      { label: 'Purchase on Amazon', url: '#', price: '$30' }
    ]
  },
  {
    slug: 'working-in-public',
    title: 'Working in Public',
    author: 'Nadia Eghbal',
    cover: '/covers/book2.jpg',
    description: 'An inside look at modern open source software developers.',
    backgroundColor: '#303328',
    textColor: '#F9C350',
    summary: 'An inside look at modern open source software developers—and their influence on our online world. This book explores how open source communities work, the challenges they face, and their impact on technology and society.',
    authorBio: 'Nadia Eghbal is a researcher and writer focused on open source software and digital infrastructure. She has studied how online communities form and sustain themselves.',
    authorLinks: {
      twitter: 'https://twitter.com/nayafia',
      website: 'https://nadiaeghbal.com'
    },
    buyLinks: [
      { label: 'Purchase on Bookshop', url: '#', price: '$25' },
      { label: 'Purchase on Amazon', url: '#', price: '$25' }
    ]
  },
  {
    slug: 'the-art-of-doing',
    title: 'The Art of Doing Science and Engineering',
    author: 'Richard W. Hamming',
    cover: '/covers/book1.jpg',
    description: 'A groundbreaking treatise on effective thinking.',
    backgroundColor: '#2328A0',
    textColor: '#EF9E40',
    summary: 'A groundbreaking treatise by one of the great mathematicians of our time, who argues that highly effective thinking can be learned. This book distills decades of experience into practical principles for scientific and engineering excellence.',
    authorBio: 'Richard W. Hamming was a mathematician whose work had many implications for computer science and telecommunications. He received the Turing Award in 1968.',
    buyLinks: [
      { label: 'Purchase on Bookshop', url: '#', price: '$28' },
      { label: 'Purchase on Amazon', url: '#', price: '$28' }
    ]
  },
  {
    slug: 'get-together',
    title: 'Get Together',
    author: 'Bailey Richardson, Kevin Huynh, and Kai Elmer Sotto',
    cover: '/covers/book2.jpg',
    description: 'A practical guide to cultivating a community.',
    backgroundColor: '#ff9e5a',
    textColor: '#452121',
    summary: 'A practical and heartfelt guide to cultivating a community: people who come together over shared passions. This book provides actionable advice for building and sustaining meaningful communities both online and offline.',
    authorBio: 'Bailey Richardson, Kevin Huynh, and Kai Elmer Sotto are community builders and strategists who have helped organizations build thriving communities around their products and missions.',
    authorLinks: {
      website: 'https://gettogether.community'
    },
    buyLinks: [
      { label: 'Purchase on Bookshop', url: '#', price: '$22' },
      { label: 'Purchase on Amazon', url: '#', price: '$22' }
    ]
  }
]

export async function getBooks(): Promise<Book[]> {
  try {
    // Check if database environment variables are set
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL environment variable is not set')
      return []
    }

    // Fetch from database
    const dbBooks = await db.select().from(books).orderBy(desc(books.createdAt))

    // Log success for debugging
    if (dbBooks.length === 0) {
      console.log('No books found in database')
    } else {
      console.log(`Successfully fetched ${dbBooks.length} books from database`)
    }

    // Transform database books to match Book type
    return dbBooks.map((book) => ({
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
  } catch (error) {
    // Enhanced error logging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorName = error instanceof Error ? error.name : 'Error'
    console.error('Error fetching books from database:', {
      name: errorName,
      message: errorMessage,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasTursoToken: !!process.env.TURSO_AUTH_TOKEN,
      databaseUrlType: process.env.DATABASE_URL?.startsWith('libsql://') ? 'Turso' : 
                       process.env.DATABASE_URL?.startsWith('file:') ? 'Local SQLite' : 'Unknown'
    })
    // Return empty array on error - no mock data fallback
    return []
  }
}
