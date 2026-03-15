import React,{  useState,useEffect ,useRef ,} from 'react'
import { BASE_URL } from '../../GlobalUrl.js'
import { ToastContainer, toast } from 'react-toastify'
import { useAuth } from '../Context/User/UserData.jsx'

 function Paymenthook () {
  const [amount, setAmount] = useState(500)
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const donorId = user?._id
  const campaignId = '698bed73bafa40b123a181b9'


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
      toast.error(
        'Razorpay SDK failed to load. Check your internet connection.'
      )
      setLoading(false)
      return
    }

    try {
      // 1. Create order on backend
      const res = await fetch(`${BASE_URL}/auth/createdonation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ amount, donorId, campaignId })
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
        amount: data.amount, // in paise — backend should send this
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
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                razorpay_order_id: rzpRes.razorpay_order_id,
                razorpay_payment_id: rzpRes.razorpay_payment_id,
                razorpay_signature: rzpRes.razorpay_signature
              })
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

            toast.success(
              result.message ??
                'Payment successful! Thank you for your donation. 🙏'
            )
          } catch (err) {
            console.error('Verification error:', err)
            toast.error(
              err.message || 'Payment verification failed. Contact support.'
            )
          } finally {
            setLoading(false)
            setAmount("")  
          }
        },

        prefill: {
          name: user?.name ?? '',
          email: user?.email ?? '',
          contact: user?.phone ?? ''
        },

        theme: { color: '#dc2626' },

        modal: {
          // Called when the Razorpay modal is closed without completing payment
          ondismiss: () => {
            toast.info('Payment cancelled.')
            setLoading(false)
          }
        }
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

  return { handlePayment, loadRazorpayScript,loading,setLoading,amount,setAmount}
}

export { Paymenthook};