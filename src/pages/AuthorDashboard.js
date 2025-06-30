import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthorDashboard = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState(""); // <-- NEW
  const [newBook, setNewBook] = useState({ title: "", genre: "", price: 0 });
  const [addErrors, setAddErrors] = useState({});
  const [userId, setUserId] = useState(null);

  const [editBookId, setEditBookId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", genre: "", price: 0 });
  const [editErrors, setEditErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const res = await axiosInstance.get("/api/users/me");
    setUserId(res.data.id);
    fetchBooks(res.data.id);
  };

  const fetchBooks = async (authorId) => {
    const res = await axiosInstance.get("/books");
    const myBooks = res.data.filter((b) => b.authorId === authorId);
    setBooks(myBooks);
  };

  const validateBook = ({ title, genre, price }) => {
    const errors = {};
    if (!title.trim()) errors.title = "Title cannot be empty.";
    if (!genre.trim()) errors.genre = "Genre cannot be empty.";
    if (isNaN(price) || Number(price) <= 0) errors.price = "Price must be greater than 0.";
    return errors;
  };

  const addBook = async () => {
    const errors = validateBook(newBook);
    setAddErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      await axiosInstance.post("/books", { ...newBook, authorId: userId });
      alert("Book uploaded");
      fetchBooks(userId);
      setNewBook({ title: "", genre: "", price: 0 });
      setAddErrors({});
    } catch {
      alert("Upload failed");
    }
  };

  const uploadContent = async (bookId) => {
    const fileUrl = prompt("Enter PDF file URL:");
    if (!fileUrl || !fileUrl.trim()) {
      alert("Content URL cannot be empty.");
      return;
    }

    try {
      await axiosInstance.post(`/books/${bookId}/content`, { fileUrl });
      alert("Content uploaded");
    } catch {
      alert("Upload failed");
    }
  };

  const startEditBook = (book) => {
    setEditBookId(book.bookId);
    setEditForm({ title: book.title, genre: book.genre, price: book.price });
    setEditErrors({});
  };

  const submitUpdateBook = async () => {
    const errors = validateBook(editForm);
    setEditErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      await axiosInstance.put(`/books/${editBookId}`, editForm);
      alert("Book updated");
      setEditBookId(null);
      fetchBooks(userId);
    } catch {
      alert("Update failed");
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await axiosInstance.delete(`/books/${bookId}`);
      alert("Book deleted");
      fetchBooks(userId);
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Author Dashboard</h2>

      {/* Add Book Form */}
      <div className="card mb-5">
        <div className="card-header">Add New Book</div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              />
              {addErrors.title && <small className="text-danger">{addErrors.title}</small>}
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Genre"
                value={newBook.genre}
                onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
              />
              {addErrors.genre && <small className="text-danger">{addErrors.genre}</small>}
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={newBook.price}
                onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
              />
              {addErrors.price && <small className="text-danger">{addErrors.price}</small>}
            </div>
            <div className="col-md-2 d-grid">
              <button className="btn btn-primary" onClick={addBook}>
                Add Book
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Field */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search your books by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* List of Books */}
      <div className="row g-4">
        {books
          .filter((book) =>
            book.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((book) => (
            <div key={book.bookId} className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  {editBookId === book.bookId ? (
                    <>
                      <h5 className="card-title mb-3">Edit Book</h5>
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        placeholder="Title"
                      />
                      {editErrors.title && <small className="text-danger">{editErrors.title}</small>}
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={editForm.genre}
                        onChange={(e) => setEditForm({ ...editForm, genre: e.target.value })}
                        placeholder="Genre"
                      />
                      {editErrors.genre && <small className="text-danger">{editErrors.genre}</small>}
                      <input
                        type="number"
                        className="form-control mb-3"
                        value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                        placeholder="Price"
                      />
                      {editErrors.price && <small className="text-danger">{editErrors.price}</small>}
                      <div className="d-flex gap-2">
                        <button className="btn btn-success" onClick={submitUpdateBook}>
                          Save
                        </button>
                        <button className="btn btn-secondary" onClick={() => setEditBookId(null)}>
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h5 className="card-title">{book.title}</h5>
                      <p className="card-text">Genre: {book.genre}</p>
                      <p className="card-text">Price: ₹{book.price}</p>
                      <div className="d-flex flex-wrap gap-2 mt-3">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => uploadContent(book.bookId)}
                        >
                          Upload Content
                        </button>
                        <button
                          className="btn btn-warning text-white"
                          onClick={() => startEditBook(book)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteBook(book.bookId)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AuthorDashboard;
