import React from "react";

const AdminProfile = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .ap-wrapper {
          font-family: 'DM Sans', sans-serif;
          max-width: 900px;
          width: 100%;
          margin: 3rem auto;
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow:
            0 15px 50px rgba(0,0,0,0.08),
            0 4px 15px rgba(0,0,0,0.05);
        }

        /* Header */
        .ap-header {
          background: linear-gradient(135deg, #111827, #1f2937);
          padding: 2.5rem 2rem 5rem;
          position: relative;
          color: white;
        }

        .ap-badge {
          display: inline-block;
          background: #C0162C;
          padding: 0.35rem 0.9rem;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .ap-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 5px solid #fff;
          object-fit: cover;
          position: absolute;
          bottom: -60px;
          left: 2rem;
          background: #eee;
        }

        /* Body */
        .ap-body {
          padding: 5rem 2rem 2.5rem;
        }

        .ap-top {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .ap-name {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 0.3rem;
          color: #111;
        }

        .ap-role {
          font-size: 0.95rem;
          font-weight: 500;
          color: #666;
        }

        .ap-actions {
          display: flex;
          gap: 0.8rem;
          flex-wrap: wrap;
        }

        .ap-btn {
          padding: 0.6rem 1.4rem;
          border-radius: 30px;
          font-size: 0.8rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .ap-btn-primary {
          background: #C0162C;
          color: white;
        }

        .ap-btn-primary:hover {
          background: #a81324;
          transform: translateY(-2px);
        }

        .ap-btn-outline {
          background: transparent;
          border: 2px solid #C0162C;
          color: #C0162C;
        }

        .ap-btn-outline:hover {
          background: #C0162C;
          color: white;
          transform: translateY(-2px);
        }

        /* Stats */
        .ap-stats {
          margin-top: 2rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .ap-stat-card {
          background: #f9fafb;
          padding: 1.2rem;
          border-radius: 16px;
          text-align: center;
          transition: transform 0.2s ease;
        }

        .ap-stat-card:hover {
          transform: translateY(-4px);
        }

        .ap-stat-card strong {
          display: block;
          font-size: 1.3rem;
          color: #C0162C;
          margin-bottom: 0.3rem;
        }

        .ap-stat-card span {
          font-size: 0.8rem;
          color: #666;
        }

        /* Info Section */
        .ap-info {
          margin-top: 2.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .ap-info h4 {
          font-size: 0.9rem;
          margin-bottom: 0.8rem;
          color: #111;
        }

        .ap-info p {
          font-size: 0.85rem;
          color: #555;
          line-height: 1.6;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .ap-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .ap-info {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .ap-avatar {
            left: 50%;
            transform: translateX(-50%);
          }

          .ap-header {
            padding-bottom: 6rem;
            text-align: center;
          }

          .ap-body {
            padding-top: 6rem;
          }

          .ap-top {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .ap-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="ap-wrapper">
        <div className="ap-header">
          <div className="ap-badge">System Admin</div>
          <img
            className="ap-avatar"
            src="https://i.pravatar.cc/300?img=12"
            alt="Admin Avatar"
          />
        </div>

        <div className="ap-body">
          <div className="ap-top">
            <div>
              <div className="ap-name">Amit Verma</div>
              <div className="ap-role">Super Administrator • Full Access</div>
            </div>

            <div className="ap-actions">
              <button className="ap-btn ap-btn-primary">Edit Profile</button>
              <button className="ap-btn ap-btn-outline">View Logs</button>
            </div>
          </div>

          <div className="ap-stats">
            <div className="ap-stat-card">
              <strong>128</strong>
              <span>Total Users</span>
            </div>
            <div className="ap-stat-card">
              <strong>24</strong>
              <span>Active Campaigns</span>
            </div>
            <div className="ap-stat-card">
              <strong>₹8.2L</strong>
              <span>Funds Managed</span>
            </div>
            <div className="ap-stat-card">
              <strong>5</strong>
              <span>Team Members</span>
            </div>
          </div>

          <div className="ap-info">
            <div>
              <h4>Contact Information</h4>
              <p>Email: amit.verma@example.com</p>
              <p>Phone: +91 98765 43210</p>
            </div>

            <div>
              <h4>About</h4>
              <p>
                Responsible for overseeing platform operations, campaign approvals,
                financial transparency, and community engagement strategies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;