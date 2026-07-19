// =====================================================
// Login Page
// Handles existing-user sign-in. Sends email and password
// to POST /api/auth/login on submit.
// =====================================================

import React, { useState } from "react";
import { Link } from "react-router";
import "../styles/form.scss";
import axios from "axios";

const Login = () => {
  // ---------- State: form field values ----------
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ---------- Handler: update field on typing ----------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ---------- Handler: form submit ----------
  // 1. Stops the default browser reload.
  // 2. Sends the credentials to the backend.
  // 3. Logs the response (replace with redirect / toast later).
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", formData);

    axios
      .post(
        "http://localhost:3000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res);
      });
  };

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

        {/* ---------- Form: email / password + submit ---------- */}
        <form className="auth-form" onSubmit={handleSubmit}>

          {/* Email input */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
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
