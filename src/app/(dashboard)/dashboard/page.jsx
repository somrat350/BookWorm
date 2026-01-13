"use client";
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
  return <div></div>;
};

export default DashboardHome;
