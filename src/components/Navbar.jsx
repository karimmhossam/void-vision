import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Menu, User } from 'lucide-react'
import VoidVisionLogo from './VoidVisionLogo'

const Navbar = () => {
  return (
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
        <button aria-label="Cart">
          <ShoppingBag size={18} />
        </button>
        <button className="mobile-menu" aria-label="Menu">
          <Menu size={18} />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
