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
