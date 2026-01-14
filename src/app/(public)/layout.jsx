import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "../../components/public/Header";
import Footer from "../../components/public/Footer";
import { ToastContainer } from "react-toastify";
import AuthProvider from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Home | BookWorm",
  description: "Welcome to BookWorm platform. Read book and gain knowledge.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <main className="min-h-screen flex flex-col">
            <ToastContainer />
            <Header />
            <div className="grow">{children}</div>
            <Footer />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
