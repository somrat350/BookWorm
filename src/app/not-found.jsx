import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";
import "./globals.css";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-secondary/10 text-secondary p-5 rounded-full">
            <FiAlertTriangle className="text-5xl" />
          </div>
        </div>

        <h1 className="text-7xl font-extrabold text-secondary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-base-content/70 mb-6">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-secondary px-6 py-3 text-white font-medium hover:bg-secondary/80 transition"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
