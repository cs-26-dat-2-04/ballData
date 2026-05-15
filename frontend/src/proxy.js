import { NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/signup"];
const PUBLIC_PREFIXES = ["/invite"];

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isPublic =
    PUBLIC_ROUTES.includes(pathname) ||
    PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  // Ingen token og er på privat rute
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Kan ikke gå til login eller signup hvis man har en token
  if (
    token &&
    (pathname === "/login" || pathname === "/signup" || pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // RegEX magi :D
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.ico$).*)",
  ],
};
