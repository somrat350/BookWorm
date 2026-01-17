import { authOptions } from "@/lib/authOptions";
import { tutorialsCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden access" }, { status: 403 });
    }
    const { tutorial_id } = await params;
    if (!tutorial_id) {
      return NextResponse.json(
        { error: "Tutorial ID missing" },
        { status: 400 },
      );
    }
    const result = await tutorialsCollection.deleteOne({
      _id: new ObjectId(tutorial_id),
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("DELETE tutorial error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden access" }, { status: 403 });
    }
    const { tutorial_id } = await params;
    if (!tutorial_id) {
      return NextResponse.json(
        { error: "Tutorial ID missing" },
        { status: 400 },
      );
    }
    const data = await req.json();
    if (!data) {
      return NextResponse.json(
        { error: "Tutorial data missing" },
        { status: 400 },
      );
    }
    const result = await tutorialsCollection.updateOne(
      {
        _id: new ObjectId(tutorial_id),
      },
      { $set: data },
    );
    return NextResponse.json(result);
  } catch (error) {
    console.error("UPDATED tutorial error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
