import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Import the CSS file
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Convert string to ArrayBuffer for hashing
  const stringToArrayBuffer = (str: string) => {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  };

  // Hash the password using SHA-256
  const hashPassword = async (password: string) => {
    const data = stringToArrayBuffer(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashBase64 = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
    return hashBase64;
  };

  // Handle login button click
  const handleLogin = async () => {
    const encryptedPassword = await hashPassword(password);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password: encryptedPassword }),
      });

      const result = await response.json();

      if (response.ok && result.auth === true) {
        navigate(-1);
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  // Handle Enter key press for login
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && username && password) {
      handleLogin();
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Navbar />
      <div className="login-page">
        <div className="login-wrapper">
          <div className="login-header">
            <h1>Admin Login</h1>
            <p className="login-subtitle">Restricted access area</p>
        </div>

        <div className="login-card">
          <div className="input-group">
            <label htmlFor="username" className="input-label">Username</label>
            <div className="input-field">
              <i className="bi bi-person input-icon" aria-hidden="true"></i>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Enter your username"
                autoComplete="username"
              />
            </div>
          </div>
          
          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <div className="input-field">
              <i className="bi bi-lock input-icon" aria-hidden="true"></i>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button 
                type="button" 
                className="password-toggle" 
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash toggle-icon" aria-hidden="true"></i>
                ) : (
                  <i className="bi bi-eye toggle-icon" aria-hidden="true"></i>
                )}
              </button>
            </div>
          </div>
          
          <button 
            className="login-button" 
            onClick={handleLogin} 
            disabled={!(username && password)}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Login;