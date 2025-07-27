import React, { useState } from "react";

const Contact: React.FC = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        setSubmitted(true);
    };

    return (
        <div style={{ maxWidth: 500, margin: "2rem auto", padding: "2rem", background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <h2>Contact Me</h2>
            {submitted ? (
                <p>Thank you for reaching out! I'll get back to you soon.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <label htmlFor="name">Name</label>
                        <input
                            style={{ width: "100%", padding: 8, marginTop: 4 }}
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label htmlFor="email">Email</label>
                        <input
                            style={{ width: "100%", padding: 8, marginTop: 4 }}
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label htmlFor="message">Message</label>
                        <textarea
                            style={{ width: "100%", padding: 8, marginTop: 4, minHeight: 80 }}
                            id="message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" style={{ padding: "8px 24px", borderRadius: 4, background: "#0078d4", color: "#fff", border: "none" }}>
                        Send
                    </button>
                </form>
            )}
        </div>
    );
};

export default Contact;