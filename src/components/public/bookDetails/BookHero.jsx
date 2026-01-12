import BookAction from "./BookAction";

export default function BookHero({ book }) {
  return (
    <div className="bg-linear-to-br from-primary/10 via-secondary/5 to-accent/10 py-16">
      <div className="w-full max-w-360 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Book Cover */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative group">
              <img
                src={book.image}
                alt={book.title}
                className="w-full max-w-80 h-auto rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Book Information */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <div className="badge badge-secondary badge-lg mb-4">
                {book.genre}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {book.title}
              </h1>
              <p className="text-xl text-primary font-semibold mb-2">
                by {book.author}
              </p>

              {/* Rating */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="rating rating-lg">
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
                  <span className="text-2xl font-bold">{book.rating}</span>
                </div>
                <div className="text-lg opacity-70">
                  ({book.totalReviews.toLocaleString()} reviews)
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed opacity-90">
                {book.description}
              </p>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
              <div className="text-center p-4 bg-base-100/50 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-primary">
                  {book.pages}
                </div>
                <div className="text-sm opacity-70">Pages</div>
              </div>
              <div className="text-center p-4 bg-base-100/50 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-secondary">
                  {book.publishedYear}
                </div>
                <div className="text-sm opacity-70">Published</div>
              </div>
              <div className="text-center p-4 bg-base-100/50 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-accent">
                  {book.readingTime}
                </div>
                <div className="text-sm opacity-70">Reading Time</div>
              </div>
              <div className="text-center p-4 bg-base-100/50 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-info">
                  {book.difficulty}
                </div>
                <div className="text-sm opacity-70">Difficulty</div>
              </div>
            </div>

            {/* Action Buttons */}
            <BookAction />
          </div>
        </div>
      </div>
    </div>
  );
}
