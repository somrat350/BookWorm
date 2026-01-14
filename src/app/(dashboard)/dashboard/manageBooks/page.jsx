import { FiEdit2, FiEye, FiPlus, FiStar } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { booksCollection } from "@/lib/dbConnect";
import DeleteBookBtn from "@/components/dashboard/manageBooks/DeleteBookBtn";

const books = await booksCollection.find().toArray();

const ManageBooks = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Manage Books</h1>
          <p className="text-sm opacity-60 mt-1">Total Books: {books.length}</p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          {/* <div className="relative w-full">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            <input
              type="text"
              placeholder="Search books..."
              className="input input-bordered pl-10 w-full md:w-64 focus:border-secondary"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> */}
          <Link
            href="/dashboard/addNewBook"
            className="btn btn-secondary gap-2"
          >
            <FiPlus /> <span className="hidden sm:inline">Add New Book</span>
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-base-100 rounded-xl border border-base-300 shadow-sm">
        <table className="table w-full">
          {/* head */}
          <thead className="bg-base-200">
            <tr>
              <th>Book Info</th>
              <th>Author</th>
              <th>Rating</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr
                key={book._id}
                className="hover:bg-base-200/50 transition-colors"
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-16 relative">
                        <Image
                          src={book.image}
                          alt={book.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{book.title}</div>
                      <div className="text-xs opacity-50 font-mono">
                        ID: {book._id.toString()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-medium">{book.author}</td>
                <td>
                  <div className="flex items-center gap-1 text-orange-400">
                    <FiStar className="fill-current" /> {book.rating}
                  </div>
                </td>
                <td>
                  <div className="flex justify-center gap-2">
                    <div className="tooltip" data-tip="View Live">
                      <Link
                        href={`/books/${book._id}`}
                        className="btn btn-square btn-ghost btn-sm text-info border border-base-300 hover:bg-info hover:text-white"
                      >
                        <FiEye />
                      </Link>
                    </div>
                    <div className="tooltip" data-tip="Edit">
                      <Link
                        href={`/dashboard/editBook/${book._id}`}
                        className="btn btn-square btn-ghost btn-sm text-secondary border border-base-300 hover:bg-secondary hover:text-white"
                      >
                        <FiEdit2 />
                      </Link>
                    </div>
                    <DeleteBookBtn bookId={book._id.toString()} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;
