import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../authSlice';
import { User, LogOut, Settings, ChevronDown, ChevronUp, Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.user-dropdown')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  useEffect(() => {
    document.body.style.backgroundColor = '#111827';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.color = 'white';
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@700&display=swap');

        body { font-family: 'DM Sans', sans-serif; }

        .nav-wrapper {
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          padding: 14px 20px;
          display: flex;
          justify-content: center;
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1200px;
          background: rgba(17, 24, 39, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 10px 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset;
        }

        .logo-link {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .logo-icon {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 10px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
        }

        .logo-text {
          font-family: 'Space Mono', monospace;
          font-size: 16px;
          font-weight: 700;
          color: white;
          letter-spacing: -0.5px;
        }

        .desktop-links {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .nav-link {
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 500;
          padding: 6px 11px;
          border-radius: 10px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: white;
          background: rgba(255,255,255,0.07);
        }

        .nav-link.active {
          color: white;
          background: rgba(99, 102, 241, 0.2);
        }

        .right-section {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-login {
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 500;
          padding: 7px 14px;
          border-radius: 10px;
          transition: all 0.2s;
        }

        .btn-login:hover {
          color: white;
          background: rgba(255,255,255,0.07);
        }

        .btn-signup {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 600;
          padding: 7px 16px;
          border-radius: 10px;
          transition: all 0.2s;
          box-shadow: 0 2px 12px rgba(99,102,241,0.35);
        }

        .btn-signup:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 18px rgba(99,102,241,0.5);
        }

        .user-dropdown {
          position: relative;
        }

        .avatar-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 5px 12px 5px 5px;
          transition: all 0.2s;
        }

        .avatar-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.18);
        }

        .avatar-img {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          object-fit: cover;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
        }

        .avatar-name {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
        }

        .dropdown-menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          min-width: 200px;
          background: rgba(15, 23, 42, 0.97);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 6px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          animation: dropIn 0.15s ease;
        }

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 8px 12px;
          border-radius: 9px;
          color: rgba(255,255,255,0.65);
          font-size: 13.5px;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          transition: all 0.15s;
        }

        .dropdown-item:hover {
          background: rgba(255,255,255,0.07);
          color: white;
        }

        .dropdown-item.danger {
          color: rgba(248,113,113,0.8);
        }

        .dropdown-item.danger:hover {
          background: rgba(239, 68, 68, 0.12);
          color: #f87171;
        }

        .dropdown-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 4px 0;
        }

        .mobile-menu-btn {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          cursor: pointer;
          padding: 6px;
          border-radius: 10px;
          display: none;
          align-items: center;
          justify-content: center;
        }

        .mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 40;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
        }

        .mobile-panel {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 41;
          background: #111827;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 16px 20px 24px;
          animation: slideDown 0.2s ease;
        }

        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .mobile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .mobile-close-btn {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          cursor: pointer;
          padding: 6px;
          border-radius: 10px;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-bottom: 20px;
        }

        .mobile-nav-link {
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          padding: 10px 12px;
          border-radius: 10px;
          transition: all 0.15s;
          display: block;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: white;
          background: rgba(99,102,241,0.15);
        }

        .mobile-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 8px 0 16px;
        }

        .mobile-user-info {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          margin-bottom: 8px;
        }

        .mobile-avatar {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          object-fit: cover;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
        }

        .mobile-username {
          font-size: 14px;
          font-weight: 600;
          color: white;
        }

        .mobile-auth-btns {
          display: flex;
          gap: 10px;
          padding: 0 4px;
        }

        .mobile-auth-btns a {
          flex: 1;
          text-align: center;
        }

        @media (max-width: 768px) {
          .desktop-links { display: none; }
          .desktop-auth { display: none; }
          .mobile-menu-btn { display: flex; }
          .logo-text { display: none; }
        }
      `}</style>

      {/* Navigation Bar */}
      <nav className="nav-wrapper">
        <div className="nav-inner">

          {/* Logo Section */}
          <NavLink to="/" className="logo-link">
            <div className="logo-icon">{'<DM>'}</div>
            <span className="logo-text">DSA-MENTOR</span>
          </NavLink>

          {/* Desktop Navigation Links */}
          <div className="desktop-links">
            <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Problems</NavLink>
            <NavLink to="/contest" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Contests</NavLink>
            <NavLink to="/leaderboard" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Leaderboard</NavLink>
            <NavLink to="/verify-certificate" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Verify</NavLink>
            <NavLink to="/documentation" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Documentation</NavLink>
            <NavLink to="/courses" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Courses</NavLink>
            <NavLink to="/interview" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Interview</NavLink>
  
          </div>

          {/* Right side - Desktop */}
          <div className="right-section">
            <div className="desktop-auth" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {user ? (
                <div className="user-dropdown">
                  <div className="avatar-btn" onClick={toggleDropdown}>
                    <img
                      src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                      alt="avatar"
                      className="avatar-img"
                    />
                    <span className="avatar-name">{user.username}</span>
                    {isDropdownOpen ? <ChevronUp size={14} color="rgba(255,255,255,0.5)" /> : <ChevronDown size={14} color="rgba(255,255,255,0.5)" />}
                  </div>

                  {isDropdownOpen && (
                    <div className="dropdown-menu">
                      <NavLink
                        to="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="dropdown-item"
                      >
                        <User size={14} /> Profile
                      </NavLink>

                      {user.role === 'admin' && (
                        <NavLink
                          to="/admin"
                          onClick={() => setIsDropdownOpen(false)}
                          className="dropdown-item"
                        >
                          <Settings size={14} /> Admin Panel
                        </NavLink>
                      )}

                      <div className="dropdown-divider" />

                      <button className="dropdown-item danger" onClick={handleLogout}>
                        <LogOut size={14} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <NavLink to="/login" className="btn-login">Log In</NavLink>
                  <NavLink to="/signup" className="btn-signup">Sign Up</NavLink>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div className="mobile-overlay" onClick={closeMobileMenu} />
          <div className="mobile-panel">
            <div className="mobile-header">
              <NavLink to="/" className="logo-link" onClick={closeMobileMenu}>
                <div className="logo-icon">{'<DM>'}</div>
                <span className="logo-text" style={{ display: 'block' }}>DSA-MENTOR</span>
              </NavLink>
              <button className="mobile-close-btn" onClick={closeMobileMenu}>
                <X size={20} />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="mobile-nav-links">
              <NavLink to="/" className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`} onClick={closeMobileMenu}>Problems</NavLink>
              <NavLink to="/contest" className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`} onClick={closeMobileMenu}>Contests</NavLink>
              <NavLink to="/leaderboard" className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`} onClick={closeMobileMenu}>Leaderboard</NavLink>
              <NavLink to="/verify-certificate" className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`} onClick={closeMobileMenu}>Verify Certificate</NavLink>
              <NavLink to="/courses" className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`} onClick={closeMobileMenu}>Courses</NavLink>
              <NavLink to="/interview" className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`} onClick={closeMobileMenu}>Interview</NavLink>

              <NavLink to="/documentation" className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`} onClick={closeMobileMenu}>Documentation</NavLink>
            </div>

            {/* Mobile Auth Section */}
            <div className="mobile-divider" />

            {user ? (
              <>
                {/* User Info */}
                <div className="mobile-user-info">
                  <img
                    src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                    alt="avatar"
                    className="mobile-avatar"
                  />
                  <span className="mobile-username">{user.username}</span>
                </div>

                {/* User Menu Items */}
                <div className="mobile-nav-links" style={{ marginBottom: 0 }}>
                  <NavLink to="/profile" className="mobile-nav-link" onClick={closeMobileMenu}>
                    <User size={14} style={{ display: 'inline', marginRight: 8 }} /> Profile
                  </NavLink>

                  {user.role === 'admin' && (
                    <NavLink to="/admin" className="mobile-nav-link" onClick={closeMobileMenu}>
                      <Settings size={14} style={{ display: 'inline', marginRight: 8 }} /> Admin Panel
                    </NavLink>
                  )}

                  <button
                    className="mobile-nav-link"
                    onClick={handleLogout}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', color: '#f87171' }}
                  >
                    <LogOut size={14} style={{ display: 'inline', marginRight: 8 }} /> Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="mobile-auth-btns">
                <NavLink to="/login" className="btn-login" onClick={closeMobileMenu}>Log In</NavLink>
                <NavLink to="/signup" className="btn-signup" onClick={closeMobileMenu}>Sign Up</NavLink>
              </div>
            )}
          </div>
        </>
      )}

      {/* Page Content */}
      <div>
        {children}
      </div>
    </>
  );
};

export default Layout;