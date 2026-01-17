import { authOptions } from "@/lib/authOptions";
import { tutorialsCollection } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden access" }, { status: 403 });
    }
    const data = await req.json();
    if (!data) {
      return NextResponse.json(
        { error: "Tutorial data missing" },
        { status: 400 },
      );
    }
    data.createdAt = new Date();
    const result = await tutorialsCollection.insertOne(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("POST tutorial error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
