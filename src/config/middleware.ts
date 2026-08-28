import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Retrieve the session cookie (change 'auth_token' to your actual session cookie name)
  const token = request.cookies.get('auth_token')?.value;

  // 2. If no token exists, redirect the user to the login page
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    // Preserves the requested URL so you can redirect back after login
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// 3. Define path matching rule
export const config = {
  matcher: [
    /*
     * Protects all paths starting with /admin or /dashboard.
     * Note: Route groups like (admin) are transparent in URLs, so match 
     * the actual URL path users type (e.g., /admin/users -> /admin/:path*).
     */
    '/admin/:path*',
  ],
};