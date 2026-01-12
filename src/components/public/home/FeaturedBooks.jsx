import Link from "next/link";
import { FaStar } from "react-icons/fa";

export default function FeaturedBooks() {
  const featuredBooks = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      rating: 4.8,
      reviews: 1250,
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      genre: "Fiction",
      price: "$12.99",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      rating: 4.9,
      reviews: 2100,
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
      genre: "Self-Help",
      price: "$15.99",
    },
    {
      id: 3,
      title: "The Seven Moons",
      author: "Sarah Chen",
      rating: 4.7,
      reviews: 890,
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      genre: "Fantasy",
      price: "$13.99",
    },
    {
      id: 4,
      title: "Digital Minimalism",
      author: "Cal Newport",
      rating: 4.6,
      reviews: 1560,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      genre: "Technology",
      price: "$14.99",
    },
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="w-full max-w-360 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Books</h2>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Discover the most popular and highly-rated books chosen by our
            community
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredBooks.map((book) => (
            <div
              key={book.id}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <figure className="px-4 pt-4">
                <img
                  src={book.image}
                  alt={book.title}
                  className="rounded-xl h-64 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <div className="badge badge-secondary badge-sm mb-2">
                  {book.genre}
                </div>
                <h3 className="card-title text-lg">{book.title}</h3>
                <p className="text-sm opacity-70">by {book.author}</p>

                <div className="flex items-center gap-2 my-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(book.rating)
                            ? "text-orange-500"
                            : "text-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">{book.rating}</span>
                  <span className="text-xs opacity-60">({book.reviews})</span>
                </div>

                <div className="card-actions justify-between items-center mt-4">
                  <span className="text-lg font-bold text-secondary">
                    {book.price}
                  </span>
                  <Link
                    href={`/book/${book.id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/books" className="btn btn-outline btn-secondary btn-lg">
            View All Books
          </Link>
        </div>
      </div>
    </section>
  );
}
