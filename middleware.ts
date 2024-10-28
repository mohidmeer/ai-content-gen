import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/dashboard"];

const authPages = ["/auth"];


export default async function middleware(request: NextRequest) {
 
  const session = await auth();

 
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isAuthPage = authPages.some((page) =>
    request.nextUrl.pathname.startsWith(page)
  );


  if (!session && isProtectedRoute) {
    const signInUrl = new URL("/auth/sign-in", request.nextUrl.origin);
    return NextResponse.redirect(signInUrl.toString());
  }

  if (session && isAuthPage) {
    const dashboardUrl = new URL("/dashboard", request.nextUrl.origin);
    return NextResponse.redirect(dashboardUrl.toString());
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};