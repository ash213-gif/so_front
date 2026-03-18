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
import Donate from './Components/Home/Admin/Dashboard/Donate'
import Campaign from './Components/Home/Admin/Dashboard/Campaign'
import About from './Components/Home/Both/About'
import Campaignn from './Components/Home/Both/Campaignn'
import AdminProfile from './Components/Home/Admin/Dashboard/AdminProfile'
import { ToastContainer } from 'react-toastify'
import Analytics from './Components/Home/Admin/Dashboard/Analytics'
import Profile from './Components/Home/User/Profile'
import Notification from './Components/Home/User/Notification'
import Setting from './Components/Home/User/Setting'
import Summary from './Components/Home/User/Summary'

function App () {
  return (
    <>
      <NavBar />

      <Routes>
        {/* Authentication   routess */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/:id/otpverify' element={<Otpverify />} />

        {/* USER ROUTESS  */}
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/campaigns' element={<Campaignn />} />
        <Route path='/donate' element={<Main />} />

        <Route path='/userDashboard'element={<ProtectedRoute> <DashBoard /> </ProtectedRoute>} >
          <Route index path='profile' element={<Profile />} />
          <Route path='summary' element={<Summary />} />
          <Route path='settings' element={<Setting />} />
          <Route path='notifications' element={<Notification />} />
        </Route>

        {/* Admin Routes */}
        <Route path='/adminDashboard/*' element={<AdminJoin />}>
          <Route index element={<AdminDash />} />
          <Route path='users' element={<Users />} />
          <Route path='campaign' element={<Campaign />} />
          <Route path='analytics' element={<Analytics />} />
          <Route path='profile' element={<AdminProfile />} />
        </Route>
      </Routes>

      <Footer />
    </>
  )
}

export default App
