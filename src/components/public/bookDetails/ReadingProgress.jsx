"use client";

import { useState } from "react";

export default function ReadingProgress({
  progress,
  totalPages,
  onProgressUpdate,
}) {
  const [currentPage, setCurrentPage] = useState(
    Math.floor((progress / 100) * totalPages)
  );
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleProgressUpdate = () => {
    const newProgress = Math.round((currentPage / totalPages) * 100);
    onProgressUpdate(newProgress);
    setShowUpdateForm(false);
  };

  const progressPercentage = Math.round((currentPage / totalPages) * 100);
  const pagesLeft = totalPages - currentPage;

  return (
    <div className="card bg-linear-to-r from-primary/10 to-secondary/10 shadow-lg">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h3 className="card-title text-xl">📊 Reading Progress</h3>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setShowUpdateForm(!showUpdateForm)}
          >
            Update Progress
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <span>{progressPercentage}% Complete</span>
          </div>
          <progress
            className="progress progress-primary w-full h-4"
            value={progressPercentage}
            max="100"
          ></progress>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="stat bg-base-100 rounded-lg">
            <div className="stat-title">Pages Read</div>
            <div className="stat-value text-primary text-2xl">
              {currentPage}
            </div>
          </div>
          <div className="stat bg-base-100 rounded-lg">
            <div className="stat-title">Pages Left</div>
            <div className="stat-value text-secondary text-2xl">
              {pagesLeft}
            </div>
          </div>
          <div className="stat bg-base-100 rounded-lg">
            <div className="stat-title">Progress</div>
            <div className="stat-value text-accent text-2xl">
              {progressPercentage}%
            </div>
          </div>
        </div>

        {/* Update Form */}
        {showUpdateForm && (
          <div className="bg-base-100 rounded-lg p-4">
            <h4 className="font-bold mb-3">Update Your Reading Progress</h4>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Current Page</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) =>
                    setCurrentPage(parseInt(e.target.value) || 0)
                  }
                  className="input input-bordered flex-1"
                  placeholder="Enter current page"
                />
                <button
                  className="btn btn-primary"
                  onClick={handleProgressUpdate}
                >
                  Update
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => setShowUpdateForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Motivational Message */}
        <div className="text-center">
          {progressPercentage === 0 && (
            <p className="text-lg">🚀 Ready to start your reading journey?</p>
          )}
          {progressPercentage > 0 && progressPercentage < 25 && (
            <p className="text-lg">📖 Great start! Keep the momentum going!</p>
          )}
          {progressPercentage >= 25 && progressPercentage < 50 && (
            <p className="text-lg">🔥 You&apos;re making excellent progress!</p>
          )}
          {progressPercentage >= 50 && progressPercentage < 75 && (
            <p className="text-lg">
              ⭐ More than halfway there! You&apos;re doing amazing!
            </p>
          )}
          {progressPercentage >= 75 && progressPercentage < 100 && (
            <p className="text-lg">🎯 Almost finished! The ending awaits!</p>
          )}
          {progressPercentage === 100 && (
            <p className="text-lg">
              🎉 Congratulations! You&apos;ve completed this book!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
