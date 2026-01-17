import AddNewTutorial from "@/components/dashboard/manageTutorials/AddNewTutorial";
import DeleteTutorial from "@/components/dashboard/manageTutorials/DeleteTutorial";
import EditTutorial from "@/components/dashboard/manageTutorials/EditTutorial";
import TutorialsPagination from "@/components/dashboard/manageTutorials/TutorialsPagination";
import ViewTutorial from "@/components/dashboard/manageTutorials/ViewTutorial";
import { tutorialsCollection } from "@/lib/dbConnect";
import Image from "next/image";
import { FaYoutube } from "react-icons/fa";

const limit = 10;
const getTutorials = async (page) => {
  const skip = (page - 1) * limit;
  const result = await tutorialsCollection
    .find()
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)
    .toArray();
  const tutorials = result.map((t) => ({
    ...t,
    _id: t._id.toString(),
  }));
  const totalTutorials = await tutorialsCollection.countDocuments();
  return { tutorials, totalTutorials };
};

const ManageTutorials = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const { tutorials, totalTutorials } = await getTutorials(page);
  const totalPages = Math.ceil(totalTutorials / limit);

  return (
    <div className="bg-base-100">
      <div className="w-full max-w-360 mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black flex items-center gap-2">
              <FaYoutube className="text-secondary" /> Manage Tutorials
            </h1>
            <p className="opacity-60">Add, Edit or Delete tutorials</p>
          </div>
          <AddNewTutorial />
        </header>

        {/* Table Section */}
        <div className="overflow-x-auto bg-base-100 rounded-xl border border-base-300 shadow-sm">
          <table className="table w-full">
            {/* head */}
            <thead className="bg-base-200">
              <tr>
                <th>SL</th>
                <th>Tutorial Info</th>
                <th>Category</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutorials.map((video, i) => (
                <tr
                  key={video._id}
                  className="hover:bg-base-200/50 transition-colors"
                >
                  <td className="font-medium">{i + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <Image
                          width={80}
                          height={48}
                          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                          className="w-20 h-12 rounded-md"
                          alt={video.title}
                        />
                      </div>
                      <div>
                        <div className="font-bold">{video.title}</div>
                        <div className="text-xs opacity-50 font-mono">
                          Youtube ID: {video.youtubeId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">{video.category}</td>
                  <td>
                    <div className="flex justify-center gap-2">
                      <ViewTutorial video={video} />
                      <EditTutorial video={video} />
                      <DeleteTutorial videoId={video._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && <TutorialsPagination totalPages={totalPages} />}
      </div>
    </div>
  );
};

export default ManageTutorials;
