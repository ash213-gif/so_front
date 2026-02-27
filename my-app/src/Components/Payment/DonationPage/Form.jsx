import React from 'react'
import { useState } from 'react'
import { useAuth } from '../../Context/User/UserData.jsx'
import InfoPanel from './InfoPanel.jsx'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../GlobalUrl.js'
import { motion } from 'framer-motion'

export default function Form () {
  const { user, token } = useAuth()
  const presetAmounts = [100, 500, 1000, 5000]
  const [amount, setAmount] = useState(500) // in rupees
  const donorId = user?._id
  const [loading, setloading] = useState(false)
  const campaignId = '698bed73bafa40b123a181b9'

  const loadRazorpayScript = () => {
    return new Promise(resolve => {
      if (document.getElementById('razorpay-js')) {
        return resolve(true)
      }
      const script = document.createElement('script')
      script.id = 'razorpay-js'
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

 const handlePayment = async () => {
  setloading(true);
  const scriptLoaded = await loadRazorpayScript();
  if (!scriptLoaded) {
    toast.error('Razorpay SDK failed to load. Are you online?');
    setloading(false);
    return;
  }

  if (!user || !token) {
    toast.error('Please login to make a donation');
    setloading(false);
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/auth/createdonation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount, donorId, campaignId }),
    });

    const contentType = res.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');

    if (!isJson) {
      const text = await res.text();
      console.error('Non‑JSON response from /auth/createdonation:', text);
      throw new Error('Backend returned HTML or non‑JSON response');
    }

    const data = await res.json();

    if (!res.ok || !data.orderId) {
      throw new Error(data.message || 'Failed to create order');
    }

    const options = {
      key: 'rzp_test_SGkSK3FxBQMt3c',
      amount: data.amount,
      currency: data.currency,
      name: 'Sharavan Donation',
      description: 'Help us make a difference',
      order_id: data.orderId,
      handler: async function (res) {
        try {
          const option2 = {
            razorpay_order_id: res.razorpay_order_id,
            razorpay_payment_id: res.razorpay_payment_id,
            razorpay_signature: res.razorpay_signature,
          };
          const verifyRes = await fetch(`${BASE_URL}/auth/verify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(option2),
          });

          const verifyContentType = verifyRes.headers.get('content-type');
          if (!verifyContentType?.includes('application/json')) {
            const text = await verifyRes.text();
            console.error('Non‑JSON response from /auth/verify:', text);
            throw new Error('Verification API did not return JSON');
          }

          const result = await verifyRes.json();
          toast.success(
            result.message ||
              'Payment successful! Thank you for your donation.'
          );
        } catch (err) {
          console.error(err);
          alert('Payment verification failed');
        } finally {
          setloading(false);
        }
      },
      prefill: {
        name: 'Test User',
        email: 'test@example.com',
        contact: '9999999999',
      },
      theme: { color: '#3399cc' },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('dismiss', () => setloading(false));
    rzp.open();
  } catch (err) {
    console.error(err);
    alert(err.message || 'Something went wrong');
    setloading(false);
  }
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='max-w-md w-full  h-full mt-10  bg-white rounded-3xl shadow-2xl p-8 border border-gray-100'
    >
      {/* Header */}
      <h2 className='text-3xl font-serif font-bold text-gray-900'>
        Donate Now
      </h2>
      <p className='text-gray-500 mt-2'>
        Choose a preset or enter a custom amount
      </p>

      {/* Preset Buttons */}
      <div className='grid grid-cols-4 gap-3 mt-6'>
        {presetAmounts.map(value => {
          const active = amount === value
          return (
            <motion.button
              key={value}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setAmount(value)}
              className={`py-3 rounded-xl font-semibold transition-all duration-300 border
                ${
                  active
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-transparent shadow-lg'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-red-400'
                }`}
            >
              ₹{value.toLocaleString()}
            </motion.button>
          )
        })}
      </div>

      {/* Custom Input */}
      <div className='mt-8 relative'>
        <span className='absolute left-2 top-2.5 bold -translate-y-1/2 text-red-600 font-semibold text-lg'>
          ₹
        </span>
        <input
          className='p-2.5 w-4/5  text-center mt-2 absolute -translate-y-1/2 rounded-2xl border-3 border-red-600'
          type='number'
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          placeholder=' Minimum donation: ₹1'
        />
      </div>

      {/* Impact Info */}
      <motion.div
        key={amount}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='mt-22 bg-red-50 border border-red-100 rounded-2xl p-5'
      >
        <p className='text-gray-700 leading-relaxed'>
          💡 Your donation of{' '}
          <span className='font-semibold text-red-600'>
            ₹{amount.toLocaleString()}
          </span>{' '}
          will directly support an active campaign and help us reach more people
          in need.
        </p>
      </motion.div>

      {/* CTA */}
      <motion.button
        onClick={handlePayment}
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.03 }}
        whileTap={{ scale: loading ? 1 : 0.97 }}
        className='mt-8 w-full py-4 rounded-2xl text-white text-lg font-semibold
        bg-gradient-to-r from-red-600 to-rose-600 shadow-xl
        hover:shadow-red-300/50 transition-all duration-300'
      >
        {loading ? 'loading...' : `Pay ₹${amount.toLocaleString()} Securely`}
      </motion.button>

      {/* Trust Badge */}
      <p className='text-center text-xs text-gray-400 mt-4'>
        🔒 100% Secure • Encrypted Payments • Full Transparency
      </p>

      <ToastContainer />
    </motion.div>
  )
}
