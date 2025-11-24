import { NextRequest, NextResponse } from 'next/server'
import { createSession, getAdminPassword, verifyPassword, hashPassword } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    // For simple password auth, compare directly
    // In production, you'd hash the stored password
    const adminPassword = getAdminPassword()

    // Simple comparison for now (in production, use hashed password)
    if (password !== adminPassword) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Create session
    await createSession()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

