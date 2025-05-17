import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get("auth_token")?.value

  // Check if the path is a protected route
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/api/user")

  // If it's a protected route and there's no token, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If there is a token, verify it
  if (isProtectedRoute && token) {
    const user = verifyToken(token)

    // If token is invalid, redirect to login
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // If user is logged in and trying to access login/signup, redirect to dashboard
  if ((request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup") && token) {
    const user = verifyToken(token)
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/api/user/:path*", "/login", "/signup"],
}
