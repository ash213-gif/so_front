import React from 'react';

const InfoPanel = () => {
  const points = [
    {
      icon: '🎯',
      title: '100% Direct Impact',
      desc: 'Every rupee reaches the campaign it\'s intended for — no hidden cuts or overhead deductions.',
    },
    {
      icon: '📊',
      title: 'Full Transparency',
      desc: 'We publish detailed reports on how funds are used across every campaign we run.',
    },
    {
      icon: '🔒',
      title: 'Secure & Trusted',
      desc: 'Your personal and payment data is always encrypted and fully protected.',
    },
  ];

  return (
    <>
      <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

  .ip-wrap {
    font-family: 'DM Sans', sans-serif;
    background: #C0162C;
    border-radius: 22px;
    padding: 2.5rem 2.25rem;
    position: relative;
    overflow: hidden;
    box-shadow:
      0 8px 32px rgba(192,22,44,0.35),
      0 2px 8px rgba(0,0,0,0.1),
      inset 0 1px 0 rgba(255,255,255,0.12);

    width: 100%;
    max-width: 620px;
    margin: 3rem auto;
  }

  /* Decorative circles */
  .ip-wrap::before {
    content: '';
    position: absolute;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    border: 55px solid rgba(255,255,255,0.06);
    bottom: -90px;
    right: -90px;
    pointer-events: none;
  }

  .ip-wrap::after {
    content: '';
    position: absolute;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    border: 35px solid rgba(255,255,255,0.05);
    top: -55px;
    left: -55px;
    pointer-events: none;
  }

  .ip-shine {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: linear-gradient(
      135deg,
      rgba(255,255,255,0.06) 0%,
      transparent 50%
    );
    pointer-events: none;
  }

  .ip-content {
    position: relative;
    z-index: 1;
  }

  .ip-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 30px;
    padding: 0.3rem 0.85rem;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.85);
    margin-bottom: 1.25rem;
  }

  .ip-badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: rgba(255,255,255,0.7);
    animation: ipPulse 2s ease infinite;
  }

  @keyframes ipPulse {
    0%,100% { opacity:1; transform:scale(1); }
    50% { opacity:0.4; transform:scale(0.7); }
  }

  .ip-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
    margin-bottom: 0.75rem;
  }

  .ip-desc {
    font-size: 0.95rem;
    color: rgba(255,255,255,0.75);
    line-height: 1.7;
    margin-bottom: 2rem;
  }

  .ip-points {
    display: flex;
    flex-direction: column;
  }

  .ip-point {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    transition: transform 0.2s ease;
  }

  .ip-point:last-child {
    border-bottom: none;
  }

  .ip-point:hover {
    transform: translateX(4px);
  }

  .ip-point-icon {
    width: 42px;
    height: 42px;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .ip-point-body strong {
    display: block;
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    margin-bottom: 0.25rem;
  }

  .ip-point-body p {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.65);
    line-height: 1.6;
    margin: 0;
  }

  .ip-divider {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 1.75rem 0 1.5rem;
  }

  .ip-divider-line {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.15);
  }

  .ip-quote {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 1.1rem;
    color: rgba(255,255,255,0.8);
    line-height: 1.6;
    padding-left: 1rem;
    border-left: 2px solid rgba(255,255,255,0.25);
  }

  .ip-quote-author {
    display: block;
    font-family: 'DM Sans', sans-serif;
    font-style: normal;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    color: rgba(255,255,255,0.5);
    margin-top: 0.5rem;
    text-transform: uppercase;
  }

  /* ---------- RESPONSIVE ---------- */

  @media (max-width: 768px) {
    .ip-wrap {
      padding: 2rem 1.5rem;
      margin: 2rem 1rem;
    }

    .ip-title {
      font-size: 1.6rem;
    }

    .ip-desc {
      font-size: 0.9rem;
    }

    .ip-wrap::before {
      width: 240px;
      height: 240px;
      border-width: 40px;
    }

    .ip-wrap::after {
      width: 140px;
      height: 140px;
      border-width: 25px;
    }
  }

  @media (max-width: 480px) {
    .ip-title {
      font-size: 1.4rem;
    }

    .ip-point {
      gap: 0.75rem;
    }

    .ip-point-icon {
      width: 36px;
      height: 36px;
      font-size: 1rem;
    }

    .ip-point-body strong {
      font-size: 0.9rem;
    }

    .ip-point-body p {
      font-size: 0.8rem;
    }
  }
`}</style>

      <div className="ip-wrap">
        <div className="ip-shine" />

        <div className="ip-content">

          {/* Badge */}
          <div className="ip-badge">
            <span className="ip-badge-dot" />
            Why it matters
          </div>

          {/* Title & desc */}
          <h2 className="ip-title">Your donation<br />changes everything.</h2>
          <p className="ip-desc">
            Shravan Singh Society is on a mission to create meaningful, measurable impact across communities through targeted campaigns and grassroots efforts.
          </p>

          {/* Points */}
          <div className="ip-points">
            {points.map((p, i) => (
              <div className="ip-point" key={i}>
                <div className="ip-point-icon">{p.icon}</div>
                <div className="ip-point-body">
                  <strong>{p.title}</strong>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="ip-divider">
            <div className="ip-divider-line" />
            <span className="ip-divider-icon">✦</span>
            <div className="ip-divider-line" />
          </div>

          {/* Quote */}
          <blockquote className="ip-quote">
            Small acts, when multiplied by millions of people, can transform the world.
            <span className="ip-quote-author">— Howard Zinn</span>
          </blockquote>

        </div>
      </div>
    </>
  );
};

export default InfoPanel;