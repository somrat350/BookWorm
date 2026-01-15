import DeleteGenreBtn from "@/components/dashboard/manageGenres/DeleteGenreBtn";
import EditGenreBtn from "@/components/dashboard/manageGenres/EditGenreBtn";
import GenresPagination from "@/components/dashboard/manageGenres/GenresPagination";
import NewGenreForm from "@/components/dashboard/manageGenres/NewGenreForm";
import ViewGenreBtn from "@/components/dashboard/manageGenres/ViewGenreBtn";
import { genresCollection } from "@/lib/dbConnect";

export const dynamic = "force-dynamic";

const limit = 10;
const getGenres = async (page) => {
  const skip = (page - 1) * limit;
  const result = await genresCollection
    .find()
    .skip(skip)
    .limit(limit)
    .toArray();
  const genres = result.map((g) => ({
    _id: g._id.toString(),
    title: g.title,
    icon: g.icon,
    count: g.count,
    color: g.color,
    description: g.description,
  }));
  const totalGenres = await genresCollection.countDocuments();
  return { genres, totalGenres };
};

const ManageGenres = async ({ searchParams }) => {
  const { page } = await searchParams;
  const currentPage = parseInt(page) || 1;
  const { genres, totalGenres } = await getGenres(currentPage);
  const totalPages = Math.ceil(totalGenres / limit);
  return (
    <div className="w-full max-w-360 mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Genre Management</h1>
          <p className="text-base-content/60">
            Add, edit, and organize your content categories.
          </p>
        </div>
        <div className="stats shadow bg-base-200 w-fit self-end">
          <div className="stat">
            <div className="stat-title">Total Genres</div>
            <div className="stat-value text-secondary text-center">
              {totalGenres}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <NewGenreForm />

        <div className="lg:col-span-2">
          <div className="card bg-base-200 shadow-xl">
            <div className="p-4 flex flex-col sm:flex-row gap-2 justify-between sm:items-center border-b border-base-200">
              <h2 className="card-title">Existing Genres</h2>
              {/* <div className="join">
                <input
                  className="input input-sm w-full join-item"
                  placeholder="Search genres..."
                />
                <button className="btn btn-secondary btn-sm join-item">
                  Search
                </button>
              </div> */}
            </div>

            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Title</th>
                    <th>Books Count</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {genres.map((genre, i) => (
                    <tr key={i}>
                      <td>{i + 1 + (currentPage - 1) * limit}</td>
                      <td>
                        <span className="font-bold">{genre.title}</span>
                      </td>
                      <td>{genre.count} books</td>
                      <th>
                        <div className="flex justify-center gap-2">
                          <ViewGenreBtn genre={genre} />
                          <EditGenreBtn genre={genre} />
                          <DeleteGenreBtn genreId={genre._id} />
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && <GenresPagination totalPages={totalPages} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageGenres;
