// =====================================================
// Login Page
// Renders the sign-in form with Email + Password
// =====================================================

import React, { useState } from 'react'
import { Link } from 'react-router'
import '../styles/form.scss'

const Login = () => {

    // ---------- State: form field values ----------
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    // ---------- Handler: update field on typing ----------
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // ---------- Handler: submit (currently logs; wire to API later) ----------
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Login:', formData)
    }

    return (
        // ---------- Page wrapper: full-screen gradient background ----------
        <main className="auth-container">

            {/* ---------- Centered card ---------- */}
            <div className="auth-card">

                {/* Brand header: logo + app name */}
                <div className="auth-brand">
                    <div className="brand-logo">Px</div>
                    <div className="brand-name">Pixora</div>
                </div>

                {/* Title + supporting subtitle */}
                <h1 className="auth-title">Welcome back</h1>
                <p className="auth-subtitle">Sign in to continue sharing your moments.</p>

                {/* ---------- Form: email / password + submit ---------- */}
                <form className="auth-form" onSubmit={handleSubmit}>

                    {/* Email field */}
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

                    {/* Password field */}
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

                    {/* Submit button */}
                    <button type="submit" className="auth-btn">Login</button>
                </form>

                {/* ---------- Footer: link to Register page ---------- */}
                <p className="auth-footer">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </main>
    )
}

export default Login