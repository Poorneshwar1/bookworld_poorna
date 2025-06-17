import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Home from "./pages/Home";
import DashboardRouter from "./components/DashboardRouter";
import ReaderView from "./pages/ReaderView";
import BookUpload from "./pages/BookUpload";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Layout><DashboardRouter /></Layout>} />
        <Route path="/upload-book" element={<Layout><BookUpload /></Layout>} />
        <Route path="/read/:bookId" element={<Layout><ReaderView /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
