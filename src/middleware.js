import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Rate limiting headers
    const response = NextResponse.next()
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("X-Frame-Options", "DENY")
    response.headers.set("X-XSS-Protection", "1; mode=block")
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
    response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

    // Admin route protection
    if (pathname.startsWith("/admin")) {
      if (!token || token.role !== "admin") {
        return NextResponse.redirect(new URL("/auth/signin?callbackUrl=/admin", req.url))
      }
    }

    // Protected routes
    const protectedRoutes = ["/profile", "/payment"]
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

    if (isProtectedRoute && !token) {
      return NextResponse.redirect(new URL("/auth/signin", req.url))
    }

    return response
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public routes
        const publicRoutes = [
          "/",
          "/courses",
          "/about-us",
          "/contact-us",
          "/support",
          "/auth/signin",
          "/auth/signup",
          "/auth/error",
          "/api/auth",
        ]

        const { pathname } = req.nextUrl

        // Check if it's a public route or API route
        if (publicRoutes.some((route) => pathname.startsWith(route)) || pathname.startsWith("/api/")) {
          return true
        }

        return !!token
      },
    },
  },
)

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
}
