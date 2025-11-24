'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AdminLink() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if admin session exists
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', { method: 'GET' })
        if (response.ok) {
          setIsAuthenticated(true)
        }
      } catch (error) {
        // Not authenticated
      }
    }
    checkAuth()
  }, [])

  if (!isAuthenticated) return null

  return (
    <Link href="/admin">
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-600 hover:text-[#0A0A0A]"
      >
        <Settings className="h-4 w-4 mr-2" />
        Admin
      </Button>
    </Link>
  )
}

