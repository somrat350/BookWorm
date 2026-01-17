"use client";

import { FiPlus } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AddNewTutorial = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const modalId = "addNewTutorialModal";

  const handleAddNewTutorial = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/tutorials`, data);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Added Successful!",
          text: "New tutorial added successful.",
          icon: "success",
        });
        router.refresh();
        document.getElementById(modalId).close();
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <button
        onClick={() => {
          document.getElementById(modalId).showModal();
        }}
        className="btn btn-secondary gap-2"
      >
        <FiPlus /> <span>Add New Tutorial</span>
      </button>
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="card bg-base-200 shadow-xl h-fit">
            <form
              onSubmit={handleSubmit(handleAddNewTutorial)}
              className="card-body p-4 sm:p-6 gap-4"
            >
              <h2 className="card-title mb-4">Add New Tutorial</h2>
              <div className="flex flex-col gap-1">
                <label className="label">
                  <span className="label-text font-semibold">
                    Tutorial Title
                  </span>
                </label>
                <input
                  type="text"
                  required
                  {...register("title")}
                  placeholder="e.g. Learn JavaScript Basics"
                  className="input w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="label">
                  <span className="label-text font-semibold">Youtube ID</span>
                </label>
                <input
                  type="text"
                  required
                  {...register("youtubeId")}
                  placeholder="e.g. 6XlvBpRl418"
                  className="input w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="label">
                  <span className="label-text font-semibold">
                    Tutorial Category
                  </span>
                </label>
                <input
                  type="text"
                  required
                  {...register("category")}
                  placeholder="e.g. Programming"
                  className="input w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="label">
                  <span className="label-text font-semibold">
                    Tutorial Description
                  </span>
                </label>
                <textarea
                  required
                  {...register("description")}
                  placeholder="Write a short description about this tutorial..."
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
                      Adding...
                    </>
                  ) : (
                    "Add Tutorial"
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddNewTutorial;
