import React, { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingCart, Printer, LogOut, Settings } from 'lucide-react'
import VoidVisionLogo from '../components/VoidVisionLogo'

const AdminLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ]

  const isActive = (path, exact) => {
    if (exact) return location.pathname === path
    return location.pathname.startsWith(path)
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <VoidVisionLogo size={24} showText={false} />
          <span>Void Vision</span>
          <span className="badge">ADMIN</span>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-nav-link ${isActive(item.path, item.exact) ? 'active' : ''}`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '0 0.75rem', marginTop: 'auto' }}>
          <button
            className="admin-nav-link"
            onClick={() => navigate('/')}
            style={{ width: '100%' }}
          >
            <LogOut size={18} />
            Back to Store
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
