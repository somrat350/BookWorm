"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function MyLibrary() {
  const [activeTab, setActiveTab] = useState("Currently Reading");
  const session = useSession();
  if (session.status === "loading") return;
  const user = session.data.user;
  const myBooks = user?.library || [];
  const filteredBooks = myBooks.filter((book) => book.status === activeTab);

  const updateShelf = async (book, newStatus) => {
    try {
      const res = await axios.post("/api/library", {
        userId: user._id,
        bookId: book.bookId,
        image: book.image,
        title: book.title,
        status: newStatus,
        totalPages: book.pages,
      });

      if (res.data) {
        await session.update();
        toast.success(`Moved to ${newStatus}`);
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Could not update shelf. Try again.");
    }
  };

  const updateProgress = async (book, newPage) => {
    const page = Number(newPage);

    if (isNaN(page) || page < 0 || page > book.totalPages) {
      toast.error("Invalid page number");
      return;
    }

    try {
      const res = await axios.patch("/api/library", {
        userId: user._id,
        bookId: book.bookId,
        currentPage: page,
      });

      if (res.status === 200) {
        await session.update();
        toast.success("Progress saved!");
      }
    } catch (err) {
      toast.error("Failed to update progress");
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6">My Library 📖</h1>

      {/* Tabs for Shelves */}
      <div className="tabs tabs-boxed mb-8 bg-base-200 p-2">
        {["Want to Read", "Currently Reading", "Read"].map((tab) => (
          <a
            key={tab}
            className={`tab flex-1 transition-all ${
              activeTab === tab ? "tab-active bg-secondary text-white" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </a>
        ))}
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center opacity-80">
            <span className="text-5xl mb-4">📭</span>
            <h3 className="text-lg font-semibold">No books here yet</h3>
            <p className="text-sm text-gray-500 mb-4">
              Try adding some books to this shelf.
            </p>
            <Link href="/books" className="btn btn-sm btn-secondary">
              Browse Books
            </Link>
          </div>
        ) : (
          filteredBooks.map((item) => (
            <div
              key={item.bookId}
              className="card card-side bg-base-100 shadow-xl border border-base-300"
            >
              <figure className="w-1/3">
                <Image
                  width={200}
                  height={400}
                  src={item.image}
                  alt="Book"
                  className="h-full object-cover"
                />
              </figure>
              <div className="card-body w-2/3 p-4">
                <h2 className="card-title text-sm">{item.title}</h2>

                {/* Progress Section (Only for Currently Reading) */}
                {activeTab === "Currently Reading" && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>
                        Progress:{" "}
                        {Math.round((item.currentPage / item.totalPages) * 100)}
                        %
                      </span>
                      <span>
                        {item.currentPage}/{item.totalPages}
                      </span>
                    </div>
                    <progress
                      className="progress progress-secondary w-full"
                      value={item.currentPage}
                      max={item.totalPages}
                    ></progress>
                    {/* Update Input & Button */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        updateProgress(item, e.target.updatedPages.value);
                      }}
                      className="join w-full"
                    >
                      <input
                        type="number"
                        placeholder="Page #"
                        name="updatedPages"
                        className="input input-bordered input-xs join-item w-full"
                        defaultValue={item.currentPage}
                      />
                      <button className="btn btn-xs btn-secondary join-item">
                        Update
                      </button>
                    </form>
                  </div>
                )}

                {/* Status Change Dropdown */}
                <div className="card-actions justify-end mt-4">
                  <select
                    className="select select-bordered select-xs"
                    onChange={(e) => updateShelf(item, e.target.value)}
                    defaultValue={item.status}
                  >
                    <option value="Want to Read">Want to Read</option>
                    <option value="Currently Reading">Currently Reading</option>
                    <option value="Read">Read</option>
                  </select>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
