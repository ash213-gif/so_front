import React, { useState, useEffect } from "react";
import "../User/user.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Components/Context/User/UserData";
import { BASE_URL}from '../../../GlobalUrl'
import axios from "axios";
import { socket } from "../../../Socket";
import { ToastContainer, toast } from 'react-toastify'

import React from 'react'

export default function Summary() {
 useEffect(() => {
  if (!id) return;

  const fetchSummary = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/transactionsummary/${id}`);
console.log(res)
      summary(res.data);

      setActivities(res.data?.history || []);
      console.log(summary)
    } catch (err) {
      console.error(err);
    }
  };

  fetchSummary();

}, [id]);


useEffect(() => {

  const handleTransaction = (data) => {
    if (data.userId === id) {
      setActivities((prev) => [data, ...(prev || [])]);
    }
  };

  socket.on("transactionUpdated", handleTransaction);

  return () => {
    socket.off("transactionUpdated", handleTransaction);
  };

}, [id]);

  return (
    <>


         <div className="prof-section-body">
                  <div className="prof-activity-list">
                    {activities.map((a, i) => (
                      <div className="prof-activity-item" key={i}>
                        <span className={`prof-act-dot ${a.amount}`} />
                        <div className="prof-act-info">
                          <span> amount: {a.amount}</span>
                          <strong>{a.transactionId}</strong>
                        </div>
                        <span className="prof-act-time">{a.updatedAt}</span>
                      </div>
                    ))}
                  </div>
                </div>
    </>
  )
}
