"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pagination({ totalPages }) {
  const router = useRouter();
  const params = useSearchParams();
  const [page, setPage] = useState(params.get("page") || 1);

  useEffect(() => {
    const query = new URLSearchParams(params.toString());
    if (page === 1) {
      query.delete("page");
    } else {
      query.set("page", page);
    }
    router.push(`/books?${query.toString()}`);
  }, [router, page]);

  return (
    <div className="flex justify-center">
      <div className="join">
        {/* Previous Button */}
        <button
          className={`join-item btn ${page === 1 ? "btn-disabled" : ""}`}
          onClick={() => page > 1 && setPage(page - 1)}
          disabled={page === 1}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous
        </button>

        {/* Page Numbers */}
        {[...new Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`join-item btn ${
              index + 1 === page ? "btn-active btn-secondary" : ""
            }`}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          className={`join-item btn ${
            page === totalPages ? "btn-disabled" : ""
          }`}
          onClick={() => page < totalPages && setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
