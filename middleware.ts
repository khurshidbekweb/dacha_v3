import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { safeLocalStorage } from './utils/safeLocalstorge'
 
export function middleware(request: NextRequest) {
  const locale = safeLocalStorage.getItem('language') || 'uz'
  
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname
  
  // Redirect if there is no locale
  if (
    pathname.startsWith('/uz') || 
    pathname.startsWith('/ru') || 
    pathname.startsWith('/en')
  ) {
    return NextResponse.next()
  }
  
  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  )
}