"use server";

import { BookCard } from "@/components/public/books/BookCard";
import GenreFilter from "@/components/public/books/GenreFilter";
import Pagination from "@/components/public/books/Pagination";
import SearchBar from "@/components/public/books/SearchBar";
import ShowAllBooks from "@/components/public/books/ShowAllBooks";
import Sort from "@/components/public/books/Sort";
import { booksCollection } from "@/lib/dbConnect";

const fetchBooks = async (genre, page, searchTerm, sortBy) => {
  const limit = 8;
  const skip = (page - 1) * limit;
  let query = {};

  if (genre) {
    query.genre = genre;
  }

  if (searchTerm) {
    query.title = { $regex: searchTerm, $options: "i" };
  }

  const books = await booksCollection
    .find(query)
    .sort({ sortBy: 1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  const totalBooks = await booksCollection.countDocuments(query);

  return { books, totalBooks };
};

export default async function Books({ searchParams }) {
  const { genre, page, searchTerm, sort } = await searchParams;
  const { books, totalBooks } = await fetchBooks(genre, page, searchTerm, sort);
  const totalPages = Math.ceil(totalBooks / 8);
  const currentPage = parseInt(page) || 1;

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header Section */}
      <div className="bg-linear-to-r from-primary/10 to-secondary/10 py-16">
        <div className="w-full max-w-360 mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">📚 Discover Books</h1>
            <p className="text-xl opacity-70 max-w-2xl mx-auto">
              Explore our vast collection of books across all genres. Find your
              next great read!
            </p>
            <div className="stats stats-horizontal shadow-lg bg-base-100/80 backdrop-blur-sm mt-8">
              <div className="stat">
                <div className="stat-title">Total Books</div>
                <div className="stat-value text-primary">{totalBooks}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Genres</div>
                <div className="stat-value text-secondary">{1}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Showing</div>
                <div className="stat-value text-accent">{books.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search Section */}
      <div className="w-full max-w-360 mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar />
          </div>
          <div className="flex justify-between sm:justify-end gap-4">
            <GenreFilter currentGenre={genre} />
            <Sort currentSort={sort} />
          </div>
        </div>

        {/* Books Grid */}
        {books.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination currentPage={currentPage} totalPages={totalPages} />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold mb-2">No books found</h3>
            <p className="text-lg opacity-70 mb-6">
              Try adjusting your search terms or filters
            </p>
            <ShowAllBooks />
          </div>
        )}
      </div>
    </div>
  );
}
