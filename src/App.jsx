import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthCOntext'; // Ensure you have an AuthContext provider
import PrivateRoute from './routes/PrivateRoute'; // Your custom private route component
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
function App() {


  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<SignIn />} />
          {/* The Dashboard route is protected */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
          {/* Set Home as the default route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>

  )
}

export default App
