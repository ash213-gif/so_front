// import React, { useEffect } from "react";

// const loadRazorpayScript = () =>
//   new Promise((resolve) => {
//     if (document.getElementById("razorpay-script")) return resolve(true);
//     const script = document.createElement("script");
//     script.id = "razorpay-script";
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });

// export default function RazorpayButton({
//   amount = 500,
//   name = "My App",
//   description = "Test Transaction",
//   prefill = { name: "Test User", email: "test@example.com", contact: "9999999999" },
//   onSuccess,
// }) {
//   useEffect(() => {
//     loadRazorpayScript();
//   }, []);

//   const handlePayment = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/payment/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount }),
//       });
//       const data = await res.json();
//       if (!data?.orderId) return alert("Failed to create order");

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY || "YOUR_PUBLIC_KEY_ID",
//         amount: data.amount,
//         currency: data.currency,
//         name,
//         description,
//         order_id: data.orderId,
//         handler: async function (response) {
//           try {
//             const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(response),
//             });
//             const result = await verifyRes.json();
//             if (onSuccess) onSuccess(result);
//             else alert(result.message || "Payment response received");
//           } catch (err) {
//             console.error(err);
//             alert("Verification failed");
//           }
//         },
//         prefill,
//         theme: { color: "#3399cc" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       alert("Payment failed to initialize");
//     }
//   };

//   return (
//     <button onClick={handlePayment}>
//       Pay Rs {amount}
//     </button>
//   );
// }
