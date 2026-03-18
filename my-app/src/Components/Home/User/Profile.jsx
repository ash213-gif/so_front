import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../Components/Context/User/UserData'
import { BASE_URL } from '../../../GlobalUrl'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './user.css'
import { FaUser, FaEnvelope, FaPen, FaSave, FaTimes } from 'react-icons/fa'

export default function Profile() {
  const { user, setUserData, token } = useAuth()
  const id = user?._id

  const [profile, setProfile] = useState({
    username: user?.username || '',
    email: user?.email || ''
  })

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  // Sync local state if user context updates
  useEffect(() => {
    if (user) {
      setProfile({
        username: user.username || '',
        email: user.email || ''
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.put(`${BASE_URL}/updatedUser/${id}`, profile, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUserData(res.data.result)
      toast.success('Profile updated successfully')
      setIsEditing(false)
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setProfile({
      username: user?.username || '',
      email: user?.email || ''
    })
    setIsEditing(false)
  }

  return (
    <div className='profile-page fade-in'>

      {/* ── Header Banner ── */}
      <div className='profile-header'>
        <div className='profile-avatar'>
          {user?.username ? user.username.charAt(0).toUpperCase() : <FaUser />}
        </div>
        <h2>{user?.username || 'User Profile'}</h2>
        <p className='profile-role'>Member</p>
      </div>

      {/* ── Main Card ── */}
      <div className='profile-card'>
        <div className='card-header'>
          <h3>Personal Information</h3>
          {!isEditing && (
            <button
              className='edit-btn'
              onClick={() => setIsEditing(true)}
              aria-label='Edit Profile'
            >
              <FaPen size={12} /> Edit
            </button>
          )}
        </div>

        {/* ── Edit Mode ── */}
        {isEditing ? (
          <form onSubmit={handleSubmit} className='profile-form'>

            <div className='form-group'>
              <label htmlFor='username'>
                <FaUser className='input-icon' /> Username
              </label>
              <input
                id='username'
                name='username'
                type='text'
                value={profile.username}
                onChange={handleChange}
                className='form-input'
                placeholder='Enter your username'
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='email'>
                <FaEnvelope className='input-icon' /> Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                value={profile.email}
                onChange={handleChange}
                className='form-input'
                placeholder='Enter your email'
                required
              />
            </div>

            <div className='form-actions'>
              <button
                type='button'
                className='cancel-btn'
                onClick={handleCancel}
                disabled={loading}
              >
                <FaTimes /> Cancel
              </button>
              <button type='submit' className='save-btn' disabled={loading}>
                <FaSave /> {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

          </form>

        ) : (

          /* ── View Mode ── */
          <div className='profile-details'>
            <div className='detail-item'>
              <span className='detail-label'>
                <FaUser /> Username
              </span>
              <span className='detail-value'>{user?.username || '—'}</span>
            </div>
            <div className='detail-item'>
              <span className='detail-label'>
                <FaEnvelope /> Email
              </span>
              <span className='detail-value'>{user?.email || '—'}</span>
            </div>
          </div>

        )}
      </div>

      <ToastContainer position='bottom-right' theme='light' />
    </div>
  )
}