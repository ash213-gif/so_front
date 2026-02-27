import React, { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BASE_URL } from '../../../../GlobalUrl'

const Campaign = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAmount: '',
    category: 'Education',
    deadline: ''
  })
  const [loading, setLoading] = useState(false)

  const categories = ['Education', 'Medical', 'Disaster', 'Environment']

  const categoryIcons = {
    Education: '📚',
    Medical: '🏥',
    Disaster: '🆘',
    Environment: '🌿'
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    if (
      !formData.title ||
      !formData.description ||
      !formData.targetAmount ||
      !formData.deadline
    ) {
      toast.error('Please fill out all fields.')
      setLoading(false)
      return
    }

    try {
      const payload = {
        ...formData,
        targetAmount: Number(formData.targetAmount)
      }

      await axios.post(`${BASE_URL}/createCampaign`, payload)

      toast.success('Campaign created successfully!')
      setFormData({
        title: '',
        description: '',
        targetAmount: '',
        category: 'Education',
        deadline: ''
      })
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        'Failed to create campaign. Please try again.'
      toast.error(msg)
      console.error('Campaign creation error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');

        :root {
          --crimson: #0077B6;
          --crimson-dark: #005a8e;
          --crimson-light: #e0f2fe;
          --ink: #1a1a1a;
          --muted: #6b7280;
          --surface: #ffffff;
          --border: #e5e7eb;
          --bg: #f0f8ff;
        }

        .cf-wrapper {
          min-height: 100vh;
          background: var(--bg);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 3rem 1rem;
          font-family: 'DM Sans', sans-serif;
        }

        .cf-card {
          width: 100%;
          max-width: 460px;
          background: var(--surface);
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.08);
          overflow: hidden;
        }

        .cf-header {
          background: var(--crimson);
          padding: 2rem 2.5rem;
          position: relative;
          overflow: hidden;
        }

        .cf-header::before {
          content: '';
          position: absolute;
          top: -40px;
          right: -40px;
          width: 160px;
          height: 160px;
          background: rgba(255,255,255,0.06);
          border-radius: 50%;
        }

        .cf-header::after {
          content: '';
          position: absolute;
          bottom: -60px;
          right: 40px;
          width: 120px;
          height: 120px;
          background: rgba(255,255,255,0.04);
          border-radius: 50%;
        }

        .cf-header-eyebrow {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          margin-bottom: 0.5rem;
        }

        .cf-header h2 {
          font-family: 'Playfair Display', serif;
          font-size: 1.9rem;
          color: #ffffff;
          margin: 0;
          line-height: 1.2;
          position: relative;
          z-index: 1;
        }

        .cf-body {
          padding: 2.5rem;
        }

        .cf-group {
          margin-bottom: 1.5rem;
        }

        .cf-label {
          display: block;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: 0.03em;
          margin-bottom: 0.45rem;
        }

        .cf-input,
        .cf-textarea,
        .cf-select {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1.5px solid var(--border);
          border-radius: 8px;
          font-size: 0.95rem;
          font-family: 'DM Sans', sans-serif;
          color: var(--ink);
          background: #fdfdfd;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
          outline: none;
        }

        .cf-input:focus,
        .cf-textarea:focus,
        .cf-select:focus {
          border-color: var(--crimson);
          box-shadow: 0 0 0 3px rgba(192, 22, 44, 0.1);
          background: #fff;
        }

        .cf-textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.6;
        }

        .cf-select {
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 2.5rem;
          cursor: pointer;
        }

        .cf-category-pills {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-top: 0.45rem;
        }

        .cf-pill {
          padding: 0.45rem 1rem;
          border: 1.5px solid var(--border);
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          background: transparent;
          color: var(--muted);
          transition: all 0.18s;
        }

        .cf-pill:hover {
          border-color: var(--crimson);
          color: var(--crimson);
        }

        .cf-pill.active {
          background: var(--crimson);
          border-color: var(--crimson);
          color: white;
        }

        .cf-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .cf-amount-wrap {
          position: relative;
        }

        .cf-amount-prefix {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--muted);
          pointer-events: none;
        }

        .cf-amount-wrap .cf-input {
          padding-left: 2.5rem;
        }

        .cf-divider {
          height: 1px;
          background: var(--border);
          margin: 0.5rem 0 1.75rem;
        }

        .cf-submit {
          width: 100%;
          padding: 0.9rem;
          background: var(--crimson);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .cf-submit:hover:not(:disabled) {
          background: var(--crimson-dark);
          box-shadow: 0 4px 14px rgba(192, 22, 44, 0.35);
          transform: translateY(-1px);
        }

        .cf-submit:active:not(:disabled) {
          transform: translateY(0);
        }

        .cf-submit:disabled {
          background: #d1d5db;
          cursor: not-allowed;
          box-shadow: none;
        }

        .cf-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: white;
          border-radius: 50%;
          animation: cf-spin 0.7s linear infinite;
        }

        @keyframes cf-spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 480px) {
          .cf-row { grid-template-columns: 1fr; }
          .cf-body { padding: 1.75rem 1.25rem; }
          .cf-header { padding: 1.75rem 1.25rem; }
          .cf-header h2 { font-size: 1.5rem; }
        }
      `}</style>

      <div className='cf-wrapper'>
        <div className='cf-card'>
          <div className='cf-header'>
            <p className='cf-header-eyebrow'>Fundraising Portal</p>
            <h2>Create a New Campaign</h2>
          </div>

          <div className='cf-body'>
            <form onSubmit={handleSubmit}>

              <div className='cf-group'>
                <label className='cf-label' htmlFor='title'>Campaign Title</label>
                <input
                  className='cf-input'
                  type='text'
                  id='title'
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  placeholder='e.g. Help rebuild after floods'
                  required
                />
              </div>

              <div className='cf-group'>
                <label className='cf-label' htmlFor='description'>Description</label>
                <textarea
                  className='cf-textarea'
                  id='description'
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  placeholder='Describe your campaign and why it matters...'
                  required
                />
              </div>

              <div className='cf-group'>
                <label className='cf-label'>Category</label>
                <div className='cf-category-pills'>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      type='button'
                      className={`cf-pill${formData.category === cat ? ' active' : ''}`}
                      onClick={() => setFormData({ ...formData, category: cat })}
                    >
                      {categoryIcons[cat]} {cat}
                    </button>
                  ))}
                </div>
                {/* Hidden select to keep form value in sync */}
                <select
                  id='category'
                  name='category'
                  value={formData.category}
                  onChange={handleChange}
                  required
                  style={{ display: 'none' }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className='cf-row'>
                <div className='cf-group'>
                  <label className='cf-label' htmlFor='targetAmount'>Target Amount (INR)</label>
                  <div className='cf-amount-wrap'>
                    <span className='cf-amount-prefix'>₹</span>
                    <input
                      className='cf-input'
                      type='number'
                      id='targetAmount'
                      name='targetAmount'
                      value={formData.targetAmount}
                      onChange={handleChange}
                      placeholder='50,000'
                      required
                      min='1'
                    />
                  </div>
                </div>

                <div className='cf-group'>
                  <label className='cf-label' htmlFor='deadline'>Deadline</label>
                  <input
                    className='cf-input'
                    type='date'
                    id='deadline'
                    name='deadline'
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className='cf-divider' />

              <button
                type='submit'
                className='cf-submit'
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className='cf-spinner' />
                    Creating Campaign…
                  </>
                ) : (
                  'Launch Campaign →'
                )}
              </button>

            </form>
          </div>
        </div>
      </div>

      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
      />
    </>
  )
}

export default Campaign