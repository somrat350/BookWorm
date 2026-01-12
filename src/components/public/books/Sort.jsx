"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sort() {
  const router = useRouter();
  const params = useSearchParams();
  const [sort, setSort] = useState(params.get("sort") || "title");

  useEffect(() => {
    const query = new URLSearchParams(params.toString());
    if (sort === "title") {
      query.delete("sort");
    } else {
      query.set("sort", sort);
    }
    router.push(`/books?${query.toString()}`);
  }, [sort, router]);
  return (
    <div className="form-control">
      <select
        className="select select-secondary w-fit"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="title">Sort by Title</option>
        <option value="author">Sort by Author</option>
        <option value="rating">Sort by Rating</option>
        <option value="price">Sort by Price</option>
        <option value="year">Sort by Year</option>
      </select>
    </div>
  );
}
