"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function BookAction({ book }) {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  let user;
  const [loading, setLoading] = useState(false);
  const [currentShelf, setCurrentShelf] = useState(null);

  // Sync shelf from user.library
  useEffect(() => {
    if (user?.library && book?._id) {
      const existShelf = user.library.find((l) => l.bookId === book._id);
      if (existShelf) {
        setCurrentShelf(existShelf.status);
      }
    }
  }, [user, book?._id]);

  const handleAddToShelf = async (status) => {
    if (!user) {
      router.push(`/login?callbackUrl=${pathname}`);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/library", {
        userId: user._id,
        bookId: book._id,
        image: book.image,
        title: book.title,
        status,
        totalPages: book.pages,
      });
      console.log(res);

      if (res.status === 200) {
        setCurrentShelf(status);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (session.status === "loading") return;
  if (session.status === "authenticated") {
    user = session.data.user;
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-outline btn-lg w-full"
        >
          📚 Add to Shelf
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
        >
          <li>
            <button onClick={() => handleAddToShelf("Want to Read")}>
              📖 Want to Read
            </button>
          </li>
          <li>
            <button onClick={() => handleAddToShelf("Currently Reading")}>
              📚 Currently Reading
            </button>
          </li>
          <li>
            <button onClick={() => handleAddToShelf("Read")}>✅ Read</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
