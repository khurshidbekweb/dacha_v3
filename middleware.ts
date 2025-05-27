import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
let locales = ['uz', 'ru', 'en']

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname
  
  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  if (pathnameHasLocale) return NextResponse.next()
  
  // Get locale from cookie or default to 'uz'
  const locale = request.cookies.get('NEXT_LOCALE')?.value || 'uz'
  
  // Redirect to the same pathname with locale prefixed
  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  )
}