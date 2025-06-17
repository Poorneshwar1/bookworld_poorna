import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} BookWorld. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
