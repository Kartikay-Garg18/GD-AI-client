import React from 'react'
import AuthPage from './components/AuthPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from './components/Home'

const App = () => {
  const {isAuthenticated} = useSelector((state) => state.auth);

  return (
    <div className="select-none">
    <Routes>
      <Route path='/' element={<Navigate to={isAuthenticated ? "/home"  : "/auth"}/>}></Route>
      <Route path='/auth' element={!isAuthenticated? <AuthPage /> : <Navigate to="/home" />}></Route>
      <Route path='/home' element={isAuthenticated ? <Home /> : <Navigate to="/auth" />}></Route>
    </Routes>
    </div>
  )
}

export default App