import { NextResponse, type NextRequest } from 'next/server';

const SESSION_COOKIE = 'fg_session';

/**
 * Presence gate for the operational workspace.
 *
 * This only checks that a session cookie exists, because the demonstration build
 * has no server-side auth provider. Real deployments must validate a signed
 * session and role permissions on the server rather than relying on this check.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  if (pathname.startsWith('/dashboard') && !hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = '/signin';
    url.search = '';
    url.searchParams.set('next', `${pathname}${search}`);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
