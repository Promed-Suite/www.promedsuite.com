import type { auth } from "apis/auth";
import type { NextRequest } from "next/server";

import { betterFetch } from "@better-fetch/fetch";
import { NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip auth API calls in middleware to prevent loops
  if (pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  const publicRoutes = [
    "/login",
    "/signup",
    "/api/auth", // Allow auth API calls
    "/forgot-password",
    "/reset-password",
    "/verify-email",
  ];

  const isPublicRoute = publicRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!session && pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude auth API from middleware matching
    "/((?!_next|api/auth|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
