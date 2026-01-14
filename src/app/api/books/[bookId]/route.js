import { authOptions } from "@/lib/authOptions";
import { booksCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden access" }, { status: 403 });
    }
    const { bookId } = await params;
    if (!bookId) {
      return NextResponse.json({ error: "Book ID missing" }, { status: 400 });
    }
    const result = await booksCollection.deleteOne({
      _id: new ObjectId(bookId),
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("DELETE book error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
