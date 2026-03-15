import React from 'react'

export default function Notification () {
  return (
    <>
      {/* ── Notifications ── */}
      {activeSection === 'notif' && (
        <div className='prof-section'>
          <div className='prof-section-header'>
            <div className='prof-section-title'>
              <div className='prof-section-icon'>🔔</div>
              Notification Preferences
            </div>
          </div>
          <div className='prof-section-body'>
            <div className='prof-toggle-list'>
              {notifications.map(n => (
                <div className='prof-toggle-item' key={n.id}>
                  <div className='prof-toggle-info'>
                    <strong>{n.label}</strong>
                    <span>{n.desc}</span>
                  </div>
                  <label className='toggle-switch'>
                    <input
                      type='checkbox'
                      checked={toggles[n.id]}
                      onChange={() => handleToggle(n.id)}
                    />
                    <span className='toggle-slider' />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
