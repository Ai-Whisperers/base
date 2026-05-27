import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export type Middleware = (req: NextRequest, next: () => Promise<NextResponse>) => Promise<NextResponse>

export function chain(...middlewares: Middleware[]) {
  return async (req: NextRequest) => {
    let index = 0
    const next = async (): Promise<NextResponse> => {
      if (index >= middlewares.length) return NextResponse.next()
      const fn = middlewares[index++]
      return fn(req, next)
    }
    return next()
  }
}

const PUBLIC_PATHS = ['/', '/about', '/contact', '/faq', '/blog', '/servicios', '/nosotros', '/api/auth', '/_next']

export function authMiddleware(redirectTo = '/auth/login'): Middleware {
  return async (req, next) => {
    const { pathname } = req.nextUrl
    if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) return next()

    const token = req.cookies.get('sb-access-token')?.value
    if (!token) {
      return NextResponse.redirect(new URL(redirectTo, req.url))
    }
    return next()
  }
}
