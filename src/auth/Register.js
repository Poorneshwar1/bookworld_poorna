import React, { useState } from "react";
import { axiosInstance } from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", roles: ["READER"] });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    setForm((prev) => ({ ...prev, roles: [e.target.value] }));
  };

  const validateForm = () => {
    const { name, password } = form;

    if (name.trim().length < 4) {
      setError("Name must be at least 4 characters long.");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }

    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasNumber || !hasSpecial) {
      setError("Password must contain at least one number and one special character.");
      return false;
    }

    setError(""); // Clear error if all validations pass
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axiosInstance.post("/api/auth/register", form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("Error: " + err.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Register</h3>
              <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Register as</label>
                  <select className="form-select" onChange={handleRoleChange}>
                    <option value="READER">Reader</option>
                    <option value="AUTHOR">Author</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>
              <div className="text-center mt-3">
                Already have an account? <a href="/login">Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
