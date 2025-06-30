import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { axiosInstance } from "../api/axios";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [cartCount, setCartCount] = useState(0);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token && role === "READER") {
          const res = await axiosInstance.get("/books/cart");
          setCartCount(res.data.length);
        }
      } catch (err) {
        console.error("Error fetching cart count");
      }
    };

    fetchCartCount();
  }, [role]);


  return (
    <header className="app-header">
      <h1>📚 BookWorld</h1>
      <nav>
        <Link to="/">Home</Link>
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {!isLoggedIn && <Link to="/register">Register</Link>}
        {isLoggedIn && <Link to="/dashboard">Dashboard ({role})</Link>}

        {isLoggedIn && role === "READER" && (
          <Link to="/cart" className="cart-link">
            <FaShoppingCart size={20} />
          </Link>
        )}


        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
};

export default Header;
