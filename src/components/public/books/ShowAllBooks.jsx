"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ShowAllBooks() {
  const router = useRouter();
  return (
    <button
      className="btn btn-secondary"
      onClick={() => {
        router.push("/books");
      }}
    >
      Show All Books
    </button>
  );
}
