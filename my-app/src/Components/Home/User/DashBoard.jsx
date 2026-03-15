import React, { useState, useEffect } from "react";
import "../User/user.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Components/Context/User/UserData";
import { BASE_URL}from '../../../GlobalUrl'
import axios from "axios";
import { socket } from "../../../Socket";
import { ToastContainer, toast } from 'react-toastify'



// Dummy notifications config
const notifications = [
  {
    id: "email_camp",
    label: "Campaign Updates",
    desc: "Get notified when campaigns you follow update",
    defaultOn: true,
  },
  {
    id: "email_dona",
    label: "Donation Receipts",
    desc: "Email receipt for every donation made",
    defaultOn: true,
  },
  {
    id: "email_news",
    label: "Newsletter",
    desc: "Weekly digest of platform highlights",
    defaultOn: false,
  },
  {
    id: "push_alerts",
    label: "Push Alerts",
    desc: "Browser push notifications for activity",
    defaultOn: true,
  },
  {
    id: "sms_notify",
    label: "SMS Notifications",
    desc: "Text alerts for important updates",
    defaultOn: false,
  },
];

// Initial static activities (later tum API se real donation history daal sakte ho)


// Left nav items
const navItems = [
  { id: "personal", icon: "👤", label: "Personal Info", short: "Info" },
  { id: "contact", icon: "📬", label: "Contact & Social", short: "Contact" },
  { id: "activity", icon: "⚡", label: "Activity", short: "Activity" },
  { id: "notif", icon: "🔔", label: "Notifications", short: "Alerts" },
  { id: "security", icon: "🔒", label: "Security", short: "Security" },
];

export default function UserProfile() {
  const { user ,transaction ,summary, logout} = useAuth();
  console.log(transaction)
  const navigate = useNavigate();
  const id = user?._id;


  // UI state
  const [activeSection, setActiveSection] = useState("personal");

  const [editing, setEditing] = useState({
    personal: false,
    contact: false,
  });

  const [personalForm, setPersonalForm] = useState({
    firstName: user?.username || "",
    lastName: "",
    username: user ? "shsc" + user.username : "",
    dob: "",
    gender: "",
    bio: "",
    location: "",
    language: "Hindi / English",
  });

  const [contactForm, setContactForm] = useState({
    email: user?.email || "",
    phone: "",
    altEmail: "",
    website: "",
    linkedin: "",
    twitter: "",
  });

  const [toggles, setToggles] = useState(
    notifications.reduce((acc, n) => {
      acc[n.id] = n.defaultOn;
      return acc;
    }, {})
  );

  const [activities, setActivities] = useState([]);
  

  // Fetch transaction summary (and later you can also fetch full history)




  const handelUpdate=async(req,res)=>{
    try{
const res= await axios.put(`${BASE_URL}/updatedUser/${id}`,{
  
})
    }catch{

    }
  }

  const toggleEdit = (section) => {
    setEditing((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleToggle = (id) => {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDeactivateAccount = async () => {
    if (window.confirm("Are you sure you want to deactivate your account? You can reactivate it by logging back in.")) {
      try {
        await axios.put(`${BASE_URL}/deactivate/${id}`);
        toast.success("Your account has been deactivated.");
        if (logout) {
          logout();
        }
        navigate('/login');
      } catch (err) {
        console.error("Deactivation failed", err);
        toast.err("Could not deactivate your account. Please try again.");
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
      try {
        await axios.delete(`${BASE_URL}/delete/${id}`);
        toast.success("Your account has been permanently deleted.");
        if (logout) {
          logout();
        }
        navigate('/register'); // Or your signup/home page
      } catch (err) {
        console.error("Deletion failed", err);
        toast.err("Could not delete your account. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="prof-page">
        {/* Hero */}
        <div className="prof-hero">
          <div className="prof-hero-inner">
            <div className="prof-hero-title">My Profile</div>
            <div className="prof-hero-badges">
              <span className="prof-badge active">✦ Volunteer</span>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="prof-layout">
          {/* ── Left Column ── */}
          <div className="prof-left">
            {/* Avatar Card */}
            <div className="prof-avatar-card">
              <div className="prof-avatar-wrap">
                <img
                  className="prof-avatar"
                  src="https://i.pravatar.cc/300"
                  alt="Avatar"
                />
                <div className="prof-online" />
                <div className="prof-avatar-edit" title="Change photo">
                  ✎
                </div>
              </div>
              <div className="prof-name">{user?.username}</div>
              <div className="prof-username">@{user?.email}</div>
              <div className="prof-role-pill">Community Volunteer</div>

              <div className="prof-mini-stats">
                <div className="prof-mini-stat">
                  <strong>{transaction.totalAmount}</strong>
                  <span>Donated</span>
                </div>
                <div className="prof-mini-stat">
                  <strong>{transaction.totalTimes}</strong>
                  <span>Campaigns</span>
                </div>
                <div className="prof-mini-stat">
                  <strong>3yr</strong>
                  <span>Active</span>
                </div>
              </div>

              <button className="prof-sidebar-btn psb-primary">
                Download Report
              </button>
              <button className="prof-sidebar-btn psb-ghost">
                Share Profile
              </button>
            </div>

            {/* Nav */}
            <div className="prof-nav-card">
              {navItems.map((n) => (
                <div
                  key={n.id}
                  className={`prof-nav-item ${
                    activeSection === n.id ? "active" : ""
                  }`}
                  onClick={() => setActiveSection(n.id)}
                >
                  <span className="prof-nav-icon">{n.icon}</span>
                  {n.label}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Column ── */}
          <div className="prof-right">
            {/* ── Personal Info ── */}
            {activeSection === "personal" && (
              <div className="prof-section">
                <div className="prof-section-header">
                  <div className="prof-section-title">
                    <div className="prof-section-icon">👤</div>
                    Personal Information
                  </div>
                  <div>
                    {editing.personal && (
                      <button
                        className="prof-save-btn"
                        onClick={() => toggleEdit("personal")}
                      >
                        Save
                      </button>
                    )}
                    <button
                      className="prof-edit-btn"
                      onClick={() => toggleEdit("personal")}
                    >
                      {editing.personal ? "Cancel" : "Edit"}
                    </button>
                  </div>
                </div>
                <div className="prof-section-body">
                  <div className="prof-form-grid">
                    <div className="prof-field">
                      <label className="prof-label">First Name</label>
                      <input
                        className="prof-input"
                        value={personalForm.firstName}
                        disabled={!editing.personal}
                        onChange={(e) =>
                          setPersonalForm((p) => ({
                            ...p,
                            firstName: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="prof-field">
                      <label className="prof-label">Last Name</label>
                      <input
                        className="prof-input"
                        value={personalForm.lastName}
                        disabled={!editing.personal}
                        onChange={(e) =>
                          setPersonalForm((p) => ({
                            ...p,
                            lastName: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="prof-field">
                      <label className="prof-label">Username</label>
                      <input
                        className="prof-input"
                        value={personalForm.username}
                        disabled={!editing.personal}
                        onChange={(e) =>
                          setPersonalForm((p) => ({
                            ...p,
                            username: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="prof-field">
                      <label className="prof-label">Date of Birth</label>
                      <input
                        className="prof-input"
                        type={editing.personal ? "date" : "text"}
                        value={personalForm.dob}
                        disabled={!editing.personal}
                        onChange={(e) =>
                          setPersonalForm((p) => ({
                            ...p,
                            dob: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="prof-field">
                      <label className="prof-label">Gender</label>
                      <select
                        className="prof-input prof-select"
                        value={personalForm.gender}
                        disabled={!editing.personal}
                        onChange={(e) =>
                          setPersonalForm((p) => ({
                            ...p,
                            gender: e.target.value,
                          }))
                        }
                      >
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Non-binary</option>
                        <option>Prefer not to say</option>
                      </select>
                    </div>
                    <div className="prof-field">
                      <label className="prof-label">Location</label>
                      <input
                        className="prof-input"
                        value={personalForm.location}
                        disabled={!editing.personal}
                        onChange={(e) =>
                          setPersonalForm((p) => ({
                            ...p,
                            location: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="prof-field">
                      <label className="prof-label">Language</label>
                      <input
                        className="prof-input"
                        value={personalForm.language}
                        disabled={!editing.personal}
                        onChange={(e) =>
                          setPersonalForm((p) => ({
                            ...p,
                            language: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="prof-field span2">
                      <label className="prof-label">Bio</label>
                      <textarea
                        className="prof-input prof-textarea"
                        value={personalForm.bio}
                        disabled={!editing.personal}
                        onChange={(e) =>
                          setPersonalForm((p) => ({
                            ...p,
                            bio: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="prof-divider" />

                  <div style={{ marginBottom: 10 }}>
                    <div
                      className="prof-label"
                      style={{ marginBottom: 10 }}
                    >
                      Focus Areas
                    </div>
                    <div className="prof-tags">
                      <span className="prof-tag">🌱 Education</span>
                      <span className="prof-tag">🏥 Healthcare</span>
                      <span className="prof-tag">💧 Clean Water</span>
                      <span className="prof-tag">🌾 Agriculture</span>
                      {editing.personal && (
                        <span className="prof-tag prof-tag-add">
                          + Add Tag
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Contact & Social ── */}
            {activeSection === "contact" && (
              <div className="prof-section">
                <div className="prof-section-header">
                  <div className="prof-section-title">
                    <div className="prof-section-icon">📬</div>
                    Contact & Social
                  </div>
                  <div>
                    {editing.contact && (
                      <button
                        className="prof-save-btn"
                        onClick={() => toggleEdit("contact")}
                      >
                        Save
                      </button>
                    )}
                    <button
                      className="prof-edit-btn"
                      onClick={() => toggleEdit("contact")}
                    >
                      {editing.contact ? "Cancel" : "Edit"}
                    </button>
                  </div>
                </div>
                <div className="prof-section-body">
                  <div className="prof-form-grid">
                    <div className="prof-field">
                      <label className="prof-label">Primary Email</label>
                      <input
                        className="prof-input"
                        type="email"
                        value={contactForm.email}
                        disabled={!editing.contact}
                        onChange={(e) =>
                          setContactForm((p) => ({
                            ...p,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="prof-field">
                      <label className="prof-label">Phone Number</label>
                      <input
                        className="prof-input"
                        type="tel"
                        value={contactForm.phone}
                        disabled={!editing.contact}
                        onChange={(e) =>
                          setContactForm((p) => ({
                            ...p,
                            phone: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="prof-field">
                      <label className="prof-label">Alternate Email</label>
                      <input
                        className="prof-input"
                        type="email"
                        placeholder="Optional"
                        value={contactForm.altEmail}
                        disabled={!editing.contact}
                        onChange={(e) =>
                          setContactForm((p) => ({
                            ...p,
                            altEmail: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="prof-field">
                      <label className="prof-label">Website</label>
                      <input
                        className="prof-input"
                        value={contactForm.website}
                        disabled={!editing.contact}
                        onChange={(e) =>
                          setContactForm((p) => ({
                            ...p,
                            website: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="prof-field">
                      <label className="prof-label">LinkedIn</label>
                      <input
                        className="prof-input"
                        value={contactForm.linkedin}
                        disabled={!editing.contact}
                        onChange={(e) =>
                          setContactForm((p) => ({
                            ...p,
                            linkedin: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="prof-field">
                      <label className="prof-label">Twitter / X</label>
                      <input
                        className="prof-input"
                        value={contactForm.twitter}
                        disabled={!editing.contact}
                        onChange={(e) =>
                          setContactForm((p) => ({
                            ...p,
                            twitter: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Activity ── */}
            {activeSection === "activity" && (
              <div className="prof-section">
                <div className="prof-section-header">
                  <div className="prof-section-title">
                    <div className="prof-section-icon">⚡</div>
                    Recent Activity
                  </div>
                </div>
               
              </div>
            )}

           

            {/* ── Security ── */}
           
          </div>
        </div>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="prof-bottom-nav">
        {navItems.map((n) => (
          <button
            key={n.id}
            className={`prof-bottom-nav-item ${
              activeSection === n.id ? "active" : ""
            }`}
            onClick={() => setActiveSection(n.id)}
          >
            <span className="bnav-icon">{n.icon}</span>
            {n.short}
            {activeSection === n.id && <span className="bnav-dot" />}
          </button>
        ))}
      </nav>
    </>
  );
}
