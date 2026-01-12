"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const genres = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Romance",
  "Thriller",
  "Horror",
  "Biography",
  "History",
];

export default function GenreFilter() {
  const router = useRouter();
  const params = useSearchParams();
  const [genre, setGenre] = useState(params.get("genre") || "All");

  useEffect(() => {
    const query = new URLSearchParams(params.toString());
    if (genre === "All") {
      query.delete("genre");
    } else {
      query.set("genre", genre);
    }
    router.push(`/books?${query.toString()}`);
  }, [genre, router]);

  return (
    <div className="form-control">
      <select
        className="select select-secondary w-fit"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre === "All" ? "All Genres" : genre}
          </option>
        ))}
      </select>
    </div>
  );
}
