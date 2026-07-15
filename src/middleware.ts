import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { protectAdminRoutes } from "@/auth/middleware";

export default async function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") || "vclickdigitally.com";

  // 1. Intercept Administration Route Security Guards
  const authRedirectResponse = await protectAdminRoutes(req);
  if (authRedirectResponse) {
    return authRedirectResponse;
  }

  // 2. Resolve Multi-Site Tenant Hostname Context
  const response = NextResponse.next();
  response.headers.set("x-website-domain", hostname);
  response.headers.set("x-website-fallback", "vclick-digitally");

  return response;
}

// Config targets: Admin routes and public pages (ignoring static resources)
export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|.*\\..*).*)"
  ],
};
