import React, { useState } from 'react'
import ProductCarousel from './ProductCarousel'
import { ShoppingBag, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product }) => {
  const { name, brand, price, images } = product
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  
  let parsedImages = []
  try {
    parsedImages = typeof images === 'string' ? JSON.parse(images) : (Array.isArray(images) ? images : [])
  } catch (e) {
    parsedImages = []
  }

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="product-card">
      <div className="product-card-image">
        <ProductCarousel images={parsedImages} />
      </div>
      <div className="product-card-info">
        <div className="product-card-brand">{brand}</div>
        <div className="product-card-name">{name}</div>
        <div className="product-card-actions">
          <span className="product-card-price">EGP {price?.toLocaleString()}</span>
          <button 
            className={`btn-outline btn-small ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
            style={added ? { borderColor: 'var(--success)', color: 'var(--success)' } : {}}
          >
            {added ? <><Check size={14} /> Added</> : <><ShoppingBag size={14} /> Add</>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
