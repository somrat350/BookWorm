import ReviewList from "@/components/dashboard/manageReviews/ReviewList";
import { reviewsCollection } from "@/lib/dbConnect";
import React from "react";
import { FiShield } from "react-icons/fi";

const getPendingReviews = async () => {
  const pendingReviews = await reviewsCollection
    .find({ status: "pending" })
    .toArray();
  return pendingReviews.map((pr) => ({
    _id: pr._id.toString(),
    bookId: pr.bookId,
    userName: pr.userName,
    rating: pr.rating,
    comment: pr.comment,
    status: pr.status,
  }));
};

const ManageReviews = async () => {
  const reviews = await getPendingReviews();

  return (
    <div className="bg-base-100">
      <div className="w-full max-w-360 mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-black flex items-center gap-2">
            <FiShield className="text-secondary" /> Review Moderation
          </h1>
          <p className="opacity-60">Approve or remove pending user feedback</p>
        </header>

        {reviews.length === 0 ? (
          <div className="alert shadow-lg bg-base-200">
            <p>No pending reviews to moderate. Great job!</p>
          </div>
        ) : (
          <ReviewList reviews={reviews} />
        )}
      </div>
    </div>
  );
};

export default ManageReviews;
