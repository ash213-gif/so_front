import React from 'react'
import {
  FaTachometerAlt,
  FaUsers,
  FaCalendarAlt,
  FaChartLine,
  FaDonate,
  FaUser,
  FaHome,
  FaSignOutAlt,
  FaShieldAlt
} from 'react-icons/fa'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../Context/User/UserData'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  .admin-sidebar {
    font-family: 'Poppins', sans-serif;
    width: 260px;
    min-height: 100vh;
    background: linear-gradient(160deg, #6c63ff 0%, #4f46e5 40%, #3730a3 100%);
    display: flex;
    flex-direction: column;
    padding: 0;
    position: relative;
    overflow: hidden;
    box-shadow: 4px 0 24px rgba(79, 70, 229, 0.3);
  }

  /* Decorative blobs matching login/signup */
  .admin-sidebar::before {
    content: '';
    position: absolute;
    top: -80px;
    right: -60px;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
    pointer-events: none;
  }

  .admin-sidebar::after {
    content: '';
    position: absolute;
    bottom: -60px;
    left: -40px;
    width: 160px;
    height: 160px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 50%;
    pointer-events: none;
  }

  /* Admin Info Header */
  .sidebar-header {
    padding: 32px 24px 28px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: center;
    gap: 14px;
    position: relative;
    z-index: 1;
  }

  .admin-avatar {
    width: 46px;
    height: 46px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.25);
    flex-shrink: 0;
  }

  .admin-avatar svg {
    color: #fff;
    font-size: 18px;
  }

  .admin-info h2 {
    font-size: 15px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 2px 0;
    letter-spacing: 0.3px;
  }

  .admin-info span {
    font-size: 11.5px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  /* Nav */
  .sidebar-nav {
    flex: 1;
    padding: 20px 14px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: relative;
    z-index: 1;
  }

  .nav-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1.2px;
    color: rgba(255, 255, 255, 0.45);
    text-transform: uppercase;
    padding: 6px 12px 10px;
    margin-top: 8px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 12px 16px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.22s ease;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    background: transparent;
    border: none;
    width: 100%;
    text-align: left;
  }

  .nav-item::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0);
    border-radius: 12px;
    transition: background 0.22s ease;
  }

  .nav-item:hover::before {
    background: rgba(255, 255, 255, 0.1);
  }

  .nav-item.active {
    background: rgba(255, 255, 255, 0.18);
    box-shadow: 0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2);
  }

  .nav-item.active .nav-icon {
    color: #fff;
    background: rgba(255,255,255,0.2);
  }

  .nav-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.75);
    font-size: 15px;
    transition: all 0.22s ease;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }

  .nav-item:hover .nav-icon {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
  }

  .nav-text {
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
    transition: color 0.22s ease;
    position: relative;
    z-index: 1;
  }

  .nav-item.active .nav-text,
  .nav-item:hover .nav-text {
    color: #fff;
  }

  .nav-badge {
    margin-left: auto;
    background: rgba(255,255,255,0.2);
    color: #fff;
    font-size: 10px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 20px;
    position: relative;
    z-index: 1;
  }

  /* Divider */
  .sidebar-divider {
    height: 1px;
    background: rgba(255,255,255,0.12);
    margin: 8px 14px;
  }

  /* Logout at bottom */
  .sidebar-footer {
    padding: 14px;
    position: relative;
    z-index: 1;
  }

  .logout-btn {
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 12px 16px;
    border-radius: 12px;
    cursor: pointer;
    border: 1px solid rgba(255, 100, 100, 0.25);
    background: rgba(255, 80, 80, 0.08);
    width: 100%;
    text-align: left;
    transition: all 0.22s ease;
  }

  .logout-btn:hover {
    background: rgba(255, 80, 80, 0.2);
    border-color: rgba(255, 100, 100, 0.5);
  }

  .logout-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 80, 80, 0.15);
    color: #ff8080;
    font-size: 15px;
  }

  .logout-text {
    font-size: 14px;
    font-weight: 500;
    color: #ff9090;
    font-family: 'Poppins', sans-serif;
  }
`

const navItems = [
  {
    icon: <FaTachometerAlt />,
    label: 'Dashboard',
    badge: null,
    path: '/adminDashboard'
  },
  {
    icon: <FaUsers />,
    label: 'Users',
    badge: '24',
    path: '/adminDashboard/users'
  },
  
  {
    icon: <FaCalendarAlt />,
    label: 'Campaigns',
    badge: '5',
    path: '/adminDashboard/campaigns'
  },
  {
    icon: <FaChartLine />,
    label: 'Analytics',
    badge: null,
    path: '/adminDashboard/analytics'
  },
  {
    icon: <FaChartLine />,
    label: 'Profile',
    badge: null,
    path: '/adminDashboard/profile'
  }
]

export default function AdminSide () {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()

  const handlelogout = (e) => {
    e.preventDefault();
    logout()
  }

  return (
    <>
      <style>{styles}</style>
      <aside className='admin-sidebar'>
        {/* Header */}
        <div className='sidebar-header'>
          <div className='admin-avatar'>
            <FaShieldAlt />
          </div>
          <div className='admin-info'>
            <h2>Admin Panel</h2>
            <span>Super Administrator</span>
          </div>
        </div>

        {/* Nav */}
        <nav className='sidebar-nav'>
          <div className='nav-label'>Main Menu</div>

          {navItems.map(item => (
            <button
              key={item.label}
              className={`nav-item${
                location.pathname.startsWith(item.path) ? ' active' : ''
              }`}
              onClick={() => navigate(item.path)}
            >
              <span className='nav-icon'>{item.icon}</span>
              <span className='nav-text'>{item.label}</span>
              {item.badge && <span className='nav-badge'>{item.badge}</span>}
            </button>
          ))}
        </nav>

        <div className='sidebar-divider' />

        {/* Logout */}
        <div className='sidebar-footer'>
          <button onClick={handlelogout} className='logout-btn'>
            <span className='logout-icon'>
              <FaSignOutAlt />
            </span>
            <span className='logout-text'>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
