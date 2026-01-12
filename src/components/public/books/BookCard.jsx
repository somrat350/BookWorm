import Link from "next/link";
import { FaHeart, FaStar } from "react-icons/fa";

export const BookCard = ({ book }) => {
  return (
    <div
      key={book._id}
      className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      <figure className="px-4 pt-4">
        <img
          src={book.image}
          alt={book.title}
          className="rounded-xl h-64 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="badge badge-secondary badge-sm mb-2">{book.genre}</div>
        <h3 className="card-title text-lg">{book.title}</h3>
        <p className="text-sm opacity-70">by {book.author}</p>

        <div className="flex items-center gap-2 my-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-sm ${
                  i < Math.floor(book.rating)
                    ? "text-orange-500"
                    : "text-gray-400"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold">{book.rating}</span>
          <span className="text-xs opacity-60">({book.reviews})</span>
        </div>

        <div className="card-actions justify-between items-center mt-4">
          <Link
            href={`/books/${book._id}`}
            className="flex-1 btn btn-secondary btn-sm"
          >
            View Details
          </Link>
          <button className="btn btn-outline btn-secondary btn-sm">
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};
