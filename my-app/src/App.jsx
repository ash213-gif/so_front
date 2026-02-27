import { useState } from 'react'
import Login from './Components/AuthRegister/Login'
import SignUp from './Components/AuthRegister/SignUp'
import Home from './Components/Home/Both/Home'
import DashBoard from './Components/Home/User/DashBoard'
import ProtectedRoute from './Components/Home/Both/AuthProtct'
import { Routes, Route } from 'react-router-dom'
import NavBar from './Components/Home/Both/NavBar'
import Footer from './Components/Home/Both/Footer'
import Main from './Components/Payment/DonationPage/Main'
import AdminJoin from './Components/Home/Admin/Dashboard/AdminJoin'
import AdminDash from './Components/Home/Admin/Dashboard/AdminDash'
import Otpverify from './Components/AuthRegister/Otpverify'
import Users from './Components/Home/Admin/Dashboard/Users'
import Donations from './Components/Home/Admin/Dashboard/Donations'
import Donate from './Components/Home/Admin/Dashboard/Donate'
import Campaign from './Components/Home/Admin/Dashboard/Campaign'
import About from './Components/Home/Both/About'

import './App.css'

function App () {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route
          path='/userDashboard'
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>

          }
        />
        <Route path='/donate' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/otpverify' element={<Otpverify />} />
        <Route path='/:id/otpverify' element={<Otpverify />} />
        <Route path='/signup' element={<SignUp />} />
        {/* Admin Routes */}
        <Route path='/adminDashboard/*' element={<AdminJoin />}>
          <Route index element={<AdminDash />} />
          <Route path='users' element={<Users />} />
          <Route path='donations' element={<Donations />} />
          <Route path='campaign' element={<Campaign />} />
        </Route>
      </Routes>

      <Footer />
    </>
  )
}

export default App
