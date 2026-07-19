import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router'
import Register from "./features/auth/pages/Register"
import Login from "./features/auth/pages/Login"


const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navigate to="/register" replace />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}


export default AppRoutes