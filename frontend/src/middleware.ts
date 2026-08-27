import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const type = pathname.split("/")[2];

  if (type && type !== type.toLowerCase()) {
    return NextResponse.redirect(
      new URL(`/collections/${type.toLowerCase()}`, request.url),
    );
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/collections/:type*"],
};
