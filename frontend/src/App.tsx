import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import CVEditor from './pages/CVEditor'
import Login from './pages/Login'
import Register from './pages/Register'
import Clock from './pages/Clock'
import Jokes from './pages/Jokes'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clock" element={<Clock />} />
        <Route path="/jokes" element={<Jokes />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/editor/:cvId" element={
          <ProtectedRoute>
            <CVEditor />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
