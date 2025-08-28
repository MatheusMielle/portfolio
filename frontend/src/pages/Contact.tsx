import React, { useState, useRef } from "react";
import "../styles/Contact.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTranslationSync } from "../hooks/useTranslationSync";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = "6LcsTq4rAAAAAJTE4MuWdjoeVjRzSTcBXxB7m2UE";

const Contact: React.FC = () => {
  const recaptcha = useRef<ReCAPTCHA | null>(null);

  const { t } = useTranslationSync("contact");

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

    if (!recaptcha.current) {
      setError("reCAPTCHA not loaded");
      setLoading(false);
      return;
    }

    const token = await recaptcha.current.executeAsync();
    recaptcha.current.reset();

    try {
      const response = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError(data.error || t("output.error"));
      }
    } catch (err) {
      setError(t("output.network_error"));
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
              <h1 className="section-title">{t("title")}</h1>
              <form onSubmit={handleSubmit} className="contact-form">
                <input
                  type="text"
                  name="name"
                  placeholder={t("form.name")}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t("form.email")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder={t("form.message")}
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? t("output.loading") : t("form.submit")}
                </button>

                <ReCAPTCHA
                  sitekey={RECAPTCHA_SITE_KEY}
                  size="invisible"
                  ref={recaptcha}
                />
              </form>
            </>
          ) : (
            <div className="confirmation-message">
              <h2>{t("output.success")}</h2>
              <button onClick={resetForm} className="submit-btn">
                {t("form.new")}
              </button>
            </div>
          )}
        </div>

        <div className="social-section">
          <h2>{t("connect")}</h2>
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
