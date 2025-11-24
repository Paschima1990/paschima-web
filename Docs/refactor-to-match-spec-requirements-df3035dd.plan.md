<!-- df3035dd-7e25-4f50-852d-359985ec85ac e3794516-0efa-4cf2-88df-d93fc32f884e -->
# Admin Panel for Book Management

## Overview

Build a complete admin panel system for managing book details with password authentication, database persistence, and a user-friendly interface for creating, editing, and deleting books.

## Implementation Tasks

### 1. Database Setup

- Choose database solution (SQLite for development, PostgreSQL for production)
- Install database dependencies (Prisma ORM recommended for type safety)
- Create database schema for books table matching Book type
- Set up database connection and configuration
- Create migration files

### 2. Authentication System

- Create password-protected admin login page (`/admin/login`)
- Implement session management (NextAuth.js or custom session with cookies)
- Create middleware to protect admin routes
- Add logout functionality
- Store admin password securely (environment variable, hashed)

### 3. API Routes for Books

- Create `/api/books` GET endpoint (list all books)
- Create `/api/books` POST endpoint (create new book)
- Create `/api/books/[slug]` GET endpoint (get single book)
- Create `/api/books/[slug]` PUT/PATCH endpoint (update book)
- Create `/api/books/[slug]` DELETE endpoint (delete book)
- Add input validation and error handling
- Implement proper TypeScript types

### 4. Admin Dashboard UI

- Create `/admin` route with dashboard layout
- Display list of all books in table/card format
- Add search and filter functionality
- Show book statistics (total books, etc.)
- Add "Add New Book" button
- Quick actions (edit, delete) for each book

### 5. Book Form Component

- Create reusable BookForm component for create/edit
- Include all fields from Book type:
  - Basic: title, author, slug, description
  - Visual: cover image upload, backgroundColor, textColor
  - Content: summary, authorBio
  - Links: authorLinks (twitter, website), buyLinks array
- Add form validation
- Image upload handling (store in public/covers or cloud storage)
- Color picker for backgroundColor/textColor
- Dynamic buyLinks array (add/remove links)
- Save/Cancel buttons with loading states

### 6. Book Edit Page

- Create `/admin/books/[slug]/edit` route
- Pre-populate form with existing book data
- Handle update operations
- Show success/error messages
- Redirect to admin dashboard after save

### 7. Book Create Page

- Create `/admin/books/new` route
- Use same BookForm component
- Generate slug from title (with validation for uniqueness)
- Handle create operations
- Redirect to edit page or dashboard after creation

### 8. Integration with Existing System

- Update `lib/getBooks.ts` to fetch from database instead of mock data
- Ensure backward compatibility during migration
- Update book detail pages to work with database
- Test search functionality with database data

### 9. Quick Access from Main Site

- Add admin link/button in navigation (only visible when authenticated)
- Or add admin access via special URL parameter/key
- Quick edit button on book detail pages (admin only)
- Floating admin button (optional, for easy access)

### 10. UI/UX Enhancements

- Use Shadcn UI components (Form, Dialog, Table, etc.)
- Add loading states and skeletons
- Implement optimistic updates
- Add confirmation dialogs for delete operations
- Show success/error toast notifications
- Responsive design for mobile admin access

## Files to Create

- `prisma/schema.prisma` - Database schema
- `app/api/books/route.ts` - Books API endpoints
- `app/api/books/[slug]/route.ts` - Single book API endpoints
- `app/api/auth/login/route.ts` - Login endpoint
- `app/api/auth/logout/route.ts` - Logout endpoint
- `app/admin/login/page.tsx` - Login page
- `app/admin/page.tsx` - Admin dashboard
- `app/admin/books/new/page.tsx` - Create book page
- `app/admin/books/[slug]/edit/page.tsx` - Edit book page
- `components/admin/BookForm.tsx` - Book form component
- `components/admin/BookTable.tsx` - Books list table
- `components/admin/AdminNav.tsx` - Admin navigation
- `lib/db.ts` - Database client
- `lib/auth.ts` - Authentication utilities
- `middleware.ts` - Route protection middleware

## Files to Modify

- `lib/getBooks.ts` - Update to fetch from database
- `components/Navigation.tsx` - Add admin access link
- `app/book/[slug]/page.tsx` - Add quick edit button (admin only)
- `package.json` - Add database and auth dependencies
- `.env.local` - Add database URL and admin password

## Dependencies to Add

- `@prisma/client` - Prisma ORM client
- `prisma` - Prisma CLI
- `bcryptjs` - Password hashing
- `next-auth` or custom session management
- `zod` - Form validation
- `react-hook-form` - Form handling
- `@hookform/resolvers` - Zod resolver for react-hook-form

## Key Features

1. **Security**: Password-protected admin access
2. **Database**: Persistent storage with Prisma ORM
3. **CRUD Operations**: Full create, read, update, delete
4. **Image Upload**: Cover image management
5. **Form Validation**: Comprehensive input validation
6. **User Experience**: Clean, intuitive admin interface
7. **Integration**: Seamless integration with existing site
8. **Quick Access**: Easy access from main site

## Database Schema

```prisma
model Book {
  id              String   @id @default(cuid())
  slug            String   @unique
  title           String
  author          String
  cover           String
  description     String
  backgroundColor String
  textColor       String
  summary         String?
  authorBio       String?
  authorTwitter   String?
  authorWebsite   String?
  buyLinks        Json?    // Array of {label, url, price}
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

## Migration Strategy

1. Keep existing mock data as fallback
2. Create database and seed with existing books
3. Update getBooks to try database first, fallback to mock
4. Gradually migrate all operations to database
5. Remove mock data once fully migrated

### To-dos

- [ ] Update Book3DCard component to work with new data structure
- [ ] Add 3D book CSS styles back to globals.css
- [ ] Update homepage to use 3D book cards
- [ ] Enhance 3D book design with better styling