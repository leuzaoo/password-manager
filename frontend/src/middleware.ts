import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("password-manager")?.value;

  const isAuthPage =
    req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup";

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const protectedRoute = ["/dashboard/:path*"];

  if (!token && protectedRoute) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, req.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
