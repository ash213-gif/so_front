import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { BASE_URL } from '../../GlobalUrl'
import { useAuth } from '../Context/User/UserData'

const Otpverify = () => {
  const [otp, setOtp] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  // IMPORTANT: destructure what AuthContext actually provides
  const { user } = useAuth()

  const email = location.state?.email || user?.email

  // formData should be safe; handle case when user is null


  useEffect(() => {
    if (!id || id === 'undefined') {
      toast.error('User identifier not found. Redirecting to sign up.')
      setTimeout(() => navigate('/signup'), 3000)
      return
    }

    if (!email) {
      toast.error('No email found for verification. Redirecting...')
      setTimeout(() => navigate('/login'), 3000)
    } else {
      toast.info(`An OTP has been sent to ${email}`)
    }
  }, [id, email, navigate])

  const handleChange = e => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    if (value.length <= 6) {
      setOtp(value)
    }
  }

  const handleResend = async () => {
    try {
      toast.info('Resending OTP...')
     const res= await axios.put(`${BASE_URL}/resendotp/${id}`, {
        method:'POST'
      })
      console.log(res)
      toast.success('A new OTP has been sent to your email.')
    } catch (error) {
      const msg = error?.response?.data?.message || 'Failed to resend OTP.'
      toast.error(msg)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP.')
      return
    }
    setIsSubmitting(true)
    try {
      // 1) Verify OTP
      const verifyRes = await axios.post(`${BASE_URL}/${id}/verifyotp`, {
        Otp: otp
      })

      // axios does not have response.ok, use status instead
      if (verifyRes.status === 200 || verifyRes.status === 201) {
        toast.success(verifyRes.data?.message || 'Verification successful!')
        navigate('/login')
      }
    } catch (error) {
      console.error('OTP Verification/Login error:', error)
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        'OTP verification failed.'
      toast.error(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ov-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          background: #fff;
          position: relative;
          overflow: hidden;
        }

        /* ── Animated Background ── */
        .ov-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background: #fff;
          overflow: hidden;
        }

        .ov-bg-circle {
          position: absolute;
          border-radius: 50%;
          animation: floatCircle linear infinite;
          opacity: 0;
        }

        .ov-bg-circle:nth-child(1) { width: 500px; height: 500px; background: radial-gradient(circle, rgba(192,22,44,0.08) 0%, transparent 70%); top: -150px; left: -150px; animation-duration: 18s; animation-delay: 0s; }
        .ov-bg-circle:nth-child(2) { width: 400px; height: 400px; background: radial-gradient(circle, rgba(192,22,44,0.06) 0%, transparent 70%); bottom: -100px; right: -100px; animation-duration: 22s; animation-delay: -6s; }
        .ov-bg-circle:nth-child(3) { width: 280px; height: 280px; background: radial-gradient(circle, rgba(192,22,44,0.05) 0%, transparent 70%); top: 40%; left: 60%; animation-duration: 26s; animation-delay: -12s; }
        .ov-bg-circle:nth-child(4) { width: 200px; height: 200px; background: radial-gradient(circle, rgba(192,22,44,0.07) 0%, transparent 70%); top: 20%; right: 25%; animation-duration: 20s; animation-delay: -4s; }

        @keyframes floatCircle { 0% { transform: translate(0, 0) scale(1); opacity: 0; } 10% { opacity: 1; } 50% { transform: translate(30px, -40px) scale(1.05); } 90% { opacity: 1; } 100% { transform: translate(0, 0) scale(1); opacity: 0; } }

        .ov-bg-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(192,22,44,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(192,22,44,0.04) 1px, transparent 1px); background-size: 48px 48px; }

        /* ── Card ── */
        .ov-card { position: relative; z-index: 1; width: 100%; max-width: 440px; margin: 1.5rem; background: #ffffff; border: 1.5px solid rgba(0,0,0,0.08); border-radius: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.04), 0 20px 60px rgba(192,22,44,0.08), 0 1px 0 rgba(255,255,255,0.9) inset; padding: 2.75rem 2.5rem 2.5rem; animation: cardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }

        @keyframes cardIn { from { opacity: 0; transform: translateY(32px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

        /* ── Header ── */
        .ov-logo-row { display: flex; align-items: center; gap: 10px; margin-bottom: 2rem; }
        .ov-logo-badge { width: 42px; height: 42px; background: #C0162C; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 700; color: #fff; flex-shrink: 0; box-shadow: 0 4px 12px rgba(192,22,44,0.3); }
        .ov-logo-text { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-weight: 600; color: #1a1a1a; line-height: 1.2; }
        .ov-logo-text small { display: block; font-family: 'DM Sans', sans-serif; font-size: 0.62rem; font-weight: 400; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(0,0,0,0.38); }
        .ov-heading { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 700; color: #1a1a1a; letter-spacing: -0.01em; line-height: 1.15; margin-bottom: 0.35rem; }
        .ov-heading span { color: #C0162C; }
        .ov-sub { font-size: 0.85rem; color: rgba(0,0,0,0.4); margin-bottom: 2rem; font-weight: 400; word-break: break-all; }

        /* ── Form ── */
        .ov-form { display: flex; flex-direction: column; gap: 1.4rem; }
        .ov-field { position: relative; }
        .ov-input { width: 100%; height: 56px; padding: 18px 14px 6px; font-family: 'DM Sans', sans-serif; font-size: 1.2rem; font-weight: 600; color: #1a1a1a; background: #fafafa; border: 1.5px solid rgba(0,0,0,0.1); border-radius: 10px; outline: none; transition: border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease; appearance: none; text-align: center; letter-spacing: 0.5em; }
        .ov-input:focus { background: #fff; border-color: #C0162C; box-shadow: 0 0 0 3.5px rgba(192,22,44,0.1); }
        .ov-input:focus + .ov-label, .ov-input:not(:placeholder-shown) + .ov-label { top: 9px; font-size: 0.68rem; color: #C0162C; font-weight: 600; letter-spacing: 0.06em; }
        .ov-label { position: absolute; top: 50%; left: 14px; transform: translateY(-50%); font-size: 0.88rem; font-weight: 400; color: rgba(0,0,0,0.38); pointer-events: none; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); transform-origin: left center; white-space: nowrap; }
        
        /* ── Submit ── */
        .ov-submit { position: relative; width: 100%; height: 52px; background: #C0162C; color: #fff; font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 600; letter-spacing: 0.05em; border: none; border-radius: 10px; cursor: pointer; overflow: hidden; transition: background 0.2s, transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 16px rgba(192,22,44,0.3); margin-top: 0.25rem; }
        .ov-submit::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%); pointer-events: none; }
        .ov-submit:hover:not(:disabled) { background: #a01225; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(192,22,44,0.38); }
        .ov-submit:active:not(:disabled) { transform: translateY(0); }
        .ov-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .ov-submit-inner { display: flex; align-items: center; justify-content: center; gap: 8px; }

        /* Spinner */
        .ov-spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.35); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; flex-shrink: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Resend link ── */
        .ov-resend-row { margin-top: 1.5rem; text-align: center; font-size: 0.85rem; color: rgba(0,0,0,0.45); }
        .ov-resend-row button { color: #C0162C; font-weight: 600; text-decoration: none; transition: opacity 0.2s; background: none; border: none; cursor: pointer; font-family: inherit; font-size: inherit; padding: 0; }
        .ov-resend-row button:hover { opacity: 0.75; }

        @media (max-width: 480px) { .ov-card { padding: 2rem 1.5rem; margin: 1rem; } .ov-heading { font-size: 1.7rem; } }
      `}</style>

      <div className='ov-root'>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
        />

        <div className='ov-bg'>
          <div className='ov-bg-grid' />
          <div className='ov-bg-circle' />
          <div className='ov-bg-circle' />
          <div className='ov-bg-circle' />
          <div className='ov-bg-circle' />
        </div>

        <div className='ov-card'>
          <div className='ov-logo-row'>
            <div className='ov-logo-badge'>S</div>
            <div className='ov-logo-text'>
              Shravan Singh
              <small>Society</small>
            </div>
          </div>

          <h1 className='ov-heading'>
            Verify your <span>account.</span>
          </h1>
          <p className='ov-sub'>
            {email
              ? `An OTP has been sent to ${email}.`
              : 'Please enter the OTP sent to your email.'}
          </p>

          <form onSubmit={handleSubmit} className='ov-form'>
            <div className='ov-field'>
              <input
                id='otp'
                type='text'
                name='otp'
                placeholder=' '
                value={otp}
                onChange={handleChange}
                required
                className='ov-input'
                autoComplete='one-time-code'
                inputMode='numeric'
              />
              <label htmlFor='otp' className='ov-label'>
                Enter 6-Digit OTP
              </label>
            </div>

            <button
              type='submit'
              className='ov-submit'
              disabled={isSubmitting || !email || !id || id === 'undefined'}
            >
              <span className='ov-submit-inner'>
                {isSubmitting && <span className='ov-spinner' />}
                {isSubmitting ? 'Verifying…' : 'Verify & Proceed'}
              </span>
            </button>
          </form>

          <div className='ov-resend-row'>
            Didn't receive the code?&nbsp;
            <button
              onClick={handleResend}
              disabled={!email || !id || id === 'undefined'}
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Otpverify
