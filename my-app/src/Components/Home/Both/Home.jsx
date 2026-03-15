import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../../../GlobalUrl";
import { useGetCampaign } from "../../Context/User/Getcampaign";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";
import { useAuth } from "../../Context/User/UserData.jsx";
import Three from '../../Three.js/Three'



const Home = () => {
  const { user, token } = useAuth();
  const { setgetcampaign, getcampaign } = useGetCampaign();

  const [loadingId, setLoadingId] = useState(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");

  // Load Razorpay script once
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (document.getElementById("razorpay-js")) return resolve(true);
      const script = document.createElement("script");
      script.id = "razorpay-js";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  // Handle Payment
  const handlePayment = async (campaignId, amountInput) => {
    if (!user || !token) {
      toast.error("Please login to make a donation");
      return;
    }

    const amount = Number(amountInput);

    if (!amount || amount < 1) {
      toast.error("Enter valid donation amount");
      return;
    }

    setLoadingId(campaignId);

    try {
      const res = await fetch(`${BASE_URL}/auth/createdonation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          donorId: user._id,
          campaignId,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.orderId) {
        throw new Error(data.message || "Order creation failed");
      }

      const options = {
        key: "rzp_test_SGkSK3FxBQMt3c", // Replace with your Razorpay Test Key
        amount: data.amount,
        currency: data.currency || "INR",
        name: "Sharavan Donation",
        description: "Donation Payment",
        order_id: data.orderId,
        handler: async function (rzpRes) {
          await fetch(`${BASE_URL}/auth/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              razorpay_order_id: rzpRes.razorpay_order_id,
              razorpay_payment_id: rzpRes.razorpay_payment_id,
              razorpay_signature: rzpRes.razorpay_signature,
            }),
          });

          toast.success("Donation Successful ❤️");
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        theme: { color: "#dc2626" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  // Fetch Campaigns
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getCampaigns`);
        if (response.status === 200 && Array.isArray(response.data.data)) {
          setgetcampaign(response.data.data);
        } else {
          toast.error("Unexpected campaigns response");
        }
      } catch (err) {
        toast.error("Failed to load campaigns");
      }
    };

    fetchCampaigns();
  }, [setgetcampaign]);

  return (
    <>
    
        <div>
          <Three />
        </div>
     
      <ToastContainer />

      <div className="home-container">
        <h2 className="section-title">Featured Campaigns</h2>

        <div className="campaign-grid">
          {Array.isArray(getcampaign) &&
            getcampaign.map((c) => (
              <div className="campaign-card" key={c._id}>
                <div className="card-image-wrapper">
                  <img
                    src={
                      c.image ||
                      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=800"
                    }
                    alt={c.title}
                    className="card-image"
                  />
                </div>

                <div className="card-content">
                  <h3 className="card-title">{c.title}</h3>
                  <p className="card-desc">{c.description}</p>

                  <div className="card-footer">
                    <span className="card-location">📍 {c.location}</span>

                    <button
                      onClick={() => {
                        setSelectedCampaign(c._id);
                        setShowModal(true);
                      }}
                      className="donate-btn"
                      disabled={loadingId === c._id}
                    >
                      {loadingId === c._id ? "Processing..." : "Donate"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Donation Modal (Inline styles so CSS untouched) */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "300px",
              textAlign: "center",
            }}
          >
            <h3>Enter Donation Amount</h3>

            <input
              type="number"
              placeholder="Enter amount in ₹"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                margin: "15px 0",
              }}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => {
                  handlePayment(selectedCampaign, donationAmount);
                  setShowModal(false);
                  setDonationAmount("");
                }}
              >
                Proceed
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  setDonationAmount("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;