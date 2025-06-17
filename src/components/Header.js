import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css"; // Create this for styling

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="app-header">
      <h1>📚 BookWorld</h1>
      <nav>
        <Link to="/">Home</Link>
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {!isLoggedIn && <Link to="/register">Register</Link>}
        {isLoggedIn && <Link to="/dashboard">Dashboard ({role})</Link>}
        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
};

export default Header;
