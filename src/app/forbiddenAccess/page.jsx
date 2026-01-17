import Link from "next/link";
import { FiLock } from "react-icons/fi";
import "../globals.css";

export const metadata = {
  title: "Forbidden Access | BookWorm",
  description: "Forbidden Access to BookWorm platform.",
  icons: {
    icon: "/favicon.ico",
  },
};

const ForbiddenAccess = () => {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
          <div className="max-w-md text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-error/10 text-error p-5 rounded-full">
                <FiLock className="text-5xl" />
              </div>
            </div>

            <h1 className="text-7xl font-extrabold text-error mb-4">403</h1>
            <h2 className="text-2xl font-semibold mb-2">Forbidden Access</h2>

            <p className="text-base-content/70 mb-6">
              Sorry, you don’t have permission to access this page.
            </p>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-error px-6 py-3 text-white font-medium hover:bg-error/80 transition"
            >
              Go back home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
};

export default ForbiddenAccess;
