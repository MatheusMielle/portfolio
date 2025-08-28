import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/Footer.css";

const Footer: React.FC = () => {
  const location = useLocation();

  const showRecaptchaNotice = location.pathname === "/contact";

  return (
    <footer className="footer-container">
      {/* Left: Copyright */}
      <div className="footer-left">
        <span>&copy; {new Date().getFullYear()} Matheus Mielle Silva</span>
      </div>

      {/* Center: reCAPTCHA disclaimer */}
      {showRecaptchaNotice && (
        <div className="footer-center">
          Protected by reCAPTCHA - Google{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>{" "}
          apply.
        </div>
      )}

      {/* Right: Social Icons */}
      <div className="footer-right">
        <a
          href="https://www.linkedin.com/in/mmielle/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
        >
          <i className="bi bi-linkedin"></i>
        </a>
        <a
          href="https://github.com/MatheusMielle"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
        >
          <i className="bi bi-github"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
