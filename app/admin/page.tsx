import { AdminNav } from '@/components/admin/AdminNav'
import { BookTable } from '@/components/admin/BookTable'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#0A0A0A] mb-2">
            Book Management
          </h1>
          <p className="text-gray-600">
            Manage your book collection. Create, edit, or delete books.
          </p>
        </div>
        <BookTable />
      </div>
    </div>
  )
}

