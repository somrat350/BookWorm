import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="hero py-10 min-h-screen bg-linear-to-br from-primary/20 via-secondary/10 to-accent/20">
      <div className="hero-content text-center">
        <div className="max-w-4xl">
          <div className="mb-8">
            <span className="mb-4 flex items-center justify-center animate-bounce text-center">
              <Image
                src="/bookWorm-logo.png"
                alt="BookWorm"
                width={200}
                height={200}
              />
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to BookWorm
            </h1>
          </div>
          <p className="text-lg sm:text-xl mb-8 opacity-80 max-w-2xl mx-auto leading-relaxed">
            Discover your next favorite book, connect with fellow readers, and
            dive into a world of endless stories. Join thousands of book lovers
            in the ultimate reading community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Link
              href="/books"
              className="btn btn-secondary btn-lg w-full sm:w-fit"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Explore Books
            </Link>
            <Link
              href="/register"
              className="btn btn-outline btn-secondary btn-lg w-full sm:w-fit"
            >
              Join Community
            </Link>
          </div>
          <div className="mt-12 w-full stats stats-vertical sm:stats-horizontal shadow-lg bg-base-100/80 backdrop-blur-sm">
            <div className="stat w-full">
              <div className="stat-title">Books</div>
              <div className="stat-value text-primary">50K+</div>
            </div>
            <div className="stat w-full">
              <div className="stat-title">Readers</div>
              <div className="stat-value text-secondary">25K+</div>
            </div>
            <div className="stat w-full">
              <div className="stat-title">Reviews</div>
              <div className="stat-value text-accent">100K+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
