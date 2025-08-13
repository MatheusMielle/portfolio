import React, { useState } from "react";
import "../styles/Navbar.css";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header-container">
      {/* Logo on the left */}
      <a href="/" className="logo">
        Matheus Mielle
      </a>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <i
          className={`bi ${menuOpen ? "bi-x" : "bi-list"}`}
          style={{ fontSize: "1.8rem" }}
        ></i>
      </div>

      {/* Nav links (icon-based) */}
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <a href="/" className="nav-link" onClick={closeMenu}>
          <span className="nav-link-icon">
            <i className="bi bi-house-fill"></i>
          </span>
          <span className="nav-link-text">Home</span>
        </a>
        <a href="/about" className="nav-link" onClick={closeMenu}>
          <span className="nav-link-icon">
            <i className="bi bi-person-circle"></i>
          </span>
          <span className="nav-link-text">About</span>
        </a>
        <a href="/projects" className="nav-link" onClick={closeMenu}>
          <span className="nav-link-icon">
            <i className="bi bi-file-code-fill"></i>
          </span>
          <span className="nav-link-text">Projects</span>
        </a>
        {/* <a href="/resume" className="nav-link" onClick={closeMenu}>
          <span className="nav-link-icon">
            <i className="bi bi-file-earmark-text-fill"></i>
          </span>
          <span className="nav-link-text">Resume</span>
        </a> */}
        <a href="/contact" className="nav-link" onClick={closeMenu}>
          <span className="nav-link-icon">
            <i className="bi bi-envelope-paper-fill"></i>
          </span>
          <span className="nav-link-text">Contact</span>
        </a>
        {/* {permissionLevel != null && (
          <button
            type="button"
            onClick={() => {
              closeMenu();
              logout();
            }}
            className="logout-btn"
          >
            <span className="nav-link-icon">
              <i className="bi bi-box-arrow-right"></i>
            </span>
            <span className="nav-link-text">Logout</span>
          </button>
        )} */}

      </nav>
    </header>
  );
};

export default Navbar;
