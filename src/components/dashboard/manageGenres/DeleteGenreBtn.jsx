"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const DeleteGenreBtn = ({ genreId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .delete(`/api/genres/${genreId}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your genre has been deleted.",
                showConfirmButton: false,
                timer: 1500,
                icon: "success",
              });
              router.refresh();
            }
          })
          .catch((err) => {
            toast.error(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  };
  return (
    <div className="tooltip" data-tip={loading ? "Deleting" : "Delete"}>
      {loading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <button
          onClick={handleDelete}
          className="btn btn-square btn-ghost btn-sm text-error border border-base-300 hover:bg-error hover:text-white"
        >
          <FiTrash2 />
        </button>
      )}
    </div>
  );
};

export default DeleteGenreBtn;
