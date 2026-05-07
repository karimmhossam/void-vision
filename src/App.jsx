import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Pages
import HomePage from './pages/HomePage'
import AdminLayout from './pages/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import Products from './pages/admin/Products'
import Orders from './pages/admin/Orders'
import Settings from './pages/admin/Settings'

import ShopPage from './pages/ShopPage'
import BrandsPage from './pages/BrandsPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <Routes>
      {/* Storefront */}
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/brands" element={<BrandsPage />} />
      <Route path="/about" element={<AboutPage />} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Panel */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
