import Link from "next/link";

export default function CategoriesSection() {
  const categories = [
    {
      name: "Fiction",
      icon: "📖",
      count: "12,500+ books",
      color: "from-purple-500 to-pink-500",
      description: "Immerse yourself in captivating stories",
    },
    {
      name: "Non-Fiction",
      icon: "🧠",
      count: "8,200+ books",
      color: "from-blue-500 to-cyan-500",
      description: "Learn and grow with factual content",
    },
    {
      name: "Science Fiction",
      icon: "🚀",
      count: "5,800+ books",
      color: "from-green-500 to-teal-500",
      description: "Explore futuristic worlds and technology",
    },
    {
      name: "Romance",
      icon: "💕",
      count: "9,100+ books",
      color: "from-red-500 to-pink-500",
      description: "Fall in love with heartwarming stories",
    },
    {
      name: "Mystery",
      icon: "🔍",
      count: "6,700+ books",
      color: "from-gray-600 to-gray-800",
      description: "Solve puzzles and uncover secrets",
    },
    {
      name: "Biography",
      icon: "👤",
      count: "4,300+ books",
      color: "from-orange-500 to-red-500",
      description: "Discover inspiring life stories",
    },
    {
      name: "Self-Help",
      icon: "💪",
      count: "7,500+ books",
      color: "from-yellow-500 to-orange-500",
      description: "Transform your life and mindset",
    },
    {
      name: "History",
      icon: "🏛️",
      count: "5,200+ books",
      color: "from-indigo-500 to-purple-500",
      description: "Journey through time and civilizations",
    },
  ];

  return (
    <section className="py-20 bg-linear-to-br from-base-200 to-base-300">
      <div className="w-full max-w-360 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Explore Categories</h2>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Find your perfect read across our diverse collection of genres
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/books?category=${category.name
                .toLowerCase()
                .replace(" ", "-")}`}
              className="group"
            >
              <div className="card bg-base-100 h-full shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
                <div
                  className={`h-32 bg-linear-to-br ${category.color} flex items-center justify-center`}
                >
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </span>
                </div>
                <div className="card-body">
                  <h3 className="card-title text-xl group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm opacity-70 mb-2">
                    {category.description}
                  </p>
                  <div className="badge badge-outline">{category.count}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
