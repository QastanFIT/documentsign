import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['nl', 'en', 'fr'],
 
  // Used when no locale matches
  defaultLocale: 'nl'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(nl|fr|en)/:path*', '/document']
};