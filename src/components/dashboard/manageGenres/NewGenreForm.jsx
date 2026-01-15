"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const NewGenreForm = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const handleNewGenre = (data) => {
    setLoading(true);
    axios
      .post("/api/genres", data)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Created Genre!",
            text: "New Genre Created Successful.",
            icon: "success",
          });
          router.refresh();
          reset();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="card bg-base-200 shadow-xl h-fit">
      <form
        onSubmit={handleSubmit(handleNewGenre)}
        className="card-body p-4 sm:p-6 gap-4"
      >
        <h2 className="card-title mb-4">Add New Genre</h2>
        <div className="flex flex-col gap-1">
          <label className="label">
            <span className="label-text font-semibold">Genre Title</span>
          </label>
          <input
            type="text"
            required
            {...register("title")}
            placeholder="e.g. Science Fiction"
            className="input w-full"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="label">
            <span className="label-text font-semibold">Genre Icon</span>
          </label>
          <input
            type="text"
            required
            {...register("icon")}
            placeholder="e.g. 📚"
            className="input w-full"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="label">
            <span className="label-text font-semibold">Genre Color</span>
          </label>
          <input
            type="text"
            required
            {...register("color")}
            placeholder="e.g. from-purple-500 to-pink-500"
            className="input w-full"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="label">
            <span className="label-text font-semibold">Genre Description</span>
          </label>
          <textarea
            required
            {...register("description")}
            placeholder="Write a short description about this genre..."
            className="textarea w-full min-h-30"
          ></textarea>
        </div>

        <div className="card-actions">
          <button
            type="submit"
            disabled={loading}
            className={`btn btn-secondary w-full text-lg shadow-xl flex items-center justify-center gap-2 hover:bg-secondary/70 transition ${
              loading && "opacity-70 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-md text-secondary"></span>
                Creating...
              </>
            ) : (
              "Create Genre"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewGenreForm;
