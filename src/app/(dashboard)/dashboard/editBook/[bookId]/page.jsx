import EditBookForm from "@/components/dashboard/manageBooks/EditBookForm";
import { booksCollection, genresCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

const genres = await genresCollection
  .find()
  .project({ _id: 0, title: 1 })
  .toArray();

const getBooksDetails = async (id) => {
  const book = await booksCollection.findOne({ _id: new ObjectId(id) });
  return { ...book, _id: book._id.toString() };
};

export default async function EditBook({ params }) {
  const { bookId } = await params;
  const book = await getBooksDetails(bookId);

  return (
    <div>
      <div className="flex flex-col mb-8">
        <h2 className="text-4xl font-bold text-secondary">Edit Book</h2>
        <p className="opacity-60">
          Enter full bibliographic details for the BookWorm database.
        </p>
      </div>

      <EditBookForm book={book} genres={genres} />
    </div>
  );
}

export const metadata = {
  title: "Edit Book | BookWorm",
  description:
    "Administrator panel to edit book to the BookWorm library. Input details like ISBN, Title, Author, and Genres.",
  robots: {
    index: false,
    follow: false,
  },
};
