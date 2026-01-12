'use client';

import { useState } from 'react';

export default function ReviewsSection({ reviews, bookRating, totalReviews }) {
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  // Filter reviews
  const filteredReviews = sortedReviews.filter(review => {
    if (filterBy === 'all') return true;
    return review.rating === parseInt(filterBy);
  });

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(r => r.rating === rating).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { rating, count, percentage };
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-6">⭐ Reviews & Ratings</h2>

        {/* Rating Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-6xl font-bold text-primary mb-2">{bookRating}</div>
            <div className="rating rating-lg mb-2">
              {[...Array(5)].map((_, i) => (
                <input
                  key={i}
                  type="radio"
                  className={`mask mask-star-2 ${i < Math.floor(bookRating) ? 'bg-orange-400' : 'bg-gray-300'}`}
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
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="form-control">
            <select 
              className="select select-bordered"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
          <div className="form-control">
            <select 
              className="select select-bordered"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div key={review.id} className="border-b border-base-300 pb-6 last:border-b-0">
                <div className="flex items-start gap-4">
                  {/* User Avatar */}
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={review.userAvatar} alt={review.userName} />
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold">{review.userName}</h4>
                        {review.verified && (
                          <div className="badge badge-success badge-sm">Verified</div>
                        )}
                        <div className="badge badge-outline badge-sm">{review.readingStatus}</div>
                      </div>
                      <div className="text-sm opacity-70">{formatDate(review.date)}</div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="rating rating-sm">
                        {[...Array(5)].map((_, i) => (
                          <input
                            key={i}
                            type="radio"
                            className={`mask mask-star-2 ${i < review.rating ? 'bg-orange-400' : 'bg-gray-300'}`}
                            disabled
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold">{review.rating}/5</span>
                    </div>

                    {/* Review Title */}
                    {review.title && (
                      <h5 className="font-semibold text-lg mb-2">{review.title}</h5>
                    )}

                    {/* Review Content */}
                    <p className="text-base leading-relaxed mb-4">{review.content}</p>

                    {/* Review Actions */}
                    <div className="flex items-center gap-4">
                      <button className="btn btn-ghost btn-sm">
                        👍 Helpful ({review.helpful})
                      </button>
                      <button className="btn btn-ghost btn-sm">
                        ❤️ Like ({review.likes})
                      </button>
                      <button className="btn btn-ghost btn-sm">
                        💬 Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2">No reviews match your filters</h3>
              <p className="opacity-70">Try adjusting your filter settings</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {filteredReviews.length > 0 && (
          <div className="text-center mt-8">
            <button className="btn btn-outline">
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
}