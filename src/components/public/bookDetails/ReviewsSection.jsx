import AddReview from "./AddReview";

export default function ReviewsSection({ reviews, bookRating, totalReviews }) {
  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((r) => r.rating === rating).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { rating, count, percentage };
  });
  const showingReviews = reviews.slice(0, 2);

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-6">⭐ Reviews & Ratings</h2>

        {/* Rating Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-6xl font-bold text-primary mb-2">
              {bookRating}
            </div>
            <div className="rating rating-lg mb-2">
              {[...Array(5)].map((_, i) => (
                <input
                  key={i}
                  type="radio"
                  className={`mask mask-star-2 ${
                    i < Math.floor(bookRating) ? "bg-orange-400" : "bg-gray-300"
                  }`}
                  disabled
                />
              ))}
            </div>
            <div className="text-lg opacity-70">
              Based on {totalReviews.toLocaleString()} reviews
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm font-medium w-8">{rating}★</span>
                <div className="flex-1">
                  <progress
                    className="progress progress-warning w-full"
                    value={percentage}
                    max="100"
                  ></progress>
                </div>
                <span className="text-sm opacity-70 w-12">{count}</span>
              </div>
            ))}
          </div>
          {/* Rating Distribution */}
        </div>
        {/* Reviews */}
        <div className="space-y-4">
          {showingReviews.map((review, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img src={review.userAvatar} />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{review.userName}</div>
                </div>
              </div>
              <div className="rating rating-sm mb-2">
                {[...Array(5)].map((_, i) => (
                  <input
                    key={i}
                    type="radio"
                    className={`mask mask-star-2 ${
                      i < review.rating ? "bg-orange-400" : "bg-gray-300"
                    }`}
                    disabled
                  />
                ))}
              </div>
              <div className="text-sm opacity-70">{review.content}</div>
            </div>
          ))}
        </div>
        {/* Add Review */}
        <AddReview />
      </div>
    </div>
  );
}
