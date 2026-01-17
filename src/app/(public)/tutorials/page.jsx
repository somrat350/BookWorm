import TutorialCard from "@/components/public/tutorials/TutorialCard";
import TutorialsPagination from "@/components/public/tutorials/TutorialsPagination";
import { tutorialsCollection } from "@/lib/dbConnect";
import { FiPlayCircle, FiYoutube } from "react-icons/fi";

const limit = 6;
async function getTutorials(page) {
  const skip = (page - 1) * limit;
  const result = await tutorialsCollection
    .find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();
  const tutorials = result.map((r) => ({
    ...r,
    _id: r._id.toString(),
  }));
  const totalTutorials = await tutorialsCollection.countDocuments();
  return { tutorials, totalTutorials };
}

export default async function PublicTutorials({ searchParams }) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const { tutorials, totalTutorials } = await getTutorials(page);
  const totalPages = Math.ceil(totalTutorials / limit);

  return (
    <div className="bg-base-100">
      {/* Hero Section */}
      <div className="bg-linear-to-b from-secondary/10 to-base-100 py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="badge badge-secondary gap-2 p-4 mb-4 font-bold">
            <FiYoutube /> 10+ PRO TUTORIALS
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Master the Art of <span className="text-secondary">Reading</span>
          </h1>
          <p className="text-lg opacity-70">
            Expert advice on how to read faster, choose better books, and build
            a lasting reading habit.
          </p>
        </div>
      </div>

      {/* Video Grid */}
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6">
        {tutorials.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((video) => (
                <TutorialCard key={video._id} video={video} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-12">
                <TutorialsPagination totalPages={totalPages} />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 flex flex-col items-center justify-center gap-4">
            <FiPlayCircle size={40} className="text-secondary" />
            <h3 className="text-2xl font-bold mb-2">No tutorials found</h3>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="my-20 max-w-5xl mx-auto px-4">
        <div className="card bg-secondary text-secondary-content p-8 md:p-12 text-center rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-4">
              Want more personalized tips?
            </h2>
            <p className="mb-8 opacity-90 max-w-lg mx-auto">
              Join our community and get weekly book recommendations delivered
              to your inbox.
            </p>
            <button className="btn btn-lg bg-white text-secondary border-none">
              Subscribe Now
            </button>
          </div>
          {/* Decorative background circle */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
