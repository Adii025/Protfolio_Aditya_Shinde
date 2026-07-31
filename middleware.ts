import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Let the login page through always
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Protect every other /admin/* route
  const session = req.cookies.get("admin_session");

  if (!session && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
