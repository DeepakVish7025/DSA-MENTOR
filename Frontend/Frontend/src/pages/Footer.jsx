import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';

const useInView = (threshold = 0.1) => {
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

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/DeepakVish7025', icon: <GithubIcon /> },
  { label: 'Twitter', href: '#', icon: <TwitterIcon /> },
  { label: 'LinkedIn', href: '#', icon: <LinkedInIcon /> },
];

const quickLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy Policy', to: '/privacy' },
];

const SocialPill = ({ link }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 16px',
        borderRadius: 999,
        border: `1px solid ${hovered ? 'rgba(255,107,53,0.5)' : 'rgba(255,255,255,0.08)'}`,
        background: hovered ? 'rgba(255,107,53,0.1)' : 'rgba(255,255,255,0.03)',
        color: hovered ? '#ff6b35' : '#94a3b8',
        fontSize: 13,
        fontWeight: 500,
        textDecoration: 'none',
        transition: 'all 0.25s cubic-bezier(.22,1,.36,1)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 6px 20px rgba(255,107,53,0.18)' : 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {link.icon}
      {link.label}
    </a>
  );
};

const NavLink = ({ item, delay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <li style={{ listStyle: 'none' }}>
      <Link
        to={item.to}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          color: hovered ? '#f1f5f9' : '#64748b',
          fontSize: 13.5,
          textDecoration: 'none',
          transition: 'all 0.22s ease',
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
        }}
      >
        <span style={{
          display: 'inline-block',
          width: 16,
          height: 1,
          background: hovered ? '#ff6b35' : 'rgba(255,255,255,0.15)',
          transition: 'all 0.22s ease',
          transform: hovered ? 'scaleX(1.4)' : 'scaleX(1)',
          transformOrigin: 'left',
          flexShrink: 0,
        }} />
        {item.label}
      </Link>
    </li>
  );
};

const Footer = () => {
  const [footerRef, inView] = useInView(0.05);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes ft-f1 { 0%,100%{transform:translate(0,0)} 45%{transform:translate(10px,-14px)} 70%{transform:translate(-8px,8px)} }
        @keyframes ft-f2 { 0%,100%{transform:translate(0,0)} 40%{transform:translate(-12px,10px)} 70%{transform:translate(10px,-10px)} }
        @keyframes ft-shimmer { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes ft-scan { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }
        @keyframes ft-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes ft-fadeslide { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        .ft-o1 { animation: ft-f1 12s ease-in-out infinite; }
        .ft-o2 { animation: ft-f2 16s ease-in-out infinite; }
        .ft-dot { animation: ft-pulse 2.2s ease-in-out infinite; }
        .ft-scan-line { animation: ft-scan 3s ease-in-out infinite; }

        .ft-logo-text {
          background: linear-gradient(90deg,#f1f5f9 0%,#ff6b35 35%,#e8a87c 55%,#ff6b35 75%,#f1f5f9 100%);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: ft-shimmer 4s linear infinite;
        }

        .ft-grid {
          background-image:
            linear-gradient(rgba(255,107,53,0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,53,0.028) 1px, transparent 1px);
          background-size: 52px 52px;
        }

        .ft-col-1 { animation: ft-fadeslide 0.7s cubic-bezier(.22,1,.36,1) 0.05s both; }
        .ft-col-2 { animation: ft-fadeslide 0.7s cubic-bezier(.22,1,.36,1) 0.15s both; }
        .ft-col-3 { animation: ft-fadeslide 0.7s cubic-bezier(.22,1,.36,1) 0.25s both; }
        .ft-bottom { animation: ft-fadeslide 0.7s cubic-bezier(.22,1,.36,1) 0.35s both; }

        .ft-hide .ft-col-1,
        .ft-hide .ft-col-2,
        .ft-hide .ft-col-3,
        .ft-hide .ft-bottom { animation: none; opacity: 0; }
      `}</style>

      <footer
        ref={footerRef}
        className={inView ? '' : 'ft-hide'}
        style={{
          fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
          background: '#080c14',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid rgba(255,107,53,0.12)',
        }}
      >
        {/* Background layer */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div className="ft-grid" style={{ position: 'absolute', inset: 0 }} />
          <div className="ft-o1" style={{
            position: 'absolute', top: '-20%', left: '-5%',
            width: 400, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 68%)',
          }} />
          <div className="ft-o2" style={{
            position: 'absolute', bottom: '-30%', right: '-5%',
            width: 350, height: 350, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,168,124,0.06) 0%, transparent 68%)',
          }} />

          {/* Scan line effect */}
          <div className="ft-scan-line" style={{
            position: 'absolute', left: 0, right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.15), transparent)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Main content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1060, margin: '0 auto', padding: '0 20px' }}>

          {/* Top divider glow */}
          <div style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.3), rgba(232,168,124,0.25), transparent)',
            marginBottom: 52,
          }} />

          {/* 3-column grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px 48px',
            marginBottom: 52,
            alignItems: 'start',
          }}>

            {/* ── Col 1: Brand ── */}
            <div className="ft-col-1">
              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: 'rgba(255,107,53,0.12)',
                  border: '1px solid rgba(255,107,53,0.28)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: '#ff6b35', fontSize: 13, fontWeight: 800, fontFamily: 'Georgia, serif' }}>CM</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                  <span style={{ color: '#ff6b35', fontSize: 15, fontWeight: 700 }}>{'<'}</span>
                  <span className="ft-logo-text" style={{ fontSize: 15, fontWeight: 700 }}>DSA-MENTOR</span>
                  <span style={{ color: '#ff6b35', fontSize: 15, fontWeight: 700 }}>{'>'}</span>
                </div>
              </div>

              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.75, maxWidth: 220, margin: 0 }}>
                Sharpen your coding skills and forge your future with our comprehensive problem-solving platform.
              </p>

              {/* Live badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                marginTop: 18,
                background: 'rgba(255,107,53,0.08)',
                border: '1px solid rgba(255,107,53,0.18)',
                borderRadius: 999, padding: '4px 12px',
              }}>
                <span className="ft-dot" style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#ff6b35', boxShadow: '0 0 5px #ff6b35',
                  display: 'inline-block', flexShrink: 0,
                }} />
                <span style={{ color: '#ff6b35', fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  Platform Live
                </span>
              </div>
            </div>

            {/* ── Col 2: Quick Links ── */}
            <div className="ft-col-2">
              <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 18, height: 1, background: '#ff6b35' }} />
                <span style={{
                  fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#ff6b35',
                }}>Quick Links</span>
              </div>
              <ul style={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {quickLinks.map((item, i) => (
                  <NavLink key={item.to} item={item} delay={i * 60} />
                ))}
              </ul>
            </div>

            {/* ── Col 3: Connect ── */}
            <div className="ft-col-3">
              <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 18, height: 1, background: '#e8a87c' }} />
                <span style={{
                  fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#e8a87c',
                }}>Connect With Us</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
                {socialLinks.map((link) => (
                  <SocialPill key={link.label} link={link} />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="ft-bottom"
            style={{
              borderTop: '1px solid rgba(255,255,255,0.06)',
              paddingTop: 24, paddingBottom: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <span style={{ fontSize: 12, color: '#334155' }}>
              © 2026 <span style={{ color: '#475569' }}>DSA-MENTOR</span> · All rights reserved
            </span>

            {/* Decorative tag */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 6, padding: '4px 10px',
            }}>
              <span style={{ color: '#ff6b35', fontSize: 11, fontFamily: 'monospace' }}>{'</'}</span>
              <span style={{ color: '#475569', fontSize: 11, fontFamily: 'monospace' }}>built with passion</span>
              <span style={{ color: '#ff6b35', fontSize: 11, fontFamily: 'monospace' }}>{'>'}</span>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;