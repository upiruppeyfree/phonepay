import React from 'react'
import MobileNumber from './pages/MobileNumber'
import UpiId from './pages/UpiId'
import OTP from './pages/OTP'
import Endingpage from './pages/Endingpage'
import Scratch from './pages/Scratch'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import UserDevloper from './pages/UserDevloper'

function AllRoutes() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Scratch />} />
      
        <Route  path="/mobilenumber" element={<MobileNumber />} />
        <Route  path="/upiId" element={<UpiId />} />
        <Route  path="/otp" element={<OTP />} />
        <Route  path="/login" element={<Login />} />
        <Route  path="/userID" element={<UserDevloper />} />
        <Route  path="/ending" element={<Endingpage />} />
    </Routes>  
    </>
  )
}

export default AllRoutes