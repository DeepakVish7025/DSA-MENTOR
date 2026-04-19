import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';
import {
  BarChart2, CheckCircle, Target, Signal, Dumbbell, BrainCircuit,
  RefreshCcw, List, LayoutGrid, Search, ChevronRight, Zap, Trophy, Code2,
  SlidersHorizontal, X
} from 'lucide-react';
import FeaturesSection from './hero';

// ===================================================================================
//  GLOBAL STYLES — inject once
// ===================================================================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');

    :root {
      --green: #22c55e;
      --green-dim: rgba(34,197,94,0.15);
      --green-glow: rgba(34,197,94,0.4);
      --yellow: #eab308;
      --red: #ef4444;
      --bg: #090e12;
      --surface: rgba(255,255,255,0.03);
      --border: rgba(255,255,255,0.07);
      --border-hover: rgba(34,197,94,0.35);
      --text: #e2e8f0;
      --muted: #64748b;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    .hp-root * { box-sizing: border-box; }
    .hp-root { font-family: 'Space Grotesk', sans-serif; background: var(--bg); }
    .mono { font-family: 'JetBrains Mono', monospace; }

    /* Scanline texture */
    .hp-root::before {
      content: '';
      position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
    }

    /* Animated gradient orbs */
    .orb {
      position: fixed; border-radius: 50%; filter: blur(80px);
      animation: drift 12s ease-in-out infinite alternate;
      pointer-events: none; z-index: 0;
    }
    .orb-1 { width: 500px; height: 500px; top: -100px; left: -100px; background: radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%); }
    .orb-2 { width: 400px; height: 400px; bottom: 20%; right: -100px; background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%); animation-delay: -6s; }
    @keyframes drift { from { transform: translate(0,0) scale(1); } to { transform: translate(40px,30px) scale(1.05); } }

    /* Stat block */
    .stat-block {
      position: relative; overflow: hidden;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      transition: border-color 0.3s, transform 0.3s;
    }
    .stat-block::before {
      content: ''; position: absolute; inset: 0; border-radius: 16px;
      background: linear-gradient(135deg, rgba(34,197,94,0.05) 0%, transparent 60%);
      opacity: 0; transition: opacity 0.3s;
    }
    .stat-block:hover { border-color: var(--border-hover); transform: translateY(-2px); }
    .stat-block:hover::before { opacity: 1; }

    @keyframes countUp {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .count-animate { animation: countUp 0.6s ease forwards; }

    .ring-track { fill: none; stroke: rgba(255,255,255,0.06); }
    .ring-fill { fill: none; stroke-linecap: round; transition: stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1); transform: rotate(-90deg); transform-origin: center; }

    .pill-easy  { background: rgba(34,197,94,0.12); color: #4ade80; border: 1px solid rgba(34,197,94,0.25); }
    .pill-medium{ background: rgba(234,179,8,0.12);  color: #facc15; border: 1px solid rgba(234,179,8,0.25); }
    .pill-hard  { background: rgba(239,68,68,0.12);  color: #f87171; border: 1px solid rgba(239,68,68,0.25); }

    /* Problem row */
    .prob-row {
      display: grid; grid-template-columns: 36px 1fr auto auto;
      align-items: center; gap: 16px;
      padding: 14px 20px;
      border-bottom: 1px solid var(--border);
      transition: background 0.2s;
      animation: rowIn 0.4s ease both;
    }
    .prob-row:last-child { border-bottom: none; }
    .prob-row:hover { background: rgba(34,197,94,0.04); }
    @keyframes rowIn {
      from { opacity: 0; transform: translateX(-10px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    /* Mobile problem row */
    @media (max-width: 640px) {
      .prob-row {
        grid-template-columns: 28px 1fr auto;
        gap: 10px;
        padding: 12px 14px;
      }
      .prob-row .tags-col { display: none; }
    }

    /* Grid card */
    .prob-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px; padding: 20px;
      display: flex; flex-direction: column; gap: 12px;
      position: relative; overflow: hidden;
      transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
      animation: cardIn 0.5s ease both;
    }
    .prob-card::after {
      content: ''; position: absolute;
      top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, var(--green), transparent);
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.35s ease;
    }
    .prob-card:hover { transform: translateY(-4px); border-color: var(--border-hover); box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(34,197,94,0.1); }
    .prob-card:hover::after { transform: scaleX(1); }
    @keyframes cardIn {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Input / select */
    .hp-input, .hp-select {
      width: 100%; background: rgba(255,255,255,0.03);
      border: 1px solid var(--border);
      border-radius: 10px; padding: 10px 14px;
      color: var(--text); font-family: 'Space Grotesk', sans-serif; font-size: 14px;
      outline: none; transition: border-color 0.25s, box-shadow 0.25s;
      appearance: none;
    }
    .hp-input:focus, .hp-select:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(34,197,94,0.15); }
    .hp-input::placeholder { color: var(--muted); }
    .hp-select option { background: #111; }

    /* Toggle btn */
    .toggle-btn {
      padding: 8px 10px; border-radius: 8px; border: 1px solid var(--border);
      background: transparent; color: var(--muted); cursor: pointer;
      transition: all 0.2s;
    }
    .toggle-btn.active { background: var(--green); color: #000; border-color: var(--green); }
    .toggle-btn:not(.active):hover { border-color: var(--border-hover); color: var(--text); }

    /* Reset btn */
    .reset-btn {
      padding: 8px 14px; border-radius: 8px;
      border: 1px solid var(--border); background: transparent;
      color: var(--muted); cursor: pointer; display: flex; align-items: center; gap: 6px;
      font-size: 13px; transition: all 0.2s;
    }
    .reset-btn:hover { border-color: var(--border-hover); color: var(--text); }

    .section-label {
      font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
      color: var(--green); font-family: 'JetBrains Mono', monospace;
    }

    .live-dot {
      width: 8px; height: 8px; border-radius: 50%; background: var(--green);
      box-shadow: 0 0 8px var(--green-glow);
      animation: pulse-dot 2s ease infinite;
    }
    @keyframes pulse-dot {
      0%,100% { box-shadow: 0 0 6px var(--green-glow); }
      50% { box-shadow: 0 0 14px var(--green-glow), 0 0 28px rgba(34,197,94,0.2); }
    }

    .pbar-track { background: rgba(255,255,255,0.06); border-radius: 99px; height: 4px; overflow: hidden; }
    .pbar-fill { height: 100%; border-radius: 99px; transition: width 1.2s cubic-bezier(0.4,0,0.2,1); }

    .tag-chip {
      font-size: 11px; padding: 2px 8px; border-radius: 6px;
      background: rgba(255,255,255,0.05); border: 1px solid var(--border);
      color: var(--muted); white-space: nowrap;
    }

    .solved-icon { filter: drop-shadow(0 0 4px rgba(34,197,94,0.6)); }

    .empty-state {
      text-align: center; padding: 64px 24px;
      border: 1px dashed rgba(255,255,255,0.1); border-radius: 16px;
    }

    /* ── Mobile Stats Bar (horizontal) ── */
    .mobile-stats-bar {
      display: none;
    }
    @media (max-width: 900px) {
      .mobile-stats-bar { display: flex; }
      .desktop-sidebar { display: none !important; }
    }
    @media (min-width: 901px) {
      .mobile-stats-bar { display: none !important; }
      .desktop-sidebar { display: block !important; }
    }

    /* ── Drawer overlay ── */
    .drawer-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.7);
      z-index: 100; backdrop-filter: blur(4px);
      animation: fadeIn 0.2s ease;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .drawer-panel {
      position: fixed; right: 0; top: 0; bottom: 0; width: min(340px, 90vw);
      background: #0d1117; border-left: 1px solid var(--border);
      z-index: 101; overflow-y: auto; padding: 24px;
      animation: slideIn 0.3s cubic-bezier(0.4,0,0.2,1);
    }
    @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }

    /* ── Filter row responsive ── */
    .filter-grid {
      display: grid;
      grid-template-columns: 1fr auto auto auto;
      gap: 10px;
      align-items: end;
    }
    @media (max-width: 700px) {
      .filter-grid {
        grid-template-columns: 1fr 1fr;
      }
      .filter-search-wrap {
        grid-column: 1 / -1;
      }
    }
    @media (max-width: 480px) {
      .filter-grid {
        grid-template-columns: 1fr;
      }
      .filter-search-wrap {
        grid-column: auto;
      }
    }

    /* ── Table header hide on mobile ── */
    .table-header { display: grid; }
    @media (max-width: 640px) {
      .table-header { display: none; }
    }

    /* ── Main layout grid ── */
    .hp-layout {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 28px;
      align-items: start;
    }
    @media (max-width: 900px) {
      .hp-layout {
        grid-template-columns: 1fr;
      }
    }

    /* ── Compact mobile stats pills ── */
    .stat-pill {
      display: flex; align-items: center; gap: 8px;
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 12px; padding: 10px 14px; flex: 1;
      min-width: 0;
    }

    /* Staggered animations */
    ${Array.from({length:30},(_,i)=>`.prob-row:nth-child(${i+1}){animation-delay:${i*0.04}s}`).join('')}
    ${Array.from({length:30},(_,i)=>`.prob-card:nth-child(${i+1}){animation-delay:${i*0.06}s}`).join('')}

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(34,197,94,0.3); }

    /* Mobile filter button */
    .mobile-filter-btn {
      padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border);
      background: transparent; color: var(--muted); cursor: pointer;
      display: flex; align-items: center; gap: 6px;
      font-size: 13px; font-family: 'Space Grotesk', sans-serif;
      transition: all 0.2s;
    }
    .mobile-filter-btn:hover { border-color: var(--border-hover); color: var(--text); }
    @media (min-width: 701px) { .mobile-filter-btn { display: none; } }
  `}</style>
);

// ===================================================================================
//  RING PROGRESS
// ===================================================================================
const RingProgress = ({ value, total, color, size = 80, stroke = 6 }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = total > 0 ? value / total : 0;
  const offset = circ * (1 - pct);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle className="ring-track" cx={size/2} cy={size/2} r={r} strokeWidth={stroke} />
      <circle className="ring-fill" cx={size/2} cy={size/2} r={r} strokeWidth={stroke}
        stroke={color} strokeDasharray={circ} strokeDashoffset={offset} />
    </svg>
  );
};

// ===================================================================================
//  MOBILE STATS BAR (horizontal strip shown on tablet/mobile)
// ===================================================================================
const MobileStatsBar = ({ stats, onStatsClick }) => {
  const items = [
    { label: 'Solved', val: stats.solved, color: '#22c55e', icon: <CheckCircle size={14}/> },
    { label: 'Total', val: stats.total, color: 'var(--text)', icon: <Code2 size={14}/> },
    { label: 'Easy', val: stats.solvedByDifficulty.Easy, color: '#22c55e', icon: <Signal size={14}/> },
    { label: 'Medium', val: stats.solvedByDifficulty.Medium, color: '#eab308', icon: <Dumbbell size={14}/> },
    { label: 'Hard', val: stats.solvedByDifficulty.Hard, color: '#ef4444', icon: <BrainCircuit size={14}/> },
  ];

  return (
    <div className="mobile-stats-bar" style={{
      gap: 10, flexWrap: 'wrap', marginBottom: 20,
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid var(--border)',
      borderRadius: 16, padding: 16,
    }}>
      {/* Ring + percentage */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', marginBottom: 12 }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <RingProgress value={stats.solved} total={stats.total} color="#22c55e" size={60} stroke={4} />
          <div style={{ position: 'absolute', textAlign: 'center' }}>
            <div className="mono" style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', lineHeight: 1 }}>{stats.solved}</div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Overall Progress</div>
          <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>
            {stats.total > 0 ? Math.round((stats.solved/stats.total)*100) : 0}
            <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 400 }}>%</span>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <div className="live-dot" />
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>Live</div>
        </div>
      </div>

      {/* Stat pills */}
      <div style={{ display: 'flex', gap: 8, width: '100%', flexWrap: 'wrap' }}>
        {items.map(s => (
          <div key={s.label} className="stat-pill" style={{ minWidth: 'calc(33% - 6px)' }}>
            <span style={{ color: s.color, flexShrink: 0 }}>{s.icon}</span>
            <div>
              <div className="mono" style={{ fontSize: 15, fontWeight: 700, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 10, color: 'var(--muted)' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===================================================================================
//  USER STATS SIDEBAR (desktop)
// ===================================================================================
const UserStats = ({ stats, onStatusChange, onDifficultyChange }) => {
  const diffs = [
    { key: 'Easy',   color: '#22c55e', icon: <Signal size={13}/> },
    { key: 'Medium', color: '#eab308', icon: <Dumbbell size={13}/> },
    { key: 'Hard',   color: '#ef4444', icon: <BrainCircuit size={13}/> },
  ];

  return (
    <div className="desktop-sidebar" style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="stat-block" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <span className="section-label">Progress</span>
          <div className="live-dot" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RingProgress value={stats.solved} total={stats.total} color="#22c55e" size={80} stroke={5} />
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <div className="mono count-animate" style={{ fontSize: 16, fontWeight: 700, color: '#22c55e', lineHeight: 1 }}>{stats.solved}</div>
              <div style={{ fontSize: 9, color: 'var(--muted)' }}>/{stats.total}</div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>Total solved</div>
            <div className="mono" style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)' }}>
              {stats.total > 0 ? Math.round((stats.solved/stats.total)*100) : 0}<span style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 400 }}>%</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { label: 'Solved', val: stats.solved, icon: <CheckCircle size={13}/>, color: '#22c55e', status: 'Solved' },
            { label: 'Attempted', val: stats.attempted, icon: <Target size={13}/>, color: '#eab308', status: 'Attempted' },
          ].map(s => (
            <button key={s.label} onClick={() => onStatusChange(s.status)}
              style={{
                flex: 1, padding: '10px 8px', border: '1px solid var(--border)',
                borderRadius: 10, background: 'rgba(255,255,255,0.02)', cursor: 'pointer',
                transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = s.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <span style={{ color: s.color }}>{s.icon}</span>
              <span className="mono" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>{s.val}</span>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="stat-block" style={{ padding: 24 }}>
        <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>Difficulty</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {diffs.map(d => {
            const solved = stats.solvedByDifficulty[d.key];
            const total  = stats.totalByDifficulty[d.key];
            const pct = total > 0 ? (solved/total)*100 : 0;
            return (
              <button key={d.key} onClick={() => onDifficultyChange(d.key)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: d.color, fontSize: 13, fontWeight: 500 }}>
                    {d.icon} {d.key}
                  </div>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{solved}/{total}</span>
                </div>
                <div className="pbar-track">
                  <div className="pbar-fill" style={{ width: `${pct}%`, background: d.color, opacity: 0.85 }} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{
        border: '1px solid rgba(34,197,94,0.2)', borderRadius: 14,
        padding: '14px 18px', background: 'rgba(34,197,94,0.04)',
        display: 'flex', alignItems: 'flex-start', gap: 12
      }}>
        <Zap size={16} style={{ color: '#22c55e', flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 3 }}>Daily Streak</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>Solve at least one problem today to keep your streak alive.</div>
        </div>
      </div>
    </div>
  );
};

// ===================================================================================
//  FILTERS BAR
// ===================================================================================
const ProblemFilters = ({
  viewMode, setViewMode, noProblems, topics, difficulties, statuses,
  searchTerm, selectedTopic, selectedDifficulty, selectedStatus,
  onSearchChange, onTopicChange, onDifficultyChange, onStatusChange, onResetFilters
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span className="section-label" style={{ marginRight: 'auto' }}>
          Problems <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>({noProblems})</span>
        </span>
        <button className="reset-btn" onClick={onResetFilters}><RefreshCcw size={13}/> Reset</button>
        {/* Mobile filter toggle */}
        <button className="mobile-filter-btn" onClick={() => setShowMobileFilters(v => !v)}>
          <SlidersHorizontal size={14}/> Filters
        </button>
        <div style={{ display: 'flex', gap: 4 }}>
          <button className={`toggle-btn${viewMode==='list'?' active':''}`} onClick={() => setViewMode('list')} aria-label="List view"><List size={17}/></button>
          <button className={`toggle-btn${viewMode==='grid'?' active':''}`} onClick={() => setViewMode('grid')} aria-label="Grid view"><LayoutGrid size={17}/></button>
        </div>
      </div>

      {/* Filter inputs — desktop always shown, mobile toggle */}
      <div className="filter-grid" style={{ display: showMobileFilters || window.innerWidth > 700 ? 'grid' : 'none' }}>
        <div className="filter-search-wrap" style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }} />
          <input className="hp-input" style={{ paddingLeft: 34 }} placeholder="Search problems..." value={searchTerm} onChange={onSearchChange} />
        </div>
        <select className="hp-select" value={selectedDifficulty} onChange={e => onDifficultyChange(e.target.value)}>
          {difficulties.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select className="hp-select" value={selectedStatus} onChange={e => onStatusChange(e.target.value)}>
          {statuses.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select className="hp-select" value={selectedTopic} onChange={e => onTopicChange(e.target.value)}>
          {topics.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    </div>
  );
};

// ===================================================================================
//  STATUS ICON
// ===================================================================================
const StatusIcon = ({ status }) =>
  status === 'Solved'
    ? <CheckCircle size={16} style={{ color: '#22c55e' }} className="solved-icon" />
    : <div style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid var(--muted)' }} />;

// ===================================================================================
//  PROBLEMS TABLE (LIST VIEW)
// ===================================================================================
const ProblemsTable = ({ problems }) => {
  if (!problems.length) return (
    <div className="empty-state">
      <Code2 size={32} style={{ color: 'var(--muted)', marginBottom: 12 }} />
      <p style={{ color: 'var(--text)', fontSize: 16, fontWeight: 600 }}>No problems found</p>
      <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>Try adjusting your filters.</p>
    </div>
  );

  return (
    <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)' }}>
      {/* Header — hidden on mobile via CSS */}
      <div className="table-header" style={{
        gridTemplateColumns: '36px 1fr auto auto',
        gap: 16, padding: '10px 20px',
        background: 'rgba(255,255,255,0.02)',
        borderBottom: '1px solid var(--border)'
      }}>
        {['','Title','Difficulty','Topics'].map((h,i) => (
          <span key={i} style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'JetBrains Mono' }}>{h}</span>
        ))}
      </div>

      {problems.map((p, idx) => (
        <NavLink key={p._id} to={`/problem/${p._id}`} style={{ textDecoration: 'none' }}>
          <div className="prob-row" style={{ animationDelay: `${idx * 0.04}s` }}>
            <StatusIcon status={p.status} />
            <span style={{ color: 'var(--text)', fontWeight: 500, fontSize: 14, transition: 'color 0.2s', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              onMouseEnter={e => e.currentTarget.style.color='#22c55e'}
              onMouseLeave={e => e.currentTarget.style.color='var(--text)'}
            >{p.title}</span>
            <span className={`pill-${p.difficulty.toLowerCase()}`} style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99, whiteSpace: 'nowrap' }}>
              {p.difficulty}
            </span>
            <div className="tags-col" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: 220 }}>
              {p.tags.slice(0,2).map(t => <span key={t} className="tag-chip">{t}</span>)}
              {p.tags.length > 2 && <span className="tag-chip">+{p.tags.length-2}</span>}
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

// ===================================================================================
//  PROBLEMS GRID
// ===================================================================================
const ProblemsGrid = ({ problems }) => {
  if (!problems.length) return (
    <div className="empty-state">
      <Code2 size={32} style={{ color: 'var(--muted)', marginBottom: 12 }} />
      <p style={{ color: 'var(--text)', fontSize: 16, fontWeight: 600 }}>No problems found</p>
      <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>Try adjusting your filters.</p>
    </div>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
      {problems.map((p, idx) => {
        const diffColor = { Easy: '#22c55e', Medium: '#eab308', Hard: '#ef4444' }[p.difficulty] || 'var(--muted)';
        return (
          <NavLink key={p._id} to={`/problem/${p._id}`} style={{ textDecoration: 'none' }}>
            <div className="prob-card" style={{ animationDelay: `${idx * 0.06}s` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`pill-${p.difficulty.toLowerCase()}`} style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99 }}>
                  {p.difficulty}
                </span>
                <StatusIcon status={p.status} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', lineHeight: 1.4, flex: 1 }}>{p.title}</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {p.tags.slice(0,3).map(t => <span key={t} className="tag-chip">{t}</span>)}
                {p.tags.length > 3 && <span className="tag-chip">+{p.tags.length-3}</span>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: diffColor, fontSize: 12 }}>
                <ChevronRight size={13}/> Solve now
              </div>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

// ===================================================================================
//  MAIN HOMEPAGE
// ===================================================================================
function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [problems, setProblems] = useState([]);
  const [solvedProblemIds, setSolvedProblemIds] = useState(new Set());
  const [filters, setFilters] = useState({ difficulty: 'All', tag: 'All', status: 'All', search: '' });
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/getAllProblem');
        const standardized = data.map(p => ({
          ...p,
          difficulty: p.difficulty.charAt(0).toUpperCase() + p.difficulty.slice(1),
          tags: Array.isArray(p.tags) ? p.tags : [p.tags]
        }));
        setProblems(standardized);
      } catch (e) { console.error(e); }
    };
    const fetchSolved = async () => {
      if (!user) return;
      try {
        const { data } = await axiosClient.get('/problem/problemSolvedByUser');
        setSolvedProblemIds(new Set(data.map(p => p._id)));
      } catch (e) { console.error(e); }
    };
    fetchProblems();
    fetchSolved();
  }, [user]);

  const filteredProblems = problems
    .map(p => ({ ...p, status: solvedProblemIds.has(p._id) ? 'Solved' : 'Todo' }))
    .filter(p => {
      const dm = filters.difficulty === 'All' || p.difficulty === filters.difficulty;
      const tm = filters.tag === 'All' || p.tags.includes(filters.tag);
      const sm = filters.status === 'All' || p.status === filters.status;
      const qm = p.title.toLowerCase().includes(filters.search.toLowerCase());
      return dm && tm && sm && qm;
    });

  const userStats = {
    solved: solvedProblemIds.size,
    total: problems.length,
    attempted: 0,
    solvedByDifficulty: {
      Easy:   problems.filter(p => p.difficulty === 'Easy'   && solvedProblemIds.has(p._id)).length,
      Medium: problems.filter(p => p.difficulty === 'Medium' && solvedProblemIds.has(p._id)).length,
      Hard:   problems.filter(p => p.difficulty === 'Hard'   && solvedProblemIds.has(p._id)).length,
    },
    totalByDifficulty: {
      Easy:   problems.filter(p => p.difficulty === 'Easy').length,
      Medium: problems.filter(p => p.difficulty === 'Medium').length,
      Hard:   problems.filter(p => p.difficulty === 'Hard').length,
    },
  };

  const topics     = [{ label: 'All Topics', value: 'All' }, ...Array.from(new Set(problems.flatMap(p => p.tags))).map(t => ({ label: t, value: t }))];
  const difficulties = [{ label: 'All', value: 'All' }, { label: 'Easy', value: 'Easy' }, { label: 'Medium', value: 'Medium' }, { label: 'Hard', value: 'Hard' }];
  const statuses   = [{ label: 'All', value: 'All' }, { label: 'Solved', value: 'Solved' }, { label: 'Todo', value: 'Todo' }];

  return (
    <div className="hp-root" style={{ minHeight: '100vh', position: 'relative' }}>
      <GlobalStyles />

      {/* Ambient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '24px 16px' }}>

        {/* ── Mobile Stats Bar (visible below 900px) ── */}
        <MobileStatsBar stats={userStats} />

        {/* ── Main Layout ── */}
        <div className="hp-layout">

          {/* Sidebar — desktop only, hidden via CSS on mobile */}
          <UserStats
            stats={userStats}
            onStatusChange={s => setFilters(prev => ({ ...prev, status: s }))}
            onDifficultyChange={d => setFilters(prev => ({ ...prev, difficulty: d }))}
          />

          {/* Main */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
            <ProblemFilters
              viewMode={viewMode} setViewMode={setViewMode}
              noProblems={filteredProblems.length}
              topics={topics} difficulties={difficulties} statuses={statuses}
              searchTerm={filters.search}
              selectedTopic={filters.tag}
              selectedDifficulty={filters.difficulty}
              selectedStatus={filters.status}
              onSearchChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
              onTopicChange={t => setFilters(prev => ({ ...prev, tag: t }))}
              onDifficultyChange={d => setFilters(prev => ({ ...prev, difficulty: d }))}
              onStatusChange={s => setFilters(prev => ({ ...prev, status: s }))}
              onResetFilters={() => setFilters({ difficulty: 'All', tag: 'All', status: 'All', search: '' })}
            />

            {viewMode === 'list'
              ? <ProblemsTable problems={filteredProblems} />
              : <ProblemsGrid problems={filteredProblems} />
            }
          </div>
        </div>

        {/* Features section */}
        <div style={{ marginTop: 64 }}>
          <FeaturesSection />
        </div>
      </div>
    </div>
  );
}

export default Homepage;