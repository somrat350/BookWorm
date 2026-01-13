import { authOptions } from "@/lib/authOptions";
import { usersCollection } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";

export async function PUT(req) {
  const data = await req.formData();
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const updatedData = {
    name: data.get("name"),
  };
  const image = data.get("image");
  if (image) {
    const photoUrl = await uploadImage(image);
    updatedData.photoUrl = photoUrl;
  }

  await usersCollection.updateOne(
    { email: session.user.email },
    { $set: updatedData }
  );

  return Response.json({ success: true });
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
