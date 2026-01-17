"use client";

import { FiEye } from "react-icons/fi";
import { useRef } from "react";

const ViewTutorial = ({ video }) => {
  const modalId = `viewTutorialModal-${video._id}`;
  const iframeRef = useRef(null);

  const stopVideo = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };
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
        <div className="modal-box p-1 bg-base-100 border border-base-200 flex flex-col gap-1">
          <div className="h-70 w-full">
            <iframe
              ref={iframeRef}
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              title={video.title}
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>

          <div className="p-2 flex flex-col gap-1">
            <h2 className="text-xl font-medium">{video.title}</h2>
            <span className="text-sm text-base-content/70">
              Youtube ID: {video.youtubeId}
            </span>
            <p className="text-base">Category: {video.category}</p>
            <p className="text-base">Description: {video.description}</p>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button onClick={stopVideo} className="btn">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ViewTutorial;
