import { useState, useEffect } from 'react'
import { Paymenthook } from '../CustomHook/Paymenthook'

const images = [
  '/3d mode/coin_.png',
  '/3d mode/box.png',
  '/3d mode/coin_hand.png',
  '/3d mode/hand_heart.png',
  '/3d mode/teacher.png',
  '/3d mode/donate_button.png',
  '/3d mode/oy_hear.png'
]

export default function Three () {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)
  const {
    handlePayment,
    loadRazorpayScript,
    loading,
    setLoading,
    amount,
    setAmount
  } = Paymenthook()

  const [innput, setinput] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent(p => (p + 1) % images.length)
        setVisible(true)
      }, 400)
    }, 2800)
    return () => clearInterval(t)
  }, [])

  const jump = i => {
    if (i === current) return
    setVisible(false)
    setTimeout(() => {
      setCurrent(i)
      setVisible(true)
    }, 350)
  }

  return (
    <div className='wrapper'>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Animations ── */
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(80px) scale(0.95); }
          to   { opacity: 1; transform: translateX(0)    scale(1);    }
        }
        @keyframes slideOutLeft {
          from { opacity: 1; transform: translateX(0)     scale(1);    }
          to   { opacity: 0; transform: translateX(-80px) scale(0.95); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px);   }
          50%      { transform: translateY(-16px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes lineGrow {
          from { width: 0; }
          to   { width: 52px; }
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 0   rgba(220,20,20,0.45); }
          55%      { box-shadow: 0 0 0 10px rgba(220,20,20,0);   }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes glowBreath {
          0%,100% { opacity: 0.5; transform: scale(1);    }
          50%      { opacity: 0.9; transform: scale(1.07); }
        }

        .img-enter { animation: slideInRight 0.5s cubic-bezier(0.22,1,0.36,1) forwards; }
        .img-exit  { animation: slideOutLeft  0.4s ease forwards; }
        .floating  { animation: float 3.6s ease-in-out infinite; }

        .fu1 { animation: fadeUp 0.65s 0.05s ease both; }
        .fu2 { animation: fadeUp 0.65s 0.18s ease both; }
        .fu3 { animation: fadeUp 0.65s 0.30s ease both; }
        .fu4 { animation: fadeUp 0.65s 0.42s ease both; }
        .fu5 { animation: fadeUp 0.65s 0.54s ease both; }
        .fu6 { animation: fadeUp 0.65s 0.66s ease both; }
        .fu7 { animation: fadeUp 0.65s 0.66s ease both; }

        /* ── Layout ── */
        .wrapper {
          display: flex;
          align-items: center;
          gap: clamp(24px, 5vw, 72px);
          padding: clamp(36px, 7vw, 80px) clamp(20px, 6vw, 80px);
          background: #fff;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }

        .left {
          flex: 0 0 clamp(260px, 44%, 420px);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          min-height: 360px;
        }

        /* ── Badge ── */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: linear-gradient(135deg, #e80000 0%, #a80000 100%);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          padding: 6px 15px;
          border-radius: 30px;
          width: fit-content;
          animation: pulse 2.3s ease-in-out infinite;
          box-shadow: 0 4px 16px rgba(200,0,0,0.38);
        }
        .badge-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #fff;
        }

        /* ── Headline ── */
        .headline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 900;
          color: #0d0d0d;
          line-height: 1.22;
        }
        .headline em {
          font-style: italic;
          background: linear-gradient(90deg, #e80000, #ff5520, #e80000);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }

        /* ── Red divider ── */
        .redline {
          height: 3px;
          border-radius: 3px;
          background: linear-gradient(90deg, #e80000, #ff6030);
          animation: lineGrow 0.9s 0.45s ease both;
          width: 52px;
        }

        /* ── Body ── */
        .body-txt {
          font-size: 15px;
          color: #5c5c5c;
          line-height: 1.9;
        }

        /* ── Stats ── */
        .stats-row {
          display: flex;
          gap: 10px;
        }
        .stat-card {
          flex: 1;
          text-align: center;
          padding: 13px 8px;
          border-radius: 12px;
          background: #fff;
          border: 1.5px solid #f5e8e8;
          box-shadow: 0 3px 14px rgba(200,0,0,0.08);
        }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: clamp(19px, 2.4vw, 25px);
          font-weight: 900;
          background: linear-gradient(135deg, #e80000, #a80000);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .stat-lbl {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #b0b0b0;
          margin-top: 3px;
        }

        /* ── Blockquote ── */
        .bq {
          border-left: 3px solid #e80000;
          padding: 6px 0 6px 16px;
          font-style: italic;
          font-size: 14px;
          color: #888;
          line-height: 1.75;
        }
        .bq cite {
          display: block;
          font-style: normal;
          font-weight: 700;
          font-size: 11px;
          color: #c0c0c0;
          margin-top: 5px;
        }

        /* ── Input Field ── */
        .inputf {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .inputf:focus {
          border-color: #e80000;
          box-shadow: 0 0 0 3px rgba(232,0,0,0.1);
        }

        /* ── Buttons ── */
        .btn-row { display: flex; align-items: center; gap: 16px; }

        .btn-donate {
          background: linear-gradient(135deg, #e80000 0%, #a80000 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 13px 28px;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          box-shadow: 0 6px 22px rgba(180,0,0,0.42);
          transition: transform 0.2s, box-shadow 0.2s;
          letter-spacing: 0.3px;
        }
        .btn-donate:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(180,0,0,0.52);
        }

        .btn-ghost {
          background: none;
          border: none;
          font-size: 14px;
          font-weight: 600;
          color: #bbb;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: color 0.2s;
        }
        .btn-ghost:hover { color: #e80000; }

        /* ── Dots ── */
        .dots { display: flex; gap: 8px; align-items: center; }
        .dot {
          width: 8px; height: 8px; border-radius: 50%;
          border: none; background: #e0d5d5; cursor: pointer;
          padding: 0; transition: all 0.32s;
        }
        .dot.active {
          width: 26px; border-radius: 4px;
          background: linear-gradient(90deg, #e80000, #ff5020);
          box-shadow: 0 2px 8px rgba(220,0,0,0.45);
        }

        /* ── Glow circle ── */
        .glow {
          position: absolute;
          width: min(370px, 90%);
          height: min(370px, 90%);
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(232,0,0,0.13) 0%,
            rgba(255,80,30,0.07) 50%,
            transparent 72%);
          animation: glowBreath 3.6s ease-in-out infinite;
          z-index: 0;
        }

        /* ── Responsive ── */

        /* Desktop: inline image hidden, desktop image shown */
        .right-inline { display: none; }
        .right-desktop { display: flex; }

        .left-top { display: flex; flex-direction: column; gap: 20px; }
        .left-bottom { display: flex; flex-direction: column; gap: 20px; }

        @media (max-width: 700px) {
          .wrapper {
            flex-direction: column;
            gap: 0;
            padding: 36px 22px;
            min-height: auto;
          }
          .left {
            flex: none;
            width: 100%;
            gap: 0;
          }
          .left-top { margin-bottom: 24px; }
          .left-bottom { margin-top: 24px; }

          /* swap which image panel shows */
          .right-inline {
            display: flex;
            width: 100%;
            min-height: 260px;
          }
          .right-desktop { display: none; }

          .stats-row { gap: 8px; }
        }

        @media (max-width: 380px) {
          .headline { font-size: 26px; }
          .btn-donate { padding: 11px 22px; font-size: 13px; }
        }
      `}</style>

      {/* ── LEFT ── */}
      <div className='left'>
        {/* TOP: badge + headline — always visible first */}
        <div className='left-top'>
          <div className='badge fu1'>
            <span className='badge-dot' />
            Charity Initiative
          </div>

          <h2 className='headline fu2'>
            Small Acts of
            <br />
            <em>Kindness</em> Change
            <br />
            the World
          </h2>
        </div>

        {/* IMAGE — on mobile renders here (between headline and rest) */}
        <div className='right right-inline'>
          <div className='glow' />
          <img
            key={current}
            src={images[current]}
            alt=''
            className={`${visible ? 'img-enter floating' : 'img-exit'}`}
            style={{
              width: 'min(320px, 88%)',
              objectFit: 'contain',
              filter: 'drop-shadow(0 26px 42px rgba(180,0,0,0.18))',
              position: 'relative',
              zIndex: 1
            }}
          />
        </div>

        {/* BOTTOM: rest of article */}
        <div className='left-bottom'>
          <div className='redline fu3' />

          <p className='body-txt fu3'>
            Every donation, no matter the size, opens a door for a child in
            need. Together we provide education, meals, and hope to over{' '}
            <strong style={{ color: '#111' }}>10,000 children</strong> across 50
            communities worldwide.
          </p>

          <div className='stats-row fu4'>
            {[
              ['10K+', 'Children'],
              ['$2M+', 'Raised'],
              ['50+', 'Communities']
            ].map(([n, l]) => (
              <div key={l} className='stat-card'>
                <div className='stat-num'>{n}</div>
                <div className='stat-lbl'>{l}</div>
              </div>
            ))}
          </div>

          <blockquote className='bq fu5'>
            "No act of kindness, no matter how small, is ever wasted."
            <cite>— Aesop</cite>
          </blockquote>

          {innput && (
            <input
            className='inputf'
              value={amount}
              onChange={e => {
                setAmount(e.target.value)
              }}
              placeholder='Enter your amount'
              type='number'
            />
          )}

          <div className='btn-row fu5'>
            <button
              onClick={async () => {
                if (!innput) {
                  setinput(true) // Pehle click pe input dikhao
                } else {
                  handlePayment()
                  setinput(false) // Doosre click pe (jab amount bhar diya ho) payment karo
                }
              }}
              className='btn-donate'
              disabled={loading}
            >
              ❤ Donate Now
            </button>
            <button className='btn-ghost'>Learn More →</button>
          </div>
          <div className='btn-row fu7'></div>

          <div className='dots fu6'>
            {images.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === current ? 'active' : ''}`}
                onClick={() => jump(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: desktop only ── */}
      <div className='right right-desktop'>
        <div className='glow' />
        <img
          key={current + '-d'}
          src={images[current]}
          alt=''
          className={`${visible ? 'img-enter floating' : 'img-exit'}`}
          style={{
            width: 'min(320px, 88%)',
            objectFit: 'contain',
            filter: 'drop-shadow(0 26px 42px rgba(180,0,0,0.18))',
            position: 'relative',
            zIndex: 1
          }}
        />
      </div>
    </div>
  )
}
