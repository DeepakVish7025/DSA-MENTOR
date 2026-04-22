import React, { useState, useEffect } from 'react';
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle, Clock, Zap } from 'lucide-react';

/* ══════════════════════════════════════════════════════
   SCOPED STYLES — exact same theme as AboutUs
══════════════════════════════════════════════════════ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

.ct-wrap {
  --c-bg:      #0a0e17;
  --c-bg2:     #0f1420;
  --c-surface: rgba(255,255,255,0.04);
  --c-ink:     #e8eaf0;
  --c-muted:   #6b7a99;
  --c-accent:  #f97316;
  --c-gold:    #f0b429;
  --c-stroke:  rgba(255,255,255,0.08);
  --c-red:     #ef4444;
  --c-green:   #22c55e;
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

.ct-wrap *, .ct-wrap *::before, .ct-wrap *::after {
  box-sizing: border-box;
}

/* ── blobs ── */
.ct-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;
}
.ct-blob-1 {
  width: 460px; height: 460px;
  background: rgba(249,115,22,.16);
  top: -80px; right: -120px;
  animation: ctfloat 10s ease-in-out infinite;
}
.ct-blob-2 {
  width: 300px; height: 300px;
  background: rgba(240,180,41,.1);
  bottom: 160px; left: -80px;
  animation: ctfloat 13s 3s ease-in-out infinite;
}
.ct-blob-3 {
  width: 220px; height: 220px;
  background: rgba(249,115,22,.08);
  top: 55%; right: 8%;
  animation: ctfloat 9s 1.5s ease-in-out infinite;
}
@keyframes ctfloat {
  0%,100% { transform: translateY(0) scale(1); }
  50%      { transform: translateY(-36px) scale(1.05); }
}

/* ── inner container ── */
.ct-inner {
  position: relative;
  z-index: 1;
  max-width: 1080px;
  margin: 0 auto;
  padding: 80px 24px 100px;
}

/* ══ SCROLL REVEAL ══ */
.ct-reveal {
  opacity: 0;
  transform: translateY(44px);
  transition: opacity .75s var(--ease-out), transform .75s var(--ease-out);
}
.ct-reveal.ct-in { opacity: 1; transform: translateY(0); }
.ct-reveal.ct-d1 { transition-delay: .1s; }
.ct-reveal.ct-d2 { transition-delay: .2s; }
.ct-reveal.ct-d3 { transition-delay: .3s; }

/* ══ HEADER ══ */
.ct-header {
  text-align: center;
  margin-bottom: 64px;
  animation: ctSlideUp .7s var(--ease-out) both;
}
.ct-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: .72rem; font-weight: 600;
  letter-spacing: .18em; text-transform: uppercase;
  color: var(--c-accent);
  margin-bottom: 20px;
}
.ct-eyebrow-line {
  width: 32px; height: 2px;
  background: var(--c-accent);
  animation: ctLineGrow .8s .3s var(--ease-out) both;
  transform-origin: left; transform: scaleX(0);
}
@keyframes ctLineGrow { to { transform: scaleX(1); } }

.ct-header h1 {
  font-family: var(--ff-disp);
  font-size: clamp(2.8rem, 7vw, 5.5rem);
  font-weight: 900;
  line-height: .97;
  letter-spacing: -.03em;
  margin-bottom: 20px;
  animation: ctSlideUp .7s .1s var(--ease-out) both;
}
.ct-header h1 em {
  font-style: italic;
  color: var(--c-accent);
  position: relative;
}
.ct-header h1 em::after {
  content: '';
  position: absolute; left: 0; bottom: 2px;
  width: 100%; height: 3px;
  background: linear-gradient(90deg, var(--c-accent), var(--c-gold));
  border-radius: 2px;
  animation: ctLineGrow .9s .9s var(--ease-out) both;
  transform-origin: left; transform: scaleX(0);
}
.ct-header p {
  font-size: clamp(.95rem, 2vw, 1.08rem);
  color: var(--c-muted);
  line-height: 1.75;
  max-width: 480px;
  margin: 0 auto;
  animation: ctSlideUp .7s .2s var(--ease-out) both;
}

@keyframes ctSlideUp {
  from { opacity: 0; transform: translateY(26px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ══ GRID ══ */
.ct-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: start;
}
@media (max-width: 768px) { .ct-grid { grid-template-columns: 1fr; } }

/* ══ GLASS CARD (base) ══ */
.ct-card {
  background: var(--c-surface);
  backdrop-filter: blur(16px);
  border: 1px solid var(--c-stroke);
  border-radius: 20px;
  padding: 36px 32px;
  box-shadow: 0 4px 32px rgba(0,0,0,.3);
  position: relative;
  overflow: hidden;
  transition: border-color .3s, box-shadow .3s;
}
.ct-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--c-accent), var(--c-gold));
  transform: scaleX(0); transform-origin: left;
  transition: transform .4s var(--ease-out);
}
.ct-card:hover { border-color: rgba(249,115,22,.25); box-shadow: 0 12px 48px rgba(0,0,0,.4); }
.ct-card:hover::before { transform: scaleX(1); }

/* ══ FORM CARD ══ */
.ct-form-title {
  font-family: var(--ff-disp);
  font-size: 1.5rem; font-weight: 700;
  margin-bottom: 28px;
  display: flex; align-items: center; gap: 12px;
}
.ct-form-title-icon {
  width: 40px; height: 40px; border-radius: 10px;
  background: rgba(249,115,22,.12);
  display: flex; align-items: center; justify-content: center;
}

.ct-field { margin-bottom: 20px; }
.ct-label {
  display: block;
  font-size: .78rem; font-weight: 600;
  letter-spacing: .08em; text-transform: uppercase;
  color: var(--c-muted);
  margin-bottom: 8px;
}
.ct-input-wrap { position: relative; }
.ct-input-icon {
  position: absolute; left: 14px;
  top: 50%; transform: translateY(-50%);
  color: var(--c-muted);
  pointer-events: none;
  transition: color .2s;
}
.ct-textarea-icon {
  position: absolute; left: 14px; top: 16px;
  color: var(--c-muted);
  pointer-events: none;
  transition: color .2s;
}
.ct-input {
  width: 100%;
  background: rgba(255,255,255,.03);
  border: 1px solid var(--c-stroke);
  border-radius: 10px;
  padding: 13px 16px 13px 44px;
  color: var(--c-ink);
  font-family: var(--ff-body);
  font-size: .9rem;
  outline: none;
  transition: border-color .2s, background .2s, box-shadow .2s;
  -webkit-appearance: none;
}
.ct-input-plain {
  width: 100%;
  background: rgba(255,255,255,.03);
  border: 1px solid var(--c-stroke);
  border-radius: 10px;
  padding: 13px 16px;
  color: var(--c-ink);
  font-family: var(--ff-body);
  font-size: .9rem;
  outline: none;
  transition: border-color .2s, background .2s, box-shadow .2s;
  -webkit-appearance: none;
}
.ct-textarea {
  width: 100%;
  background: rgba(255,255,255,.03);
  border: 1px solid var(--c-stroke);
  border-radius: 10px;
  padding: 13px 16px 13px 44px;
  color: var(--c-ink);
  font-family: var(--ff-body);
  font-size: .9rem;
  outline: none;
  resize: none;
  transition: border-color .2s, background .2s, box-shadow .2s;
  -webkit-appearance: none;
}
.ct-input::placeholder, .ct-input-plain::placeholder, .ct-textarea::placeholder {
  color: rgba(107,122,153,.5);
}
.ct-input:focus, .ct-input-plain:focus, .ct-textarea:focus {
  border-color: var(--c-accent);
  background: rgba(249,115,22,.04);
  box-shadow: 0 0 0 3px rgba(249,115,22,.1);
}
.ct-input:focus ~ .ct-input-icon,
.ct-textarea:focus ~ .ct-textarea-icon { color: var(--c-accent); }

/* focus icon trick — needs sibling trick via JS class */
.ct-input-wrap:focus-within .ct-input-icon,
.ct-input-wrap:focus-within .ct-textarea-icon { color: var(--c-accent); }

/* ── status ── */
.ct-status {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: .85rem;
  margin-bottom: 16px;
  animation: ctSlideUp .4s var(--ease-out) both;
}
.ct-status-success { background: rgba(34,197,94,.08); border: 1px solid rgba(34,197,94,.25); color: #86efac; }
.ct-status-error   { background: rgba(239,68,68,.08);  border: 1px solid rgba(239,68,68,.25);  color: #fca5a5; }
.ct-status-loading { background: rgba(249,115,22,.08); border: 1px solid rgba(249,115,22,.25); color: #fdba74; }

/* ── submit button ── */
.ct-submit {
  width: 100%;
  background: var(--c-accent);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 14px 24px;
  font-family: var(--ff-body);
  font-size: .92rem; font-weight: 700;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 9px;
  box-shadow: 0 4px 24px rgba(249,115,22,.3);
  transition: transform .2s, box-shadow .25s, opacity .2s;
  position: relative;
  overflow: hidden;
}
.ct-submit::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent);
  transform: translateX(-100%);
  transition: transform .5s ease;
}
.ct-submit:hover::after { transform: translateX(100%); }
.ct-submit:hover { transform: translateY(-3px); box-shadow: 0 10px 36px rgba(249,115,22,.45); }
.ct-submit:disabled { opacity: .6; cursor: not-allowed; transform: none; }

.ct-spinner {
  width: 18px; height: 18px;
  border: 2px solid rgba(255,255,255,.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ctspin .7s linear infinite;
}
@keyframes ctspin { to { transform: rotate(360deg); } }

/* ══ RIGHT COLUMN ══ */
.ct-info-card { margin-bottom: 20px; }
.ct-info-title {
  font-family: var(--ff-disp);
  font-size: 1.4rem; font-weight: 700;
  margin-bottom: 24px;
}

.ct-info-row {
  display: flex; align-items: flex-start; gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid var(--c-stroke);
}
.ct-info-row:last-child { border-bottom: none; }
.ct-info-icon {
  width: 44px; height: 44px; flex-shrink: 0;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
}
.ct-info-icon-orange { background: rgba(249,115,22,.12); }
.ct-info-icon-gold   { background: rgba(240,180,41,.12); }
.ct-info-icon-blue   { background: rgba(99,179,237,.1); }
.ct-info-label {
  font-size: .78rem; font-weight: 700;
  letter-spacing: .08em; text-transform: uppercase;
  color: var(--c-muted); margin-bottom: 5px;
}
.ct-info-val {
  font-size: .88rem; color: var(--c-ink); line-height: 1.65;
}
.ct-info-val a {
  color: var(--c-accent); text-decoration: none;
  transition: opacity .2s;
}
.ct-info-val a:hover { opacity: .75; }

/* ── FAQ card ── */
.ct-faq-title {
  font-family: var(--ff-disp);
  font-size: 1.4rem; font-weight: 700;
  margin-bottom: 22px;
}
.ct-faq-item {
  padding: 14px 0;
  border-bottom: 1px solid var(--c-stroke);
}
.ct-faq-item:last-child { border-bottom: none; }
.ct-faq-q {
  font-size: .83rem; font-weight: 700;
  color: var(--c-ink); margin-bottom: 5px;
  display: flex; align-items: center; gap: 8px;
}
.ct-faq-q::before {
  content: ''; width: 6px; height: 6px;
  border-radius: 50%; background: var(--c-accent);
  flex-shrink: 0;
}
.ct-faq-a { font-size: .83rem; color: var(--c-muted); line-height: 1.65; padding-left: 14px; }

/* ══ MOBILE ══ */
@media (max-width: 480px) {
  .ct-inner { padding: 60px 16px 80px; }
  .ct-card { padding: 28px 22px; }
  .ct-header h1 { font-size: 2.6rem; }
}
`;

/* ── Scroll reveal hook ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.ct-reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('ct-in'); io.unobserve(e.target); }
      }),
      { threshold: .08 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ════════════════════════════════════════════════════ */
const Contact = () => {
  useReveal();

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending your message...' });

    const formDataObj = new FormData();
    formDataObj.append('access_key', 'df87e797-5a26-40ed-8c3e-7bd7dd7b825c');
    Object.entries(formData).forEach(([k, v]) => formDataObj.append(k, v));
    formDataObj.append('from_name', 'DSA-MENTOR Contact Form');

    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formDataObj });
      const data = await response.json();
      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent! We\'ll get back to you soon.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: 'Error: ' + data.message });
      }
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
    setTimeout(() => setStatus({ type: '', message: '' }), 5000);
  };

  const faqItems = [
    { q: 'Response Time', a: 'We typically respond within 24–48 hours on business days.' },
    { q: 'Business Hours', a: 'Monday – Friday, 9:00 AM – 6:00 PM IST.' },
    { q: 'Technical Support', a: 'For urgent issues, include "URGENT" in your subject line.' },
  ];

  return (
    <>
      <style>{STYLES}</style>
      <div className="ct-wrap">
        {/* blobs */}
        <div className="ct-blob ct-blob-1" />
        <div className="ct-blob ct-blob-2" />
        <div className="ct-blob ct-blob-3" />

        <div className="ct-inner">

          {/* ── HEADER ── */}
          <div className="ct-header">
            <div className="ct-eyebrow">
              <div className="ct-eyebrow-line" />
              DSA-MENTOR Support
            </div>
            <h1>Get In <em>Touch</em></h1>
            <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>

          {/* ── GRID ── */}
          <div className="ct-grid">

            {/* ── FORM CARD ── */}
            <div className="ct-card ct-reveal">
              <div className="ct-form-title">
                <div className="ct-form-title-icon">
                  <Mail size={20} color="#f97316" />
                </div>
                Send a Message
              </div>

              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="ct-field">
                  <label className="ct-label">Your Name *</label>
                  <div className="ct-input-wrap">
                    <input
                      type="text" name="name" value={formData.name}
                      onChange={handleChange} required
                      className="ct-input" placeholder="John Doe"
                    />
                    <User className="ct-input-icon" size={17} />
                  </div>
                </div>

                {/* Email */}
                <div className="ct-field">
                  <label className="ct-label">Your Email *</label>
                  <div className="ct-input-wrap">
                    <input
                      type="email" name="email" value={formData.email}
                      onChange={handleChange} required
                      className="ct-input" placeholder="john@example.com"
                    />
                    <Mail className="ct-input-icon" size={17} />
                  </div>
                </div>

                {/* Subject */}
                <div className="ct-field">
                  <label className="ct-label">Subject *</label>
                  <input
                    type="text" name="subject" value={formData.subject}
                    onChange={handleChange} required
                    className="ct-input-plain" placeholder="How can we help you?"
                  />
                </div>

                {/* Message */}
                <div className="ct-field">
                  <label className="ct-label">Message *</label>
                  <div className="ct-input-wrap">
                    <textarea
                      name="message" value={formData.message}
                      onChange={handleChange} required rows={5}
                      className="ct-textarea" placeholder="Tell us more about your inquiry..."
                    />
                    <MessageSquare className="ct-textarea-icon" size={17} />
                  </div>
                </div>

                {/* Status */}
                {status.message && (
                  <div className={`ct-status ct-status-${status.type}`}>
                    {status.type === 'success' && <CheckCircle size={17} />}
                    {status.type === 'error'   && <AlertCircle size={17} />}
                    {status.type === 'loading' && <div className="ct-spinner" />}
                    {status.message}
                  </div>
                )}

                {/* Submit */}
                <button type="submit" className="ct-submit" disabled={status.type === 'loading'}>
                  {status.type === 'loading'
                    ? <><div className="ct-spinner" /> Sending...</>
                    : <><Send size={17} /> Send Message</>}
                </button>
              </form>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div>
              {/* Info Card */}
              <div className="ct-card ct-info-card ct-reveal ct-d1">
                <div className="ct-info-title">Contact Information</div>

                <div className="ct-info-row">
                  <div className="ct-info-icon ct-info-icon-orange">
                    <Mail size={20} color="#f97316" />
                  </div>
                  <div>
                    <div className="ct-info-label">Email</div>
                    <div className="ct-info-val">
                      <a href="mailto:support@dsamentor.com">support@dsamentor.com</a><br />
                      <a href="mailto:anushkavishwakarma98980@gmail.com">dv2592889@gmail.com</a>
                    </div>
                  </div>
                </div>

                <div className="ct-info-row">
                  <div className="ct-info-icon ct-info-icon-gold">
                    <MessageSquare size={20} color="#f0b429" />
                  </div>
                  <div>
                    <div className="ct-info-label">Live Chat</div>
                    <div className="ct-info-val">Available 24/7 for premium members</div>
                  </div>
                </div>

                <div className="ct-info-row">
                  <div className="ct-info-icon ct-info-icon-blue">
                    <Zap size={20} color="#63b3ed" />
                  </div>
                  <div>
                    <div className="ct-info-label">Response SLA</div>
                    <div className="ct-info-val">Within 24–48 hours on business days</div>
                  </div>
                </div>
              </div>

              {/* FAQ Card */}
              <div className="ct-card ct-reveal ct-d2">
                <div className="ct-faq-title">Frequently Asked</div>
                {faqItems.map((f, i) => (
                  <div className="ct-faq-item" key={i}>
                    <div className="ct-faq-q">{f.q}</div>
                    <div className="ct-faq-a">{f.a}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;