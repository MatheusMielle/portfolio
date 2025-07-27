import React from "react";
import "../styles/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      {/* Left: Copyright */}
      <div className="footer-left">
        <span>&copy; {new Date().getFullYear()} Matheus Mielle Silva</span>
      </div>

      {/* Center: Page Links */}
      {/* <div className="footer-center">
        <a href="/" className="footer-link">Home</a>
        <a href="/about" className="footer-link">About</a>
        <a href="/projects" className="footer-link">Projects</a>
        <a href="/contact" className="footer-link">Contact</a>
      </div> */}

      {/* Right: Social Icons */}
      <div className="footer-right">
        <a href="https://www.linkedin.com/in/mmielle/" target="_blank" rel="noopener noreferrer" className="footer-icon">
          <i className="bi bi-linkedin"></i>
        </a>
        <a href="https://github.com/MatheusMielle" target="_blank" rel="noopener noreferrer" className="footer-icon">
          <i className="bi bi-github"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
