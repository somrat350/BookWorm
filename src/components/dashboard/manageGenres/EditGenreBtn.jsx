"use client";

import { FiEdit2 } from "react-icons/fi";

const EditGenreBtn = ({ genre }) => {
  const modalId = `editGenreModal-${genre._id}`;
  return (
    <>
      <div className="tooltip" data-tip="Edit">
        <button
          onClick={() => {
            document.getElementById(modalId).showModal();
          }}
          className="btn btn-square btn-ghost btn-sm text-secondary border border-base-300 hover:bg-secondary hover:text-white"
        >
          <FiEdit2 />
        </button>
      </div>
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{genre.title}!</h3>
          <p className="py-4">
            This functionality is not worked now, because developer is not
            implement it!
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditGenreBtn;
