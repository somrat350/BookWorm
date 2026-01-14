import { authOptions } from "@/lib/authOptions";
import { usersCollection } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (session.user.role !== "admin") {
      return Response.json({ message: "Forbidden access" }, { status: 403 });
    }
    const users = await usersCollection.find().toArray();
    return Response.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
