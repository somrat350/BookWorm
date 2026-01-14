import Link from "next/link";
import { BookCard } from "../books/BookCard";
import { booksCollection } from "@/lib/dbConnect";

const getFeaturedBooks = async () => {
  const books = await booksCollection
    .find()
    .sort({ rating: -1 })
    .limit(8)
    .toArray();
  return books;
};

export default async function FeaturedBooks() {
  const featuredBooks = await getFeaturedBooks();

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
