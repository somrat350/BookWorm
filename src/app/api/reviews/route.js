import { booksCollection, reviewsCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const data = await req.json();
    if (!data.rating || !data.bookId || !data.comment) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const reviewData = {
      ...data,
      rating: Number(data.rating),
      createdAt: new Date(),
    };
    const result = await reviewsCollection.insertOne(reviewData);
    return Response.json({
      success: true,
      reviewId: result.insertedId,
    });
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
