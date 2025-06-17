import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  return (
    <div>
      <h2>Dashboard - {role}</h2>
      {role === "AUTHOR" && (
        <>
          <button onClick={() => navigate("/upload-book")}>Upload Book</button>
        </>
      )}
      {role === "READER" && (
        <>
          <button onClick={() => navigate("/read/1")}>Read Book (ID: 1)</button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
