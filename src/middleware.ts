import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "./utils/functions/getSession";

const PUBLIC_ROUTES = [
  {
    path: "/login",
    whenAuthenticated: "redirect",
  },
  {
    path: "/register",
    whenAuthenticated: "redirect",
  },
] as const;

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const pathName = request.nextUrl.pathname;

  const isPublicRoute = PUBLIC_ROUTES.find((route) => {
    return pathName === route.path;
  });

  if (
    session &&
    isPublicRoute &&
    isPublicRoute.whenAuthenticated === "redirect"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)",
  ],
};
