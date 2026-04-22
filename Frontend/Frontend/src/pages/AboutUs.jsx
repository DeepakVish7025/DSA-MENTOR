import { useEffect, useRef, useState } from "react";
import { FileCode, Trophy, Users, ShieldCheck, Rocket, Github, Linkedin, ArrowRight, Sparkles, Zap } from "lucide-react";

/* ══════════════════════════════════════════════════════
   SCOPED STYLES — zero global bleed
══════════════════════════════════════════════════════ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

.ab2-wrap {
  --c-bg:      #0a0e17;
  --c-bg2:     #0f1420;
  --c-ink:     #e8eaf0;
  --c-muted:   #6b7a99;
  --c-accent:  #f97316;
  --c-gold:    #f0b429;
  --c-glass:   rgba(255,255,255,0.04);
  --c-stroke:  rgba(255,255,255,0.08);
  --ff-disp:   'Playfair Display', Georgia, serif;
  --ff-body:   'DM Sans', sans-serif;
  --ease-out:  cubic-bezier(0.16,1,0.3,1);

  background: var(--c-bg);
  color: var(--c-ink);
  font-family: var(--ff-body);
  overflow-x: hidden;
  position: relative;
  min-height: 100vh;
}

.ab2-wrap *, .ab2-wrap *::before, .ab2-wrap *::after {
  box-sizing: border-box;
}

/* ── decorative blobs ── */
.ab2-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;
}
.ab2-blob-1 {
  width: 500px; height: 500px;
  background: rgba(249,115,22,.18);
  top: -100px; right: -150px;
  animation: ab2float 10s ease-in-out infinite;
}
.ab2-blob-2 {
  width: 350px; height: 350px;
  background: rgba(240,180,41,.12);
  bottom: 200px; left: -100px;
  animation: ab2float 13s 3s ease-in-out infinite;
}
.ab2-blob-3 {
  width: 260px; height: 260px;
  background: rgba(249,115,22,.1);
  top: 60%; right: 5%;
  animation: ab2float 8s 1s ease-in-out infinite;
}
@keyframes ab2float {
  0%,100% { transform: translateY(0) scale(1); }
  50%      { transform: translateY(-40px) scale(1.05); }
}

.ab2-inner {
  position: relative;
  z-index: 1;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px 100px;
}

/* ══ SCROLL REVEAL ══ */
.ab2-reveal {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity .8s var(--ease-out), transform .8s var(--ease-out);
}
.ab2-reveal.ab2-in { opacity: 1; transform: translateY(0); }
.ab2-reveal.ab2-d1 { transition-delay: .1s; }
.ab2-reveal.ab2-d2 { transition-delay: .2s; }

/* ══ HERO ══ */
.ab2-hero {
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 0 60px;
}
.ab2-hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: .75rem;
  font-weight: 600;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--c-accent);
  margin-bottom: 24px;
  animation: ab2slideUp .6s var(--ease-out) both;
}
.ab2-hero-eyebrow-line {
  width: 36px; height: 2px;
  background: var(--c-accent);
  animation: ab2lineGrow .8s .2s var(--ease-out) both;
  transform-origin: left;
  transform: scaleX(0);
}
@keyframes ab2lineGrow { to { transform: scaleX(1); } }

.ab2-hero-title {
  font-family: var(--ff-disp);
  font-size: clamp(3.2rem, 9vw, 7.5rem);
  font-weight: 900;
  line-height: .96;
  letter-spacing: -.03em;
  margin-bottom: 32px;
  animation: ab2slideUp .7s .1s var(--ease-out) both;
}
.ab2-hero-title em {
  font-style: italic;
  color: var(--c-accent);
  position: relative;
}
.ab2-hero-title em::after {
  content: '';
  position: absolute;
  left: 0; bottom: 4px;
  width: 100%; height: 4px;
  background: linear-gradient(90deg, var(--c-accent), var(--c-gold));
  border-radius: 2px;
  animation: ab2lineGrow .9s .9s var(--ease-out) both;
  transform-origin: left;
  transform: scaleX(0);
}

.ab2-hero-row {
  display: flex;
  align-items: flex-end;
  gap: 40px;
  flex-wrap: wrap;
  animation: ab2slideUp .7s .25s var(--ease-out) both;
}
.ab2-hero-sub {
  flex: 1;
  min-width: 260px;
  font-size: clamp(.95rem, 2vw, 1.1rem);
  color: var(--c-muted);
  line-height: 1.75;
  max-width: 480px;
}
.ab2-hero-cta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.ab2-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 26px;
  border-radius: 6px;
  font-family: var(--ff-body);
  font-size: .85rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: transform .2s, box-shadow .25s;
}
.ab2-btn-solid {
  background: var(--c-accent);
  color: #fff;
  box-shadow: 0 4px 20px rgba(249,115,22,.25);
}
.ab2-btn-solid:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 32px rgba(249,115,22,.35);
}
.ab2-btn-outline {
  background: transparent;
  color: var(--c-ink);
  border: 1.5px solid var(--c-stroke) !important;
}
.ab2-btn-outline:hover {
  border-color: var(--c-accent) !important;
  color: var(--c-accent);
  transform: translateY(-3px);
}

/* ── marquee strip ── */
.ab2-strip {
  width: 100%;
  overflow: hidden;
  border-top: 1px solid var(--c-stroke);
  border-bottom: 1px solid var(--c-stroke);
  padding: 14px 0;
  margin: 50px 0 0;
  background: var(--c-bg2);
  animation: ab2slideUp .7s .4s var(--ease-out) both;
}
.ab2-marquee {
  display: flex;
  animation: ab2marquee 22s linear infinite;
  white-space: nowrap;
  width: max-content;
}
.ab2-marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 0 32px;
  font-size: .8rem;
  font-weight: 600;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--c-muted);
}
.ab2-marquee-dot { color: var(--c-accent); }
@keyframes ab2marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes ab2slideUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ══ STATS ══ */
.ab2-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background: var(--c-stroke);
  border: 1px solid var(--c-stroke);
  border-radius: 16px;
  overflow: hidden;
  margin: 80px 0;
}
.ab2-stat {
  background: var(--c-glass);
  backdrop-filter: blur(12px);
  padding: 36px 28px;
  transition: background .2s;
}
.ab2-stat:hover { background: rgba(249,115,22,.08); }
.ab2-stat-num {
  font-family: var(--ff-disp);
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 900;
  color: var(--c-accent);
  line-height: 1;
}
.ab2-stat-label {
  font-size: .82rem;
  color: var(--c-muted);
  margin-top: 6px;
  font-weight: 500;
}

/* ══ SECTION HEADER ══ */
.ab2-sh { margin-bottom: 48px; }
.ab2-sh-tag {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: .7rem; font-weight: 700;
  letter-spacing: .2em; text-transform: uppercase;
  color: var(--c-gold); margin-bottom: 12px;
}
.ab2-sh-tag::before {
  content: ''; width: 20px; height: 1.5px; background: var(--c-gold);
}
.ab2-sh-title {
  font-family: var(--ff-disp);
  font-size: clamp(2rem, 4.5vw, 3rem);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: -.02em;
}
.ab2-sh-title em { font-style: italic; color: var(--c-accent); }

/* ══ MISSION / VALUES ══ */
.ab2-mv-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 90px;
}
@media (max-width: 640px) { .ab2-mv-grid { grid-template-columns: 1fr; } }

.ab2-mv-card {
  background: var(--c-glass);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 20px;
  padding: 36px 32px;
  box-shadow: 0 4px 30px rgba(26,18,8,.06);
  transition: transform .3s var(--ease-out), box-shadow .3s;
  position: relative;
  overflow: hidden;
}
.ab2-mv-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--c-accent), var(--c-gold));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .4s var(--ease-out);
}
.ab2-mv-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(26,18,8,.1); }
.ab2-mv-card:hover::before { transform: scaleX(1); }
.ab2-mv-icon {
  width: 48px; height: 48px;
  border-radius: 12px;
  background: rgba(249,115,22,.1);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px;
}
.ab2-mv-card h3 {
  font-family: var(--ff-disp);
  font-size: 1.3rem; font-weight: 700;
  margin-bottom: 14px;
}
.ab2-mv-card p, .ab2-mv-card li {
  font-size: .9rem; color: var(--c-muted); line-height: 1.75;
}
.ab2-mv-card ul { list-style: none; }
.ab2-mv-card li { padding: 5px 0 5px 20px; position: relative; }
.ab2-mv-card li::before {
  content: '—'; position: absolute; left: 0;
  color: var(--c-accent); font-weight: 700;
}

/* ══ FEATURES ══ */
.ab2-feat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-bottom: 90px;
}
@media (max-width: 760px) { .ab2-feat-grid { grid-template-columns: 1fr; } }

.ab2-feat-card {
  background: var(--c-glass);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 20px;
  padding: 32px 26px;
  box-shadow: 0 4px 24px rgba(26,18,8,.05);
  transition: transform .3s var(--ease-out), box-shadow .3s;
}
.ab2-feat-card:hover { transform: translateY(-8px); box-shadow: 0 24px 56px rgba(26,18,8,.12); }
.ab2-feat-num {
  font-family: var(--ff-disp);
  font-size: 3.5rem; font-weight: 900;
  color: rgba(249,115,22,.1);
  line-height: 1;
  margin-bottom: 12px;
  transition: color .3s;
}
.ab2-feat-card:hover .ab2-feat-num { color: rgba(249,115,22,.2); }
.ab2-feat-icon {
  width: 44px; height: 44px;
  border-radius: 10px;
  background: rgba(249,115,22,.1);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 16px;
}
.ab2-feat-card h3 {
  font-family: var(--ff-disp);
  font-size: 1.15rem; font-weight: 700;
  margin-bottom: 10px;
}
.ab2-feat-card p { font-size: .88rem; color: var(--c-muted); line-height: 1.7; }

/* ══ TECH ══ */
.ab2-tech { margin-bottom: 90px; }
.ab2-tech-grid { display: flex; flex-wrap: wrap; gap: 12px; }
.ab2-tech-pill {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 20px;
  background: var(--c-glass);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 999px;
  font-size: .82rem; font-weight: 600;
  color: var(--c-ink);
  box-shadow: 0 2px 12px rgba(26,18,8,.06);
  transition: transform .2s, box-shadow .2s, background .2s;
  cursor: default;
}
.ab2-tech-pill:hover {
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 8px 28px rgba(249,115,22,.15);
  background: rgba(255,255,255,.07);
}
.ab2-tech-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--c-accent); }

/* ══ TEAM ══ */
.ab2-team { margin-bottom: 40px; }
.ab2-team-card {
  background: var(--c-glass);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 24px;
  padding: 48px 40px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 36px;
  align-items: start;
  max-width: 680px;
  box-shadow: 0 8px 40px rgba(26,18,8,.07);
  transition: transform .3s var(--ease-out), box-shadow .3s;
}
@media (max-width: 560px) {
  .ab2-team-card {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
    padding: 36px 28px;
  }
}
.ab2-team-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(26,18,8,.12); }
.ab2-team-avatar-wrap { position: relative; }
.ab2-team-avatar {
  width: 96px; height: 96px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--c-accent), var(--c-gold));
  display: flex; align-items: center; justify-content: center;
  font-size: 2.4rem;
  box-shadow: 0 0 0 4px white, 0 0 0 6px var(--c-accent);
}
.ab2-team-badge {
  position: absolute; bottom: -4px; right: -4px;
  width: 28px; height: 28px;
  background: var(--c-accent);
  border-radius: 50%; border: 2px solid white;
  display: flex; align-items: center; justify-content: center;
  color: white;
}
.ab2-team-name {
  font-family: var(--ff-disp);
  font-size: 1.4rem; font-weight: 700; margin-bottom: 4px;
}
.ab2-team-role {
  font-size: .78rem; font-weight: 700;
  letter-spacing: .12em; text-transform: uppercase;
  color: var(--c-accent); margin-bottom: 14px;
}
.ab2-team-bio { font-size: .9rem; color: var(--c-muted); line-height: 1.75; margin-bottom: 20px; }
.ab2-team-links { display: flex; gap: 10px; }
@media (max-width: 560px) { .ab2-team-links { justify-content: center; } }
.ab2-team-link {
  width: 38px; height: 38px; border-radius: 10px;
  border: 1.5px solid var(--c-stroke);
  display: flex; align-items: center; justify-content: center;
  color: var(--c-muted); text-decoration: none;
  transition: border-color .2s, color .2s, transform .2s;
}
.ab2-team-link:hover { border-color: var(--c-accent); color: var(--c-accent); transform: scale(1.12); }

/* ══ BOTTOM BANNER ══ */
.ab2-banner {
  background: linear-gradient(135deg, rgba(249,115,22,.15) 0%, rgba(240,180,41,.08) 100%);
  border: 1px solid rgba(249,115,22,.3);
  border-radius: 24px;
  padding: 56px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  overflow: hidden;
  position: relative;
  margin-top: 60px;
}
.ab2-banner::before {
  content: 'CF';
  position: absolute; right: -20px; top: -30px;
  font-family: var(--ff-disp);
  font-size: 14rem; font-weight: 900;
  color: rgba(249,115,22,.06);
  line-height: 1; pointer-events: none;
}
.ab2-banner h2 {
  font-family: var(--ff-disp);
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  font-weight: 900; color: var(--c-ink); line-height: 1.1;
}
.ab2-banner p { font-size: .92rem; color: var(--c-muted); margin-top: 8px; }
.ab2-banner-btn {
  display: inline-flex; align-items: center; gap: 10px;
  background: var(--c-accent); color: #fff;
  padding: 14px 28px; border-radius: 8px;
  font-weight: 700; font-size: .88rem;
  cursor: pointer; border: none; white-space: nowrap;
  transition: transform .2s, box-shadow .25s;
  box-shadow: 0 4px 24px rgba(249,115,22,.35);
}
.ab2-banner-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 36px rgba(249,115,22,.5); }

/* ══ MOBILE ══ */
@media (max-width: 480px) {
  .ab2-stats { grid-template-columns: 1fr; }
  .ab2-banner { padding: 36px 28px; }
  .ab2-inner { padding: 0 16px 80px; }
  .ab2-hero-cta { width: 100%; }
  .ab2-btn { width: 100%; justify-content: center; }
}
`;

/* ── Counter hook ── */
function useCounter(target) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let n = 0;
      const step = Math.ceil(target / 55);
      const t = setInterval(() => {
        n += step;
        if (n >= target) { setVal(target); clearInterval(t); }
        else setVal(n);
      }, 22);
    }, { threshold: .5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target]);
  return [val, ref];
}

function Stat({ num, suffix, label }) {
  const [val, ref] = useCounter(num);
  return (
    <div className="ab2-stat" ref={ref}>
      <div className="ab2-stat-num">{val.toLocaleString()}{suffix}</div>
      <div className="ab2-stat-label">{label}</div>
    </div>
  );
}

/* ── Scroll reveal hook ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".ab2-reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("ab2-in"); io.unobserve(e.target); }
      }),
      { threshold: .08 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ════════════════════════════════════════════════════ */
const AboutUs = () => {
  useReveal();

  const marqueeItems = [
    "DSA Practice", "✦", "Leaderboard", "✦", "Community", "✦",
    "Code Editor", "✦", "Hints & Solutions", "✦", "Weekly Contests", "✦",
    "DSA Practice", "✦", "Leaderboard", "✦", "Community", "✦",
    "Code Editor", "✦", "Hints & Solutions", "✦", "Weekly Contests", "✦",
  ];

  const features = [
    { num: "01", icon: <FileCode size={21} color="#f97316" />, title: "Practice DSA", desc: "Solve curated problems across all difficulty levels with multi-language editor support and AI-powered hints." },
    { num: "02", icon: <Trophy size={21} color="#f97316" />, title: "Leaderboard", desc: "Compete in weekly contests, earn XP, unlock badges, and track your climb on the global ranking board." },
    { num: "03", icon: <Users size={21} color="#f97316" />, title: "Community", desc: "Discuss approaches, share resources, and grow alongside a thriving network of passionate developers." },
  ];

  const techs = ["React", "TailwindCSS", "Node.js", "Express", "MongoDB", "Redis", "JWT", "Judge0 API"];

  return (
    <>
      <style>{STYLES}</style>
      <div className="ab2-wrap">
        <div className="ab2-blob ab2-blob-1" />
        <div className="ab2-blob ab2-blob-2" />
        <div className="ab2-blob ab2-blob-3" />

        <div className="ab2-inner">

          {/* ── HERO ── */}
          <section className="ab2-hero">
            <div className="ab2-hero-eyebrow">
              <div className="ab2-hero-eyebrow-line" />
              Built for Coders, by Coders
            </div>
            <h1 className="ab2-hero-title">
              Welcome to<br />
              DSA<em>MENTOR</em>
            </h1>
            <div className="ab2-hero-row">
              <p className="ab2-hero-sub">
                A focused, distraction-free platform for mastering problem-solving, building real-world skills, and growing with a vibrant developer community.
              </p>
              <div className="ab2-hero-cta">
                <button className="ab2-btn ab2-btn-solid">
                  <Zap size={15} /> Start Coding
                </button>
                <button className="ab2-btn ab2-btn-outline">
                  Explore <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="ab2-strip">
              <div className="ab2-marquee">
                {marqueeItems.map((item, i) => (
                  <span className="ab2-marquee-item" key={i}>
                    {item === "✦"
                      ? <span className="ab2-marquee-dot">{item}</span>
                      : item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ── STATS ── */}
          <div className="ab2-stats ab2-reveal">
            <Stat num={1200} suffix="+" label="Curated Problems" />
            <Stat num={18000} suffix="+" label="Active Developers" />
            <Stat num={95} suffix="%" label="User Satisfaction" />
          </div>

          {/* ── MISSION & VALUES ── */}
          <section className="ab2-reveal ab2-d1">
            <div className="ab2-sh">
              <div className="ab2-sh-tag">About Us</div>
              <h2 className="ab2-sh-title">Mission &amp; <em>Values</em></h2>
            </div>
            <div className="ab2-mv-grid">
              <div className="ab2-mv-card">
                <div className="ab2-mv-icon"><Rocket size={22} color="#f97316" /></div>
                <h3>Our Mission</h3>
                <p>To empower developers with a focused, distraction-free environment for mastering problem-solving and building real-world skills — one challenge at a time.</p>
              </div>
              <div className="ab2-mv-card">
                <div className="ab2-mv-icon"><ShieldCheck size={22} color="#f97316" /></div>
                <h3>Our Values</h3>
                <ul>
                  <li>Clarity over complexity</li>
                  <li>Learning through doing</li>
                  <li>Community-driven growth</li>
                  <li>Security and transparency</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ── FEATURES ── */}
          <section className="ab2-reveal ab2-d1">
            <div className="ab2-sh">
              <div className="ab2-sh-tag">Platform</div>
              <h2 className="ab2-sh-title">Platform <em>Highlights</em></h2>
            </div>
            <div className="ab2-feat-grid">
              {features.map(f => (
                <div className="ab2-feat-card" key={f.num}>
                  <div className="ab2-feat-num">{f.num}</div>
                  <div className="ab2-feat-icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── TECH ── */}
          <section className="ab2-tech ab2-reveal ab2-d2">
            <div className="ab2-sh">
              <div className="ab2-sh-tag">Stack</div>
              <h2 className="ab2-sh-title">Tech We <em>Love</em></h2>
            </div>
            <div className="ab2-tech-grid">
              {techs.map(t => (
                <span className="ab2-tech-pill" key={t}>
                  <span className="ab2-tech-dot" />{t}
                </span>
              ))}
            </div>
          </section>

          {/* ── TEAM ── */}
          <section className="ab2-team ab2-reveal ab2-d1">
            <div className="ab2-sh">
              <div className="ab2-sh-tag">Team</div>
              <h2 className="ab2-sh-title">Meet the <em>Team</em></h2>
            </div>
            <div className="ab2-team-card">
              <div className="ab2-team-avatar-wrap">
                <div className="ab2-team-avatar">👨‍💻</div>
                <div className="ab2-team-badge"><Sparkles size={13} /></div>
              </div>
              <div>
                <div className="ab2-team-name">Deepak Vishwakarma</div>
                <div className="ab2-team-role">Full Stack Developer</div>
                <p className="ab2-team-bio">
                  Deepak built DSA-MENTOR to help learners overcome common hurdles in coding education. Passionate about developer tools, clean architecture, and community-driven growth.
                </p>
                <div className="ab2-team-links">
                  <a href="https://github.com/Siddharth9304" target="_blank" rel="noreferrer" className="ab2-team-link"><Github size={16} /></a>
                  <a href="https://www.linkedin.com/in/premsiddhartha" target="_blank" rel="noreferrer" className="ab2-team-link"><Linkedin size={16} /></a>
                </div>
              </div>
            </div>
          </section>

          {/* ── BOTTOM CTA BANNER ── */}
          <div className="ab2-banner ab2-reveal ab2-d2">
            <div>
              <h2>Ready to level up<br />your coding skills?</h2>
              <p>Join 18,000+ developers already on DSA-MENTOR.</p>
            </div>
            <button className="ab2-banner-btn">
              Get Started Free <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default AboutUs;