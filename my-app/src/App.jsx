import { useState } from 'react'
import Login from './Components/AuthRegister/Login'
import SignUp from './Components/AuthRegister/SignUp'
import { Routes, Route } from 'react-router-dom'

import './App.css'

function App () {
  return (
    <Routes>
      // All the routes will be added here
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  )
}

export default App
