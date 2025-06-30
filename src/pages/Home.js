import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="container d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: "100%" }}>
    <div className="card shadow-lg p-4" style={{ maxWidth: "600px", width: "100%" }}>
      <h1 className="display-4 fw-bold mb-3 text-primary">📚 BookWorld</h1>
       <p className="fs-5 fw-medium text-secondary fst-italic mb-4">Unlock worlds with every page.</p>
      <div>
        <Link to="/register" className="btn btn-outline-primary me-3">
          Register
        </Link>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
