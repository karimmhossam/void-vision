import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VoidVisionLogo from '../components/VoidVisionLogo'

const AboutPage = () => {
  return (
    <>
      <Navbar />
      
      <main style={{ paddingTop: '80px', minHeight: '80vh' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <VoidVisionLogo size={48} showText={true} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-dim)' }}>
            <p>
              <strong style={{ color: 'white' }}>Void Vision</strong> was born out of a desire to make premium, luxury eyewear accessible. Based in Egypt, we source and deliver the highest quality designer sunglasses directly to your door.
            </p>
            
            <p>
              We believe that sunglasses are more than just sun protection—they are a statement piece, a reflection of personal style, and an essential accessory for any wardrobe. Our curated collection includes iconic silhouettes from the world's most prestigious luxury houses, including Oakley, Prada, Cartier, Chrome Hearts, and Louis Vuitton.
            </p>
            
            <p>
              Every pair in our vault is carefully selected for its superior craftsmanship, premium materials, and authentic design language. Whether you're looking for performance sports eyewear or high-fashion geometric frames, Void Vision ensures you see beyond the ordinary.
            </p>

            <div style={{ marginTop: '2rem', padding: '2rem', background: 'var(--surface)', borderLeft: '4px solid white' }}>
              <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Our Commitment</h3>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Uncompromising quality in every frame</li>
                <li>Secure packaging and fast delivery across Egypt</li>
                <li>Dedicated customer support</li>
              </ul>
            </div>
          </div>
          
        </div>
      </main>

      <Footer />
    </>
  )
}

export default AboutPage
