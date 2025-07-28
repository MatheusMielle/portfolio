import React, { useState } from "react";
import "../styles/Contact.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError(data.error || "Failed to send message");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setError(null);
  };

  return (
    <div className="contact-container">
      <Navbar />
      <div className="contact-main">
        <div className="form-section">
          {!submitted ? (
            <>
              <h1 className="section-title">Contact</h1>
              <form onSubmit={handleSubmit} className="contact-form">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </>
          ) : (
            <div className="confirmation-message">
              <h2>Message Sent Successfully!</h2>
              <button onClick={resetForm} className="submit-btn">
                Send Another Message
              </button>
            </div>
          )}
        </div>

        <div className="social-section">
          <h2>Connect With Me</h2>
          <div className="social-links">
            <a
              href="https://github.com/MatheusMielle"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <i className="bi bi-github"></i>
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/mmielle/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <i className="bi bi-linkedin"></i>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
