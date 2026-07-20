// =====================================================
// Login Page
// Handles existing-user sign-in. Sends email and password
// to POST /api/auth/login on submit.
// =====================================================

import React, { useState } from "react";
import { Link } from "react-router";
import "../styles/form.scss";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  // Warning/Error!!
  const { loading, handleLogin } = useAuth();

  // ---------- State: form field values ----------
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  // ---------- Handler: update field on typing ----------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ---------- Handler: form submit ----------
  // 1. Stops the default browser reload.
  // 2. Sends the credentials to the backend.
  // 3. Logs the response (replace with redirect / toast later).
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login:", formData);

    try {
      await handleLogin(formData.username, formData.password);
      console.log("Login successful");

      navigate("/"); // navigate("/"); // later if needed
      
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <main>
        <h1>Loading.....</h1>
      </main>
    );
  }

  return (
    // ---------- Page wrapper: full-screen gradient background ----------
    <main className="auth-container">
      {/* ---------- Centered card: holds all auth UI ---------- */}
      <div className="auth-card">
        {/* Brand header: gradient logo + app name */}
        <div className="auth-brand">
          <div className="brand-logo">Px</div>
          <div className="brand-name">Pixora</div>
        </div>

        {/* Page title + supporting subtitle */}
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">
          Sign in to continue sharing your moments.
        </p>

        {/* ---------- Form: username / password + submit ---------- */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Username input */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>

          {/* Password input */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          {/* Submit button — triggers handleSubmit */}
          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        {/* ---------- Footer: link to Register page ---------- */}
        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
