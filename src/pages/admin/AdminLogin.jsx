import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VoidVisionLogo from '../../components/VoidVisionLogo'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('vv_admin_auth', 'true')
        navigate('/admin')
      } else {
        setError(data.error || 'Invalid credentials')
      }
    } catch (err) {
      setError('Connection failed. Please try again.')
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <VoidVisionLogo size={36} showText={true} />
        </div>
        <h2>Admin Panel</h2>
        <p>Sign in to manage your store</p>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            fontSize: '0.85rem',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@voidvision.com"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Sign In
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center' }}>
          Default: admin@voidvision.com / voidvision2026
        </p>
      </div>
    </div>
  )
}

export default AdminLogin
