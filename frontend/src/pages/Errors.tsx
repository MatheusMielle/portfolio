import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Errors.css";
import { useNavigate } from "react-router-dom";

interface ErrorProps {
  statusCode: number;
}

// Dict of status code to message-h1,message-p, link, link_icon, link_name
const errorMessages: Record<number, { title: string; text: string; link: string; link_icon: string; link_name: string }> = {
  403: {
    title: "Access Denied",
    text: "You don't have permission to view this resource.",
    link: "/login",
    link_icon: "bi bi-box-arrow-in-right",
    link_name: "Login",
  },
  404: {
    title: "Page Not Found",
    text: "The page you're looking for doesn't exist.",
    link: "/",
    link_icon: "bi bi-house",
    link_name: "Home",
  },
};

const Errors: React.FC<Partial<ErrorProps>> = ({ statusCode = 502 }) => {
  const navigate = useNavigate();

  const errorMessage = errorMessages[statusCode] || {
    title: "Unknown Error",
    text: "An unknown error occurred.",
    link: "/",
    link_icon: "bi bi-house",
    link_name: "Home",
  };

  return (
    <div className="error-page">
      <Navbar />
      <main className="error-main">
        <div className="error-card" role="alert" aria-live="assertive">
          <div className="status-code">{statusCode}</div>
          <h1 className="error-title">{errorMessage.title}</h1>
          <p className="error-text">{errorMessage.text}</p>
          <div className="error-actions">
            <button onClick={() => navigate(-1)} className="error-btn secondary">
              <i className="bi bi-arrow-left" aria-hidden="true"></i>
              <span>Go Back</span>
            </button>
            <button onClick={() => navigate(errorMessage.link)} className="error-btn primary">
              <i className={errorMessage.link_icon} aria-hidden="true"></i>
              <span>{errorMessage.link_name}</span>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Errors;
