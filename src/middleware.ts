import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (token) return NextResponse.next();

  try {
    const statusUrl = new URL("/api/maintenance-status", req.nextUrl.origin);
    const res = await fetch(statusUrl, { cache: "no-store" });
    if (!res.ok) return NextResponse.next();
    const data = (await res.json()) as { maintenance?: boolean };
    if (data.maintenance) {
      const url = req.nextUrl.clone();
      url.pathname = "/maintenance";
      url.search = "";
      return NextResponse.rewrite(url);
    }
  } catch {
    // Fail open — never lock visitors out if the status check fails.
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|maintenance|admin|offline|sw\\.js|manifest\\.webmanifest|icons/|robots\\.txt|sitemap\\.xml).*)",
  ],
};
