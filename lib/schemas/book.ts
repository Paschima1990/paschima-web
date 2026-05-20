import { z } from 'zod'

export const bookSchema = z.object({
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
  buyLinks: z
    .array(
      z.object({
        label: z.string(),
        url: z.string(),
        price: z.string().optional(),
      })
    )
    .optional(),
  isbn: z.string().optional().or(z.literal('')),
  type: z.string().optional().or(z.literal('')),
  isBestseller: z.boolean().optional().default(false),
})

export const bookFormSchema = bookSchema.extend({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  cover: z.string().min(1, 'Cover image URL is required'),
  description: z.string().min(1, 'Description is required'),
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  textColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  buyLinks: z
    .array(
      z.object({
        label: z.string().min(1),
        url: z.string().url(),
        price: z.string().optional(),
      })
    )
    .optional(),
  isBestseller: z.boolean().optional(),
})

export type BookFormData = z.infer<typeof bookFormSchema>
export type BookInput = z.infer<typeof bookSchema>
