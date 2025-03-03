import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("password-manager")?.value;

  const isAuthPage =
    req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup";

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");

  if (!token && isProtectedRoute) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, req.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*"],
};
