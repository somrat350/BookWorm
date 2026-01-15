import DeleteGenreBtn from "@/components/dashboard/manageGenres/DeleteGenreBtn";
import EditGenreBtn from "@/components/dashboard/manageGenres/EditGenreBtn";
import NewGenreForm from "@/components/dashboard/manageGenres/NewGenreForm";
import ViewGenreBtn from "@/components/dashboard/manageGenres/ViewGenreBtn";
import { genresCollection } from "@/lib/dbConnect";

export const dynamic = "force-dynamic";

const getGenres = async () => {
  const genres = await genresCollection.find().toArray();
  return genres.map((g) => ({
    _id: g._id.toString(),
    title: g.title,
    icon: g.icon,
    count: g.count,
    color: g.color,
    description: g.description,
  }));
};

const ManageGenres = async () => {
  const genres = await getGenres();
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
            <div className="stat-value text-secondary text-center">24</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <NewGenreForm />

        <div className="lg:col-span-2">
          <div className="card bg-base-200 shadow-xl">
            <div className="p-4 flex flex-col sm:flex-row gap-2 justify-between sm:items-center border-b border-base-200">
              <h2 className="card-title">Existing Genres</h2>
              <div className="join">
                <input
                  className="input input-sm w-full join-item"
                  placeholder="Search genres..."
                />
                <button className="btn btn-secondary btn-sm join-item">
                  Search
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Books Count</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {genres.map((genre, i) => (
                    <tr key={i}>
                      <td>
                        <span className="font-bold">{genre.title}</span>
                      </td>
                      <td>{genre.count}</td>
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

            <div className="p-4 flex justify-center">
              <div className="join">
                <button className="join-item btn btn-sm">1</button>
                <button className="join-item btn btn-sm btn-active">2</button>
                <button className="join-item btn btn-sm">3</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageGenres;
