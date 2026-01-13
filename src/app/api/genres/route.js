import { genresCollection } from "@/lib/dbConnect";

export async function GET() {
  try {
    const genres = await genresCollection.find().toArray();
    return Response.json(genres);
  } catch (err) {}
}
