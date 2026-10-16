import { type NextRequest, NextResponse } from "next/server";

const PROTECTED_PREFIXES = ["/dashboard", "/orders", "/profile"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasToken =
    request.cookies.has("access_token") ||
    request.cookies.get("auth_state")?.value === "1";

  // Redirect unauthenticated users away from protected routes
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (isProtected && !hasToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from auth pages
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
  if (isAuthPage && hasToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
