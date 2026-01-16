import BookInfo from "../../../../components/public/bookDetails/BookInfo";
import ReviewsSection from "../../../../components/public/bookDetails/ReviewsSection";
import { ObjectId } from "mongodb";
import { booksCollection, reviewsCollection } from "@/lib/dbConnect";
import BookHero from "@/components/public/bookDetails/BookHero";
import BookStats from "@/components/public/bookDetails/BookStats";

const getBookDetails = async (id) => {
  const originalFormat = await booksCollection.findOne({
    _id: new ObjectId(id),
  });
  return { ...originalFormat, _id: originalFormat._id.toString() };
};

const getBookReviews = async (id) => {
  const originalFormat = await reviewsCollection
    .find({
      bookId: id,
      status: "approved",
    })
    .sort({ rating: -1 })
    .limit(10)
    .toArray();
  return originalFormat.map((r) => ({
    _id: r._id.toString(),
    userName: r.userName,
    userAvatar: r.userAvatar,
    comment: r.comment,
    rating: r.rating,
  }));
};

export default async function BookDetailsPage({ params }) {
  const { id } = await params;
  const book = await getBookDetails(id);
  const reviews = await getBookReviews(id);

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
              bookId={book._id}
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

export async function generateMetadata({ params }) {
  const { id } = await params;
  const book = await getBookDetails(id);

  return {
    title: `${book?.title || "Book"} | BookWorm`,
    description: book?.description,
  };
}
