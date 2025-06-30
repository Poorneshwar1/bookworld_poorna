import React from "react";
import "./Home.css"; // create this file for custom styles

const Home = () => {
  return (
    <div className="home-container container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary mb-3">📚 Welcome to BookWorld</h1>
        <p className="fs-5 text-secondary fst-italic">
          Dive into stories, learn new things, and explore worlds — all in one place.
        </p>
      </div>

      <div className="row text-center g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="text-primary mb-3">📖 Read Instantly</h2>
              <p className="text-muted">
                Browse a vast collection of books and start reading immediately after purchase.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="text-success mb-3">🛒 Easy Purchases</h2>
              <p className="text-muted">
                Add to cart and securely purchase using Razorpay. Your books are always accessible.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="text-danger mb-3">✍️ Become an Author</h2>
              <p className="text-muted">
                Authors can upload and manage books, helping them share their stories with the world.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <h4 className="text-dark">
          Join BookWorld and experience the joy of digital reading!
        </h4>
        <p className="text-secondary">
          Use the navigation above to register, login, and begin your journey.
        </p>
      </div>
    </div>
  );
};

export default Home;
