import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

const FIRST_ARTICLE = '/ru/start/how-to-use'
const VISITED_COOKIE = 'qh_visited'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // New visitor landing on root "/" → redirect to first article
  const isRoot = pathname === '/' || pathname === '/ru' || pathname === '/ru/'
  if (isRoot && !request.cookies.has(VISITED_COOKIE)) {
    const url = request.nextUrl.clone()
    url.pathname = FIRST_ARTICLE
    const response = NextResponse.redirect(url)
    response.cookies.set(VISITED_COOKIE, '1', {
      maxAge: 60 * 60 * 24 * 365, // 1 год
      path: '/',
      sameSite: 'lax',
    })
    return response
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
