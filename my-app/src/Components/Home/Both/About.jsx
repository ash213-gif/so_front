import React from 'react'

const About = () => {
  const team = [
    { name: 'Shravan Singh', role: 'Founder & CEO', emoji: '👨‍💼', bio: 'Passionate about bridging the gap between donors and those in need. Started this platform after witnessing grassroots impact firsthand.' },
    { name: 'Ananya Sharma', role: 'Head of Campaigns', emoji: '👩‍💻', bio: 'Verifies every campaign and ensures funds reach the right hands. 7+ years in nonprofit management.' },
    { name: 'Rohit Mehta', role: 'Tech & Payments', emoji: '🧑‍🔧', bio: 'Keeps the platform secure, fast, and reliable. Believes technology should serve humanity.' }
  ]

  const values = [
    { icon: '🔍', title: 'Transparency', desc: 'Every rupee is tracked. Donors receive detailed reports on how their contribution was spent.' },
    { icon: '✅', title: 'Verified Causes', desc: 'Our team personally vets every campaign before it goes live. No fraudulent campaigns, ever.' },
    { icon: '⚡', title: 'Speed', desc: 'Funds are transferred to campaigns within 48 hours of verification — when time matters most.' },
    { icon: '🤝', title: 'Community', desc: 'We believe in collective power. Every small donation adds up to create massive change.' }
  ]

  const milestones = [
    { year: '2021', event: 'ShravanSocient founded with 5 campaigns and a dream.' },
    { year: '2022', event: 'Crossed ₹50 Lakh raised. 1,000+ donors joined the mission.' },
    { year: '2023', event: 'Launched mobile app. Partnered with 20+ verified NGOs.' },
    { year: '2024', event: 'Expanded to disaster relief. ₹2 Crore+ total raised.' },
    { year: '2025', event: 'Growing stronger — 340+ campaigns, 8,400+ donors & counting.' }
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --red: #B91C1C; --red-dark: #7f1d1d; --red-soft: #fee2e2;
          --gold: #d97706; --ink: #18181b; --text: #3f3f46;
          --muted: #71717a; --border: #e4e4e7; --bg: #fffbfb;
        }
        .ab-page { background: var(--bg); font-family: 'Outfit', sans-serif; }

        .ab-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.1rem 4rem;
          background: rgba(255,251,251,0.95); backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border);
          position: sticky; top: 0; z-index: 100;
        }
        .ab-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 700; color: var(--red); text-decoration: none; }
        .ab-logo span { color: var(--ink); }
        .ab-nav-links { display: flex; gap: 2rem; list-style: none; }
        .ab-nav-links a { font-size: 0.9rem; font-weight: 500; color: var(--text); text-decoration: none; transition: color 0.2s; }
        .ab-nav-links a:hover, .ab-nav-links a.active { color: var(--red); }
        .ab-nav-btn { font-size: 0.88rem; font-weight: 600; padding: 0.55rem 1.4rem; background: var(--red); color: white; border: none; border-radius: 999px; cursor: pointer; transition: background 0.2s; }
        .ab-nav-btn:hover { background: var(--red-dark); }

        .ab-hero {
          position: relative; overflow: hidden;
          padding: 6rem 4rem 5rem; text-align: center;
          background: linear-gradient(135deg, #1c0a0a 0%, #3b0d0d 60%, #5a1a1a 100%);
        }
        .ab-hero-c { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .ab-hero-c span { position: absolute; border-radius: 50%; border: 1px solid rgba(255,255,255,0.06); }
        .ab-hero-c span:nth-child(1) { width: 400px; height: 400px; top: -200px; right: -100px; }
        .ab-hero-c span:nth-child(2) { width: 250px; height: 250px; bottom: -80px; left: 5%; }
        .ab-hero-c span:nth-child(3) { width: 160px; height: 160px; top: 30%; left: 50%; transform: translateX(-50%); }
        .ab-hero-eyebrow {
          display: inline-block; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: #fca5a5; background: rgba(255,255,255,0.08);
          padding: 0.35rem 1rem; border-radius: 999px; margin-bottom: 1.5rem;
          border: 1px solid rgba(255,255,255,0.1); animation: fadeUp 0.6s ease both;
        }
        .ab-hero h1 {
          font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700; color: white; line-height: 1.15; margin-bottom: 1.5rem;
          animation: fadeUp 0.7s 0.1s ease both;
        }
        .ab-hero h1 em { font-style: normal; color: var(--gold); }
        .ab-hero-p { font-size: 1.05rem; color: #d1d5db; max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.8; animation: fadeUp 0.7s 0.2s ease both; }
        .ab-hero-stats { display: flex; justify-content: center; gap: 4rem; animation: fadeUp 0.7s 0.3s ease both; }
        .ab-hstat-num { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 700; color: var(--gold); }
        .ab-hstat-label { font-size: 0.78rem; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.06em; margin-top: 0.2rem; }

        .ab-mission { max-width: 1100px; margin: 0 auto; padding: 5rem 4rem; display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        .ab-mission-eyebrow { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--red); margin-bottom: 0.6rem; }
        .ab-mission h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 3vw, 2.6rem); font-weight: 700; color: var(--ink); line-height: 1.2; margin-bottom: 1.25rem; }
        .ab-mission p { font-size: 0.97rem; color: var(--text); line-height: 1.8; margin-bottom: 1rem; }
        .ab-mission-tiles { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .ab-tile { background: white; border-radius: 14px; padding: 1.5rem; border: 1px solid var(--border); text-align: center; transition: transform 0.2s, box-shadow 0.2s; }
        .ab-tile:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
        .ab-tile.big { grid-column: 1 / -1; background: linear-gradient(135deg, var(--red), var(--red-dark)); border-color: transparent; }
        .ab-tile-num { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 700; color: var(--red); line-height: 1; }
        .ab-tile.big .ab-tile-num { color: #fca5a5; }
        .ab-tile-label { font-size: 0.78rem; color: var(--muted); margin-top: 0.25rem; text-transform: uppercase; letter-spacing: 0.06em; }
        .ab-tile.big .ab-tile-label { color: rgba(255,255,255,0.7); }

        .ab-values-bg { background: #fdf5f5; padding: 5rem 4rem; border-top: 1px solid #fde8e8; border-bottom: 1px solid #fde8e8; }
        .ab-values-inner { max-width: 1100px; margin: 0 auto; }
        .ab-sec-hd { text-align: center; margin-bottom: 3.5rem; }
        .ab-eyebrow { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--red); margin-bottom: 0.6rem; }
        .ab-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 3vw, 2.6rem); font-weight: 700; color: var(--ink); line-height: 1.15; margin-bottom: 0.75rem; }
        .ab-sub { font-size: 1rem; color: var(--muted); max-width: 520px; margin: 0 auto; line-height: 1.7; }
        .ab-values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .ab-val-card { background: white; border-radius: 14px; padding: 1.75rem 1.25rem; border: 1px solid var(--border); text-align: center; transition: transform 0.2s, box-shadow 0.2s; }
        .ab-val-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
        .ab-val-icon { font-size: 2.2rem; margin-bottom: 1rem; display: block; }
        .ab-val-title { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 700; color: var(--ink); margin-bottom: 0.6rem; }
        .ab-val-desc { font-size: 0.83rem; color: var(--muted); line-height: 1.65; }

        .ab-tl-wrap { max-width: 1100px; margin: 0 auto; padding: 5rem 4rem; }
        .ab-timeline { position: relative; margin-top: 3rem; }
        .ab-timeline::before { content: ''; position: absolute; left: 80px; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, var(--red), var(--gold)); opacity: 0.3; }
        .ab-tl-item { display: flex; gap: 2rem; align-items: flex-start; margin-bottom: 2.5rem; position: relative; }
        .ab-tl-year { min-width: 80px; font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 700; color: var(--red); text-align: right; padding-top: 2px; }
        .ab-tl-dot { width: 14px; height: 14px; background: var(--red); border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 2px var(--red); flex-shrink: 0; margin-top: 4px; position: relative; z-index: 1; }
        .ab-tl-text { font-size: 0.95rem; color: var(--text); line-height: 1.7; padding-top: 2px; }

        .ab-team-bg { background: linear-gradient(135deg, #1c0a0a, #3b0d0d); padding: 5rem 4rem; }
        .ab-team-inner { max-width: 1100px; margin: 0 auto; }
        .ab-team-inner .ab-eyebrow { color: #fca5a5; }
        .ab-team-inner .ab-title { color: white; }
        .ab-team-inner .ab-sub { color: #9ca3af; }
        .ab-team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 3.5rem; }
        .ab-team-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 2rem 1.5rem; text-align: center; transition: background 0.2s, transform 0.2s; }
        .ab-team-card:hover { background: rgba(255,255,255,0.09); transform: translateY(-4px); }
        .ab-team-av { font-size: 2.2rem; width: 72px; height: 72px; border-radius: 50%; background: rgba(255,255,255,0.08); border: 1.5px solid rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; }
        .ab-team-name { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 700; color: white; margin-bottom: 0.3rem; }
        .ab-team-role { font-size: 0.78rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--gold); margin-bottom: 0.9rem; }
        .ab-team-bio { font-size: 0.83rem; color: #9ca3af; line-height: 1.65; }

        .ab-cta { padding: 5rem 4rem; text-align: center; background: var(--bg); }
        .ab-cta h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 700; color: var(--ink); margin-bottom: 1rem; }
        .ab-cta p { font-size: 1rem; color: var(--muted); max-width: 480px; margin: 0 auto 2.5rem; line-height: 1.7; }
        .ab-cta-btns { display: flex; gap: 1rem; justify-content: center; }
        .ab-btn-p { font-weight: 600; font-size: 1rem; padding: 0.85rem 2rem; background: var(--red); color: white; border: none; border-radius: 8px; cursor: pointer; transition: background 0.2s, box-shadow 0.2s, transform 0.15s; text-decoration: none; display: inline-block; }
        .ab-btn-p:hover { background: var(--red-dark); box-shadow: 0 6px 20px rgba(185,28,28,0.35); transform: translateY(-2px); }
        .ab-btn-g { font-weight: 500; font-size: 0.95rem; padding: 0.85rem 1.75rem; background: transparent; color: var(--ink); border: 1.5px solid var(--border); border-radius: 8px; cursor: pointer; transition: border-color 0.2s, color 0.2s; text-decoration: none; display: inline-block; }
        .ab-btn-g:hover { border-color: var(--red); color: var(--red); }

        .ab-footer { background: #0f0505; color: #9ca3af; font-size: 0.85rem; text-align: center; padding: 2rem 4rem; }
        .ab-footer-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 700; color: var(--red); margin-bottom: 0.5rem; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 900px) {
          .ab-mission { grid-template-columns: 1fr; gap: 2rem; }
          .ab-values-grid { grid-template-columns: 1fr 1fr; }
          .ab-team-grid { grid-template-columns: 1fr; }
          .ab-nav { padding: 1rem 1.5rem; }
          .ab-hero, .ab-tl-wrap, .ab-cta { padding: 3.5rem 1.5rem; }
          .ab-mission, .ab-values-bg, .ab-team-bg { padding: 3.5rem 1.5rem; }
          .ab-nav-links { display: none; }
          .ab-hero-stats { gap: 2rem; }
        }
        @media (max-width: 580px) {
          .ab-values-grid { grid-template-columns: 1fr; }
          .ab-cta-btns { flex-direction: column; align-items: center; }
          .ab-timeline::before { left: 60px; }
          .ab-tl-year { min-width: 60px; font-size: 1.1rem; }
        }
      `}</style>

      <div className='ab-page'>
       
        <section className='ab-hero'>
          <div className='ab-hero-c'><span /><span /><span /></div>
          <div className='ab-hero-eyebrow'>Our Story</div>
          <h1>We Believe Every Rupee<br />Has the Power to <em>Change Lives</em></h1>
          <p className='ab-hero-p'>Shravan Singh Socient was born from a simple belief — that people are inherently generous, and all they need is a trusted bridge to those in need.</p>
          <div className='ab-hero-stats'>
            {[['₹2.4Cr+','Raised'],['8,400+','Donors'],['340+','Campaigns'],['4','Years']].map(([n,l]) => (
              <div key={l}><div className='ab-hstat-num'>{n}</div><div className='ab-hstat-label'>{l}</div></div>
            ))}
          </div>
        </section>

        <section className='ab-mission'>
          <div>
            <div className='ab-mission-eyebrow'>Our Mission</div>
            <h2>Connecting Hearts, Transforming Communities</h2>
            <p>We started ShravanSocient after seeing firsthand how difficult it was for genuine causes to reach the right donors — and how hard it was for donors to trust where their money was going.</p>
            <p>Our mission is simple: be the most transparent, efficient, and human donation platform in India. No middlemen. No hidden fees. Just direct impact.</p>
          </div>
          <div className='ab-mission-tiles'>
            <div className='ab-tile big'><div className='ab-tile-num'>₹2.4Cr+</div><div className='ab-tile-label'>Total Disbursed</div></div>
            <div className='ab-tile'><div className='ab-tile-num'>340+</div><div className='ab-tile-label'>Campaigns Funded</div></div>
            <div className='ab-tile'><div className='ab-tile-num'>8.4K+</div><div className='ab-tile-label'>Active Donors</div></div>
          </div>
        </section>

        <section className='ab-values-bg'>
          <div className='ab-values-inner'>
            <div className='ab-sec-hd'>
              <div className='ab-eyebrow'>What We Stand For</div>
              <h2 className='ab-title'>Our Core Values</h2>
              <p className='ab-sub'>These aren't just words — they're the operating principles behind every decision we make.</p>
            </div>
            <div className='ab-values-grid'>
              {values.map(v => (
                <div key={v.title} className='ab-val-card'>
                  <span className='ab-val-icon'>{v.icon}</span>
                  <div className='ab-val-title'>{v.title}</div>
                  <div className='ab-val-desc'>{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className='ab-tl-wrap'>
          <div className='ab-sec-hd' style={{textAlign:'left'}}>
            <div className='ab-eyebrow'>Our Journey</div>
            <h2 className='ab-title'>How We Got Here</h2>
          </div>
          <div className='ab-timeline'>
            {milestones.map(m => (
              <div key={m.year} className='ab-tl-item'>
                <div className='ab-tl-year'>{m.year}</div>
                <div className='ab-tl-dot' />
                <div className='ab-tl-text'>{m.event}</div>
              </div>
            ))}
          </div>
        </section>

        <section className='ab-team-bg'>
          <div className='ab-team-inner'>
            <div className='ab-sec-hd'>
              <div className='ab-eyebrow'>The People</div>
              <h2 className='ab-title'>Meet Our Team</h2>
              <p className='ab-sub'>A small team with a big heart — committed to making every donation count.</p>
            </div>
            <div className='ab-team-grid'>
              {team.map(t => (
                <div key={t.name} className='ab-team-card'>
                  <div className='ab-team-av'>{t.emoji}</div>
                  <div className='ab-team-name'>{t.name}</div>
                  <div className='ab-team-role'>{t.role}</div>
                  <div className='ab-team-bio'>{t.bio}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className='ab-cta'>
          <h2>Ready to Make a Difference?</h2>
          <p>Join thousands of donors who trust ShravanSocient to connect their generosity with people who need it most.</p>
          <div className='ab-cta-btns'>
            <a href='/campaigns' className='ab-btn-p'>Browse Campaigns →</a>
            <a href='/campaign/create' className='ab-btn-g'>Start a Campaign</a>
          </div>
        </section>

      
      </div>
    </>
  )
}

export default About