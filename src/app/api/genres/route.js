import { authOptions } from "@/lib/authOptions";
import { genresCollection } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const genres = await genresCollection.find().toArray();
    return Response.json(genres);
  } catch (err) {}
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (session.user.role !== "admin") {
      return Response.json({ error: "Forbidden access" }, { status: 403 });
    }
    const data = await req.json();
    data.count = 0;
    data.createdAt = new Date();
    const result = await genresCollection.insertOne(data);
    return Response.json(result);
  } catch (error) {}
}
