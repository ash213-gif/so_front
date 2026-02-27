import React, { useState } from 'react';
import AdminSide from '../Sidebar/AdminSide';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .admin-dashboard-container {
    font-family: 'Poppins', sans-serif;
    display: flex;
    min-height: 100vh;
    background: #f0f0ff;
  }

  /* ── Main Content ── */
  .admin-dashboard-main {
    flex: 1;
    padding: 36px 40px;
    overflow-y: auto;
    background: #f4f4fb;
  }

  /* ── Top Bar ── */
  .dash-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 36px;
  }

  .dash-welcome h1 {
    font-size: 26px;
    font-weight: 700;
    color: #1e1b4b;
    letter-spacing: -0.3px;
  }

  .dash-welcome p {
    font-size: 13.5px;
    color: #7c7a9e;
    margin-top: 4px;
    font-weight: 400;
  }

  .dash-date-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #fff;
    border: 1px solid #e0dff5;
    border-radius: 10px;
    padding: 10px 18px;
    font-size: 13px;
    color: #4f46e5;
    font-weight: 500;
    box-shadow: 0 2px 8px rgba(79,70,229,0.07);
  }

  .dash-date-badge svg {
    font-size: 15px;
  }

  /* ── Stat Cards ── */
  .admin-dashboard-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
    margin-bottom: 32px;
  }

  .admin-dashboard-card {
    background: #fff;
    border-radius: 20px;
    padding: 28px 26px;
    border: 1px solid #ececf9;
    box-shadow: 0 4px 20px rgba(79, 70, 229, 0.07);
    position: relative;
    overflow: hidden;
    transition: transform 0.22s ease, box-shadow 0.22s ease;
    cursor: default;
  }

  .admin-dashboard-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 32px rgba(79, 70, 229, 0.14);
  }

  /* Decorative accent blob per card */
  .admin-dashboard-card::after {
    content: '';
    position: absolute;
    top: -30px;
    right: -30px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    opacity: 0.12;
  }

  .admin-dashboard-card.card-users::after   { background: #6c63ff; }
  .admin-dashboard-card.card-donations::after { background: #10b981; }
  .admin-dashboard-card.card-campaigns::after { background: #f59e0b; }

  .card-icon-wrap {
    width: 50px;
    height: 50px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    margin-bottom: 18px;
  }

  .card-users    .card-icon-wrap { background: #ede9fe; color: #6c63ff; }
  .card-donations .card-icon-wrap { background: #d1fae5; color: #059669; }
  .card-campaigns .card-icon-wrap { background: #fef3c7; color: #d97706; }

  .admin-dashboard-card h2 {
    font-size: 12.5px;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: #a0a0c0;
    margin-bottom: 10px;
  }

  .card-value {
    font-size: 34px;
    font-weight: 800;
    color: #1e1b4b;
    letter-spacing: -1px;
    line-height: 1;
  }

  .card-trend {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-top: 12px;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 20px;
  }

  .card-trend.up   { background: #d1fae5; color: #059669; }
  .card-trend.down { background: #fee2e2; color: #dc2626; }

  /* ── Section Heading ── */
  .section-title {
    font-size: 16px;
    font-weight: 700;
    color: #1e1b4b;
    margin-bottom: 16px;
    letter-spacing: -0.2px;
  }

  /* ── Bottom Grid ── */
  .dash-bottom-grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 22px;
  }

  /* ── Recent Activity ── */
  .dash-panel {
    background: #fff;
    border-radius: 20px;
    padding: 26px;
    border: 1px solid #ececf9;
    box-shadow: 0 4px 20px rgba(79, 70, 229, 0.07);
  }

  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .activity-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 14px;
    border-radius: 12px;
    background: #f8f7ff;
    transition: background 0.18s;
  }

  .activity-item:hover { background: #ede9fe; }

  .activity-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .activity-dot.purple { background: #6c63ff; }
  .activity-dot.green  { background: #10b981; }
  .activity-dot.amber  { background: #f59e0b; }

  .activity-info {
    flex: 1;
  }

  .activity-info strong {
    display: block;
    font-size: 13.5px;
    font-weight: 600;
    color: #1e1b4b;
  }

  .activity-info span {
    font-size: 12px;
    color: #9090bb;
  }

  .activity-time {
    font-size: 11.5px;
    color: #b0afd0;
    white-space: nowrap;
  }

  /* ── Quick Stats mini ── */
  .quick-stats {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .quick-stat-item {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .quick-stat-header {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    font-weight: 500;
    color: #4a4a7a;
  }

  .quick-stat-header span:last-child {
    font-weight: 700;
    color: #1e1b4b;
  }

  .progress-bar-bg {
    height: 8px;
    background: #eeeeff;
    border-radius: 99px;
    overflow: hidden;
  }

  .progress-bar-fill {
    height: 100%;
    border-radius: 99px;
    transition: width 0.6s ease;
  }

  .fill-purple { background: linear-gradient(90deg, #6c63ff, #4f46e5); }
  .fill-green  { background: linear-gradient(90deg, #10b981, #059669); }
  .fill-amber  { background: linear-gradient(90deg, #f59e0b, #d97706); }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .admin-dashboard-stats  { grid-template-columns: 1fr 1fr; }
    .dash-bottom-grid       { grid-template-columns: 1fr; }
    .admin-dashboard-main   { padding: 24px 18px; }
  }

  @media (max-width: 580px) {
    .admin-dashboard-stats { grid-template-columns: 1fr; }
  }
`;

const today = new Date().toLocaleDateString('en-IN', {
  weekday: 'short', day: 'numeric', month: 'long', year: 'numeric'
});

const activities = [
  { color: 'purple', title: 'New user registered',    sub: 'Rahul Sharma joined',           time: '2 min ago' },
  { color: 'green',  title: 'Donation received',       sub: '₹ 5,000 from Priya Mehra',      time: '18 min ago' },
  { color: 'amber',  title: 'Campaign updated',        sub: '"Clean Water" goal reached 80%', time: '1 hr ago' },
  { color: 'purple', title: 'New user registered',    sub: 'Aisha Khan joined',              time: '3 hr ago' },
  { color: 'green',  title: 'Donation received',       sub: '₹ 12,000 from Ankit Gupta',     time: '5 hr ago' },
];

const progressData = [
  { label: 'User Growth',        value: 76, pct: '76%', cls: 'fill-purple' },
  { label: 'Donation Goal',      value: 62, pct: '62%', cls: 'fill-green'  },
  { label: 'Campaign Completion',value: 88, pct: '88%', cls: 'fill-amber'  },
];

// Simple SVG icons inline to avoid needing react-icons import in this file
const IconUsers    = () => <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>;
const IconDonate   = () => <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>;
const IconCampaign = () => <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18 11v2h2v-2h-2zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.39.4.53.8 1.07 1.2 1.6.96-.71 2.21-1.65 3.2-2.39zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z"/></svg>;
const IconCalendar = () => <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>;
const IconUp       = () => <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M7 14l5-5 5 5z"/></svg>;

export default function AdminDash() {
  return (
    <>
      <style>{styles}</style>
      <div className="admin-dashboard-container">
        

        <main className="admin-dashboard-main">
          {/* Top Bar */}
          <div className="dash-topbar">
            <div className="dash-welcome">
              <h1>Welcome back, Admin 👋</h1>
              <p>Here's what's happening with your platform today.</p>
            </div>
            <div className="dash-date-badge">
              <IconCalendar />
              {today}
            </div>
          </div>

          {/* Stat Cards */}
          <div className="admin-dashboard-stats">
            <div className="admin-dashboard-card card-users">
              <div className="card-icon-wrap"><IconUsers /></div>
              <h2>Total Users</h2>
              <div className="card-value">123</div>
              <span className="card-trend up"><IconUp />+12% this month</span>
            </div>

            <div className="admin-dashboard-card card-donations">
              <div className="card-icon-wrap"><IconDonate /></div>
              <h2>Total Donations</h2>
              <div className="card-value">₹45K</div>
              <span className="card-trend up"><IconUp />+8.4% this month</span>
            </div>

            <div className="admin-dashboard-card card-campaigns">
              <div className="card-icon-wrap"><IconCampaign /></div>
              <h2>Active Campaigns</h2>
              <div className="card-value">8</div>
              <span className="card-trend up"><IconUp />2 new this week</span>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="dash-bottom-grid">
            {/* Recent Activity */}
            <div className="dash-panel">
              <div className="section-title">Recent Activity</div>
              <div className="activity-list">
                {activities.map((a, i) => (
                  <div className="activity-item" key={i}>
                    <span className={`activity-dot ${a.color}`} />
                    <div className="activity-info">
                      <strong>{a.title}</strong>
                      <span>{a.sub}</span>
                    </div>
                    <span className="activity-time">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Panel */}
            <div className="dash-panel">
              <div className="section-title">Platform Progress</div>
              <div className="quick-stats">
                {progressData.map((p, i) => (
                  <div className="quick-stat-item" key={i}>
                    <div className="quick-stat-header">
                      <span>{p.label}</span>
                      <span>{p.pct}</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div
                        className={`progress-bar-fill ${p.cls}`}
                        style={{ width: p.pct }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}