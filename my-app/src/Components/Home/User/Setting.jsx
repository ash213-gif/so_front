
// import React, { useState, useEffect } from "react";
// import "../User/user.css";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../../Components/Context/User/UserData";
// import { BASE_URL}from '../../../GlobalUrl'
// import axios from "axios";
// import { socket } from "../../../Socket";
// import { ToastContainer, toast } from 'react-toastify'

// export default function Setting() {
//   return (
//     <>
//          {activeSection === "security" && (
//               <>
//                 <div className="prof-section">
//                   <div className="prof-section-header">
//                     <div className="prof-section-title">
//                       <div className="prof-section-icon">🔒</div>
//                       Security Settings
//                     </div>
//                   </div>
//                   <div className="prof-section-body">
//                     <div className="prof-security-item">
//                       <div className="prof-sec-left">
//                         <div className="prof-sec-icon">🔑</div>
//                         <div className="prof-sec-info">
//                           <strong>Password</strong>
//                           <span>Last changed 3 months ago</span>
//                         </div>
//                       </div>
//                       <button className="prof-sec-action">Change</button>
//                     </div>
//                     <div className="prof-security-item">
//                       <div className="prof-sec-left">
//                         <div className="prof-sec-icon">📱</div>
//                         <div className="prof-sec-info">
//                           <strong>Two-Factor Authentication</strong>
//                           <span>Protect your account with 2FA</span>
//                         </div>
//                       </div>
//                       <button className="prof-sec-action">Enable</button>
//                     </div>
//                     <div className="prof-security-item">
//                       <div className="prof-sec-left">
//                         <div className="prof-sec-icon">💻</div>
//                         <div className="prof-sec-info">
//                           <strong>Active Sessions</strong>
//                           <span>2 devices currently logged in</span>
//                         </div>
//                       </div>
//                       <button className="prof-sec-action">Manage</button>
//                     </div>
//                     <div className="prof-security-item">
//                       <div className="prof-sec-left">
//                         <div className="prof-sec-icon">📋</div>
//                         <div className="prof-sec-info">
//                           <strong>Login History</strong>
//                           <span>View recent login activity</span>
//                         </div>
//                       </div>
//                       <button className="prof-sec-action">View</button>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="prof-section">
//                   <div className="prof-section-header">
//                     <div className="prof-section-title">
//                       <div
//                         className="prof-section-icon"
//                         style={{ background: "#fff5f5", color: "#C0162C" }}
//                       >
//                         ⚠️
//                       </div>
//                       Danger Zone
//                     </div>
//                   </div>
//                   <div className="prof-section-body">
//                     <div
//                       className="prof-danger-zone"
//                       style={{ marginBottom: 12 }}
//                     >
//                       <div>
//                         <div className="prof-danger-title">
//                           Deactivate Account
//                         </div>
//                         <div className="prof-danger-desc">
//                           Temporarily disable your account. You can reactivate
//                           at any time.
//                         </div>
//                       </div>
//                       <button
//                         className="prof-danger-btn"
//                         style={{ background: "#f59e0b" }}
//                         onClick={handleDeactivateAccount}
//                       >
//                         Deactivate
//                       </button>
//                     </div>
//                     <div className="prof-danger-zone">
//                       <div>
//                         <div className="prof-danger-title">Delete Account</div>
//                         <div className="prof-danger-desc">
//                           Permanently delete your account and all associated
//                           data. This cannot be undone.
//                         </div>
//                       </div>
//                       <button className="prof-danger-btn" onClick={handleDeleteAccount}>Delete</button>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}
//     </>
//   )
// }

import React from 'react'

export default function Setting() {
  return (
    <div>Setting</div>
  )
}
