import { useState, useEffect, useRef } from "react";

const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const policies = [
  {
    id: "01",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Data Collection",
    subtitle: "Only what matters",
    body: "We collect minimal personal data required to create your account — your name, email, and coding activity. Nothing more, nothing less.",
    accent: "#ff6b35",
  },
  {
    id: "02",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round"/>
      </svg>
    ),
    title: "Cookies & Tracking",
    subtitle: "Preferences, not surveillance",
    body: "We use cookies only to remember your preferences and improve performance. Manage or revoke permissions in your browser anytime.",
    accent: "#e8a87c",
  },
  {
    id: "03",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Security Measures",
    subtitle: "Fort Knox for your data",
    body: "Your data is protected with 256-bit encryption, secure JWT & OAuth authentication, and regular penetration audits to stay ahead of threats.",
    accent: "#ff6b35",
  },
  {
    id: "04",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Your Rights",
    subtitle: "You're always in control",
    body: "Request access, correction, or permanent deletion of your data anytime. We comply fully with GDPR, CCPA, and all applicable privacy laws.",
    accent: "#e8a87c",
  },
];

const PolicyCard = ({ item, index }) => {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s cubic-bezier(.22,1,.36,1) ${index * 100}ms`,
      }}
    >
      <div style={{
        borderRadius: 14,
        border: `1px solid ${hovered ? item.accent + "50" : "rgba(255,255,255,0.07)"}`,
        background: hovered ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.025)",
        backdropFilter: "blur(10px)",
        padding: "24px 24px 28px",
        position: "relative",
        overflow: "hidden",
        boxShadow: hovered
          ? `0 16px 40px rgba(0,0,0,0.3), 0 0 0 1px ${item.accent}20`
          : "0 2px 16px rgba(0,0,0,0.18)",
        transition: "all 0.32s cubic-bezier(.22,1,.36,1)",
        boxSizing: "border-box",
        minHeight: 200,
      }}>
        {/* Ghost number */}
        <div style={{
          position: "absolute", top: 6, right: 16,
          fontFamily: "Georgia, serif",
          fontSize: 64, fontWeight: 900, lineHeight: 1,
          color: item.accent,
          opacity: hovered ? 0.16 : 0.06,
          transition: "opacity 0.32s",
          userSelect: "none", pointerEvents: "none",
        }}>
          {item.id}
        </div>

        {/* Icon */}
        <div style={{
          width: 48, height: 48, borderRadius: 11,
          background: `${item.accent}14`,
          border: `1px solid ${item.accent}28`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: item.accent, marginBottom: 18, flexShrink: 0,
          transform: hovered ? "scale(1.08) rotate(-3deg)" : "scale(1) rotate(0deg)",
          transition: "transform 0.32s cubic-bezier(.22,1,.36,1)",
        }}>
          {item.icon}
        </div>

        {/* Subtitle label */}
        <div style={{
          fontSize: 10, fontWeight: 700,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: item.accent, marginBottom: 5,
        }}>
          {item.subtitle}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "Georgia, serif",
          fontSize: 18, fontWeight: 700,
          color: "#f1f5f9", marginBottom: 10,
          lineHeight: 1.3,
        }}>
          {item.title}
        </h3>

        {/* Body */}
        <p style={{
          fontSize: 13.5, lineHeight: 1.75,
          color: "#94a3b8", margin: 0,
        }}>
          {item.body}
        </p>

        {/* Bottom shimmer line */}
        <div style={{
          position: "absolute", bottom: 0, left: "12%", width: "76%", height: 1,
          background: `linear-gradient(90deg, transparent, ${item.accent}65, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.32s",
        }} />
      </div>
    </div>
  );
};

export default function PrivacyPolicyPage() {
  const [heroRef, heroInView] = useInView(0.05);
  const [footerRef, footerInView] = useInView(0.1);

  return (
    <div style={{
      fontFamily: "'Segoe UI', 'DM Sans', sans-serif",
      background: "#080c14",
      width: "100%",
      position: "relative",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes pp-f1 { 0%,100%{transform:translate(0,0)} 40%{transform:translate(12px,-18px)} 70%{transform:translate(-8px,10px)} }
        @keyframes pp-f2 { 0%,100%{transform:translate(0,0)} 35%{transform:translate(-14px,10px)} 65%{transform:translate(10px,-12px)} }
        @keyframes pp-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pp-shimmer { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes pp-fadein { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pp-blink { 0%,100%{opacity:1} 50%{opacity:0.35} }

        .pp-o1 { animation: pp-f1 10s ease-in-out infinite; }
        .pp-o2 { animation: pp-f2 14s ease-in-out infinite; }
        .pp-o3 { animation: pp-f1 18s ease-in-out infinite reverse; }
        .pp-spin { animation: pp-spin 22s linear infinite; }
        .pp-dot  { animation: pp-blink 2s ease-in-out infinite; }
        .pp-badge { animation: pp-fadein 0.7s cubic-bezier(.22,1,.36,1) 0.1s both; }

        .pp-shimmer {
          background: linear-gradient(90deg,#f1f5f9 0%,#ff6b35 28%,#e8a87c 52%,#ff6b35 76%,#f1f5f9 100%);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: pp-shimmer 4s linear infinite;
        }

        .pp-grid {
          background-image:
            linear-gradient(rgba(255,107,53,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,53,0.03) 1px, transparent 1px);
          background-size: 54px 54px;
        }

        .pp-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        @media (max-width: 640px) {
          .pp-cards { grid-template-columns: 1fr !important; }
          .pp-stats { gap: 1.5rem !important; }
          .pp-h1 { font-size: 2.4rem !important; }
        }
      `}</style>

      {/* Background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div className="pp-grid" style={{ position: "absolute", inset: 0 }} />
        <div className="pp-o1" style={{
          position: "absolute", top: "6%", left: "1%",
          width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,107,53,0.10) 0%, transparent 68%)",
        }} />
        <div className="pp-o2" style={{
          position: "absolute", top: "38%", right: "2%",
          width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,168,124,0.07) 0%, transparent 68%)",
        }} />
        <div className="pp-o3" style={{
          position: "absolute", bottom: "6%", left: "30%",
          width: 360, height: 360, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,107,53,0.055) 0%, transparent 68%)",
        }} />
      </div>

      {/* Page content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1040, margin: "0 auto", padding: "0 20px" }}>

        {/* ── HERO ── */}
        <header ref={heroRef} style={{ paddingTop: 72, paddingBottom: 52, textAlign: "center" }}>

          {/* Spinning ring */}
          <div style={{ position: "relative", display: "inline-block", marginBottom: 24 }}>
            <svg className="pp-spin" width="68" height="68" viewBox="0 0 68 68" style={{ opacity: 0.42, display: "block" }}>
              <defs>
                <linearGradient id="pp-lg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b35"/>
                  <stop offset="100%" stopColor="#e8a87c"/>
                </linearGradient>
              </defs>
              <circle cx="34" cy="34" r="30" fill="none" stroke="url(#pp-lg)" strokeWidth="1.2" strokeDasharray="6 5"/>
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" width="24" height="24">
                <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Badge */}
          <div className="pp-badge" style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "rgba(255,107,53,0.09)",
            border: "1px solid rgba(255,107,53,0.2)",
            borderRadius: 999, padding: "5px 14px", marginBottom: 20,
          }}>
            <span className="pp-dot" style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#ff6b35", boxShadow: "0 0 6px #ff6b35",
              display: "inline-block", flexShrink: 0,
            }} />
            <span style={{ color: "#ff6b35", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Last Updated · April 2026
            </span>
          </div>

          {/* H1 */}
          <h1 className="pp-h1" style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2.4rem, 6vw, 4.6rem)",
            fontWeight: 900, lineHeight: 1.08,
            marginBottom: 18,
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease 0.05s, transform 0.8s cubic-bezier(.22,1,.36,1) 0.05s",
          }}>
            <span style={{ color: "#f1f5f9" }}>Privacy &amp;</span>
            <br/>
            <span className="pp-shimmer">Policy</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 15, color: "#64748b", lineHeight: 1.75,
            maxWidth: 480, margin: "0 auto",
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s ease 0.18s, transform 0.8s cubic-bezier(.22,1,.36,1) 0.18s",
          }}>
            Your privacy matters. We're committed to protecting your data and
            being fully transparent about how we use it.
          </p>

          {/* Stats */}
          <div className="pp-stats" style={{
            display: "flex", justifyContent: "center",
            gap: "2.5rem", marginTop: 36, flexWrap: "wrap",
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.8s ease 0.33s, transform 0.8s cubic-bezier(.22,1,.36,1) 0.33s",
          }}>
            {[
              { value: "256-bit", label: "Encryption" },
              { value: "Zero", label: "Data Sold" },
              { value: "GDPR", label: "Compliant" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 900, color: "#ff6b35", lineHeight: 1.1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 10.5, color: "#475569", textTransform: "uppercase", letterSpacing: "0.13em", marginTop: 3 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Divider */}
        <div style={{
          height: 1,
          background: "linear-gradient(90deg,transparent,rgba(255,107,53,0.32),rgba(232,168,124,0.32),transparent)",
          marginBottom: 48,
        }} />

        {/* ── CARDS ── */}
        <section className="pp-cards" style={{ marginBottom: 60 }}>
          {policies.map((item, i) => (
            <PolicyCard key={item.id} item={item} index={i} />
          ))}
        </section>

        {/* Divider */}
        <div style={{
          height: 1,
          background: "linear-gradient(90deg,transparent,rgba(255,107,53,0.22),transparent)",
          marginBottom: 44,
        }} />

        {/* ── FOOTER ── */}
        <footer ref={footerRef} style={{
          textAlign: "center", paddingBottom: 64,
          opacity: footerInView ? 1 : 0,
          transform: footerInView ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(.22,1,.36,1)",
        }}>
          <p style={{ fontSize: 13.5, color: "#475569", marginBottom: 14 }}>
            Questions or concerns about your data?
          </p>
          <a
            href="mailto:dv2592889@gmail.com"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg,#ff6b35 0%,#e8895a 100%)",
              color: "#fff", fontWeight: 600, fontSize: 13.5,
              padding: "10px 22px", borderRadius: 999,
              textDecoration: "none", letterSpacing: "0.02em",
              boxShadow: "0 4px 18px rgba(255,107,53,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(255,107,53,0.44)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 18px rgba(255,107,53,0.3)";
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            dv2592889@gmail.com
          </a>
          <p style={{ fontSize: 11.5, color: "#334155", marginTop: 18 }}>
            © 2026 · All rights reserved
          </p>
        </footer>

      </div>
    </div>
  );
}