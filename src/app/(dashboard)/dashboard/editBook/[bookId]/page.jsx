import { booksCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

const getBooksDetails = async (id) => {
  const book = await booksCollection.findOne({ _id: new ObjectId(id) });
  return { ...book, _id: book._id.toString() };
};

export default async function EditBook({ params }) {
  const { bookId } = await params;
  const book = await getBooksDetails(bookId);
  console.log(book);

  return <div></div>;
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
