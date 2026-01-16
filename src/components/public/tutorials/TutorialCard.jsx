import Image from "next/image";
import React from "react";
import { FiPlay } from "react-icons/fi";
import ShareTutorialBtn from "./ShareTutorialBtn";

const TutorialCard = ({ video }) => {
  return (
    <div className="card rounded-xl bg-base-200 group transition-all duration-300">
      {/* Video Container with Glassmorphism Hover */}
      <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl border border-base-300 group-hover:border-secondary/50 transition-all">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          loading="lazy"
          allowFullScreen
        ></iframe>

        {/* Floating Play Icon (Visible only before play) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 bg-secondary/5 transition-opacity">
          <div className="bg-secondary text-white p-4 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform">
            <FiPlay size={24} fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-5 px-2">
        <div className="flex items-center gap-2 mb-3">
          <span className="badge badge-sm badge-outline font-bold uppercase tracking-widest">
            {video.category}
          </span>
          <span className="text-[10px] font-mono italic">
            {new Date(video.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h3 className="text-xl font-bold group-hover:text-secondary transition-colors line-clamp-2">
          {video.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed line-clamp-3">
          {video.description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold">
            <div className="avatar placeholder">
              <div className="rounded-full w-6 h-6 overflow-hidden bg-white">
                <Image
                  src="/bookWorm-logo.png"
                  width={24}
                  height={24}
                  alt="Book Worm"
                />
              </div>
            </div>
            BookWorm
          </div>
          <ShareTutorialBtn youtubeId={video.youtubeId} />
        </div>
      </div>
    </div>
  );
};

export default TutorialCard;
