import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Forbidden.css";
import { useNavigate } from "react-router-dom";

const Forbidden: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="forbidden-page">
      <Navbar />
      <main className="forbidden-main">
        <div className="forbidden-card" role="alert" aria-live="assertive">
          <div className="status-code">403</div>
          <h1 className="forbidden-title">Access Denied</h1>
          <p className="forbidden-text">
            You don't have permission to view this resource.
          </p>
          <div className="forbidden-actions">
            <button onClick={() => navigate(-1)} className="forbidden-btn secondary">
              <i className="bi bi-arrow-left" aria-hidden="true"></i>
              <span>Go Back</span>
            </button>
            <button onClick={() => navigate("/login")} className="forbidden-btn primary">
              <i className="bi bi-box-arrow-in-right" aria-hidden="true"></i>
              <span>Login</span>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Forbidden;
