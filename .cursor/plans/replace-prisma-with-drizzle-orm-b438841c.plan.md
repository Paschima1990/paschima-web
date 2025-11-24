<!-- b438841c-e774-4492-952d-640b8bd60846 ef124f9b-4d84-45e3-9c0c-5194e01f787d -->
# Replace Prisma with Drizzle ORM

## Overview

Replace Prisma ORM with Drizzle ORM to eliminate Prisma 7.0 compatibility issues. Drizzle is a lightweight, TypeScript-first ORM that works seamlessly with SQLite and Next.js.

## Implementation Steps

### 1. Install Drizzle ORM and dependencies

- Install `drizzle-orm`, `drizzle-kit`, and `better-sqlite3`
- Add TypeScript types for better-sqlite3

### 2. Create Drizzle schema

- Create `lib/db/schema.ts` with Book table schema matching current Prisma model
- Define TypeScript types for the Book model

### 3. Replace database initialization

- Update `lib/db.ts` to use Drizzle with better-sqlite3
- Create database connection singleton pattern
- Export query builder and database instance

### 4. Update API routes

- **`app/api/books/route.ts`**: Replace Prisma queries with Drizzle (GET, POST)
- **`app/api/books/[slug]/route.ts`**: Replace Prisma queries with Drizzle (GET, PUT, DELETE)
- Maintain same API contract and response formats

### 5. Update data access layer

- **`lib/getBooks.ts`**: Replace `db.book.findMany()` with Drizzle select queries
- Keep fallback to mock data on errors

### 6. Update seed script

- **`prisma/seed.ts`** → **`lib/db/seed.ts`**: Rewrite using Drizzle insert operations
- Update package.json script to point to new location

### 7. Create migration setup

- Create `drizzle.config.ts` for Drizzle Kit configuration
- Add migration scripts to package.json

### 8. Remove Prisma files and dependencies

- Delete `prisma/` directory (schema, migrations, seed)
- Delete `prisma.config.ts`
- Remove `@prisma/client` and `prisma` from package.json
- Remove Prisma-related scripts

### 9. Update package.json scripts

- Replace `db:migrate` with Drizzle migration command
- Update `db:seed` to use new seed location
- Remove `db:generate` (not needed with Drizzle)

## Files to Modify

**New Files:**

- `lib/db/schema.ts` - Drizzle schema definition
- `lib/db/seed.ts` - Database seeding script
- `drizzle.config.ts` - Drizzle Kit configuration

**Modified Files:**

- `lib/db.ts` - Replace PrismaClient with Drizzle
- `lib/getBooks.ts` - Update database queries
- `app/api/books/route.ts` - Replace Prisma queries
- `app/api/books/[slug]/route.ts` - Replace Prisma queries
- `package.json` - Update dependencies and scripts

**Deleted Files:**

- `prisma/schema.prisma`
- `prisma/seed.ts`
- `prisma.config.ts`
- `prisma/migrations/` directory

## Key Changes

1. **Database Connection**: Use `better-sqlite3` with Drizzle instead of Prisma Client
2. **Query Syntax**: Replace Prisma's fluent API with Drizzle's SQL-like query builder
3. **Type Safety**: Drizzle provides excellent TypeScript inference without code generation
4. **Migrations**: Use Drizzle Kit for schema migrations instead of Prisma Migrate

## Migration Notes

- Existing `dev.db` SQLite database will be compatible (same schema)
- No data migration needed if schema matches
- All API endpoints maintain same behavior and response formats

### To-dos

- [ ] Install Drizzle ORM packages (drizzle-orm, drizzle-kit, better-sqlite3) and update package.json
- [ ] Create lib/db/schema.ts with Drizzle schema definition matching current Book model
- [ ] Replace lib/db.ts to use Drizzle with better-sqlite3 connection
- [ ] Update app/api/books/route.ts and app/api/books/[slug]/route.ts to use Drizzle queries
- [ ] Update lib/getBooks.ts to use Drizzle select queries
- [ ] Create lib/db/seed.ts with Drizzle insert operations and update package.json script
- [ ] Create drizzle.config.ts for Drizzle Kit configuration
- [ ] Remove Prisma dependencies, files (prisma/ directory, prisma.config.ts), and update package.json scripts