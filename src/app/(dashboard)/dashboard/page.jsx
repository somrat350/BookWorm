import AdminDashboard from "@/components/dashboard/AdminDashboard";
import UserDashboard from "@/components/dashboard/UserDashboard";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const DashboardHome = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  if (session.user.role === "user") {
    return <UserDashboard />;
  }
  if (session.user.role === "admin") {
    return <AdminDashboard />;
  }
  return <div></div>;
};

export default DashboardHome;
