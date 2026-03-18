import React, { useEffect, useState } from 'react'
import '../User/user.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Components/Context/User/UserData'
import { BASE_URL } from '../../../GlobalUrl'
import axios from 'axios'
import { socket } from '../../../Socket'
import { ToastContainer, toast } from 'react-toastify'

export default function Summary () {
  const { user } = useAuth()
  const id = user?._id
  const [summ, setsumm] = useState({})

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/transactionsummary/${id}`)
        setsumm(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    if (id) {
      fetchSummary()
    }
  }, [id])

return (
  <div className="summary-page">

    {/* Red Banner */}
    <div className="summary-banner">
      <p className="banner-label">Your Impact</p>
      <h1 className="banner-title">Donation Summary</h1>
      <p className="banner-sub">A record of your generosity</p>
    </div>

    <div className="summary-container">

      {/* Stat Cards */}
      <div className="summary-stats">
        <div className="stat-card">
          <div className="stat-icon">🤝</div>
          <div className="stat-label">Times Donated</div>
          <div className="stat-value">{summ?.totalTimes ?? 0}</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💛</div>
          <div className="stat-label">Total Donated</div>
          <div className="stat-value">
            <span className="currency">₹</span>
            {summ.totalAmount ?? 0}
          </div>
        </div>
      </div>

      {/* History */}
      <div className="summary-history">
        <div className="history-header">
          <h3>Transaction History</h3>
          <span className="history-badge">{summ?.history?.length ?? 0} donations</span>
        </div>
        <div className="history-list">
          {summ?.history?.length > 0 ? (
            summ.history.map((item, index) => (
              <div key={item._id || index} className="history-item">
                <div className="history-item-left">
                  <div className="history-dot" />
                  <span className="history-index">Donation #{index + 1}</span>
                </div>
                  <span className="history-index">{item.transactionId}</span>
                <span className="history-amount">
                  <span className="rupee">₹</span>{item.amount}
                </span>
              </div>
            ))
          ) : (
            <div className="history-empty">
              <span className="empty-icon">📭</span>
              No donations yet
            </div>
          )}
        </div>
      </div>

    </div>
    <ToastContainer />
  </div>
)
}
