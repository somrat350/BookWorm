"use client";

import { useRouter } from "next/navigation";

export default function ClearFilters() {
  const router = useRouter();
  return (
    <button
      className="btn btn-ghost btn-sm"
      onClick={() => {
        router.push(`/books`);
      }}
    >
      Clear Filters
    </button>
  );
}
