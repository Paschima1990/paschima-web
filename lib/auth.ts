import { cookies } from 'next/headers'

const SESSION_COOKIE_NAME = 'admin_session'

export async function createSession(): Promise<string> {
  const sessionId = Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64')
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  return sessionId
}

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE_NAME)?.value || null
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return !!session
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'admin123'
}
