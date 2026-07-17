import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 1. Protect Admin Pages
  if (path.startsWith("/admin") && path !== "/admin/login") {
    const token = request.cookies.get("admin_session")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "athecs_security_token_secret_key_2026");
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("admin_session");
      return response;
    }
  }

  // 2. Protect Admin API Routes
  if (path.startsWith("/api/admin") && path !== "/api/admin/login" && path !== "/api/admin/logout") {
    const isPublicGet = request.method === "GET" && (path === "/api/admin/activities" || path === "/api/admin/results");
    
    if (!isPublicGet) {
      const token = request.cookies.get("admin_session")?.value;

      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "athecs_security_token_secret_key_2026");
        await jwtVerify(token, secret);
        return NextResponse.next();
      } catch {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }
  }

  // 3. Prevent logged-in admin from visiting login page
  if (path === "/admin/login") {
    const token = request.cookies.get("admin_session")?.value;
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "athecs_security_token_secret_key_2026");
        await jwtVerify(token, secret);
        return NextResponse.redirect(new URL("/admin", request.url));
      } catch {
        // Token invalid, allow login page
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
