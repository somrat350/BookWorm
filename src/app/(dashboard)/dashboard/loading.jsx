import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-base-100/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* daisyUI Loading Spinner */}
        <span className="loading loading-spinner loading-lg text-primary"></span>

        {/* Animated Text */}
        <div className="flex items-center gap-2 text-xl font-bold italic text-secondary animate-pulse">
          <Image
            src="/bookWorm-logo.png"
            width={80}
            height={80}
            alt="bookWorm"
          />
          <span className="text-xl">Opening The BookWorm...</span>
        </div>

        <p className="text-base opacity-50 font-medium">Please wait a moment</p>
      </div>
    </div>
  );
}
