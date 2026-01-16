import { authOptions } from "@/lib/authOptions";
import { usersCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (session.user.role !== "admin") {
      return Response.json({ message: "Forbidden access" }, { status: 403 });
    }
    const { id } = await params;
    const { role } = await req.json();

    if (session.user._id === id) {
      return Response.json(
        { message: "Cannot change self role" },
        { status: 400 }
      );
    }

    // Prevent removing the last admin (Safety check)
    if (role === "user") {
      const adminCount = await usersCollection.countDocuments({
        role: "admin",
      });
      if (adminCount <= 1) {
        return Response.json(
          { error: "Cannot demote the last admin" },
          { status: 400 }
        );
      }
    }

    const updatedUser = await usersCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      { $set: { role } }
    );
    return Response.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (session.user.role !== "admin") {
      return Response.json({ message: "Forbidden access" }, { status: 403 });
    }
    const { id } = await params;

    if (session.user._id === id) {
      return Response.json(
        { message: "Cannot delete self account" },
        { status: 400 }
      );
    }

    const deleteUser = await usersCollection.deleteOne({
      _id: new ObjectId(id),
    });
    return Response.json(deleteUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
