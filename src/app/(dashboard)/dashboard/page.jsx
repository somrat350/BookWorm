"use client";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import UserDashboard from "@/components/dashboard/UserDashboard";
import { useSession } from "next-auth/react";
import React from "react";

const DashboardHome = () => {
  const session = useSession();
  if (session.status === "loading") {
    return;
  }
  if (session.data.user.role === "user") {
    return <UserDashboard />;
  }
  if (session.data.user.role === "admin") {
    return <AdminDashboard />;
  }
  return <div></div>;
};

export default DashboardHome;
