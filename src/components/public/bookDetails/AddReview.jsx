"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";

const ReactStars = dynamic(() => import("react-stars"), { ssr: false });

export default function AddReview({ bookId }) {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { register, handleSubmit } = useForm();
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddReview = (data) => {
    if (!rating) {
      toast.warning("Please enter ratings!");
      return;
    }
    setLoading(true);
    const finalData = {
      bookId,
      rating,
      status: "pending",
      comment: data.comment,
      userName: session.data.user.name,
      userAvatar: session.data.user.photoUrl,
    };
    axios
      .post(`/api/reviews`, finalData)
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            title: "Rating success!",
            icon: "success",
            text: "You added a rating to this book.",
          });
          document.getElementById("addReviewModal").close();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <button
        onClick={() => {
          if (!session?.data || !session?.data?.user) {
            router.push(`/login?callbackUrl=${pathname}`);
            return;
          }
          document.getElementById("addReviewModal").showModal();
        }}
        className="btn btn-secondary btn-lg"
      >
        Add Review
      </button>

      <dialog
        id="addReviewModal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="card bg-base-200 shadow-xl h-fit">
            <form
              onSubmit={handleSubmit(handleAddReview)}
              className="card-body p-4 sm:p-6 gap-4"
            >
              <h2 className="card-title">Add Review</h2>

              <div className="flex flex-col gap-1">
                <label className="label">
                  <span className="label-text font-semibold">Rating</span>
                </label>
                <ReactStars
                  count={5}
                  size={28}
                  color2="#ffd700"
                  half={false}
                  value={rating}
                  onChange={setRating}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="label">
                  <span className="label-text font-semibold">Your Review</span>
                </label>
                <textarea
                  {...register("comment", { required: true })}
                  placeholder="Write your thoughts about this book..."
                  className="textarea w-full min-h-30"
                ></textarea>
              </div>

              <div className="card-actions">
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn btn-secondary w-full flex items-center justify-center gap-2 ${
                    loading && "opacity-70 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-md"></span>
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
