import React, { useState } from 'react';

const Donation = () => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    message: '',
  });
  const [activePreset, setActivePreset] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [donated, setDonated] = useState(false);

  const presets = [100, 500, 1000, 5000];

  const stats = [
    { value: '12,400+', label: 'Lives Impacted', icon: '❤️' },
    { value: '₹48L+', label: 'Funds Raised', icon: '💰' },
    { value: '320+', label: 'Campaigns Run', icon: '📢' },
    { value: '8,000+', label: 'Donors', icon: '🤝' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'amount') setActivePreset(null);
  };

  const handlePreset = (amount) => {
    setActivePreset(amount);
    setFormData({ ...formData, amount: String(amount) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    // Add donation logic here
    setTimeout(() => {
      setIsSubmitting(false);
      setDonated(true);
    }, 1500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .dp-root {
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          background: #fff;
          position: relative;
          overflow-x: hidden;
        }

        /* ── Animated Background ── */
        .dp-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .dp-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(192,22,44,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(192,22,44,0.035) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .dp-bg-circle {
          position: absolute;
          border-radius: 50%;
          animation: dpFloat linear infinite;
          opacity: 0;
        }

        .dp-bg-circle:nth-child(2) {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(192,22,44,0.07) 0%, transparent 70%);
          top: -200px; left: -200px;
          animation-duration: 22s; animation-delay: 0s;
        }
        .dp-bg-circle:nth-child(3) {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(192,22,44,0.05) 0%, transparent 70%);
          bottom: -100px; right: -100px;
          animation-duration: 26s; animation-delay: -9s;
        }
        .dp-bg-circle:nth-child(4) {
          width: 250px; height: 250px;
          background: radial-gradient(circle, rgba(192,22,44,0.06) 0%, transparent 70%);
          top: 50%; right: 10%;
          animation-duration: 20s; animation-delay: -5s;
        }

        @keyframes dpFloat {
          0%   { transform: translate(0,0) scale(1); opacity: 0; }
          10%  { opacity: 1; }
          50%  { transform: translate(25px, -35px) scale(1.04); }
          90%  { opacity: 1; }
          100% { transform: translate(0,0) scale(1); opacity: 0; }
        }

        /* ── Page Layout ── */
        .dp-page {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 3rem 1.5rem 5rem;
        }

        /* ── Top Header ── */
        .dp-header {
          text-align: center;
          margin-bottom: 3rem;
          animation: dpFadeUp 0.6s ease both;
        }

        @keyframes dpFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .dp-logo-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 1.75rem;
        }

        .dp-logo-badge {
          width: 44px; height: 44px;
          background: #C0162C;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #fff;
          box-shadow: 0 4px 14px rgba(192,22,44,0.3);
        }

        .dp-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #1a1a1a;
          line-height: 1.2;
          text-align: left;
        }

        .dp-logo-text small {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.38);
        }

        .dp-eyebrow {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C0162C;
          margin-bottom: 0.75rem;
        }

        .dp-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.15;
          margin-bottom: 0.75rem;
        }

        .dp-title span { color: #C0162C; }

        .dp-tagline {
          font-size: 0.95rem;
          color: rgba(0,0,0,0.45);
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* ── Stats Strip ── */
        .dp-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 3rem;
          animation: dpFadeUp 0.6s 0.1s ease both;
        }

        @media (max-width: 700px) {
          .dp-stats { grid-template-columns: repeat(2, 1fr); }
        }

        .dp-stat-card {
          background: #fff;
          border: 1.5px solid rgba(0,0,0,0.07);
          border-radius: 14px;
          padding: 1.25rem 1rem;
          text-align: center;
          box-shadow: 0 2px 12px rgba(192,22,44,0.06);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .dp-stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(192,22,44,0.12);
        }

        .dp-stat-icon {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          display: block;
        }

        .dp-stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.7rem;
          font-weight: 700;
          color: #C0162C;
          line-height: 1;
          margin-bottom: 0.3rem;
        }

        .dp-stat-label {
          font-size: 0.75rem;
          color: rgba(0,0,0,0.4);
          font-weight: 500;
          letter-spacing: 0.03em;
        }

        /* ── Two Column Layout ── */
        .dp-columns {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 2rem;
          align-items: start;
          animation: dpFadeUp 0.6s 0.2s ease both;
        }

        @media (max-width: 820px) {
          .dp-columns { grid-template-columns: 1fr; }
        }

        /* ── Left — Info Panel ── */
        .dp-info {
          background: #C0162C;
          border-radius: 20px;
          padding: 2.25rem 2rem;
          color: #fff;
          position: relative;
          overflow: hidden;
        }

        .dp-info::before {
          content: '';
          position: absolute;
          width: 300px; height: 300px;
          border-radius: 50%;
          border: 50px solid rgba(255,255,255,0.07);
          bottom: -80px; right: -80px;
          pointer-events: none;
        }

        .dp-info::after {
          content: '';
          position: absolute;
          width: 180px; height: 180px;
          border-radius: 50%;
          border: 35px solid rgba(255,255,255,0.05);
          top: -50px; left: -50px;
          pointer-events: none;
        }

        .dp-info-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 0.75rem;
          position: relative;
          z-index: 1;
        }

        .dp-info-desc {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.7;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }

        .dp-info-points {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
          z-index: 1;
        }

        .dp-info-point {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }

        .dp-info-point-icon {
          width: 36px; height: 36px;
          background: rgba(255,255,255,0.15);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .dp-info-point-text strong {
          display: block;
          font-size: 0.88rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.15rem;
        }

        .dp-info-point-text span {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.5;
        }

        .dp-info-divider {
          height: 1px;
          background: rgba(255,255,255,0.15);
          margin: 1.75rem 0;
          position: relative;
          z-index: 1;
        }

        .dp-info-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          font-style: italic;
          color: rgba(255,255,255,0.8);
          line-height: 1.6;
          position: relative;
          z-index: 1;
        }

        .dp-info-quote::before {
          content: '"';
          font-size: 2.5rem;
          color: rgba(255,255,255,0.3);
          line-height: 0;
          vertical-align: -0.5rem;
          margin-right: 4px;
        }

        /* ── Right — Form Card ── */
        .dp-form-card {
          background: #fff;
          border: 1.5px solid rgba(0,0,0,0.08);
          border-radius: 20px;
          padding: 2.25rem 2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.04), 0 20px 60px rgba(192,22,44,0.08);
        }

        .dp-form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 0.3rem;
        }

        .dp-form-sub {
          font-size: 0.82rem;
          color: rgba(0,0,0,0.4);
          margin-bottom: 1.75rem;
        }

        /* Preset amounts */
        .dp-presets {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.6rem;
          margin-bottom: 1rem;
        }

        .dp-preset-btn {
          padding: 0.6rem 0.25rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1.5px solid rgba(0,0,0,0.1);
          border-radius: 8px;
          background: #fafafa;
          color: #1a1a1a;
          cursor: pointer;
          transition: all 0.18s ease;
          text-align: center;
        }

        .dp-preset-btn:hover {
          border-color: #C0162C;
          color: #C0162C;
          background: rgba(192,22,44,0.04);
        }

        .dp-preset-btn.active {
          border-color: #C0162C;
          background: #C0162C;
          color: #fff;
          box-shadow: 0 4px 12px rgba(192,22,44,0.25);
        }

        /* Form */
        .dp-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* Floating field */
        .dp-field {
          position: relative;
        }

        .dp-input {
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
          transition: border-color 0.22s, background 0.22s, box-shadow 0.22s;
          appearance: none;
        }

        .dp-input:focus {
          background: #fff;
          border-color: #C0162C;
          box-shadow: 0 0 0 3.5px rgba(192,22,44,0.1);
        }

        .dp-input:focus + .dp-label,
        .dp-input:not(:placeholder-shown) + .dp-label {
          top: 9px;
          font-size: 0.68rem;
          color: #C0162C;
          font-weight: 600;
          letter-spacing: 0.06em;
        }

        .dp-label {
          position: absolute;
          top: 50%;
          left: 14px;
          transform: translateY(-50%);
          font-size: 0.88rem;
          font-weight: 400;
          color: rgba(0,0,0,0.38);
          pointer-events: none;
          transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
          white-space: nowrap;
        }

        /* Amount field prefix */
        .dp-amount-wrap {
          position: relative;
        }

        .dp-amount-prefix {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1rem;
          font-weight: 600;
          color: #C0162C;
          z-index: 2;
          pointer-events: none;
          transition: top 0.2s;
        }

        .dp-amount-input {
          padding-left: 30px;
        }

        /* Textarea */
        .dp-textarea {
          width: 100%;
          min-height: 90px;
          padding: 18px 14px 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          font-weight: 400;
          color: #1a1a1a;
          background: #fafafa;
          border: 1.5px solid rgba(0,0,0,0.1);
          border-radius: 10px;
          outline: none;
          resize: vertical;
          transition: border-color 0.22s, background 0.22s, box-shadow 0.22s;
        }

        .dp-textarea:focus {
          background: #fff;
          border-color: #C0162C;
          box-shadow: 0 0 0 3.5px rgba(192,22,44,0.1);
        }

        .dp-textarea:focus + .dp-label,
        .dp-textarea:not(:placeholder-shown) + .dp-label {
          top: 9px;
          font-size: 0.68rem;
          color: #C0162C;
          font-weight: 600;
          letter-spacing: 0.06em;
        }

        .dp-textarea-field .dp-label {
          top: 18px;
          transform: none;
        }

        /* Submit */
        .dp-submit {
          position: relative;
          width: 100%;
          height: 54px;
          background: #C0162C;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
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

        .dp-submit::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
          pointer-events: none;
        }

        .dp-submit:hover:not(:disabled) {
          background: #a01225;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(192,22,44,0.4);
        }

        .dp-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        .dp-submit-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .dp-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* Trust */
        .dp-trust {
          display: flex;
          justify-content: center;
          gap: 1.25rem;
          margin-top: 1.25rem;
          flex-wrap: wrap;
        }

        .dp-trust-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.72rem;
          color: rgba(0,0,0,0.35);
          font-weight: 500;
        }

        .dp-trust-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #C0162C;
          opacity: 0.5;
        }

        /* ── Success State ── */
        .dp-success {
          text-align: center;
          padding: 2.5rem 2rem;
          animation: dpFadeUp 0.5s ease both;
        }

        .dp-success-icon {
          width: 72px; height: 72px;
          background: rgba(192,22,44,0.08);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin: 0 auto 1.25rem;
          border: 2px solid rgba(192,22,44,0.2);
        }

        .dp-success-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.7rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .dp-success-msg {
          font-size: 0.88rem;
          color: rgba(0,0,0,0.45);
          line-height: 1.65;
        }

        @media (max-width: 480px) {
          .dp-page { padding: 2rem 1rem 4rem; }
          .dp-form-card { padding: 1.75rem 1.25rem; }
          .dp-presets { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="dp-root">

        {/* Animated background */}
        <div className="dp-bg">
          <div className="dp-bg-grid" />
          <div className="dp-bg-circle" />
          <div className="dp-bg-circle" />
          <div className="dp-bg-circle" />
        </div>

        <div className="dp-page">

          {/* Header */}
          <div className="dp-header">
            <div className="dp-logo-row">
              <div className="dp-logo-badge">S</div>
              <div className="dp-logo-text">
                Shravan Singh
                <small>Society</small>
              </div>
            </div>
            <div className="dp-eyebrow">Make a Difference</div>
            <h1 className="dp-title">Your generosity <span>changes lives.</span></h1>
            <p className="dp-tagline">
              Every rupee you donate goes directly toward campaigns that uplift communities and create lasting change.
            </p>
          </div>

          {/* Stats */}
          <div className="dp-stats">
            {stats.map((s, i) => (
              <div className="dp-stat-card" key={i}>
                <span className="dp-stat-icon">{s.icon}</span>
                <div className="dp-stat-value">{s.value}</div>
                <div className="dp-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Two columns */}
          <div className="dp-columns">

            {/* Left info panel */}
            <div className="dp-info">
              <div className="dp-info-title">Why your donation matters</div>
              <p className="dp-info-desc">
                Shravan Singh Society is on a mission to create meaningful, measurable impact across communities through targeted campaigns and grassroots efforts.
              </p>

              <div className="dp-info-points">
                <div className="dp-info-point">
                  <div className="dp-info-point-icon">🎯</div>
                  <div className="dp-info-point-text">
                    <strong>100% Direct Impact</strong>
                    <span>Every rupee reaches the campaign it's intended for — no hidden cuts.</span>
                  </div>
                </div>
                <div className="dp-info-point">
                  <div className="dp-info-point-icon">📊</div>
                  <div className="dp-info-point-text">
                    <strong>Full Transparency</strong>
                    <span>We publish detailed reports on how funds are used across all campaigns.</span>
                  </div>
                </div>
                <div className="dp-info-point">
                  <div className="dp-info-point-icon">🔒</div>
                  <div className="dp-info-point-text">
                    <strong>Secure & Trusted</strong>
                    <span>Your personal and payment data is always encrypted and protected.</span>
                  </div>
                </div>
              </div>

              <div className="dp-info-divider" />

              <div className="dp-info-quote">
                Small acts, when multiplied by millions of people, can transform the world.
              </div>
            </div>

            {/* Right form card */}
            <div className="dp-form-card">
              {donated ? (
                <div className="dp-success">
                  <div className="dp-success-icon">❤️</div>
                  <div className="dp-success-title">Thank you, {formData.name || 'Donor'}!</div>
                  <p className="dp-success-msg">
                    Your donation of <strong>₹{formData.amount}</strong> has been received.<br />
                    Together we're making a real difference.
                  </p>
                </div>
              ) : (
                <>
                  <div className="dp-form-title">Donate Now</div>
                  <div className="dp-form-sub">Choose an amount or enter your own</div>

                  {/* Quick presets */}
                  <div className="dp-presets">
                    {presets.map(amt => (
                      <button
                        key={amt}
                        type="button"
                        className={`dp-preset-btn${activePreset === amt ? ' active' : ''}`}
                        onClick={() => handlePreset(amt)}
                      >
                        ₹{amt.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="dp-form">

                    {/* Amount */}
                    <div className="dp-field dp-amount-wrap">
                      <span className="dp-amount-prefix">₹</span>
                      <input
                        type="number"
                        name="amount"
                        placeholder=" "
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        min="1"
                        className="dp-input dp-amount-input"
                      />
                      <label className="dp-label" style={{ left: '30px' }}>Custom Amount</label>
                    </div>

                    {/* Name */}
                    <div className="dp-field">
                      <input
                        type="text"
                        name="name"
                        placeholder=" "
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="dp-input"
                      />
                      <label className="dp-label">Your Full Name</label>
                    </div>

                    {/* Message */}
                    <div className="dp-field dp-textarea-field">
                      <textarea
                        name="message"
                        placeholder=" "
                        value={formData.message}
                        onChange={handleChange}
                        className="dp-textarea"
                      />
                      <label className="dp-label">Leave a message (optional)</label>
                    </div>

                    <button type="submit" className="dp-submit" disabled={isSubmitting}>
                      <span className="dp-submit-inner">
                        {isSubmitting && <span className="dp-spinner" />}
                        {isSubmitting ? 'Processing...' : `Donate${formData.amount ? ' ₹' + Number(formData.amount).toLocaleString('en-IN') : ''}`}
                      </span>
                    </button>

                    <div className="dp-trust">
                      <div className="dp-trust-item"><div className="dp-trust-dot" />100% Secure</div>
                      <div className="dp-trust-item"><div className="dp-trust-dot" />Transparent</div>
                      <div className="dp-trust-item"><div className="dp-trust-dot" />Direct Impact</div>
                    </div>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Donation;