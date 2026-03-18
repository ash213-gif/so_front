import React, { useState } from 'react'
import Profile from './Profile'
import Summary from './Summary'
import Setting from './Setting'
import Notification from './Notification'
import { FaUser, FaChartBar, FaBell, FaCog } from 'react-icons/fa'


const userbar = [
  { name: 'Profile',       path: 'profile',       icon: <FaUser />,     component: <Profile /> },
  { name: 'Summary',       path: 'summary',        icon: <FaChartBar />, component: <Summary /> },
  { name: 'Notifications', path: 'notifications',  icon: <FaBell />,     component: <Notification /> },
  { name: 'Settings',      path: 'settings',       icon: <FaCog />,      component: <Setting /> },
]

export default function DashBoard() {
  const [active, setActive] = useState('profile')

  const current = userbar.find(item => item.path === active)

  return (
    <div className='dashboard-root'>

      {/* ── Sidebar (desktop/laptop only) ── */}
      <aside className='dashboard-sidebar'>
        <div className='sidebar-brand'>
          <span className='brand-dot' />
          <span className='brand-name'>My Account</span>
        </div>

        <nav className='sidebar-nav'>
          {userbar.map(item => (
            <button
              key={item.path}
              className={`sidebar-item ${active === item.path ? 'active' : ''}`}
              onClick={() => setActive(item.path)}
            >
              <span className='sidebar-icon'>{item.icon}</span>
              <span className='sidebar-label'>{item.name}</span>
              {active === item.path && <span className='sidebar-indicator' />}
            </button>
          ))}
        </nav>
      </aside>

      {/* ── Main Content ── */}
      <main className='dashboard-main'>
        <div className='dashboard-content'>
          {current?.component}
        </div>
      </main>

      {/* ── Bottom Nav (mobile only) ── */}
      <nav className='bottom-nav'>
        {userbar.map(item => (
          <button
            key={item.path}
            className={`bottom-nav-item ${active === item.path ? 'active' : ''}`}
            onClick={() => setActive(item.path)}
          >
            <span className='bnav-icon'>{item.icon}</span>
            <span className='bnav-label'>{item.name}</span>
          </button>
        ))}
      </nav>

    </div>
  )
}