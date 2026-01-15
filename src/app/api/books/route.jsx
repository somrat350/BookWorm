import { authOptions } from "@/lib/authOptions";
import { booksCollection, genresCollection } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return Response.json({ error: "Forbidden access" }, { status: 403 });
    }
    const data = await req.json();
    if (!data.title || !data.author || !data.genre) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const bookData = {
      ...data,
      rating: 0,
      reviews: [],
      totalReviews: 0,
      pages: Number(data.pages),
      publisherYear: Number(data.publisherYear),
      createdAt: new Date(),
    };
    const result = await booksCollection.insertOne(bookData);
    if (result.insertedId) {
      await genresCollection.updateOne(
        { title: data.genre },
        { $inc: { count: 1 } }
      );
    }
    return Response.json({
      success: true,
      bookId: result.insertedId,
    });
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
