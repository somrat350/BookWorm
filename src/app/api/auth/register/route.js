import { usersCollection } from "@/lib/dbConnect";
import axios from "axios";
import bcrypt from "bcryptjs";
import FormData from "form-data";

export async function POST(req) {
  try {
    const data = await req.formData();

    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const image = data.get("image");

    if (!name || !email || !password) {
      return Response.json({ message: "Missing fields" }, { status: 400 });
    }

    const userExists = await usersCollection.findOne({ email });
    if (userExists) {
      return Response.json(
        { message: "Email already registered! Go to login page." },
        { status: 409 }
      );
    }

    let photoUrl = null;
    if (image && image.size > 0) {
      photoUrl = await uploadImage(image);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      photoUrl,
      role: "user",
      createdAt: new Date(),
    });

    return Response.json(
      { success: true, id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// upload image on imgBB website
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", Buffer.from(await file.arrayBuffer()), file.name);
  const imgApiUrl = `https://api.imgbb.com/1/upload?key=${process.env.IMG_BB_API}`;
  const res = await axios.post(imgApiUrl, formData, {
    headers: formData.getHeaders(),
  });

  return res.data.data.url;
};
