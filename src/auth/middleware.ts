import { auth } from "./edge";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Handles administrative path guards.
 * Redirects unauthenticated /admin requests to the login panel.
 */
export async function protectAdminRoutes(request: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  if (request.nextUrl.pathname.startsWith("/admin") && !isLoginPage) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  return null;
}
