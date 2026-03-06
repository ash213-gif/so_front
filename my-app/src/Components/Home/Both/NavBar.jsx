import React, { useState } from 'react'
import { useAuth } from '../../Context/User/UserData'
import './Navbar.css'

export default function NavBar () {
  const [isOpen, setIsOpen] = useState(false)

  // Make sure useAuth actually returns token, user, logout
  const { token, user, logout } = useAuth()
  const navLinks = [ 'About', 'Campaigns', 'Donate']

  return (
    <>      
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
