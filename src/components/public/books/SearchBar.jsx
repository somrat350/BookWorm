"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(params.get("searchTerm") || "");

  const handleClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    const query = new URLSearchParams(params.toString());
    if (searchTerm === "") {
      query.delete("searchTerm");
    } else {
      query.set("searchTerm", searchTerm);
    }
    router.push(`/books?${query.toString()}`);
  }, [router, searchTerm]);

  return (
    <form className="form-control">
      <div className="flex items-center gap-2 w-full">
        <input
          type="text"
          placeholder="Search books by title or author..."
          className="input input-secondary flex-1 md:flex-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            className="btn btn-ghost btn-square"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
