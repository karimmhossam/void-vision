import React from 'react'
import ProductCarousel from './ProductCarousel'
import { ShoppingBag } from 'lucide-react'

const ProductCard = ({ product }) => {
  const { name, brand, price, images } = product
  
  let parsedImages = []
  try {
    parsedImages = typeof images === 'string' ? JSON.parse(images) : (Array.isArray(images) ? images : [])
  } catch (e) {
    parsedImages = []
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
          <button className="btn-outline btn-small">
            <ShoppingBag size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
