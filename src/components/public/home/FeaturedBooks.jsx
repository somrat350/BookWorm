import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { BookCard } from "../books/BookCard";

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
            <BookCard key={book._id} book={book} />
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
