"use server";

import BookInfo from "../../../../components/public/bookDetails/BookInfo";
import ReviewsSection from "../../../../components/public/bookDetails/ReviewsSection";
import { ObjectId } from "mongodb";
import { booksCollection } from "@/lib/dbConnect";
import BookHero from "@/components/public/bookDetails/BookHero";
import BookStats from "@/components/public/bookDetails/BookStats";

const reviews = [
  {
    id: 1,
    userId: 1,
    userName: "Sarah Johnson",
    userAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    date: "2024-01-15",
    title: "A Beautiful Exploration of Life's Possibilities",
    content:
      "This book absolutely blew me away. Matt Haig has created something truly special here - a story that makes you think deeply about the choices we make and the lives we could have lived.",
    likes: 45,
    helpful: 38,
    verified: true,
    readingStatus: "Completed",
  },
  {
    id: 2,
    userId: 2,
    userName: "Sarah Johnson",
    userAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    rating: 2,
    date: "2024-01-15",
    title: "A Beautiful Exploration of Life's Possibilities",
    content:
      "This book absolutely blew me away. Matt Haig has created something truly special here - a story that makes you think deeply about the choices we make and the lives we could have lived.",
    likes: 45,
    helpful: 38,
    verified: true,
    readingStatus: "Completed",
  },
];

const getBooksDetails = async (id) => {
  const book = booksCollection.findOne({ _id: new ObjectId(id) });
  return book;
};

export default async function BookDetailsPage({ params }) {
  const { id } = await params;
  const book = await getBooksDetails(id);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Book Hero Section */}
      <BookHero book={book} />

      <div className="w-full max-w-360 mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Book Information */}
            <BookInfo book={book} />

            {/* Reviews Section */}
            <ReviewsSection
              reviews={reviews}
              bookRating={book.rating}
              totalReviews={book.totalReviews}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Book Stats */}
            <BookStats book={book} />

            {/* Book Details */}
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">Book Details</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="opacity-70">Publisher:</span>{" "}
                    <span className="font-medium">{book.publisher}</span>
                  </div>
                  <div>
                    <span className="opacity-70">Published:</span>{" "}
                    <span className="font-medium">{book.publishedYear}</span>
                  </div>
                  <div>
                    <span className="opacity-70">Pages:</span>{" "}
                    <span className="font-medium">{book.pages}</span>
                  </div>
                  <div>
                    <span className="opacity-70">Language:</span>{" "}
                    <span className="font-medium">{book.language}</span>
                  </div>
                  <div>
                    <span className="opacity-70">ISBN:</span>{" "}
                    <span className="font-medium">{book.isbn}</span>
                  </div>
                  <div>
                    <span className="opacity-70">Age Rating:</span>{" "}
                    <span className="font-medium">{book.ageRating}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Themes */}
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">Themes</h3>
                <div className="flex flex-wrap gap-2">
                  {book.themes.map((theme, index) => (
                    <div key={index} className="badge badge-outline">
                      {theme}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Awards */}
            {book.awards && book.awards.length > 0 && (
              <div className="card bg-base-200 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4">🏆 Awards</h3>
                  <ul className="space-y-2">
                    {book.awards.map((award, index) => (
                      <li key={index} className="text-sm">
                        {award}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
