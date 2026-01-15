import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import { redirect } from "next/navigation";

export async function redirectUser() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
  }

  if (session.user.role === "admin") {
    return redirect("/dashboard");
  }

  redirect("/myLibrary");
}
