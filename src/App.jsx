import React from 'react'
import AuthPage from './components/AuthPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Dashboard from './components/Dashboard'

const App = () => {
  const {isAuthenticated} = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path='/' element={<Navigate to={isAuthenticated ? "/dashboard"  : "/auth"}/>}></Route>
      <Route path='/auth' element={!isAuthenticated? <AuthPage /> : <Navigate to="/dashbaord" />}></Route>
      <Route path='/dashboard' element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />}></Route>
    </Routes>
  )
}

export default App