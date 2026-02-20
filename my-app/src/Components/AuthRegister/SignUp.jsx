import React from "react";
import { useState } from "react";

const SignUp = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
	});

	const fields = [
		{ name: 'username', type: 'text', placeholder: 'Enter username', label: 'Username' },
		{ name: 'email', type: 'email', placeholder: 'Enter email', label: 'Email Address' },
		{ name: 'password', type: 'password', placeholder: 'Enter password', label: 'Password' },
	];

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		// Add signup logic here
	};

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

				*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

				.sp-root {
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
				.sp-bg {
					position: fixed;
					inset: 0;
					z-index: 0;
					background: #fff;
					overflow: hidden;
				}

				.sp-bg-grid {
					position: absolute;
					inset: 0;
					background-image:
						linear-gradient(rgba(192,22,44,0.04) 1px, transparent 1px),
						linear-gradient(90deg, rgba(192,22,44,0.04) 1px, transparent 1px);
					background-size: 48px 48px;
				}

				.sp-bg-circle {
					position: absolute;
					border-radius: 50%;
					animation: spFloat linear infinite;
					opacity: 0;
				}

				.sp-bg-circle:nth-child(2) {
					width: 500px; height: 500px;
					background: radial-gradient(circle, rgba(192,22,44,0.08) 0%, transparent 70%);
					top: -150px; right: -150px;
					animation-duration: 20s; animation-delay: 0s;
				}
				.sp-bg-circle:nth-child(3) {
					width: 380px; height: 380px;
					background: radial-gradient(circle, rgba(192,22,44,0.06) 0%, transparent 70%);
					bottom: -100px; left: -100px;
					animation-duration: 24s; animation-delay: -7s;
				}
				.sp-bg-circle:nth-child(4) {
					width: 260px; height: 260px;
					background: radial-gradient(circle, rgba(192,22,44,0.05) 0%, transparent 70%);
					top: 35%; left: 15%;
					animation-duration: 28s; animation-delay: -14s;
				}
				.sp-bg-circle:nth-child(5) {
					width: 200px; height: 200px;
					background: radial-gradient(circle, rgba(192,22,44,0.07) 0%, transparent 70%);
					bottom: 20%; right: 20%;
					animation-duration: 18s; animation-delay: -3s;
				}

				@keyframes spFloat {
					0%   { transform: translate(0, 0) scale(1);     opacity: 0; }
					10%  { opacity: 1; }
					50%  { transform: translate(-30px, 35px) scale(1.05); }
					90%  { opacity: 1; }
					100% { transform: translate(0, 0) scale(1);     opacity: 0; }
				}

				/* ── Card ── */
				.sp-card {
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
					animation: spCardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
				}

				@keyframes spCardIn {
					from { opacity: 0; transform: translateY(32px) scale(0.97); }
					to   { opacity: 1; transform: translateY(0) scale(1); }
				}

				/* ── Logo ── */
				.sp-logo-row {
					display: flex;
					align-items: center;
					gap: 10px;
					margin-bottom: 2rem;
				}

				.sp-logo-badge {
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

				.sp-logo-text {
					font-family: 'Cormorant Garamond', serif;
					font-size: 1.05rem;
					font-weight: 600;
					color: #1a1a1a;
					line-height: 1.2;
				}

				.sp-logo-text small {
					display: block;
					font-family: 'DM Sans', sans-serif;
					font-size: 0.62rem;
					font-weight: 400;
					letter-spacing: 0.18em;
					text-transform: uppercase;
					color: rgba(0,0,0,0.38);
				}

				/* ── Heading ── */
				.sp-heading {
					font-family: 'Cormorant Garamond', serif;
					font-size: 2rem;
					font-weight: 700;
					color: #1a1a1a;
					letter-spacing: -0.01em;
					line-height: 1.15;
					margin-bottom: 0.35rem;
				}

				.sp-heading span { color: #C0162C; }

				.sp-sub {
					font-size: 0.85rem;
					color: rgba(0,0,0,0.4);
					margin-bottom: 2rem;
					font-weight: 400;
				}

				/* ── Floating Label Inputs ── */
				.sp-form {
					display: flex;
					flex-direction: column;
					gap: 1.4rem;
				}

				.sp-field {
					position: relative;
				}

				.sp-input {
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

				.sp-input:focus {
					background: #fff;
					border-color: #C0162C;
					box-shadow: 0 0 0 3.5px rgba(192,22,44,0.1);
				}

				.sp-input:focus + .sp-label,
				.sp-input:not(:placeholder-shown) + .sp-label {
					top: 9px;
					font-size: 0.68rem;
					color: #C0162C;
					font-weight: 600;
					letter-spacing: 0.06em;
				}

				.sp-label {
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

				/* ── Submit ── */
				.sp-submit {
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

				.sp-submit::before {
					content: '';
					position: absolute;
					inset: 0;
					background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%);
					pointer-events: none;
				}

				.sp-submit:hover {
					background: #a01225;
					transform: translateY(-1px);
					box-shadow: 0 8px 24px rgba(192,22,44,0.38);
				}

				.sp-submit:active {
					transform: translateY(0);
				}

				/* ── Divider ── */
				.sp-divider {
					display: flex;
					align-items: center;
					gap: 0.75rem;
					margin: 0.25rem 0;
				}

				.sp-divider-line {
					flex: 1;
					height: 1px;
					background: rgba(0,0,0,0.08);
				}

				.sp-divider-text {
					font-size: 0.75rem;
					color: rgba(0,0,0,0.3);
					font-weight: 500;
					flex-shrink: 0;
				}

				/* ── Login link ── */
				.sp-login-row {
					text-align: center;
					font-size: 0.85rem;
					color: rgba(0,0,0,0.45);
				}

				.sp-login-row a {
					color: #C0162C;
					font-weight: 600;
					text-decoration: none;
					transition: opacity 0.2s;
				}
				.sp-login-row a:hover { opacity: 0.75; }

				/* ── Trust badges ── */
				.sp-trust {
					display: flex;
					justify-content: center;
					gap: 1.25rem;
					margin-top: 1.5rem;
					padding-top: 1.5rem;
					border-top: 1px solid rgba(0,0,0,0.07);
				}

				.sp-trust-item {
					display: flex;
					align-items: center;
					gap: 5px;
					font-size: 0.72rem;
					color: rgba(0,0,0,0.35);
					font-weight: 500;
				}

				.sp-trust-dot {
					width: 6px; height: 6px;
					border-radius: 50%;
					background: #C0162C;
					opacity: 0.5;
					flex-shrink: 0;
				}

				@media (max-width: 480px) {
					.sp-card { padding: 2rem 1.5rem; margin: 1rem; }
					.sp-heading { font-size: 1.7rem; }
					.sp-trust { gap: 0.75rem; }
				}
			`}</style>

			<div className="sp-root">

				{/* Animated background */}
				<div className="sp-bg">
					<div className="sp-bg-grid" />
					<div className="sp-bg-circle" />
					<div className="sp-bg-circle" />
					<div className="sp-bg-circle" />
					<div className="sp-bg-circle" />
				</div>

				{/* Card */}
				<div className="sp-card">

					{/* Logo */}
					<div className="sp-logo-row">
						<div className="sp-logo-badge">S</div>
						<div className="sp-logo-text">
							Shravan Singh
							<small>Society</small>
						</div>
					</div>

					{/* Heading */}
					<h1 className="sp-heading">Create your <span>account.</span></h1>
					<p className="sp-sub">Join us and be part of something meaningful</p>

					{/* Form — logic untouched */}
					<form onSubmit={handleSubmit} className="sp-form">

						{fields.map((field) => (
							<div key={field.name} className="sp-field">
								<input
									type={field.type}
									name={field.name}
									placeholder=" "
									value={formData[field.name]}
									onChange={handleChange}
									required
									className="sp-input"
								/>
								<label className="sp-label">{field.label}</label>
							</div>
						))}

						<button type="submit" className="sp-submit">
							Create Account
						</button>

						<div className="sp-divider">
							<div className="sp-divider-line" />
							<span className="sp-divider-text">OR</span>
							<div className="sp-divider-line" />
						</div>

						<div className="sp-login-row">
							Already have an account?&nbsp;<a href="/login">Sign in</a>
						</div>

					</form>

					{/* Trust row */}
					<div className="sp-trust">
						<div className="sp-trust-item"><div className="sp-trust-dot" />Free to Join</div>
						<div className="sp-trust-item"><div className="sp-trust-dot" />Privacy Protected</div>
						<div className="sp-trust-item"><div className="sp-trust-dot" />Trusted Platform</div>
					</div>

				</div>
			</div>
		</>
	);
};

export default SignUp;