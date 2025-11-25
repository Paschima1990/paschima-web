/**
 * Utility functions for auto-generating book defaults
 */

/**
 * Generate a URL-friendly slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Generate default cover image path
 */
export function generateDefaultCover(slug: string): string {
  // Use a placeholder or default cover
  return `/covers/book1.jpg` // Default cover image
}

/**
 * Generate default description from title and author
 */
export function generateDefaultDescription(title: string, author: string): string {
  return `A book by ${author}. ${title}`
}

/**
 * Predefined color palette for book covers
 */
const COLOR_PALETTES: Array<{ backgroundColor: string; textColor: string }> = [
  { backgroundColor: '#6E665B', textColor: '#DFC78E' },
  { backgroundColor: '#0d121f', textColor: '#D0D1D4' },
  { backgroundColor: '#FFB55E', textColor: '#0B1743' },
  { backgroundColor: '#303328', textColor: '#F9C350' },
  { backgroundColor: '#ff9e5a', textColor: '#452121' },
  { backgroundColor: '#2328A0', textColor: '#EF9E40' },
  { backgroundColor: '#2C3E50', textColor: '#ECF0F1' },
  { backgroundColor: '#8E44AD', textColor: '#F8C471' },
  { backgroundColor: '#16A085', textColor: '#F4D03F' },
  { backgroundColor: '#C0392B', textColor: '#FAD7A0' },
]

/**
 * Select a color palette (deterministic based on title)
 */
export function generateDefaultColors(title: string): { backgroundColor: string; textColor: string } {
  // Use title hash to deterministically select a color
  let hash = 0
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % COLOR_PALETTES.length
  return COLOR_PALETTES[index]
}

/**
 * Calculate contrasting text color from background color
 */
export function calculateContrastColor(backgroundColor: string): string {
  // Remove # and convert to RGB
  const hex = backgroundColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Return dark or light text based on background
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

