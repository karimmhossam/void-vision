import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Hero3D from '../components/Hero3D'
import ProductCard from '../components/ProductCard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Sample products — these will come from D1 database once connected
const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: 'Radar EV Path',
    brand: 'Oakley',
    price: 4499,
    images: [],
  },
  {
    id: 2,
    name: 'SPR 17W Symbole',
    brand: 'Prada',
    price: 5999,
    images: [],
  },
  {
    id: 3,
    name: 'Panthère de Cartier',
    brand: 'Cartier',
    price: 7499,
    images: [],
  },
  {
    id: 4,
    name: 'Hearts IV',
    brand: 'Chrome Hearts',
    price: 8999,
    images: [],
  },
  {
    id: 5,
    name: 'DL0325',
    brand: 'Diesel',
    price: 3499,
    images: [],
  },
  {
    id: 6,
    name: 'Millionaires',
    brand: 'Louis Vuitton',
    price: 9999,
    images: [],
  },
]

const BRANDS = ['Oakley', 'Prada', 'Cartier', 'Chrome Hearts', 'Diesel', 'Louis Vuitton', 'Lacoste', 'Versace']

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' },
}

const stagger = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
}

const HomePage = () => {
  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero-container">
        <Hero3D />
        <div className="hero-content">
          <motion.div {...fadeUp}>
            <p className="hero-tag">Premium Designer Eyewear</p>
            <h1>See Beyond<br />The Ordinary</h1>
            <p className="hero-subtitle">
              Luxury sunglasses from the world's most iconic brands.
              Oakley · Prada · Cartier · Chrome Hearts and more.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/shop">
                <button className="btn-primary">
                  Shop Now <ArrowRight size={16} />
                </button>
              </Link>
              <Link to="/brands">
                <button className="btn-outline">
                  Browse Brands
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BRANDS TICKER ── */}
      <div className="brands-section">
        <div className="brands-ticker">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <span key={i}>{brand}</span>
          ))}
        </div>
      </div>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div className="section-header">
            <div>
              <h2 className="section-title">New Arrivals</h2>
              <p className="section-subtitle">Fresh drops from top luxury brands</p>
            </div>
            <Link to="/shop">
              <button className="btn-outline btn-small">
                View All <ArrowRight size={14} />
              </button>
            </Link>
          </div>

          <motion.div
            className="product-grid"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            {SAMPLE_PRODUCTS.map((product) => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="section" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          <p className="hero-tag" style={{ marginBottom: '1rem' }}>Void Vision</p>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
            Your Style. Elevated.
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Every pair is carefully selected for quality and authenticity of design.
            Premium materials, precision craftsmanship, iconic silhouettes.
          </p>
          <Link to="/shop">
            <button className="btn-primary">
              Explore Collection <ArrowRight size={16} />
            </button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </>
  )
}

export default HomePage
