"use client";

import { FiEye } from "react-icons/fi";

const ViewGenreBtn = ({ genre }) => {
  const modalId = `viewGenreModal-${genre._id}`;
  return (
    <>
      <div className="tooltip" data-tip="View Live">
        <button
          onClick={() => {
            document.getElementById(modalId).showModal();
          }}
          className="btn btn-square btn-ghost btn-sm text-info border border-base-300 hover:bg-info hover:text-white"
        >
          <FiEye />
        </button>
      </div>
      {/* Dialog */}
      <dialog
        id={modalId}
        className="modal modal-bottom sm:modal-middle"
        role="dialog"
      >
        <div className="modal-box p-0 overflow-hidden bg-base-100 border border-base-200">
          <div
            className={`h-20 flex items-end p-4 bg-linear-to-br ${genre.color}`}
          >
            <div className="flex items-center gap-3">
              <div className="text-4xl">{genre.icon}</div>
              <h3 className="text-xl font-bold">{genre.title}</h3>
            </div>
          </div>

          <div className="p-5">
            <div className="flex justify-between items-center mb-4 bg-base-200 p-3 rounded-lg">
              <div>
                <p className="text-[10px] uppercase font-bold opacity-50">
                  Items Linked
                </p>
                <p className="text-lg font-mono font-bold">{genre.count}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold opacity-50 text-right">
                  Theme Color
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono">{genre.color}</span>
                  <div
                    className={`w-4 h-4 rounded-full border border-base-300 bg-linear-to-br ${genre.color}`}
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold opacity-50 mb-1">
                Description
              </p>
              <p className="text-sm leading-relaxed text-base-content/80">
                {genre.description}
              </p>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ViewGenreBtn;
