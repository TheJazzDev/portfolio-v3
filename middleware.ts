import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow the main /admin page (login page)
    if (request.nextUrl.pathname === '/admin') {
      return NextResponse.next();
    }

    // For all other /admin routes, check authentication
    const authHeader = request.headers.get('x-admin-auth');
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Check cookie for authentication
    const authCookie = request.cookies.get('admin_authenticated');

    if (!authCookie?.value || authCookie.value !== adminPassword) {
      // Redirect to admin login page
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
