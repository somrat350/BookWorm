"use client"
import { FcGoogle } from "react-icons/fc";
export default function GoogleBtn() {
  return (
    <button
      // onClick={handleCreateGoogle}
      className="bg-base-100 w-full flex items-center justify-center gap-3 p-4 rounded-xl mt-4 hover:bg-base-200 transition text-lg font-medium cursor-pointer"
    >
      <FcGoogle className="text-2xl" />
      <span>Continue with Google</span>
    </button>
  );
}
