import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X, User } from 'lucide-react'
import VoidVisionLogo from './VoidVisionLogo'
import { useCart } from '../context/CartContext'
import CartDrawer from './CartDrawer'

const Navbar = () => {
  const { cartCount } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <nav className="nav">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <VoidVisionLogo size={32} showText={true} />
        </Link>

        <div className="nav-links">
          <Link to="/shop" className="nav-link">Shop</Link>
          <Link to="/brands" className="nav-link">Brands</Link>
          <Link to="/about" className="nav-link">About</Link>
        </div>

        <div className="nav-actions">
          <button aria-label="Cart" onClick={() => setIsCartOpen(true)} style={{ position: 'relative' }}>
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
          <button className="mobile-menu-btn" aria-label="Menu" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={18} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-header">
            <VoidVisionLogo size={32} showText={true} />
            <button className="btn-icon" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <div className="mobile-menu-links">
            <Link to="/shop" className="mobile-nav-link">Shop</Link>
            <Link to="/brands" className="mobile-nav-link">Brands</Link>
            <Link to="/about" className="mobile-nav-link">About</Link>
          </div>
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default Navbar
