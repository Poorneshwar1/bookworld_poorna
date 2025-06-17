import React from "react";
import ReaderDashboard from "../pages/ReaderDashboard";
import AuthorDashboard from "../pages/AuthorDashboard";
import AdminDashboard from "../pages/AdminDashboard";

const DashboardRouter = () => {
  const role = localStorage.getItem("role");

  switch (role) {
    case "READER":
      return <ReaderDashboard />;
    case "AUTHOR":
      return <AuthorDashboard />;
    case "ADMIN":
      return <AdminDashboard />;
    default:
      return <div>Invalid Role. Please login again</div>;
  }
  
};

export default DashboardRouter;
