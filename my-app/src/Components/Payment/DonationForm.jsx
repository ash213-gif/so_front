import React from 'react'
import { useState  } from 'react'
import { useAuth } from '../Context/User/UserData'
import  Donation  from  './DonDesign.jsx'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {  BASE_URL } from '../../GlobalUrl'
 
const DonationForm = () => {
  const [amount, setAmount] = useState(500); // in rupees
  const [loading, setLoading] = useState(false);
  const donorId= '698acafe14168ff561a2d065';
  const campaignId='698bed73bafa40b123a181b9';
  const { user } =useAuth();
  console.log(user)

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-js")) {
        return resolve(true);
      }
      const script = document.createElement("script");
      script.id = "razorpay-js";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

if (!user) {
      toast.error("Please login to make a donation");
      setLoading(false);
      return;
    }


    try {
      // 1. Create order from backend
      const res = await fetch(`${BASE_URL}/createdonation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, donorId, campaignId }), // Rs amount
      });

      const data = await res.json();
      if (!res.ok || !data.orderId) {
        throw new Error(data.message || "Failed to create order");
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: "rzp_test_SGkSK3FxBQMt3c",
        amount: data.amount,        // in paise from backend
        currency: data.currency,    // e.g. "INR"
        name: "Sharavan Donation",
        description: "Help us make a difference",
        order_id: data.orderId,
        handler: async function (res) {
          try {
            const option2={
              razorpay_order_id:res.razorpay_order_id,
              razorpay_payment_id:res.razorpay_payment_id,
              razorpay_signature:res.razorpay_signature,
            }
            const verifyRes = await fetch(`${BASE_URL}/verify`,
 {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(option2),
              }
            );

            const result = await verifyRes.json();
            alert(result.message);
          } catch (err) {
            console.error(err);
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <ToastContainer />
        <Donation />
      <h2>Donate</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount in INR"
      />
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay"}
      </button>
    </div>
  );
};

export default DonationForm;
