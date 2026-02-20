import { useState } from 'react'
import Login from './Components/AuthRegister/Login'
import SignUp from './Components/AuthRegister/SignUp'
import Home from './Components/Home/Both/Home'
import  DonationForm  from './Components/Payment/DonationForm'
import DashBoard from './Components/Home/User/DashBoard'
import ProtectedRoute from './Components/Home/Both/AuthProtct'
import { Routes, Route  } from 'react-router-dom'
import NavBar from './Components/Home/Both/NavBar';
import Footer from './Components/Home/Both/Footer';

import './App.css'

function App () {
  return (
    <>
      <NavBar />
      <div style={{ minHeight: 'calc(100vh - 120px)' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
          <Route path='/donate' element={<DonationForm />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
