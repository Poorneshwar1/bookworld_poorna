import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios"; 
import './ReaderDashboard.css';


const ReaderDashboard = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [accessibleBookIds, setAccessibleBookIds] = useState([]);

  useEffect(() => {
    fetchBooks();
    fetchAccessibleBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axiosInstance.get("/books");
      setBooks(res.data);
    } catch (err) {
      alert("Error fetching books");
    }
  };

  const fetchAccessibleBooks = async () => {
    try {
      const res = await axiosInstance.get("/books/my-access");
      setAccessibleBookIds(res.data); 
    } catch (err) {
      console.error("Failed to fetch accessible books");
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axiosInstance.get(`/books/search?title=${search}`);
      setBooks(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (err) {
      alert("Book not found");
    }
  };

  const handlePayment = async (bookId) => {
  try {
    const res = await axiosInstance.post("/api/payments/create", { bookId });

    const options = {
      key: res.data.key, // Razorpay public key from backend
      amount: res.data.amount, // Amount in paise
      currency: res.data.currency,
      name: "BookWorld Payment",
      description: "Book Purchase",
      order_id: res.data.razorpayOrderId,

      handler: async function (response) {
        // This function runs after successful payment
        const verificationData = {
          bookId,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        try {
          await axiosInstance.post("/api/payments/verify", verificationData);
          alert("Payment successful! Access granted.");
          fetchAccessibleBooks();
        } catch (err) {
          alert("Payment succeeded but access failed. Please contact support.");
        }
      },

      prefill: {
        name: "Test User",
        email: "test@example.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    alert("Payment failed to initiate.");
  }
};



  const handleRead = async (bookId) => {
    try {
      const res = await axiosInstance.get(`/books/${bookId}/read`);
      window.open(res.data.fileUrl, "_blank");
    } catch (err) {
      alert("You don't have access to read this book. Please buy it first.");
    }
  };



  return (
    <div className="dashboard-container">
  <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
    Available Books
  </h2>

  <div className="search-bar">
    <input
      type="text"
      placeholder="Search book title..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <button onClick={handleSearch}>Search</button>
  </div>

  <div className="book-grid">
    {books.map((book) => (
      <div key={book.bookId} className="book-card">
        <h3>{book.title}</h3>
        <p>Genre: {book.genre}</p>
        <p>Price: ₹{book.price}</p>

        <div className="actions">
          {accessibleBookIds.includes(book.bookId) ? (
            <button className="purchased-btn">Purchased</button>
          ) : (
            <button
              className="buy-btn"
              onClick={() => handlePayment(book.bookId)}
            >
              Buy
            </button>
          )}
          <button
            className="read-btn"
            onClick={() => handleRead(book.bookId)}
          >
            Read
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default ReaderDashboard;
