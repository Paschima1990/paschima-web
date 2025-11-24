'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'

type Props = {
  slug: string
}

export function QuickEditButton({ slug }: Props) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    fetch('/api/auth/check')
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(data.authenticated))
      .catch(() => setIsAuthenticated(false))
  }, [])

  if (!isAuthenticated) return null

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => router.push(`/admin/books/${slug}/edit`)}
      className="text-[#635BFF] border-[#635BFF] hover:bg-[#635BFF] hover:text-white"
    >
      <Edit className="h-4 w-4 mr-2" />
      Edit
    </Button>
  )
}

