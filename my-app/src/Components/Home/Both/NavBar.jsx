import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/User/UserData";
import "./Navbar.css";

/* ── Profile Avatar Popup ── */
function ProfilePopup({ user, logout, onClose }) {
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "U";

  return (
    <div className="profile-popup" ref={ref}>
      {/* Header */}
      <div className="popup-header">
        <div className="popup-avatar">{initials}</div>
        <div className="popup-user-info">
          <div className="popup-name">{user?.username || "User"}</div>
          <div className="popup-email">{user?.email || "—"}</div>
        </div>
      </div>

      <div className="popup-divider" />

      {/* Menu items */}
      <div className="popup-menu">
        <Link to="/userDashboard" className="popup-item" onClick={onClose}>
          <span className="popup-item-icon">👤</span> My Profile
        </Link>
      
      </div>

      <div className="popup-divider" />

      {/* Logout */}
      <button
        className="popup-logout"
        onClick={() => { logout(); onClose(); }}
      >
        <span className="popup-item-icon">🚪</span> Logout
      </button>
    </div>
  );
}

/* ── Avatar Button ── */
function AvatarButton({ user, onClick }) {
  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "U";
  return (
    <button className="avatar-btn" onClick={onClick} aria-label="Open profile menu">
      <div className="avatar-circle">{initials}</div>
      <span className="avatar-name">Hi, {user?.username || "User"}</span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 4, color: "var(--text-muted)" }}>
        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { token, user, logout } = useAuth();

  const navLinks = ["About", "Campaigns", "Donate"];

  const showNavbar = !user || user?.role === "user";
  const closeMenu = () => setIsOpen(false);

  if (!showNavbar) return null;

  return (
    <>
      <style>{`
        /* ── Avatar button ── */
        .avatar-btn {
          display: flex; align-items: center; gap: 8px;
          background: var(--off-white);
          border: 1.5px solid var(--border);
          border-radius: 8px;
          padding: 5px 12px 5px 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        .avatar-btn:hover {
          border-color: var(--crimson);
          background: #fff5f6;
        }
        .avatar-circle {
          width: 30px; height: 30px; border-radius: 50%;
          background: linear-gradient(135deg, var(--crimson), var(--crimson-dark));
          color: #fff; font-size: 11px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.5px;
        }
        .avatar-name {
          font-size: 0.84rem; font-weight: 500;
          color: var(--text-main); white-space: nowrap;
        }

        /* ── Popup wrapper ── */
        .profile-popup-wrap {
          position: relative;
        }

        /* ── Popup card ── */
        .profile-popup {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 248px;
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: 14px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
          z-index: 2000;
          overflow: hidden;
          animation: popIn 0.2s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes popIn {
          from { opacity:0; transform:translateY(-8px) scale(0.97); }
          to   { opacity:1; transform:translateY(0)   scale(1);    }
        }

        /* ── Popup header ── */
        .popup-header {
          display: flex; align-items: center; gap: 12px;
          padding: 16px;
        }
        .popup-avatar {
          width: 42px; height: 42px; border-radius: 50%;
          background: linear-gradient(135deg, var(--crimson), var(--crimson-dark));
          color: #fff; font-size: 14px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-family: 'DM Sans', sans-serif;
        }
        .popup-user-info { min-width: 0; }
        .popup-name {
          font-weight: 700; font-size: 0.9rem;
          color: var(--text-main); white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;
        }
        .popup-email {
          font-size: 0.75rem; color: var(--text-muted);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          margin-top: 2px;
        }

        /* ── Divider ── */
        .popup-divider {
          height: 1px; background: var(--border); margin: 0;
        }

        /* ── Menu items ── */
        .popup-menu {
          padding: 6px;
        }
        .popup-item {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 10px; border-radius: 8px;
          text-decoration: none;
          color: var(--text-main); font-size: 0.86rem; font-weight: 500;
          transition: background 0.15s;
          cursor: pointer;
        }
        .popup-item:hover { background: var(--off-white); }
        .popup-item-icon { font-size: 15px; width: 18px; text-align: center; }

        /* ── Logout ── */
        .popup-logout {
          display: flex; align-items: center; gap: 10px;
          width: 100%; padding: 11px 16px;
          background: none; border: none; cursor: pointer;
          color: var(--crimson); font-size: 0.86rem; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.15s;
          text-align: left;
        }
        .popup-logout:hover { background: #fff5f6; }

        /* ── Mobile avatar row ── */
        .mobile-avatar-row {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 0.85rem;
        }
        .mobile-avatar-circle {
          width: 34px; height: 34px; border-radius: 50%;
          background: linear-gradient(135deg, var(--crimson), var(--crimson-dark));
          color: #fff; font-size: 12px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .mobile-avatar-info { display: flex; flex-direction: column; }
        .mobile-avatar-name { font-size: 0.88rem; font-weight: 600; color: var(--text-main); }
        .mobile-avatar-email { font-size: 0.74rem; color: var(--text-muted); }

        .mobile-profile-links {
          display: flex; flex-direction: column; gap: 0.1rem;
        }
        .mobile-profile-link {
          text-decoration: none;
          color: var(--text-muted); font-size: 0.9rem; font-weight: 500;
          padding: 0.6rem 0.85rem; border-radius: 6px;
          display: flex; align-items: center; gap: 8px;
          transition: all 0.2s;
        }
        .mobile-profile-link:hover { background: var(--off-white); color: var(--text-main); }

        .mobile-logout-btn {
          background: none; border: none; cursor: pointer;
          color: var(--crimson); font-size: 0.88rem; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          padding: 0.6rem 0.85rem; border-radius: 6px;
          display: flex; align-items: center; gap: 8px;
          width: 100%; text-align: left; transition: background 0.15s;
        }
        .mobile-logout-btn:hover { background: #fff5f6; }
      `}</style>

      <nav className="navbar-root" role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">

          {/* Logo */}
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <div className="navbar-logo-icon">S</div>
            <div className="navbar-logo-text">
              Shravan Singh
              <span>Society</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link}>
                <Link
                  to={`/${link.toLowerCase()}`}
                  className="nav-link"
                  onClick={closeMenu}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Auth */}
          {!token ? (
            <div className="navbar-cta">
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/signup" className="btn-signup">Sign Up</Link>
            </div>
          ) : (
            <div className="navbar-cta">
              <div className="profile-popup-wrap">
                <AvatarButton
                  user={user}
                  onClick={() => setProfileOpen((p) => !p)}
                />
                {profileOpen && (
                  <ProfilePopup
                    user={user}
                    logout={logout}
                    onClose={() => setProfileOpen(false)}
                  />
                )}
              </div>
            </div>
          )}

          {/* Hamburger */}
          <button
            className={`hamburger${isOpen ? " open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>

        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu${isOpen ? " open" : ""}`}>
          <div className="mobile-menu-inner">

            {navLinks.map((link) => (
              <Link
                key={link}
                to={`/${link.toLowerCase()}`}
                className="mobile-nav-link"
                onClick={closeMenu}
              >
                {link}
              </Link>
            ))}

            <div className="mobile-nav-divider" />

            {!token ? (
              <div className="mobile-cta-group">
                <Link to="/login" className="mobile-btn-login" onClick={closeMenu}>Login</Link>
                <Link to="/signup" className="mobile-btn-signup" onClick={closeMenu}>Sign Up</Link>
              </div>
            ) : (
              <>
                {/* Mobile profile block */}
                <div className="mobile-avatar-row">
                  <div className="mobile-avatar-circle">
                    {user?.username?.slice(0, 2).toUpperCase() || "U"}
                  </div>
                  <div className="mobile-avatar-info">
                    <div className="mobile-avatar-name">{user?.username || "User"}</div>
                    <div className="mobile-avatar-email">{user?.email || ""}</div>
                  </div>
                </div>

                <div className="mobile-profile-links">
                  <Link to="/profile" className="mobile-profile-link" onClick={closeMenu}>
                    <span>👤</span> My Profile
                  </Link>
                  <Link to="/my-donations" className="mobile-profile-link" onClick={closeMenu}>
                    <span>📋</span> My Donations
                  </Link>
                  <Link to="/settings" className="mobile-profile-link" onClick={closeMenu}>
                    <span>⚙️</span> Settings
                  </Link>
                  <button
                    className="mobile-logout-btn"
                    onClick={() => { logout(); closeMenu(); }}
                  >
                    <span>🚪</span> Logout
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      </nav>
    </>
  );
}