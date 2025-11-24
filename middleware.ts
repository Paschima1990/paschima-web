import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // Only process admin routes
    if (!pathname.startsWith('/admin')) {
        return NextResponse.next()
    }

    const session = request.cookies.get('admin_session')
    const isLoginPage = pathname === '/admin/login'

    // Allow access to login page and API routes
    if (isLoginPage || pathname.startsWith('/api/')) {
        return NextResponse.next()
    }

    // Protect admin routes - redirect to login if no session
    if (!session) {
        // Use absolute URL to prevent redirect loops
        const loginUrl = new URL('/admin/login', request.url)
        // Ensure we're not already on the login page
        if (pathname !== loginUrl.pathname) {
            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}

