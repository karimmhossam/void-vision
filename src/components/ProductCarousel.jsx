import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ProductCarousel = ({ images = [] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi, onSelect])

  // If no images, show placeholder
  const displayImages = images.length > 0
    ? images
    : [
        { src: null, alt: 'Product image placeholder' },
        { src: null, alt: 'Product image placeholder' },
        { src: null, alt: 'Product image placeholder' },
      ]

  return (
    <div style={{ position: 'relative' }}>
      <div className="carousel" ref={emblaRef}>
        <div className="carousel-container">
          {displayImages.map((img, index) => (
            <div className="carousel-slide" key={index}>
              {img.src ? (
                <img src={img.src} alt={img.alt || `Product image ${index + 1}`} />
              ) : (
                <div style={{
                  width: '100%',
                  aspectRatio: '1',
                  background: 'var(--surface-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1">
                    <rect x="2" y="2" width="20" height="20" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {displayImages.length > 1 && (
        <>
          <button className="carousel-nav prev" onClick={scrollPrev} aria-label="Previous image">
            <ChevronLeft size={18} />
          </button>
          <button className="carousel-nav next" onClick={scrollNext} aria-label="Next image">
            <ChevronRight size={18} />
          </button>

          <div className="carousel-dots">
            {displayImages.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === selectedIndex ? 'active' : ''}`}
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ProductCarousel
