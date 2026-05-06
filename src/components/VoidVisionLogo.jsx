import React from 'react'

/**
 * Void Vision eye logo — recreated as SVG from brand assets.
 * The eye has distinctive spiky/flame eyelashes, almond shape,
 * circular iris with inner pupil highlight.
 */
const VoidVisionLogo = ({ size = 40, className = '', showText = true }) => {
  return (
    <div className={`logo ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Eye outer shape — almond with spiky lashes */}
        <path
          d="M50 20
             C38 20, 15 38, 10 50
             C15 62, 38 80, 50 80
             C62 80, 85 62, 90 50
             C85 38, 62 20, 50 20Z"
          fill="white"
        />
        {/* Spiky lashes — top */}
        <path d="M30 28 L26 12 L35 25Z" fill="white" />
        <path d="M40 22 L38 8 L45 20Z" fill="white" />
        <path d="M50 19 L50 5 L54 18Z" fill="white" />
        <path d="M60 22 L64 8 L56 20Z" fill="white" />
        <path d="M70 28 L76 14 L66 25Z" fill="white" />
        {/* Spiky lashes — bottom */}
        <path d="M35 75 L30 90 L40 78Z" fill="white" />
        <path d="M50 81 L50 94 L54 82Z" fill="white" />
        <path d="M65 75 L70 88 L60 78Z" fill="white" />
        {/* Iris — dark circle */}
        <circle cx="50" cy="50" r="18" fill="black" />
        {/* Pupil — inner white ring and dot */}
        <circle cx="50" cy="50" r="10" fill="white" />
        <circle cx="50" cy="50" r="5" fill="black" />
        {/* Highlight reflection */}
        <circle cx="45" cy="45" r="3" fill="white" opacity="0.8" />
      </svg>
      {showText && (
        <span style={{
          fontFamily: "'Tomorrow', sans-serif",
          fontWeight: 800,
          fontSize: size * 0.4,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'white',
          lineHeight: 1,
        }}>
          VOID<br />VISION
        </span>
      )}
    </div>
  )
}

export default VoidVisionLogo
