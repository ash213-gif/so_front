import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../../../GlobalUrl';
import "./User.css"


const Users = () => {
  const [data, setData] = useState({});
  const [expanded, setExpanded] = useState({ users: false, donations: false });

  useEffect(() => {
    fetch(`${BASE_URL}/recentactivity`)
      .then(res => res.json())
      .then(setData);
  }, []);

  const toggleSection = (key) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="activity-grid">

      {/* ── New Users Card ── */}
      <div className="stat-card card-users">
        <div className="card-accent" />
        <div className="card-icon">👤</div>
        <p className="card-label">New Users</p>
        <p className="card-number">{data.newuserjoined ?? '—'}</p>

        <button
          onClick={() => toggleSection('users')}
          className="toggle-btn"
        >
          {expanded.users ? 'Hide' : 'Show'} Recent {data.recentUsers?.length || 0}
          <svg className={`chevron ${expanded.users ? 'open' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expanded.users && data.recentUsers && (
          <ul className="activity-list">
            {data.recentUsers.map(user => (
              <li key={user._id}>
                <span className="list-name">{user.name || user.email}</span>
                <span className="list-meta">{new Date(user.createdAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Recent Donations Card ── */}
      <div className="stat-card card-donations">
        <div className="card-accent" />
        <div className="card-icon">❤️</div>
        <p className="card-label">Recent Donations</p>
        <p className="card-number">{data.recentDonations?.length || 0}</p>

        <button
          onClick={() => toggleSection('donations')}
          className="toggle-btn"
        >
          {expanded.donations ? 'Hide' : 'Show'} Details
          <svg className={`chevron ${expanded.donations ? 'open' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expanded.donations && data.recentDonations && (
          <ul className="activity-list">
            {data.recentDonations.map(donation => (
              <li key={donation._id}>
                <span className="list-name">{donation.userId?.name}: ₹{donation.amount}</span>
                <span className="list-meta">{new Date(donation.createdAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Campaigns Card ── */}
      <div className="stat-card card-campaigns">
        <div className="card-accent" />
        <div className="card-icon">🌱</div>
        <p className="card-label">New Campaigns</p>
        <p className="card-number">{data.recentcampaign ?? '—'}</p>
        {/* Add expandable list if you fetch recentCampaigns */}
      </div>

    </div>
  );
};

export default Users;