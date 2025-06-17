import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios"; 
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/api/users");
      console.log("Users:", res.data);
      setUsers(res.data);
    } catch (err) {
      alert("Failed to load users");
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axiosInstance.delete(`/api/users/${userId}`);
      alert("User deleted successfully");
      fetchUsers(); // Refresh user list
    } catch (err) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Admin - User Management</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow-sm">
          <thead className="table-light">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Email</th>
              <th scope="col">Username</th>
              <th scope="col">Roles</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.email}</td>
                <td>{u.username}</td>
                <td>
                  {Array.isArray(u.roles)
                    ? u.roles.join(", ")
                    : u.role || "No roles assigned"}
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
