import React, { useState } from 'react'
import { useAuth } from '../../Context/User/UserData.jsx'
import { ToastContainer, toast } from 'react-toastify'
import { BASE_URL } from '../../../GlobalUrl.js'
import { motion, AnimatePresence } from 'framer-motion'
import '../../Payment/DonationPage/Form.css'
import { Paymenthook } from '../../CustomHook/Paymenthook.jsx'

 
export default function Form () {
  const { user, token } = useAuth()
  const presetAmounts = [100, 500, 1000, 5000]
  const [customInput, setCustomInput] = useState('')

  
  const donorId = user?._id
  const campaignId = '698bed73bafa40b123a181b9'
  const { handlePayment, loadRazorpayScript,loading,setLoading,amount,setAmount } = Paymenthook()

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