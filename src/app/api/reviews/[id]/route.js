import { authOptions } from "@/lib/authOptions";
import { booksCollection, reviewsCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden access" }, { status: 403 });
    }
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Review ID missing" }, { status: 400 });
    }
    const data = await req.json();
    if (!data) {
      return NextResponse.json(
        { error: "Review data missing" },
        { status: 400 }
      );
    }
    if (data.action === "approved") {
      const result = await reviewsCollection.updateOne(
        {
          _id: new ObjectId(id),
        },
        { $set: { status: data.action } }
      );
      if (result.modifiedCount > 0) {
        await booksCollection.updateOne(
          { _id: new ObjectId(data.bookId) },
          { $inc: { totalReviews: 1 } }
        );
      }
      return NextResponse.json({ success: true });
    }
    if (data.action === "deleted") {
      const result = await reviewsCollection.deleteOne({
        _id: new ObjectId(id),
      });
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error("UPDATED review error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
