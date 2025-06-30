import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const [cartBookIds, setCartBookIds] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
    fetchBooks();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("/books/cart");
      setCartBookIds(res.data);
    } catch (err) {
      console.error("Error fetching cart");
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await axiosInstance.get("/books");
      setAllBooks(res.data);
    } catch (err) {
      console.error("Error fetching books");
    }
  };

  const cartBooks = allBooks.filter((book) => cartBookIds.includes(book.bookId));
  const totalPrice = cartBooks.reduce((sum, book) => sum + book.price, 0);

  const handleRemove = async (bookId) => {
    try {
      await axiosInstance.delete(`/books/cart/remove/${bookId}`);
      setCartBookIds((prev) => prev.filter((id) => id !== bookId));
    } catch (err) {
      alert("Failed to remove from cart");
    }
  };

  const handleBuyAll = async () => {
    try {
      const res = await axiosInstance.post("/api/payments/cart");

      const options = {
        key: res.data.key,
        amount: res.data.amount,
        currency: res.data.currency,
        name: "BookWorld Cart Payment",
        description: "Books Purchase",
        order_id: res.data.razorpayOrderId,

        handler: async function (response) {
          try {
            const verificationData = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };

            await axiosInstance.post("/api/payments/cart/verify", verificationData);
            alert("Payment successful! Access granted.");
            navigate("/dashboard");
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
      alert("Payment initiation failed.");
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartBooks.length === 0 ? (
        <p>No books in cart.</p>
      ) : (
        <>
          <div className="cart-grid">
            {cartBooks.map((book) => (
              <div key={book.bookId} className="cart-card">
                <h3>{book.title}</h3>
                <p>Genre: {book.genre}</p>
                <p>Price: ₹{book.price}</p>
                <button className="remove-btn" onClick={() => handleRemove(book.bookId)}>Remove</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{totalPrice}</h3>
            <button className="buy-all-btn" onClick={handleBuyAll}>Buy All</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
