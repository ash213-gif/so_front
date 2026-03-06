import React, { useState } from 'react'
import { useAuth } from '../../Context/User/UserData.jsx'
import { ToastContainer, toast } from 'react-toastify'
import { BASE_URL } from '../../../GlobalUrl.js'
import { motion, AnimatePresence } from 'framer-motion'
import '../../Payment/DonationPage/Form.css'

export default function Form () {
  const { user, token } = useAuth()
  const presetAmounts = [100, 500, 1000, 5000]
  const [amount, setAmount] = useState(500)
  const [customInput, setCustomInput] = useState('')
  const [loading, setLoading] = useState(false)
 
  const donorId = user?._id
  const campaignId = '698bed73bafa40b123a181b9'

  // ─── Helpers ────────────────────────────────────────────────────────────────

  const loadRazorpayScript = () =>
    new Promise(resolve => {
      if (document.getElementById('razorpay-js')) return resolve(true)
      const script = document.createElement('script')
      script.id = 'razorpay-js'
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })

  const handlePreset = value => {
    setAmount(value)
    setCustomInput('')
  }

  const handleCustomChange = e => {
    const val = e.target.value
    setCustomInput(val)
    const num = Number(val)
    if (!isNaN(num) && num > 0) setAmount(num)
  }

  // ─── Payment ─────────────────────────────────────────────────────────────────

  const handlePayment = async () => {
   
    if (!user || !token) {
      toast.error('Please login to make a donation')
      return
    }
    if (!amount || amount < 1) {
      toast.error('Please enter a valid donation amount')
      return
    }

    setLoading(true)

    const scriptLoaded = await loadRazorpayScript()
    if (!scriptLoaded) {
      toast.error('Razorpay SDK failed to load. Check your internet connection.')
      setLoading(false)
      return
    }

    try {
      // 1. Create order on backend
      const res = await fetch(`${BASE_URL}/auth/createdonation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount, donorId, campaignId }),
      })

      const contentType = res.headers.get('content-type') ?? ''
      if (!contentType.includes('application/json')) {
        const text = await res.text()
        console.error('Non-JSON from /auth/createdonation:', text)
        throw new Error('Server error — please try again later.')
      }

      const data = await res.json()

      if (!res.ok || !data.orderId) {
        throw new Error(data.message || 'Failed to create order. Try again.')
      }

      // 2. Open Razorpay checkout
      const options = {
        key: 'rzp_test_SGkSK3FxBQMt3c',
        amount: data.amount,       // in paise — backend should send this
        currency: data.currency ?? 'INR',
        name: 'Sharavan Donation',
        description: 'Help us make a difference',
        order_id: data.orderId,

        // 3. Verify payment after success
        handler: async function (rzpRes) {
          try {
            const verifyRes = await fetch(`${BASE_URL}/auth/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_order_id: rzpRes.razorpay_order_id,
                razorpay_payment_id: rzpRes.razorpay_payment_id,
                razorpay_signature: rzpRes.razorpay_signature,
              }),
            })

            const verifyCT = verifyRes.headers.get('content-type') ?? ''
            if (!verifyCT.includes('application/json')) {
              const text = await verifyRes.text()
              console.error('Non-JSON from /auth/verify:', text)
              throw new Error('Verification service error.')
            }

            const result = await verifyRes.json()

            if (!verifyRes.ok) {
              throw new Error(result.message || 'Payment verification failed.')
            }

            toast.success(result.message ?? 'Payment successful! Thank you for your donation. 🙏')
          } catch (err) {
            console.error('Verification error:', err)
            toast.error(err.message || 'Payment verification failed. Contact support.')
          } finally {
            setLoading(false)
          }
        },

        prefill: {
          name: user?.name ?? '',
          email: user?.email ?? '',
          contact: user?.phone ?? '',
        },

        theme: { color: '#dc2626' },

        modal: {
          // Called when the Razorpay modal is closed without completing payment
          ondismiss: () => {
            toast.info('Payment cancelled.')
            setLoading(false)
          },
        },
      }

      const rzp = new window.Razorpay(options)

      // Handle payment failures inside the modal
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error)
        toast.error(
          response.error?.description ?? 'Payment failed. Please try again.'
        )
        setLoading(false)
      })

      rzp.open()
    } catch (err) {
      console.error('handlePayment error:', err)
      toast.error(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const isPresetActive = val => amount === val && customInput === ''

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <motion.div
      className="donation-form"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="donation-form__header">
        <h2 className="donation-form__title">Make a Donation</h2>
        <p className="donation-form__subtitle">
          Choose a preset amount or enter a custom value below.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="donation-form__presets">
        {presetAmounts.map(value => (
          <motion.button
            key={value}
            className={`preset-btn${isPresetActive(value) ? ' preset-btn--active' : ''}`}
            onClick={() => handlePreset(value)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.04 }}
          >
            ₹{value.toLocaleString('en-IN')}
          </motion.button>
        ))}
      </div>

      {/* Custom Amount */}
      <div className="donation-form__custom">
        <label htmlFor="custom-amount" className="donation-form__label">
          Or enter a custom amount
        </label>
        <div className="donation-form__input-wrapper">
          <span className="donation-form__currency-symbol" aria-hidden="true">₹</span>
          <input
            id="custom-amount"
            className="donation-form__input"
            type="number"
            min="1"
            value={customInput}
            onChange={handleCustomChange}
            placeholder="Enter amount"
          />
        </div>
      </div>

      {/* Impact Banner */}
      <AnimatePresence mode="wait">
        <motion.div
          key={amount}
          className="donation-form__impact"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <span className="donation-form__impact-icon" aria-hidden="true">💡</span>
          <p className="donation-form__impact-text">
            Your donation of{' '}
            <span className="donation-form__impact-amount">
              ₹{amount.toLocaleString('en-IN')}
            </span>{' '}
            will directly support an active campaign and help us reach more people in need.
          </p>
        </motion.div>
      </AnimatePresence>

      {/* CTA Button */}
      <motion.button
        className="donation-form__cta"
        onClick={handlePayment}
        disabled={loading || !amount || amount < 1}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.97 }}
      >
        {loading ? (
          <>
            <span className="donation-form__spinner" />
            Processing…
          </>
        ) : (
          `Donate ₹${amount.toLocaleString('en-IN')} Securely`
        )}
      </motion.button>

      {/* Trust Badge */}
      <p className="donation-form__trust">
        🔒 100% Secure &nbsp;•&nbsp; Encrypted Payments &nbsp;•&nbsp; Full Transparency
      </p>

      <ToastContainer position="bottom-right" autoClose={4000} />
    </motion.div>
  )
}