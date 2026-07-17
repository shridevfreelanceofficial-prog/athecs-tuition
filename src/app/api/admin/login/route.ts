import { NextResponse } from "next/server";
import { SignJWT } from "jose";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const adminUser = process.env.ADMIN_USERNAME || "admin";
    const adminPass = process.env.ADMIN_PASSWORD || "AthecsAdmin2026!";
    const jwtSecret = process.env.JWT_SECRET || "athecs_security_token_secret_key_2026";

    // DEBUG: log what the server is reading (remove after confirming login works)
    console.log("[Admin Login] ENV ADMIN_USERNAME =", JSON.stringify(adminUser));
    console.log("[Admin Login] ENV ADMIN_PASSWORD =", JSON.stringify(adminPass));
    console.log("[Admin Login] Received username =", JSON.stringify(username));
    console.log("[Admin Login] Received password =", JSON.stringify(password));

    if (username !== adminUser || password !== adminPass) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    // Sign JWT Token
    const secret = new TextEncoder().encode(jwtSecret);
    const token = await new SignJWT({ username })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret);

    // Create response and set cookie
    const response = NextResponse.json({ success: true });
    
    response.cookies.set({
      name: "admin_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error: any) {
    console.error("Admin Login Error:", error);
    return NextResponse.json({ error: error.message || "Authentication failed" }, { status: 500 });
  }
}
