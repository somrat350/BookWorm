"use client";

import React from "react";
import ThemeToggler from "../ThemeToggler";
import Image from "next/image";
import { useSession } from "next-auth/react";

const DashboardNav = () => {
  const session = useSession();
  if (session.status === "loading") {
    return;
  }
  return (
    <nav className="navbar w-full backdrop-blur-2xl sticky top-0 z-20 border-b border-primary/30">
      <label
        htmlFor="my-drawer-4"
        aria-label="open sidebar"
        className="btn btn-square btn-ghost"
      >
        {/* Sidebar toggle icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          fill="none"
          stroke="currentColor"
          className="my-1.5 inline-block size-4"
        >
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
          <path d="M9 4v16"></path>
          <path d="M14 10l2 2l-2 2"></path>
        </svg>
      </label>
      <div className="w-full">
        <div className="pr-5 flex justify-end items-center gap-3 w-full">
          <ThemeToggler />
          <Image
            width={40}
            height={40}
            src={session?.data?.user?.photoUrl}
            alt="User Logo"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <h2 className="font-semibold text-base">
              {session?.data?.user?.name}
            </h2>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
