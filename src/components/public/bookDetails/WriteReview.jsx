'use client';

import { useState } from 'react';

export default function WriteReview({ book, onSubmit, onCancel }) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || content.trim() === '') return;

    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit({
      rating,
      title: title.trim(),
      content: content.trim()
    });
    
    setIsSubmitting(false);
  };

  const isValid = rating > 0 && content.trim().length > 0;

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <div className="flex items-center justify-between mb-6">
          <h3 className="card-title text-2xl">✍️ Write a Review</h3>
          <button 
            className="btn btn-ghost btn-sm"
            onClick={onCancel}
          >
            ✕
          </button>
        </div>

        {/* Book Info */}
        <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg mb-6">
          <img
            src={book.image}
            alt={book.title}
            className="w-16 h-24 object-cover rounded"
          />
          <div>
            <h4 className="font-bold text-lg">{book.title}</h4>
            <p className="opacity-70">by {book.author}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Your Rating *</span>
            </label>
            <div className="flex items-center gap-4">
              <div className="rating rating-lg">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-orange-400"
                    checked={rating === star}
                    onChange={() => setRating(star)}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">
                {rating > 0 ? `${rating}/5` : 'Select rating'}
              </span>
            </div>
          </div>

          {/* Review Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Review Title (Optional)</span>
            </label>
            <input
              type="text"
              placeholder="Summarize your thoughts in a few words"
              className="input input-bordered"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
            <label className="label">
              <span className="label-text-alt opacity-60">{title.length}/100 characters</span>
            </label>
          </div>

          {/* Review Content */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Your Review *</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-32"
              placeholder="Share your thoughts about this book. What did you like or dislike? Would you recommend it to others?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={2000}
              required
            ></textarea>
            <label className="label">
              <span className="label-text-alt opacity-60">{content.length}/2000 characters</span>
            </label>
          </div>

          {/* Guidelines */}
          <div className="alert alert-info">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-bold">Review Guidelines</h4>
              <ul className="text-sm mt-2 space-y-1">
                <li>• Be honest and constructive in your feedback</li>
                <li>• Avoid spoilers - let others discover the story</li>
                <li>• Focus on your reading experience</li>
                <li>• Be respectful to the author and other readers</li>
              </ul>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className={`btn btn-primary flex-1 ${isSubmitting ? 'loading' : ''}`}
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? 'Publishing Review...' : 'Publish Review'}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}