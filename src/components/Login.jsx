import React, { useState, useEffect } from 'react'
import { LogOut, LogIn } from 'lucide-react'

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setCurrentUser(user)
      setIsLoggedIn(true)
      onLoginSuccess(user)
    }
  }, [onLoginSuccess])

  const validateLogin = () => {
    const newErrors = {}
    if (!username.trim()) newErrors.username = 'Username is required'
    if (!password.trim()) newErrors.password = 'Password is required'
    if (password.length < 3) newErrors.password = 'Password must be at least 3 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (validateLogin()) {
      const user = {
        username,
        loginTime: new Date().toISOString(),
        id: Date.now()
      }
      localStorage.setItem('currentUser', JSON.stringify(user))
      setCurrentUser(user)
      setIsLoggedIn(true)
      onLoginSuccess(user)
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
  }

  if (isLoggedIn && currentUser) {
    return (
      <div className="user-widget">
        <span className="username">👤 {currentUser.username}</span>
        <button 
          onClick={handleLogout} 
          className="btn btn-small"
          title="Logout"
        >
          <LogOut size={16} />
        </button>
      </div>
    )
  }

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <div className="login-header">
          <h2>🔐 Warehouse Access</h2>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <p className="login-subtitle">Sign in to Oxford Warehouse Racking</p>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoFocus
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            <LogIn size={18} /> Sign In
          </button>

          <p className="login-note">
            Demo mode: Use any username/password (3+ chars)
          </p>
        </form>
      </div>
    </div>
  )
}
