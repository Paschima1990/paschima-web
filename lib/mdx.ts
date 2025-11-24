import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const booksDirectory = path.join(process.cwd(), 'content/books')

export async function getBookContent(slug: string) {
  try {
    const fullPath = path.join(booksDirectory, `${slug}.mdx`)
    if (!fs.existsSync(fullPath)) {
      return null
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    return {
      frontmatter: data,
      content,
    }
  } catch (error) {
    console.error(`Error reading MDX file for ${slug}:`, error)
    return null
  }
}

