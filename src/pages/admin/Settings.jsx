import React, { useState } from 'react'
import { Save } from 'lucide-react'

const Settings = () => {
  const [storeName, setStoreName] = useState('Void Vision')
  const [contactEmail, setContactEmail] = useState('contact@voidvision.com')
  const [currency, setCurrency] = useState('EGP')
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    // Here we would typically save to the database/API
    // For now, we simulate a save
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Settings</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            Manage your store preferences and configuration.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div style={{ background: 'var(--surface)', border: '1px solid var(--glass-border)', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>
              General Information
            </h3>
            
            <div className="form-group">
              <label className="form-label">Store Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Contact Email</label>
              <input 
                type="email" 
                className="form-input" 
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                This email will be used for customer inquiries and order notifications.
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">Default Currency</label>
              <select 
                className="form-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="EGP">EGP - Egyptian Pound</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--glass-border)', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>
              Admin Account
            </h3>
            
            <div className="form-group">
              <label className="form-label">Admin Email</label>
              <input type="email" className="form-input" defaultValue="admin@voidvision.com" disabled />
            </div>

            <div className="form-group">
              <label className="form-label">New Password</label>
              <input type="password" className="form-input" placeholder="Leave blank to keep current password" />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button type="submit" className="btn-primary">
              <Save size={16} /> Save Changes
            </button>
            {isSaved && (
              <span style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: 600 }}>
                Settings saved successfully!
              </span>
            )}
          </div>
        </form>
      </div>
    </>
  )
}

export default Settings
