import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import AuthProvider from "@/components/AuthProvider";
import DashboardNav from "@/components/dashboard/DashboardNav";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dashboard | BookWorm",
  description:
    "View your reading progress, statistics, and managed library on BookWorm.",
  openGraph: {
    title: "User Dashboard | BookWorm",
    description: "Keep track of all your books and reading goals.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ToastContainer />
          <div className="min-h-screen">
            <div className="drawer lg:drawer-open">
              <input
                id="my-drawer-4"
                type="checkbox"
                // defaultChecked
                className="drawer-toggle"
              />
              <div className="drawer-content">
                {/* Navbar */}
                <DashboardNav />
                <div className="p-3">
                  <div className="rounded-2xl p-4">{children}</div>
                </div>
              </div>

              <div className="drawer-side is-drawer-close:overflow-visible border-r border-primary/30 bg-base-300">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                {/* Sidebar content here */}
                <DashboardSidebar />
              </div>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
