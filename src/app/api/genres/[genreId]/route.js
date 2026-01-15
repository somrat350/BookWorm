import { authOptions } from "@/lib/authOptions";
import { genresCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden access" }, { status: 403 });
    }
    const { genreId } = await params;
    if (!genreId) {
      return NextResponse.json({ error: "Genre ID missing" }, { status: 400 });
    }
    const result = await genresCollection.deleteOne({
      _id: new ObjectId(genreId),
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("DELETE genre error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden access" }, { status: 403 });
    }
    const { genreId } = await params;
    if (!genreId) {
      return NextResponse.json({ error: "Genre ID missing" }, { status: 400 });
    }
    const data = await req.json();
    if (!data) {
      return NextResponse.json(
        { error: "Genre data missing" },
        { status: 400 }
      );
    }
    const result = await genresCollection.updateOne(
      {
        _id: new ObjectId(genreId),
      },
      { $set: data }
    );
    return NextResponse.json(result);
  } catch (error) {
    console.error("UPDATED genre error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
