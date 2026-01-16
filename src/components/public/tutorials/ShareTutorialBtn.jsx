"use client";

import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";

const ShareTutorialBtn = ({ youtubeId }) => {
  const text = `https://youtu.be/${youtubeId}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="relative">
      <div className="tooltip tooltip-left" data-tip="Copy Link To Share">
        <button
          onClick={handleCopy}
          className="btn btn-sm btn-circle btn-secondary"
        >
          <FaRegCopy size={16} />
        </button>
      </div>

      {copied && (
        <div className="absolute bottom-full mb-2 right-0 bg-secondary text-white text-sm px-3 py-1 rounded-md shadow-lg animate-fade-up">
          Copied!
        </div>
      )}
    </div>
  );
};

export default ShareTutorialBtn;
