"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiCheck, FiTrash2, FiUser, FiStar } from "react-icons/fi";
import { toast } from "react-toastify";

export default function ReviewList({ reviews }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleAction = (reviewId, bookId, action) => {
    setLoading(true);
    axios
      .patch(`/api/reviews/${reviewId}`, { bookId, action })
      .then((res) => {
        if (res.data.success) {
          toast.success(`Review ${action} successfully!`);
          router.refresh();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="grid gap-4">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="card bg-base-100 border border-base-300 shadow-sm hover:border-secondary/50 transition-all"
        >
          <div className="card-body p-5 flex-row items-center justify-between flex-wrap gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-secondary flex items-center gap-1">
                  <FiUser /> {review.userName}
                </span>
                <div className="badge badge-sm badge-outline flex items-center gap-1">
                  {review.rating}{" "}
                  <FiStar className="fill-warning text-warning" />
                </div>
              </div>
              <p className="text-sm italic opacity-80">
                &quot;{review.comment}&quot;
              </p>
              <p className="text-[10px] uppercase opacity-40 mt-2">
                Book ID: {review.bookId}
              </p>
            </div>

            <div className="flex gap-2">
              {loading ? (
                <span className="loading loading-spinner text-secondary"></span>
              ) : (
                <>
                  <button
                    onClick={() =>
                      handleAction(review._id, review.bookId, "approved")
                    }
                    className="btn btn-sm btn-secondary gap-2"
                  >
                    <FiCheck /> Approve
                  </button>
                  <button
                    onClick={() =>
                      handleAction(review._id, review.bookId, "deleted")
                    }
                    className="btn btn-sm btn-ghost text-error hover:bg-error/10 gap-2"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
