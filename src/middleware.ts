import { NextRequest, NextResponse } from 'next/server';
import { i18n } from './i18n';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if the pathname is missing a locale
  const pathnameHasLocale = i18n.locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) return;
  
  // Get locale from cookie or accept-language header or default to 'en'
  let locale = i18n.defaultLocale;
  
  // Try to get locale from cookie
  const localeCookie = request.cookies.get('locale');
  if (localeCookie && i18n.locales.includes(localeCookie.value)) {
    locale = localeCookie.value;
  } else {
    // Try to get locale from accept-language header
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
      // Parse the accept-language header to find the best match
      const languages = acceptLanguage.split(',')
        .map(lang => lang.split(';')[0].trim());
      
      for (const lang of languages) {
        // Check if the language code matches one of our locales
        const matchedLocale = i18n.locales.find(locale => 
          lang.startsWith(locale) || locale.startsWith(lang)
        );
        if (matchedLocale) {
          locale = matchedLocale;
          break;
        }
      }
    }
  }
  
  // Redirect to the same URL with locale prefix
  return NextResponse.redirect(
    new URL(
      `/${locale}${pathname === '/' ? '' : pathname}${request.nextUrl.search}`,
      request.url
    )
  );
}

// Match all paths except for:
// - api routes
// - image routes
// - public files (with extensions like .ico, .jpg, etc.)
export const config = {
  matcher: [
    // Skip public files and API routes
    '/((?!api|_next/static|_next/image|images|audio|favicon.ico|favicon.png|robots.txt).*)',
  ],
};