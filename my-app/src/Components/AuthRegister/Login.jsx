import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../GlobalUrl'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/User/UserData'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fields = [
    { name: 'email', type: 'email', label: 'Email Address' },
    { name: 'password', type: 'password', label: 'Password' }
  ]

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    try {
      const response = await axios.post(`${BASE_URL}/login`, formData)
      login(data.user, data.token)
      navigate('/dashboard')
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Login failed'
      toast.error(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lp-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          background: #fff;
          position: relative;
          overflow: hidden;
        }

        /* ── Animated Background ── */
        .lp-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background: #fff;
          overflow: hidden;
        }

        .lp-bg-circle {
          position: absolute;
          border-radius: 50%;
          animation: floatCircle linear infinite;
          opacity: 0;
        }

        .lp-bg-circle:nth-child(1) {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(192,22,44,0.08) 0%, transparent 70%);
          top: -150px; left: -150px;
          animation-duration: 18s; animation-delay: 0s;
        }
        .lp-bg-circle:nth-child(2) {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(192,22,44,0.06) 0%, transparent 70%);
          bottom: -100px; right: -100px;
          animation-duration: 22s; animation-delay: -6s;
        }
        .lp-bg-circle:nth-child(3) {
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(192,22,44,0.05) 0%, transparent 70%);
          top: 40%; left: 60%;
          animation-duration: 26s; animation-delay: -12s;
        }
        .lp-bg-circle:nth-child(4) {
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(192,22,44,0.07) 0%, transparent 70%);
          top: 20%; right: 25%;
          animation-duration: 20s; animation-delay: -4s;
        }

        @keyframes floatCircle {
          0%   { transform: translate(0, 0) scale(1);   opacity: 0; }
          10%  { opacity: 1; }
          50%  { transform: translate(30px, -40px) scale(1.05); }
          90%  { opacity: 1; }
          100% { transform: translate(0, 0) scale(1);   opacity: 0; }
        }

        /* Subtle grid overlay */
        .lp-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(192,22,44,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(192,22,44,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        /* ── Card ── */
        .lp-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 440px;
          margin: 1.5rem;
          background: #ffffff;
          border: 1.5px solid rgba(0,0,0,0.08);
          border-radius: 20px;
          box-shadow:
            0 4px 6px rgba(0,0,0,0.04),
            0 20px 60px rgba(192,22,44,0.08),
            0 1px 0 rgba(255,255,255,0.9) inset;
          padding: 2.75rem 2.5rem 2.5rem;
          animation: cardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Header ── */
        .lp-logo-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 2rem;
        }

        .lp-logo-badge {
          width: 42px; height: 42px;
          background: #C0162C;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(192,22,44,0.3);
        }

        .lp-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: #1a1a1a;
          line-height: 1.2;
        }

        .lp-logo-text small {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.38);
        }

        .lp-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a1a;
          letter-spacing: -0.01em;
          line-height: 1.15;
          margin-bottom: 0.35rem;
        }

        .lp-heading span {
          color: #C0162C;
        }

        .lp-sub {
          font-size: 0.85rem;
          color: rgba(0,0,0,0.4);
          margin-bottom: 2rem;
          font-weight: 400;
        }

        /* ── Floating Label Inputs ── */
        .lp-form {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        .lp-field {
          position: relative;
        }

        .lp-input {
          width: 100%;
          height: 56px;
          padding: 18px 14px 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: #1a1a1a;
          background: #fafafa;
          border: 1.5px solid rgba(0,0,0,0.1);
          border-radius: 10px;
          outline: none;
          transition: border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          appearance: none;
        }

        .lp-input:focus {
          background: #fff;
          border-color: #C0162C;
          box-shadow: 0 0 0 3.5px rgba(192,22,44,0.1);
        }

        .lp-input:focus + .lp-label,
        .lp-input:not(:placeholder-shown) + .lp-label {
          top: 9px;
          font-size: 0.68rem;
          color: #C0162C;
          font-weight: 600;
          letter-spacing: 0.06em;
        }

        .lp-label {
          position: absolute;
          top: 50%;
          left: 14px;
          transform: translateY(-50%);
          font-size: 0.88rem;
          font-weight: 400;
          color: rgba(0,0,0,0.38);
          pointer-events: none;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: left center;
          white-space: nowrap;
        }

        /* ── Forgot ── */
        .lp-meta {
          display: flex;
          justify-content: flex-end;
          margin-top: -0.6rem;
        }

        .lp-forgot {
          font-size: 0.78rem;
          color: #C0162C;
          text-decoration: none;
          font-weight: 500;
          opacity: 0.85;
          transition: opacity 0.2s;
        }
        .lp-forgot:hover { opacity: 1; }

        /* ── Submit ── */
        .lp-submit {
          position: relative;
          width: 100%;
          height: 52px;
          background: #C0162C;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          overflow: hidden;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(192,22,44,0.3);
          margin-top: 0.25rem;
        }

        .lp-submit::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%);
          pointer-events: none;
        }

        .lp-submit:hover:not(:disabled) {
          background: #a01225;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(192,22,44,0.38);
        }

        .lp-submit:active:not(:disabled) {
          transform: translateY(0);
        }

        .lp-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .lp-submit-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        /* Spinner */
        .lp-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Divider ── */
        .lp-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 0.25rem 0;
        }

        .lp-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(0,0,0,0.08);
        }

        .lp-divider-text {
          font-size: 0.75rem;
          color: rgba(0,0,0,0.3);
          font-weight: 500;
          flex-shrink: 0;
        }

        /* ── Sign up ── */
        .lp-signup-row {
          text-align: center;
          font-size: 0.85rem;
          color: rgba(0,0,0,0.45);
        }

        .lp-signup-row a {
          color: #C0162C;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .lp-signup-row a:hover { opacity: 0.75; }

        /* ── Trust badges ── */
        .lp-trust {
          display: flex;
          justify-content: center;
          gap: 1.25rem;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(0,0,0,0.07);
        }

        .lp-trust-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.72rem;
          color: rgba(0,0,0,0.35);
          font-weight: 500;
        }

        .lp-trust-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #C0162C;
          opacity: 0.5;
          flex-shrink: 0;
        }

        @media (max-width: 480px) {
          .lp-card { padding: 2rem 1.5rem; margin: 1rem; }
          .lp-heading { font-size: 1.7rem; }
        }
      `}</style>

      <ToastContainer position="top-right" />

      <div className="lp-root">

        {/* Animated background */}
        <div className="lp-bg">
          <div className="lp-bg-grid" />
          <div className="lp-bg-circle" />
          <div className="lp-bg-circle" />
          <div className="lp-bg-circle" />
          <div className="lp-bg-circle" />
        </div>

        {/* Card */}
        <div className="lp-card">

          {/* Logo */}
          <div className="lp-logo-row">
            <div className="lp-logo-badge">S</div>
            <div className="lp-logo-text">
              Shravan Singh
              <small>Society</small>
            </div>
          </div>

          {/* Heading */}
          <h1 className="lp-heading">Welcome <span>back.</span></h1>
          <p className="lp-sub">Sign in to continue to your account</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="lp-form">

            {fields.map(field => (
              <div key={field.name} className="lp-field">
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  placeholder=" "
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="lp-input"
                  autoComplete={field.name === 'email' ? 'email' : 'current-password'}
                />
                <label htmlFor={field.name} className="lp-label">
                  {field.label}
                </label>
              </div>
            ))}

            <div className="lp-meta">
              <a href="/forgot-password" className="lp-forgot">Forgot password?</a>
            </div>

            <button type="submit" className="lp-submit" disabled={isSubmitting}>
              <span className="lp-submit-inner">
                {isSubmitting && <span className="lp-spinner" />}
                {isSubmitting ? 'Signing in…' : 'Sign In'}
              </span>
            </button>

            <div className="lp-divider">
              <div className="lp-divider-line" />
              <span className="lp-divider-text">OR</span>
              <div className="lp-divider-line" />
            </div>

            <div className="lp-signup-row">
              Don't have an account?&nbsp;<a href="/signup">Create one free</a>
            </div>

          </form>

          {/* Trust row */}
          <div className="lp-trust">
            <div className="lp-trust-item"><div className="lp-trust-dot" />Secure Login</div>
            <div className="lp-trust-item"><div className="lp-trust-dot" />Privacy Protected</div>
            <div className="lp-trust-item"><div className="lp-trust-dot" />Trusted Platform</div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Login