import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoutes = ["/dashboard", "/myLibrary", "/tutorials"];
export async function proxy(req) {
  const reqPath = req.nextUrl.pathname;
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const isPrivateRoute = privateRoutes.some((route) =>
    reqPath.startsWith(route)
  );
  if (isPrivateRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", reqPath);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/myLibrary/:path*", "/tutorials/:path*"],
};
