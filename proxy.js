import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

// runs before every request that matches config.matcher
export async function proxy(request) {
  const user = await verifyToken(request.cookies.get("token")?.value);

  if (!user) {
    // not logged in or token expired: send to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // valid token: continue to the requested page
}

// run the proxy only for the members area
export const config = {
  matcher: ["/dashboard/:path*"],
};