'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import BookHero from '../../../../components/public/bookDetails/BookHero';
import BookInfo from '../../../../components/public/bookDetails/BookInfo';
import ReviewsSection from '../../../../components/public/bookDetails/ReviewsSection';
import WriteReview from '../../../../components/public/bookDetails/WriteReview';
import RelatedBooks from '../../../../components/public/bookDetails/RelatedBooks';
import ReadingProgress from '../../../../components/public/bookDetails/ReadingProgress';

// Mock data - in a real app, this would come from an API
const mockBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    rating: 4.8,
    reviews: 1250,
    totalReviews: 1250,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    genre: "Fiction",
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    fullDescription: "A dazzling novel about all the choices that go into a life well lived, from the internationally bestselling author of Reasons to Stay Alive and How To Stop Time. Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?",
    publishedYear: 2020,
    pages: 288,
    publisher: "Canongate Books",
    language: "English",
    isbn: "978-0525559474",
    awards: ["Goodreads Choice Award for Fiction (2020)"],
    themes: ["Philosophy", "Life Choices", "Regret", "Self-Discovery", "Mental Health"],
    readingTime: "4-6 hours",
    difficulty: "Easy",
    ageRating: "Adult",
    format: ["Hardcover", "Paperback", "eBook", "Audiobook"],
    quotes: [
      "The only way to learn is to live.",
      "Every life contains many millions of decisions. Some big, some small. But every time one decision is taken over another, the outcomes differ.",
      "It is not the lives we regret not living that are the real problem. It is the regret itself."
    ]
  }
];

const mockReviews = [
  {
    id: 1,
    userId: 1,
    userName: "Sarah Johnson",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    date: "2024-01-15",
    title: "A Beautiful Exploration of Life's Possibilities",
    content: "This book absolutely blew me away. Matt Haig has created something truly special here - a story that makes you think deeply about the choices we make and the lives we could have lived.",
    likes: 45,
    helpful: 38,
    verified: true,
    readingStatus: "Completed"
  }
];

export default function BookDetailsPage() {
  const params = useParams();
  const bookId = parseInt(params.id);
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState(mockReviews);
  const [userReview, setUserReview] = useState(null);
  const [readingStatus, setReadingStatus] = useState('want-to-read');
  const [readingProgress, setReadingProgress] = useState(0);
  const [showWriteReview, setShowWriteReview] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundBook = mockBooks.find(b => b.id === bookId);
    setBook(foundBook);
  }, [bookId]);

  const handleAddToShelf = (status) => {
    setReadingStatus(status);
  };

  const handleProgressUpdate = (progress) => {
    setReadingProgress(progress);
  };

  const handleReviewSubmit = (reviewData) => {
    const newReview = {
      id: reviews.length + 1,
      userId: 999,
      userName: "You",
      userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      ...reviewData,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      helpful: 0,
      verified: true,
      readingStatus: readingStatus
    };
    
    setReviews([newReview, ...reviews]);
    setUserReview(newReview);
    setShowWriteReview(false);
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
          <p className="text-lg">Loading book details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Book Hero Section */}
      <BookHero 
        book={book} 
        readingStatus={readingStatus}
        onAddToShelf={handleAddToShelf}
        onStartReading={() => setReadingStatus('currently-reading')}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Book Information */}
            <BookInfo book={book} />

            {/* Reading Progress */}
            {readingStatus === 'currently-reading' && (
              <ReadingProgress 
                progress={readingProgress}
                totalPages={book.pages}
                onProgressUpdate={handleProgressUpdate}
              />
            )}

            {/* Write Review Section */}
            {!userReview && readingStatus !== 'want-to-read' && (
              <div className="card bg-base-200 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title">Share Your Thoughts</h3>
                  <p className="opacity-70">Help other readers by writing a review of this book.</p>
                  <div className="card-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowWriteReview(true)}
                    >
                      Write a Review
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Write Review Modal/Form */}
            {showWriteReview && (
              <WriteReview 
                book={book}
                onSubmit={handleReviewSubmit}
                onCancel={() => setShowWriteReview(false)}
              />
            )}

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
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">Reading Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="opacity-70">Average Rating</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{book.rating}</span>
                      <div className="rating rating-sm">
                        {[...Array(5)].map((_, i) => (
                          <input
                            key={i}
                            type="radio"
                            className={`mask mask-star-2 ${i < Math.floor(book.rating) ? 'bg-orange-400' : 'bg-gray-300'}`}
                            disabled
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Total Reviews</span>
                    <span className="font-bold">{book.totalReviews.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Reading Time</span>
                    <span className="font-bold">{book.readingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Difficulty</span>
                    <span className="font-bold">{book.difficulty}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">Book Details</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="opacity-70">Publisher:</span> <span className="font-medium">{book.publisher}</span></div>
                  <div><span className="opacity-70">Published:</span> <span className="font-medium">{book.publishedYear}</span></div>
                  <div><span className="opacity-70">Pages:</span> <span className="font-medium">{book.pages}</span></div>
                  <div><span className="opacity-70">Language:</span> <span className="font-medium">{book.language}</span></div>
                  <div><span className="opacity-70">ISBN:</span> <span className="font-medium">{book.isbn}</span></div>
                  <div><span className="opacity-70">Age Rating:</span> <span className="font-medium">{book.ageRating}</span></div>
                </div>
              </div>
            </div>

            {/* Themes */}
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">Themes</h3>
                <div className="flex flex-wrap gap-2">
                  {book.themes.map((theme, index) => (
                    <div key={index} className="badge badge-outline">{theme}</div>
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
                      <li key={index} className="text-sm">{award}</li>
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