import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const BRANDS = [
  { name: 'Oakley', desc: 'Performance sport sunglasses with Prizm lens technology.' },
  { name: 'Prada', desc: 'Iconic geometric frames and sophisticated Italian design.' },
  { name: 'Cartier', desc: 'Timeless luxury with signature gold-finish hardware.' },
  { name: 'Chrome Hearts', desc: 'Handcrafted silver accents with premium acetate frames.' },
  { name: 'Diesel', desc: 'Bold, industrial design with an edge.' },
  { name: 'Louis Vuitton', desc: 'Iconic monogram details and luxurious gradients.' },
  { name: 'Lacoste', desc: 'Sporty elegance with classic silhouettes.' },
  { name: 'Versace', desc: 'Opulent designs featuring the iconic Medusa logo.' },
]

const BrandsPage = () => {
  return (
    <>
      <Navbar />
      
      <main style={{ paddingTop: '80px', minHeight: '80vh' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem' }}>
          
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Our Brands
            </h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '1.1rem' }}>
              We partner with the world's most prestigious luxury houses.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '2rem' }}>
            {BRANDS.map(brand => (
              <Link 
                to={`/shop?brand=${brand.name.toLowerCase()}`} 
                key={brand.name}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--glass-border)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  transition: 'transform 0.2s, border-color 0.2s',
                  cursor: 'pointer'
                }}
                className="brand-card-hover"
                >
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'white' }}>
                    {brand.name}
                  </h2>
                  <p style={{ color: 'var(--text-muted)' }}>{brand.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          
        </div>
      </main>

      {/* Add a quick hover style */}
      <style>{`
        .brand-card-hover:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 255, 255, 0.3) !important;
        }
      `}</style>

      <Footer />
    </>
  )
}

export default BrandsPage
