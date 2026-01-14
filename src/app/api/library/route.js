import { usersCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId, bookId, status, totalPages } = await req.json();
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // is book already exist
    const userLibrary = user.library || [];
    const isBookExist = userLibrary.some(
      (item) => item.bookId.toString() === bookId
    );

    if (isBookExist) {
      // if book exist the update just book status
      await usersCollection.updateOne(
        {
          _id: new ObjectId(userId),
          "library.bookId": bookId,
        },
        {
          $set: { "library.$.status": status },
        }
      );
    } else {
      // if book not exist the push new book
      const newBookEntry = {
        bookId,
        status,
        currentPage: 0,
        totalPages: parseInt(totalPages) || 0,
        addedAt: new Date(),
      };

      await usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $push: { library: newBookEntry } }
      );
    }

    return NextResponse.json(
      { message: "Shelf updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Library Update Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
