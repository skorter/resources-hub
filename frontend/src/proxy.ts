import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./api/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const type = pathname.split("/")[2];

  if (type && type !== type.toLowerCase()) {
    return NextResponse.redirect(
      new URL(`/collections/${type.toLowerCase()}`, request.url),
    );
  }

  const cookies = request.headers.get("cookie") ?? undefined;
  const session = await getSession(cookies);
  const isAdmin = session.success && session.isAdmin;

  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login") &&
    !isAdmin
  ) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (pathname === "/admin/login" && isAdmin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/collections/:type*", "/admin/:path*"],
};
