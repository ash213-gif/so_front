import  { useState, useRef, useEffect } from "react";
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

  // ✅ FIXED: Show navbar ALWAYS except for admin users
  // Debug: console.log('Navbar - user:', user, 'role:', user?.role);
  const showNavbar = !user?.role || user.role !== "admin";

  if (!showNavbar) return null;  // Hide only for admins

  const closeMenu = () => setIsOpen(false);

  return (
    <>
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
                  <Link to="/userDashboard" className="mobile-profile-link" onClick={closeMenu}>
                    <span>👤</span> My Profile
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