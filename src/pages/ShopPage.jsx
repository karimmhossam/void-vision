import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'



const BRANDS = ['All', 'Oakley', 'Prada', 'Cartier', 'Chrome Hearts', 'Diesel', 'Louis Vuitton', 'Lacoste', 'Versace']

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const stagger = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
}

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentBrand = searchParams.get('brand') || 'All'
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const filteredProducts = currentBrand === 'All' 
    ? products 
    : products.filter(p => p.brand.toLowerCase() === currentBrand.toLowerCase())

  const handleBrandChange = (brand) => {
    if (brand === 'All') {
      searchParams.delete('brand')
    } else {
      searchParams.set('brand', brand.toLowerCase())
    }
    setSearchParams(searchParams)
  }

  return (
    <>
      <Navbar />
      
      <main style={{ paddingTop: '80px', minHeight: '80vh' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 2rem' }}>
          
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Collection
            </h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Explore our curated selection of premium eyewear.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Filters */}
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              flexWrap: 'wrap', 
              justifyContent: 'center',
              borderBottom: '1px solid var(--glass-border)',
              paddingBottom: '2rem'
            }}>
              {BRANDS.map(brand => (
                <button
                  key={brand}
                  onClick={() => handleBrandChange(brand)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: currentBrand.toLowerCase() === brand.toLowerCase() ? 'white' : 'var(--text-dim)',
                    fontWeight: currentBrand.toLowerCase() === brand.toLowerCase() ? 700 : 400,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    transition: 'color 0.2s',
                    padding: '0.5rem 1rem'
                  }}
                >
                  {brand}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-dim)' }}>
                Loading products...
              </div>
            ) : filteredProducts.length > 0 ? (
              <motion.div 
                className="product-grid"
                variants={stagger}
                initial="initial"
                animate="animate"
                key={currentBrand} // Re-trigger animation on filter change
              >
                {filteredProducts.map(product => (
                  <motion.div key={product.id} variants={fadeUp}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-dim)' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No products found</h3>
                <p>We couldn't find any products matching that brand.</p>
                <button 
                  className="btn-outline" 
                  style={{ marginTop: '2rem' }}
                  onClick={() => handleBrandChange('All')}
                >
                  View All Products
                </button>
              </div>
            )}
            
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default ShopPage
