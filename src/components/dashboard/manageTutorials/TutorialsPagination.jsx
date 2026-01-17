"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const TutorialsPagination = ({ totalPages }) => {
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
    router.push(`/dashboard/manageTutorials?${query.toString()}`);
  }, [router, page]);
  return (
    <div className="join flex justify-center items-center flex-wrap gap-0 w-full my-8 p-2">
      <button
        disabled={page === 1}
        onClick={() => page > 1 && setPage(page - 1)}
        className={`btn btn-sm ${page === 1 && "btn-disabled"}`}
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
      {[...new Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={`join-item btn btn-sm ${
            i + 1 === page ? "btn-active btn-secondary" : ""
          }`}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        className={`btn btn-sm ${page === totalPages && "btn-disabled"}`}
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
  );
};

export default TutorialsPagination;
