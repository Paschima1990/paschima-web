import { AdminNav } from '@/components/admin/AdminNav'
import { BulkUpload } from '@/components/admin/BulkUpload'

export default function BulkUploadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#0A0A0A] mb-2">
            Bulk Upload Books
          </h1>
          <p className="text-gray-600">
            Upload multiple books at once from an Excel file.
          </p>
        </div>

        <BulkUpload />
      </div>
    </div>
  )
}

