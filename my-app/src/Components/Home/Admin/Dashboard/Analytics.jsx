import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import axios from "axios";
import { BASE_URL } from "../../../../GlobalUrl";
import { socket } from "../../../../Socket";
import "./Analytics.css";

export default function Analytics() {
  const [data, setData] = useState({
    monthlyDonations: [],
    yearlyDonations: [],
    totalDonations: 0,
    userGrowth: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch initial data
        const res = await axios.get(`${BASE_URL}/analytics`);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchData();

    // Listen for real-time updates
    socket.connect();
    const onAnalytics = (newData) => {
      console.log("Received analytics update:", newData);
      setData(newData);
    };
    socket.on("admin:analytics", onAnalytics);

    return () => {
      socket.off("admin:analytics", onAnalytics);
      socket.disconnect();
    };
  }, []);

  return (
    <div className="analytics-container">
      <h2 className="analytics-header">Analytics Dashboard</h2>

      <div className="analytics-summary">
        <div className="analytics-card summary-card">
          <h3>Total Donations</h3>
          <div className="summary-value">₹{data.totalDonations?.toLocaleString("en-IN")}</div>
        </div>
      </div>

      <div className="analytics-charts">
        {/* Last 30 Days Donations */}
        <div className="analytics-card">
          <h3>Last 30 Days Donations</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthlyDonations}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="_id" tick={{ fontSize: 12 }} tickFormatter={(val) => val.slice(5)} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={2} name="Amount (₹)" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Yearly Donations by Month */}
        <div className="analytics-card">
          <h3>Yearly Donations (Monthly)</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.yearlyDonations}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="_id" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} name="Amount (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth */}
        <div className="analytics-card">
          <h3>User Growth (Monthly)</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="_id" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#f59e0b" strokeWidth={2} name="New Users" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}