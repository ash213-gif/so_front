import React, { useEffect, useState } from 'react'

const Home = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const campaigns = [
    {
      id: 1,
      category: 'Education',
      title: 'Books & Futures for Rural Kids',
      desc: 'Providing textbooks, uniforms, and school supplies to 500 underprivileged children in remote villages.',
      raised: 38000,
      goal: 60000,
      donors: 142,
      emoji: '📚'
    },
    {
      id: 2,
      category: 'Medical',
      title: 'Life-Saving Surgery for Ravi, 7',
      desc: 'Little Ravi needs urgent cardiac surgery. Every rupee brings him one step closer to a healthy life.',
      raised: 112000,
      goal: 150000,
      donors: 389,
      emoji: '❤️'
    },
    {
      id: 3,
      category: 'Disaster',
      title: 'Flood Relief — Assam 2025',
      desc: 'Thousands of families displaced by floods need food, shelter kits, and clean drinking water immediately.',
      raised: 75000,
      goal: 200000,
      donors: 210,
      emoji: '🆘'
    }
  ]

  const steps = [
    { num: '01', title: 'Browse Campaigns', desc: 'Explore verified causes across education, medical, disaster relief, and environment categories.' },
    { num: '02', title: 'Choose & Donate', desc: 'Pick an amount, donate securely via UPI, card, or net banking — in under 60 seconds.' },
    { num: '03', title: 'Track Impact', desc: 'Receive real-time updates and transparent reports on how your donation is being used.' }
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --red: #B91C1C;
          --red-dark: #7f1d1d;
          --red-mid: #DC2626;
          --red-soft: #fee2e2;
          --gold: #d97706;
          --ink: #18181b;
          --text: #3f3f46;
          --muted: #71717a;
          --border: #e4e4e7;
          --bg: #fffbfb;
          --white: #ffffff;
        }

        .hn-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 4rem;
          transition: background 0.3s, box-shadow 0.3s;
        }
        .hn-nav.scrolled {
          background: rgba(255,251,251,0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 1px 0 var(--border);
        }
        .hn-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--red);
          text-decoration: none;
        }
        .hn-logo span { color: var(--ink); }
        .hn-nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
        .hn-nav-links a {
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text);
          text-decoration: none;
          transition: color 0.2s;
        }
        .hn-nav-links a:hover { color: var(--red); }
        .hn-nav-btn {
          font-family: 'Outfit', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          padding: 0.55rem 1.4rem;
          background: var(--red);
          color: white;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .hn-nav-btn:hover { background: var(--red-dark); transform: translateY(-1px); }

        .hn-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 8rem 4rem 5rem;
          background: var(--bg);
        }
        .hn-hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          pointer-events: none;
        }
        .hn-hero-blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #fca5a5, transparent);
          top: -100px; right: -100px;
        }
        .hn-hero-blob-2 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, #fde68a, transparent);
          bottom: 0; left: 10%;
        }
        .hn-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .hn-hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--red-soft);
          color: var(--red);
          font-family: 'Outfit', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.35rem 0.9rem;
          border-radius: 999px;
          margin-bottom: 1.25rem;
          width: fit-content;
          animation: fadeUp 0.6s ease both;
        }
        .hn-hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 5vw, 4.2rem);
          font-weight: 700;
          color: var(--ink);
          line-height: 1.1;
          margin-bottom: 1.5rem;
          animation: fadeUp 0.7s 0.1s ease both;
        }
        .hn-hero-h1 em {
          font-style: normal;
          color: var(--red);
          position: relative;
        }
        .hn-hero-h1 em::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 0; right: 0;
          height: 3px;
          background: var(--gold);
          border-radius: 2px;
          opacity: 0.6;
        }
        .hn-hero-p {
          font-family: 'Outfit', sans-serif;
          font-size: 1.05rem;
          color: var(--text);
          line-height: 1.75;
          margin-bottom: 2.25rem;
          animation: fadeUp 0.7s 0.2s ease both;
          max-width: 480px;
        }
        .hn-hero-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
          animation: fadeUp 0.7s 0.3s ease both;
        }
        .hn-btn-primary {
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          padding: 0.85rem 2rem;
          background: var(--red);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
          text-decoration: none;
          display: inline-block;
        }
        .hn-btn-primary:hover {
          background: var(--red-dark);
          box-shadow: 0 6px 20px rgba(185,28,28,0.35);
          transform: translateY(-2px);
        }
        .hn-btn-ghost {
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          font-size: 0.95rem;
          padding: 0.85rem 1.75rem;
          background: transparent;
          color: var(--ink);
          border: 1.5px solid var(--border);
          border-radius: 8px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .hn-btn-ghost:hover { border-color: var(--red); color: var(--red); }

        .hn-hero-stats {
          display: flex;
          gap: 2rem;
          margin-top: 3rem;
          animation: fadeUp 0.7s 0.4s ease both;
        }
        .hn-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 700;
          color: var(--red);
          line-height: 1;
        }
        .hn-stat-label {
          font-family: 'Outfit', sans-serif;
          font-size: 0.78rem;
          color: var(--muted);
          margin-top: 0.2rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .hn-hero-visual { animation: fadeIn 1s 0.3s ease both; position: relative; }
        .hn-visual-card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
          border: 1px solid var(--red-soft);
          position: relative;
          overflow: hidden;
        }
        .hn-visual-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--red), var(--gold));
        }
        .hn-visual-card-tag {
          font-family: 'Outfit', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--red);
          background: var(--red-soft);
          padding: 0.25rem 0.7rem;
          border-radius: 999px;
          display: inline-block;
          margin-bottom: 0.75rem;
        }
        .hn-visual-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 0.5rem;
        }
        .hn-visual-card p {
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          color: var(--muted);
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }
        .hn-visual-progress-bar {
          height: 6px;
          background: var(--red-soft);
          border-radius: 999px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        .hn-visual-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--red), var(--gold));
          border-radius: 999px;
          width: 74%;
        }
        .hn-visual-progress-meta {
          display: flex;
          justify-content: space-between;
          font-family: 'Outfit', sans-serif;
          font-size: 0.8rem;
          color: var(--muted);
          margin-bottom: 1.25rem;
        }
        .hn-visual-progress-meta strong { color: var(--ink); }
        .hn-visual-donate-row { display: flex; gap: 0.5rem; }
        .hn-visual-amt-btn {
          flex: 1;
          padding: 0.5rem;
          border: 1.5px solid var(--border);
          border-radius: 6px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          background: white;
          color: var(--ink);
          transition: all 0.2s;
        }
        .hn-visual-amt-btn.active, .hn-visual-amt-btn:hover {
          border-color: var(--red);
          color: var(--red);
          background: var(--red-soft);
        }
        .hn-visual-donate-btn {
          padding: 0.5rem 1.25rem;
          background: var(--red);
          color: white;
          border: none;
          border-radius: 6px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
        }
        .hn-floating-badge {
          position: absolute;
          top: -18px; right: 24px;
          background: white;
          border-radius: 12px;
          padding: 0.6rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          font-family: 'Outfit', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--ink);
          border: 1px solid var(--border);
        }
        .hn-badge-dot {
          width: 8px; height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse-green 1.5s infinite;
        }
        @keyframes pulse-green {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }

        .hn-campaigns-wrap {
          background: var(--bg);
          padding: 5rem 4rem;
        }
        .hn-campaigns-inner { max-width: 1200px; margin: 0 auto; }
        .hn-section-eyebrow {
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 0.6rem;
        }
        .hn-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 0.75rem;
          line-height: 1.15;
        }
        .hn-section-sub {
          font-family: 'Outfit', sans-serif;
          font-size: 1rem;
          color: var(--muted);
          max-width: 520px;
          line-height: 1.7;
          margin-bottom: 3rem;
        }
        .hn-campaigns-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .hn-camp-card {
          background: white;
          border-radius: 16px;
          border: 1px solid var(--border);
          overflow: hidden;
          transition: transform 0.25s, box-shadow 0.25s;
          cursor: pointer;
        }
        .hn-camp-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.1);
        }
        .hn-camp-emoji-area {
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          background: linear-gradient(135deg, #fff5f5, #ffe4e6);
          position: relative;
        }
        .hn-camp-cat {
          position: absolute;
          bottom: 12px; left: 14px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: white;
          color: var(--red);
          padding: 0.2rem 0.65rem;
          border-radius: 999px;
          border: 1px solid var(--red-soft);
        }
        .hn-camp-body { padding: 1.25rem; }
        .hn-camp-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }
        .hn-camp-desc {
          font-family: 'Outfit', sans-serif;
          font-size: 0.83rem;
          color: var(--muted);
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        .hn-camp-progress {
          height: 5px;
          background: var(--red-soft);
          border-radius: 999px;
          overflow: hidden;
          margin-bottom: 0.6rem;
        }
        .hn-camp-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--red), var(--gold));
          border-radius: 999px;
        }
        .hn-camp-meta {
          display: flex;
          justify-content: space-between;
          font-family: 'Outfit', sans-serif;
          font-size: 0.78rem;
          color: var(--muted);
          margin-bottom: 1rem;
        }
        .hn-camp-meta strong { color: var(--ink); }
        .hn-camp-donate {
          width: 100%;
          padding: 0.65rem;
          background: var(--red);
          color: white;
          border: none;
          border-radius: 8px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .hn-camp-donate:hover { background: var(--red-dark); }

        .hn-hiw-bg {
          background: linear-gradient(135deg, #1c0a0a, #3b0d0d);
          padding: 5rem 4rem;
        }
        .hn-hiw-inner { max-width: 1200px; margin: 0 auto; }
        .hn-hiw-inner .hn-section-eyebrow { color: #fca5a5; }
        .hn-hiw-inner .hn-section-title { color: white; }
        .hn-hiw-inner .hn-section-sub { color: #d1d5db; }
        .hn-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          position: relative;
        }
        .hn-steps::before {
          content: '';
          position: absolute;
          top: 32px;
          left: calc(16.66% + 1rem);
          right: calc(16.66% + 1rem);
          height: 1px;
          background: repeating-linear-gradient(90deg, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 6px, transparent 6px, transparent 12px);
        }
        .hn-step { text-align: center; position: relative; }
        .hn-step-num-wrap {
          width: 64px; height: 64px;
          margin: 0 auto 1.5rem;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }
        .hn-step-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--gold);
        }
        .hn-step-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.65rem;
        }
        .hn-step-desc {
          font-family: 'Outfit', sans-serif;
          font-size: 0.88rem;
          color: #9ca3af;
          line-height: 1.7;
        }

        .hn-footer {
          background: #0f0505;
          color: #9ca3af;
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          text-align: center;
          padding: 2rem 4rem;
        }
        .hn-footer-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--red);
          margin-bottom: 0.5rem;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 900px) {
          .hn-hero-inner { grid-template-columns: 1fr; }
          .hn-hero-visual { display: none; }
          .hn-campaigns-grid { grid-template-columns: 1fr 1fr; }
          .hn-steps { grid-template-columns: 1fr; }
          .hn-steps::before { display: none; }
          .hn-nav { padding: 1rem 1.5rem; }
          .hn-hero { padding: 7rem 1.5rem 4rem; }
          .hn-campaigns-wrap, .hn-hiw-bg { padding: 3.5rem 1.5rem; }
          .hn-nav-links { display: none; }
        }
        @media (max-width: 580px) {
          .hn-campaigns-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      

      {/* HERO */}
      <section className='hn-hero'>
        <div className='hn-hero-blob hn-hero-blob-1' />
        <div className='hn-hero-blob hn-hero-blob-2' />
        <div className='hn-hero-inner'>
          <div>
            <div className='hn-hero-tag'>❤️ India's Trusted Donation Platform</div>
            <h1 className='hn-hero-h1'>
              Give Hope,<br />Change <em>Lives</em>,<br />One Rupee at a Time
            </h1>
            <p className='hn-hero-p'>
              Shravan Singh Socient connects compassionate donors with verified campaigns across education, medical emergencies, disaster relief, and environmental causes.
            </p>
            <div className='hn-hero-actions'>
              <a href='#campaigns' className='hn-btn-primary'>Browse Campaigns →</a>
              <a href='/about' className='hn-btn-ghost'>Our Story</a>
            </div>
            <div className='hn-hero-stats'>
              <div>
                <div className='hn-stat-num'>₹2.4Cr+</div>
                <div className='hn-stat-label'>Total Raised</div>
              </div>
              <div>
                <div className='hn-stat-num'>8,400+</div>
                <div className='hn-stat-label'>Donors</div>
              </div>
              <div>
                <div className='hn-stat-num'>340+</div>
                <div className='hn-stat-label'>Campaigns</div>
              </div>
            </div>
          </div>

          <div className='hn-hero-visual'>
            <div className='hn-floating-badge'>
              <span className='hn-badge-dot' />
              12 people donating right now
            </div>
            <div className='hn-visual-card'>
              <span className='hn-visual-card-tag'>🏥 Medical</span>
              <h3>Help Priya Get Her Surgery</h3>
              <p>Priya, 9, needs urgent kidney treatment. Your support can save her life before it's too late.</p>
              <div className='hn-visual-progress-bar'>
                <div className='hn-visual-progress-fill' />
              </div>
              <div className='hn-visual-progress-meta'>
                <span><strong>₹1,11,000</strong> raised</span>
                <span>74% of ₹1.5L</span>
              </div>
              <div className='hn-visual-donate-row'>
                {['₹100', '₹500', '₹1000'].map((a, i) => (
                  <button key={i} className={`hn-visual-amt-btn${i === 1 ? ' active' : ''}`}>{a}</button>
                ))}
                <button className='hn-visual-donate-btn'>Donate</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAMPAIGNS */}
      <section id='campaigns' className='hn-campaigns-wrap'>
        <div className='hn-campaigns-inner'>
          <div className='hn-section-eyebrow'>Active Campaigns</div>
          <h2 className='hn-section-title'>Causes That Need You Today</h2>
          <p className='hn-section-sub'>Every campaign is verified by our team. 100% of your donation reaches the cause.</p>
          <div className='hn-campaigns-grid'>
            {campaigns.map(c => {
              const pct = Math.round((c.raised / c.goal) * 100)
              return (
                <div key={c.id} className='hn-camp-card'>
                  <div className='hn-camp-emoji-area'>
                    <span>{c.emoji}</span>
                    <span className='hn-camp-cat'>{c.category}</span>
                  </div>
                  <div className='hn-camp-body'>
                    <div className='hn-camp-title'>{c.title}</div>
                    <div className='hn-camp-desc'>{c.desc}</div>
                    <div className='hn-camp-progress'>
                      <div className='hn-camp-fill' style={{ width: `${pct}%` }} />
                    </div>
                    <div className='hn-camp-meta'>
                      <span><strong>₹{c.raised.toLocaleString('en-IN')}</strong> raised</span>
                      <span>{c.donors} donors · {pct}%</span>
                    </div>
                    <button className='hn-camp-donate'>Donate Now</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id='how' className='hn-hiw-bg'>
        <div className='hn-hiw-inner'>
          <div className='hn-section-eyebrow'>Simple Process</div>
          <h2 className='hn-section-title'>How It Works</h2>
          <p className='hn-section-sub'>Donating is simple, transparent, and takes less than a minute.</p>
          <div className='hn-steps'>
            {steps.map(s => (
              <div key={s.num} className='hn-step'>
                <div className='hn-step-num-wrap'>
                  <span className='hn-step-num'>{s.num}</span>
                </div>
                <div className='hn-step-title'>{s.title}</div>
                <div className='hn-step-desc'>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </>
  )
}

export default Home;