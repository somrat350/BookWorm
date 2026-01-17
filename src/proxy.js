import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const adminRoutes = [
  "/dashboard/addNewBook",
  "/dashboard/editBook",
  "/dashboard/manageBooks",
  "/dashboard/manageGenres",
  "/dashboard/manageReviews",
  "/dashboard/manageTutorials",
  "/dashboard/manageUsers",
];

export async function proxy(req) {
  const reqPath = req.nextUrl.pathname;
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  if (!isAuthenticated) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", reqPath);
    return NextResponse.redirect(loginUrl);
  }
  const isAdmin = token.role === "admin";
  const isAdminRoute = adminRoutes.some((route) => reqPath.startsWith(route));
  if (!isAdmin && isAdminRoute) {
    const forbiddenAccessUrl = new URL("/forbiddenAccess", req.url);
    return NextResponse.redirect(forbiddenAccessUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/myLibrary/:path*", "/tutorials/:path*"],
};
