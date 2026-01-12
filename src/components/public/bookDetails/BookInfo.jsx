export default function BookInfo({ book }) {
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-6">📖 About This Book</h2>

        {/* Full Description */}
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-base leading-relaxed">
            {book.fullDescription || book.description}
          </p>
        </div>

        {/* Quotes Section */}
        {book.quotes && book.quotes.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">💭 Notable Quotes</h3>
            <div className="space-y-4">
              {book.quotes.map((quote, index) => (
                <blockquote
                  key={index}
                  className="border-l-4 border-primary pl-4 italic text-lg"
                >
                  &ldquo;{quote}&rdquo;
                </blockquote>
              ))}
            </div>
          </div>
        )}

        {/* Available Formats */}
        {book.format && book.format.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">📚 Available Formats</h3>
            <div className="flex flex-wrap gap-2">
              {book.format.map((format, index) => (
                <div key={index} className="badge badge-primary badge-lg">
                  {format}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reading Recommendations */}
        <div className="bg-base-200 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">🎯 Reading Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">⏱️</div>
              <div>
                <div className="font-semibold">Best Reading Time</div>
                <div className="text-sm opacity-70">
                  Evening or weekend sessions
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-2xl">🎧</div>
              <div>
                <div className="font-semibold">Great for Audiobook</div>
                <div className="text-sm opacity-70">
                  Engaging narration style
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-2xl">☕</div>
              <div>
                <div className="font-semibold">Perfect with</div>
                <div className="text-sm opacity-70">
                  A warm cup of tea or coffee
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-2xl">💭</div>
              <div>
                <div className="font-semibold">Discussion Worthy</div>
                <div className="text-sm opacity-70">Great for book clubs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
