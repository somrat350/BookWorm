import Link from "next/link";

export default function CommunitySection() {
  const features = [
    {
      icon: "👥",
      title: "Book Clubs",
      description:
        "Join or create book clubs with readers who share your interests",
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: "💬",
      title: "Discussions",
      description:
        "Engage in meaningful conversations about your favorite books",
      color: "from-green-500 to-blue-500",
    },
    {
      icon: "⭐",
      title: "Reviews & Ratings",
      description: "Share your thoughts and discover what others think",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: "📝",
      title: "Reading Lists",
      description: "Create and share curated lists of must-read books",
      color: "from-pink-500 to-red-500",
    },
    {
      icon: "🏆",
      title: "Reading Challenges",
      description: "Set goals and compete with friends in reading challenges",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: "📊",
      title: "Reading Stats",
      description:
        "Track your reading progress and discover your reading patterns",
      color: "from-indigo-500 to-blue-500",
    },
  ];

  const recentActivity = [
    {
      user: "Alice M.",
      action: "completed",
      book: "The Seven Husbands of Evelyn Hugo",
      time: "2 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    },
    {
      user: "John D.",
      action: "reviewed",
      book: "Atomic Habits",
      time: "4 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    },
    {
      user: "Emma S.",
      action: "started reading",
      book: "The Midnight Library",
      time: "6 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    },
    {
      user: "Mike R.",
      action: "joined book club",
      book: "Sci-Fi Enthusiasts",
      time: "8 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    },
  ];

  return (
    <section className="py-20 bg-base-200">
      <div className="w-full max-w-360 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Join Our Reading Community
          </h2>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Connect with fellow book lovers, share your thoughts, and discover
            your next great read together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-8">Community Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="card-body">
                    <div
                      className={`w-16 h-16 mx-auto rounded-full bg-linear-to-r ${feature.color} flex items-center justify-center mb-4`}
                    >
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <h4 className="card-title text-lg">{feature.title}</h4>
                    <p className="text-sm opacity-70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-8">Recent Activity</h3>
            <div className="bg-base-100 rounded-2xl shadow-lg p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors"
                  >
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={activity.avatar} alt={activity.user} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-semibold">{activity.user}</span>
                        <span className="opacity-70"> {activity.action} </span>
                        <span className="font-medium">{activity.book}</span>
                      </p>
                      <p className="text-xs opacity-50">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="divider"></div>

              <Link href="/community" className="btn btn-secondary btn-block">
                Join the Community
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="stats stats-vertical sm:stats-horizontal w-full max-w-3xl shadow-lg bg-base-100">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <div className="stat-title">Active Members</div>
              <div className="stat-value text-primary">25,431</div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="stat-title">Book Clubs</div>
              <div className="stat-value text-secondary">1,248</div>
              <div className="stat-desc">↗︎ 90 (7%)</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-accent">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="stat-title">Reviews</div>
              <div className="stat-value text-accent">89,400</div>
              <div className="stat-desc">↗︎ 1200 (12%)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
