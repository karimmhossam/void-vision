import React from 'react'
import { Link } from 'react-router-dom'
import VoidVisionLogo from './VoidVisionLogo'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <VoidVisionLogo size={28} showText={true} />
          <p>
            Premium designer eyewear at accessible prices.
            See beyond the ordinary.
          </p>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <Link to="/shop">All Sunglasses</Link>
          <Link to="/shop?brand=oakley">Oakley</Link>
          <Link to="/shop?brand=prada">Prada</Link>
          <Link to="/shop?brand=cartier">Cartier</Link>
          <Link to="/shop?brand=chrome-hearts">Chrome Hearts</Link>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/shipping">Shipping Info</Link>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/returns">Return Policy</Link>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Void Vision. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
