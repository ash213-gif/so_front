import React, { useState } from 'react'
import { useAuth } from '../../Context/User/UserData'

export default function NavBar () {
  const [isOpen, setIsOpen] = useState(false)

  // Make sure useAuth actually returns token, user, logout
  const { token, user, logout } = useAuth()
  console.log(user)

  const navLinks = ['Home', 'About', 'Campaigns', 'Donate']

  return (
    <>
      {/* MOVE THIS CSS TO YOUR GLOBAL CSS/INDEX.CSS OR A SEPARATE FILE */}
      <style>{`
        :root {
          --crimson: #C0162C;
          --crimson-dark: #8B0E1E;
          --white: #FFFFFF;
          --off-white: #F9F9F9;
          --text-main: #1a1a1a;
          --text-muted: rgba(0, 0, 0, 0.45);
          --border: rgba(0, 0, 0, 0.1);
        }

        .navbar-root {
          font-family: 'DM Sans', sans-serif;
          position: sticky;
          top: 0;
          z-index: 1000;
          background: var(--white);
          border-bottom: 1.5px solid var(--border);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .navbar-inner {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 70px;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .navbar-logo-icon {
          width: 40px;
          height: 40px;
          background: var(--crimson);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: 1.2rem;
          color: var(--white);
          flex-shrink: 0;
        }

        .navbar-logo-text {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--text-main);
          line-height: 1.2;
          letter-spacing: 0.01em;
        }

        .navbar-logo-text span {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 0.1rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        @media (max-width: 768px) {
          .navbar-links { display: none; }
        }

        .nav-link {
          text-decoration: none;
          color: var(--text-muted);
          font-size: 0.88rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          padding: 0.5rem 0.9rem;
          border-radius: 6px;
          transition: all 0.2s ease;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: calc(100% - 1.8rem);
          height: 2px;
          background: var(--crimson);
          border-radius: 2px;
          transition: transform 0.2s ease;
        }

        .nav-link:hover {
          color: var(--text-main);
          background: var(--off-white);
        }

        .nav-link:hover::after {
          transform: translateX(-50%) scaleX(1);
        }

        .navbar-cta {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .navbar-cta { display: none; }
        }

        .btn-login {
          text-decoration: none;
          color: var(--text-main);
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          padding: 0.45rem 1rem;
          border-radius: 6px;
          border: 1.5px solid var(--border);
          transition: all 0.2s ease;
          background: transparent;
        }

        .btn-login:hover {
          background: var(--off-white);
          border-color: rgba(0,0,0,0.25);
        }

        .btn-signup {
          text-decoration: none;
          background: var(--crimson);
          color: var(--white);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          padding: 0.45rem 1.2rem;
          border-radius: 6px;
          transition: all 0.22s ease;
          box-shadow: 0 2px 8px rgba(192, 22, 44, 0.2);
          border: none;
        }

        .btn-signup:hover {
          background: var(--crimson-dark);
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(192, 22, 44, 0.3);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 40px;
          height: 40px;
          background: var(--off-white);
          border: 1.5px solid var(--border);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .hamburger { display: flex; }
        }

        .hamburger:hover {
          background: #efefef;
          border-color: rgba(0,0,0,0.2);
        }

        .hamburger-bar {
          width: 18px;
          height: 2px;
          background: var(--text-main);
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .hamburger.open .hamburger-bar:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .hamburger.open .hamburger-bar:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .hamburger.open .hamburger-bar:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .mobile-menu {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.35s ease, opacity 0.25s ease;
          opacity: 0;
          background: var(--white);
          border-top: 1.5px solid var(--border);
        }

        .mobile-menu.open {
          max-height: 400px;
          opacity: 1;
        }

        .mobile-menu-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 1.5rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .mobile-nav-link {
          text-decoration: none;
          color: var(--text-muted);
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          padding: 0.7rem 0.85rem;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .mobile-nav-link:hover {
          color: var(--text-main);
          background: var(--off-white);
        }

        .mobile-nav-divider {
          height: 1.5px;
          background: var(--border);
          margin: 0.5rem 0;
        }

        .mobile-cta-group {
          display: flex;
          gap: 0.75rem;
          padding-top: 0.25rem;
        }

        .mobile-btn-login {
          flex: 1;
          text-align: center;
          text-decoration: none;
          color: var(--text-main);
          font-size: 0.88rem;
          font-weight: 500;
          padding: 0.65rem;
          border-radius: 6px;
          border: 1.5px solid var(--border);
          transition: all 0.2s ease;
          background: transparent;
        }

        .mobile-btn-signup {
          flex: 1;
          text-align: center;
          text-decoration: none;
          background: var(--crimson);
          color: var(--white);
          font-size: 0.88rem;
          font-weight: 600;
          padding: 0.65rem;
          border-radius: 6px;
          transition: all 0.2s ease;
          border: none;
        }

        .mobile-btn-login:hover { background: var(--off-white); border-color: rgba(0,0,0,0.2); }
        .mobile-btn-signup:hover { background: var(--crimson-dark); }
      `}</style>

      <nav
        className='navbar-root'
        role='navigation'
        aria-label='Main navigation'
      >
        <div className='navbar-inner'>
          <a href='/' className='navbar-logo'>
            <div className='navbar-logo-icon'>S</div>
            <div className='navbar-logo-text'>
              Shravan Singh
              <span>Society</span>
            </div>
          </a>

          <ul className='navbar-links' aria-label='Primary navigation'>
            {navLinks.map(link => (
              <li key={link}>
                <a href={`/${link.toLowerCase()}`} className='nav-link'>
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {!token ? (
            <div className='navbar-cta'>
              <a href='/login' className='btn-login'>
                Login
              </a>
              <a href='/signup' className='btn-signup'>
                Sign Up
              </a>
            </div>
          ) : (
            <div className='navbar-cta'>
              <span style={{ marginRight: '1rem', fontWeight: 500 }}>
                Hi, {user?.username || user?.name || 'User'}
              </span>
              <button
                className='btn-login'
                onClick={logout}
                style={{ cursor: 'pointer' }}
              >
                Logout
              </button>
            </div>
          )}

          <button
            className={`hamburger${isOpen ? ' open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls='mobile-menu'
            aria-label='Toggle menu'
          >
            <span className='hamburger-bar' />
            <span className='hamburger-bar' />
            <span className='hamburger-bar' />
          </button>
        </div>

        <div
          id='mobile-menu'
          className={`mobile-menu${isOpen ? ' open' : ''}`}
        >
          <div className='mobile-menu-inner'>
            {navLinks.map(link => (
              <a
                key={link}
                href={`/${link.toLowerCase()}`}
                className='mobile-nav-link'
              >
                {link}
              </a>
            ))}
            <div className='mobile-nav-divider' />
            {!token ? (
              <div className='mobile-cta-group'>
                <a href='/login' className='mobile-btn-login'>
                  Login
                </a>
                <a href='/signup' className='mobile-btn-signup'>
                  Sign Up
                </a>
              </div>
            ) : (
              <div className='mobile-cta-group'>
                <span
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontWeight: 500,
                    alignSelf: 'center'
                  }}
                >
                  Hi, {user?.username || user?.name || 'User'}
                </span>
                <button
                  className='mobile-btn-login'
                  onClick={logout}
                  style={{ flex: 1, cursor: 'pointer' }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
