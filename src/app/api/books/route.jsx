import { authOptions } from "@/lib/authOptions";
import { booksCollection } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (session.user.role !== "admin") {
      return Response.json({ error: "Forbidden access" }, { status: 403 });
    }
    const data = await req.json();
    data.rating = 0;
    data.reviews = 0;
    data.totalReviews = 0;
    data.pages = parseInt(data.pages);
    data.publisherYear = parseInt(data.publisherYear);
    const result = await booksCollection.insertOne(data);
    if (result.insertedId) return Response.json({ success: true });
  } catch (error) {}
}
