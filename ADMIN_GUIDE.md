# Admin Panel Guide

## Accessing the Admin Panel

1. Navigate to `/admin/login`
2. Enter the admin password (default: `admin123` - **change this in production!**)
3. You'll be redirected to the admin dashboard

## Setting Up Admin Password

Set the `ADMIN_PASSWORD` environment variable in `.env.local`:

```
ADMIN_PASSWORD=your-secure-password-here
```

## Features

### Dashboard (`/admin`)
- View all books in a searchable table
- Quick actions: Edit or Delete books
- Add new books

### Create Book (`/admin/books/new`)
- Fill in all book details:
  - Title, Author, Slug (auto-generated from title)
  - Cover image URL
  - Background and text colors (hex format)
  - Description and summary
  - Author bio and social links
  - Buy links (multiple retailers)

### Edit Book (`/admin/books/[slug]/edit`)
- Edit all book details
- Slug cannot be changed after creation
- Real-time color preview

### Quick Access
- Admin link appears in navigation when logged in
- Quick "Edit" button on book detail pages (admin only)

## Database

The system uses SQLite for development. Books are stored in `prisma/dev.db`.

To seed the database with existing books:
```bash
npm run db:seed
```

## API Endpoints

- `GET /api/books` - List all books
- `POST /api/books` - Create book (admin only)
- `GET /api/books/[slug]` - Get single book
- `PUT /api/books/[slug]` - Update book (admin only)
- `DELETE /api/books/[slug]` - Delete book (admin only)

## Security Notes

- Change the default admin password in production
- Consider using environment variables for sensitive data
- The admin session lasts 7 days
- All admin routes are protected by middleware

