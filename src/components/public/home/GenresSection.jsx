import { genresCollection } from "@/lib/dbConnect";
import Link from "next/link";

const genres = await genresCollection.find().limit(8).toArray();

export default function GenresSection() {
  return (
    <section className="py-20 bg-linear-to-br from-base-200 to-base-300">
      <div className="w-full max-w-360 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Explore Genres</h2>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Find your perfect read across our diverse collection of genres
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {genres.map((genre, index) => (
            <Link
              key={index}
              href={`/books?genre=${genre.title}`}
              className="group"
            >
              <div className="card bg-base-100 h-full shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
                <div
                  className={`h-32 bg-linear-to-br ${genre.color} flex items-center justify-center`}
                >
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {genre.icon}
                  </span>
                </div>
                <div className="card-body">
                  <h3 className="card-title text-xl group-hover:text-secondary transition-colors">
                    {genre.title}
                  </h3>
                  <p className="text-sm opacity-70 mb-2">{genre.description}</p>
                  <div className="badge badge-outline">{genre.count}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
