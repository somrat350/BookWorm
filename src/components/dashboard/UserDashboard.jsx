import Image from "next/image";
import Link from "next/link";
import {
  FiBookOpen,
  FiStar,
  FiCheckCircle,
  FiTrendingUp,
} from "react-icons/fi";

export default function UserDashboard() {
  return (
    <div className="w-full space-y-8">
      {/* 1. Welcome & Stats Overview */}
      <section>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Welcome back, Bookworm! 📖</h1>
          <div className="badge badge-secondary p-4">
            2026 Reading Goal: 12/24 Books
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-2">
          <div className="bg-base-200 p-3 min-h-28 flex items-center justify-center flex-col gap-3 rounded-lg">
            <span>Currently Reading</span>
            <div className="flex items-center gap-2 text-3xl font-bold text-secondary">
              <span>3</span>
              <FiBookOpen size={24} />
            </div>
          </div>
          <div className="bg-base-200 p-3 min-h-28 flex items-center justify-center flex-col gap-3 rounded-lg">
            <span>Books Finished</span>
            <div className="flex items-center gap-2 text-3xl font-bold text-secondary">
              <span>12</span>
              <FiCheckCircle size={24} />
            </div>
          </div>
          <div className="bg-base-200 p-3 min-h-28 flex items-center justify-center flex-col gap-3 rounded-lg">
            <span>Avg. Rating</span>
            <div className="flex items-center gap-2 text-3xl font-bold text-secondary">
              <span>4.8</span>
              <FiStar size={24} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Currently Reading (The Focus Card) */}
      <section className="grid md:grid-cols-3 gap-2">
        <div className="md:col-span-2 bg-base-100 shadow-xl rounded-lg overflow-hidden grid sm:grid-cols-3">
          <div className="relative h-64 w-full col-span-1 rounded-t-lg sm:rounded-l-lg sm:rounded-t-none  overflow-hidden">
            <Image
              fill
              src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop"
              alt="Book Cover"
            />
          </div>
          <div className="col-span-1 sm:col-span-2 p-6 flex flex-col">
            <h2 className="card-title">The Midnight Library</h2>
            <p className="text-sm opacity-70">By Matt Haig</p>
            <div className="mt-4">
              <div className="flex justify-between mb-2 text-xs font-semibold">
                <span>Reading Progress</span>
                <span>65%</span>
              </div>
              <progress
                className="progress progress-secondary w-full"
                value="65"
                max="100"
              ></progress>
            </div>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-secondary btn-sm">
                Update Progress
              </button>
            </div>
          </div>
        </div>

        {/* Reading Streak / Mini Logic */}
        <div className="card bg-linear-to-br from-secondary to-primary text-primary-content">
          <div className="card-body items-center text-center">
            <FiTrendingUp size={48} />
            <h2 className="card-title text-2xl">5 Day Streak!</h2>
            <p>
              You&apos;re on fire! Read 10 more pages today to keep it going.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Personalized Recommendations */}
      <section>
        <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
          <h2 className="text-2xl font-bold">Recommended for You</h2>
          <div className="badge badge-outline badge-sm">
            Based on Sci-Fi interest
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Link
              key={i}
              href={"/"}
              className="flex flex-col bg-base-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer rounded-lg"
            >
              <div className="px-2 pt-2 relative h-44 overflow-hidden w-full">
                <Image
                  fill
                  src={`https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop`}
                  alt="Book"
                  className="rounded-t-lg shadow-md bg-cover object-cover h-full w-full"
                />
              </div>
              <div className="card-body p-4 items-center text-center">
                <h3 className="text-sm font-bold line-clamp-1">
                  Project Hail Mary
                </h3>
                <p className="text-xs opacity-60">Andy Weir</p>
                <div className="rating rating-xs">
                  <input
                    type="radio"
                    name={`rating-${i}`}
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name={`rating-${i}`}
                    className="mask mask-star-2 bg-orange-400"
                    checked
                    readOnly
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
