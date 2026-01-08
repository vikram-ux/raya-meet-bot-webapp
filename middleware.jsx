import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Public routes jo login ke bina access ho sakte hain
  const publicRoutes = [
    '/handler',           // Stack Auth handler routes (sign-in, sign-up, etc.)
    '/api',               // API routes
    '/_next',             // Next.js internal files
    '/favicon.ico',       // Favicon
  ];

  // Check karo agar route public hai
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Agar public route hai, to directly allow karo
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Stack Auth cookie check karo
  // Stack Auth "nextjs-cookie" tokenStore use karta hai, to cookie check karte hain
  const cookies = request.cookies;
  let hasAuthCookie = false;
  
  // Stack Auth ke possible cookie names check karte hain
  const possibleCookieNames = [
    'stack-auth-token',
    'stack_token', 
    '__stack_auth_token',
    'stack.session',
    'stack-auth.session',
  ];
  
  // Check if any auth cookie exists
  for (const cookieName of possibleCookieNames) {
    if (cookies.get(cookieName)) {
      hasAuthCookie = true;
      break;
    }
  }
  
  // Agar koi auth cookie nahi mila, to sab cookies check karo for Stack Auth pattern
  if (!hasAuthCookie) {
    for (const cookie of cookies.getAll()) {
      if (cookie.name.includes('stack') || cookie.name.includes('auth')) {
        hasAuthCookie = true;
        break;
      }
    }
  }
  
  // Agar auth cookie nahi hai, to sign-in page par redirect karo
  if (!hasAuthCookie) {
    return NextResponse.redirect(new URL('/handler/sign-in', request.url));
  }

  // Cookie hai, to request continue karo
  return NextResponse.next();
}

export const config = {
  // Sab routes par middleware run karega except static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};