export default function BookStats({ book }) {
  return (
    <div className="card bg-base-200 shadow-lg">
      <div className="card-body">
        <h3 className="card-title text-lg mb-4">Reading Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="opacity-70">Average Rating</span>
            <div className="flex items-center gap-2">
              <span className="font-bold">{book.rating}</span>
              <div className="rating rating-sm">
                {[...Array(5)].map((_, i) => (
                  <input
                    key={i}
                    type="radio"
                    className={`mask mask-star-2 ${
                      i < Math.floor(book.rating)
                        ? "bg-orange-400"
                        : "bg-gray-300"
                    }`}
                    disabled
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="opacity-70">Total Reviews</span>
            <span className="font-bold">
              {book.totalReviews.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-70">Reading Time</span>
            <span className="font-bold">{book.readingTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-70">Difficulty</span>
            <span className="font-bold">{book.difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
