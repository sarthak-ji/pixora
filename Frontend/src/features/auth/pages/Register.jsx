// =====================================================
// Register Page
// Renders the sign-up form with Username, Email, Password
// =====================================================

import React, { useState } from 'react'
import { Link } from 'react-router'
import '../styles/form.scss'

const Register = () => {

    // ---------- State: form field values ----------
    const [formData, setFormData] = useState({
        username: '',
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
        console.log('Register:', formData)
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
                <h1 className="auth-title">Create your account</h1>
                <p className="auth-subtitle">Join Pixora and start sharing your story.</p>

                {/* ---------- Form: username / email / password + submit ---------- */}
                <form className="auth-form" onSubmit={handleSubmit}>

                    {/* Username field */}
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
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="auth-btn">Register</button>
                </form>

                {/* ---------- Footer: link to Login page ---------- */}
                <p className="auth-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </main>
    )
}

export default Register