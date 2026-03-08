import { useState, useEffect, useRef } from "react";

/* ── Scroll-reveal hook ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Animated counter ── */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(t); }
      else setCount(start);
    }, 24);
    return () => clearInterval(t);
  }, [visible, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function HowItWorks() {
  const [ref, visible] = useReveal();
  const steps = [
    { icon: "🤝", num: "01", title: "Choose a Cause", desc: "Browse our verified programs — from clean water to education — and pick the one closest to your heart." },
    { icon: "💳", num: "02", title: "Make a Donation", desc: "Give once or set up a monthly contribution. Every amount, big or small, creates real change." },
    { icon: "📦", num: "03", title: "We Take Action", desc: "100% of your funds reach the ground. Our teams deploy resources directly to communities in need." },
    { icon: "📊", num: "04", title: "See Your Impact", desc: "Receive updates, photos, and reports showing exactly how your generosity transformed lives." },
  ];

  return (
    <section style={s.section}>
      <style>{`
        .hiw-card {
          background: #fff;
          border: 1.5px solid #f5eaea;
          border-radius: 20px;
          padding: 36px 28px;
          position: relative;
          transition: transform 0.3s, box-shadow 0.3s;
          flex: 1; min-width: 200px;
        }
        .hiw-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(200,0,0,0.10);
        }
        .hiw-connector {
          position: absolute; top: 52px; right: -20px;
          width: 40px; height: 2px;
          background: linear-gradient(90deg, #e80000, #ffb0a0);
          z-index: 2;
        }
        .reveal-left  { opacity:0; transform:translateX(-40px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal-right { opacity:0; transform:translateX( 40px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal-up    { opacity:0; transform:translateY( 32px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .revealed     { opacity:1 !important; transform:none !important; }

        @media(max-width:700px){
          .hiw-grid { flex-direction: column !important; }
          .hiw-connector { display: none; }
        }
      `}</style>

      <div ref={ref} style={s.inner}>
        {/* label */}
        <p className={`reveal-up ${visible ? "revealed" : ""}`} style={{ ...s.label, transitionDelay: "0s" }}>How It Works</p>
        <h2 className={`reveal-up ${visible ? "revealed" : ""}`} style={{ ...s.heading, transitionDelay: "0.1s" }}>
          Four Simple Steps to<br /><em style={s.em}>Change a Life</em>
        </h2>
        <div style={s.redline} className={`reveal-up ${visible ? "revealed" : ""}`} />

        {/* cards */}
        <div className="hiw-grid" style={{ display: "flex", gap: 20, marginTop: 52, flexWrap: "wrap" }}>
          {steps.map((st, i) => (
            <div
              key={i}
              className={`hiw-card reveal-up ${visible ? "revealed" : ""}`}
              style={{ transitionDelay: `${0.15 + i * 0.12}s` }}
            >
              {i < steps.length - 1 && <div className="hiw-connector" />}
              <div style={{
                fontSize: 11, fontWeight: 800, letterSpacing: 2,
                color: "#e80000", marginBottom: 14, opacity: 0.5,
                fontFamily: "'Playfair Display', serif"
              }}>{st.num}</div>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{st.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700, color: "#111", marginBottom: 10 }}>{st.title}</h3>
              <p style={{ fontSize: 14, color: "#777", lineHeight: 1.8 }}>{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   2. IMPACT BANNER (bonus strip between sections)
───────────────────────────────────────── */
function ImpactBanner() {
  const [ref, visible] = useReveal();
  const stats = [
    { n: 10000, suf: "+", label: "Children Helped" },
    { n: 2,     suf: "M+", label: "Dollars Raised" },
    { n: 50,    suf: "+", label: "Communities" },
    { n: 20000, suf: "+", label: "Donors Worldwide" },
  ];
  return (
    <div ref={ref} style={{
      background: "linear-gradient(135deg, #e80000 0%, #a80000 100%)",
      padding: "52px clamp(20px,6vw,80px)",
      overflow: "hidden", position: "relative",
    }}>
      <style>{`
        .stat-strip { display:flex; justify-content:center; gap:clamp(24px,6vw,80px); flex-wrap:wrap; }
        .stat-item  { text-align:center; opacity:0; transform:translateY(20px);
                      transition: opacity 0.6s ease, transform 0.6s ease; }
        .stat-item.in { opacity:1; transform:none; }
        @keyframes rotateRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
      {/* decorative ring */}
      <div style={{
        position:"absolute", width:320, height:320, borderRadius:"50%",
        border:"1px solid rgba(255,255,255,0.1)", top:-120, right:-80,
        animation:"rotateRing 18s linear infinite"
      }}/>
      <div style={{
        position:"absolute", width:200, height:200, borderRadius:"50%",
        border:"1px solid rgba(255,255,255,0.08)", bottom:-80, left:60,
      }}/>

      <div className="stat-strip">
        {stats.map((st, i) => (
          <div key={i} className={`stat-item ${visible ? "in" : ""}`} style={{ transitionDelay: `${i * 0.13}s` }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(34px,5vw,54px)", fontWeight: 900, color: "#fff",
              lineHeight: 1,
            }}>
              <Counter target={st.n} suffix={st.suf} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.5, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginTop: 6 }}>
              {st.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   3. GALLERY
───────────────────────────────────────── */
const galleryItems = [
  { emoji: "👧", title: "Education Drive", loc: "Nairobi, Kenya", color: "#fde8e8" },
  { emoji: "💧", title: "Clean Water", loc: "Rural Ethiopia", color: "#e8f0fe" },
  { emoji: "🍽️", title: "Meal Program", loc: "Mumbai, India", color: "#e8faf0" },
  { emoji: "🏥", title: "Medical Aid", loc: "Dhaka, Bangladesh", color: "#fff8e8" },
  { emoji: "📚", title: "Book Libraries", loc: "Kampala, Uganda", color: "#fdeaf8" },
  { emoji: "🏡", title: "Shelter Build", loc: "Haiti", color: "#e8f8fd" },
];

function Gallery() {
  const [ref, visible] = useReveal();
  const [active, setActive] = useState(null);

  return (
    <section style={{ ...s.section, background: "#fafafa" }}>
      <style>{`
        .gallery-card {
          border-radius: 18px; overflow: hidden;
          cursor: pointer; transition: transform 0.3s, box-shadow 0.3s;
          position: relative;
        }
        .gallery-card:hover { transform: scale(1.03); box-shadow: 0 18px 44px rgba(0,0,0,0.12); }
        .gallery-card:hover .gallery-overlay { opacity: 1 !important; }
        .gallery-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(200,0,0,0.82) 0%, transparent 55%);
          opacity: 0; transition: opacity 0.3s; display: flex;
          align-items: flex-end; padding: 18px;
        }
        .g-reveal { opacity:0; transform:translateY(24px);
                    transition: opacity 0.6s ease, transform 0.6s ease; }
        .g-reveal.in { opacity:1; transform:none; }

        @media(max-width:700px){ .gallery-grid { grid-template-columns: 1fr 1fr !important; } }
        @media(max-width:420px){ .gallery-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div ref={ref} style={s.inner}>
        <p className={`g-reveal ${visible ? "in" : ""}`} style={{ ...s.label, transitionDelay: "0s" }}>Our Work</p>
        <h2 className={`g-reveal ${visible ? "in" : ""}`} style={{ ...s.heading, transitionDelay: "0.1s" }}>
          Stories From the <em style={s.em}>Field</em>
        </h2>
        <div style={s.redline} className={`g-reveal ${visible ? "in" : ""}`} />
        <p className={`g-reveal ${visible ? "in" : ""}`} style={{ ...s.sub, transitionDelay: "0.2s" }}>
          A glimpse into the communities your generosity is transforming every single day.
        </p>

        <div
          className="gallery-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16, marginTop: 44,
          }}
        >
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`gallery-card g-reveal ${visible ? "in" : ""}`}
              style={{ transitionDelay: `${0.15 + i * 0.1}s`, background: item.color }}
              onClick={() => setActive(active === i ? null : i)}
            >
              <div style={{
                height: i === 0 || i === 3 ? 220 : 170,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 64,
              }}>
                {item.emoji}
              </div>
              <div className="gallery-overlay">
                <div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: "#fff" }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 3 }}>📍 {item.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`g-reveal ${visible ? "in" : ""}`} style={{ textAlign: "center", marginTop: 36, transitionDelay: "0.7s" }}>
          <button style={s.btnOutline}>View All Stories →</button>
        </div>
      </div>
    </section>
  );
}

export default function Sections() {
  return (
    <div style={{ fontFamily:"'Inter',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { background:#fff; }
        @keyframes pulse {
          0%,100% { box-shadow:0 0 0 0 rgba(220,20,20,0.45); }
          55%      { box-shadow:0 0 0 8px rgba(220,20,20,0);  }
        }
      `}</style>
      <HowItWorks />
      <ImpactBanner />
      <Gallery />
      
    </div>
  );
}

/* ── Shared styles ── */
const s = {
  section: {
    padding: "80px clamp(20px,6vw,80px)",
    background: "#fff",
  },
  inner: {
    maxWidth: 1100,
    margin: "0 auto",
  },
  label: {
    fontSize: 12, fontWeight: 700, letterSpacing: 2,
    textTransform: "uppercase", color: "#e80000",
    marginBottom: 14, display: "block",
    fontFamily: "'Inter', sans-serif",
  },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(28px,4vw,44px)",
    fontWeight: 900, color: "#0d0d0d",
    lineHeight: 1.22, marginBottom: 16,
  },
  em: {
    fontStyle: "italic",
    background: "linear-gradient(90deg,#e80000,#ff5520,#e80000)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  redline: {
    height: 3, width: 52, borderRadius: 3,
    background: "linear-gradient(90deg,#e80000,#ff6030)",
    marginBottom: 20,
  },
  sub: {
    fontSize: 15, color: "#666", lineHeight: 1.85,
    maxWidth: 540, marginBottom: 0,
  },
  btnFill: {
    background: "linear-gradient(135deg,#e80000,#a80000)",
    color: "#fff", border: "none", borderRadius: 8,
    padding: "13px 28px", fontSize: 14, fontWeight: 700,
    fontFamily: "'Inter',sans-serif", cursor: "pointer",
    boxShadow: "0 6px 22px rgba(180,0,0,0.38)",
    transition: "transform 0.2s,box-shadow 0.2s",
    width: "100%",
  },
  btnOutline: {
    background: "none",
    border: "2px solid #e80000",
    color: "#e80000", borderRadius: 8,
    padding: "12px 28px", fontSize: 14, fontWeight: 700,
    fontFamily: "'Inter',sans-serif", cursor: "pointer",
    transition: "background 0.2s,color 0.2s",
  },
};