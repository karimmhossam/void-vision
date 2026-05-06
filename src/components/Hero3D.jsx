import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT = 800

const Particles = () => {
  const meshRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const particles = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const scales = new Float32Array(PARTICLE_COUNT)
    const speeds = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      scales[i] = Math.random() * 0.5 + 0.1
      speeds[i] = Math.random() * 0.5 + 0.2
    }

    return { positions, scales, speeds }
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const { pointer } = state

    mouseRef.current.x += (pointer.x * viewport.width * 0.5 - mouseRef.current.x) * 0.05
    mouseRef.current.y += (pointer.y * viewport.height * 0.5 - mouseRef.current.y) * 0.05

    const positionsArray = meshRef.current.geometry.attributes.position.array

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const speed = particles.speeds[i]

      // Gentle floating motion
      positionsArray[i3 + 1] += Math.sin(time * speed + i) * 0.002
      positionsArray[i3] += Math.cos(time * speed * 0.7 + i) * 0.001

      // Cursor repulsion effect
      const dx = positionsArray[i3] - mouseRef.current.x
      const dy = positionsArray[i3 + 1] - mouseRef.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 3) {
        const force = (3 - dist) * 0.01
        positionsArray[i3] += dx * force
        positionsArray[i3 + 1] += dy * force
      }

      // Keep particles in bounds
      if (positionsArray[i3] > 12) positionsArray[i3] = -12
      if (positionsArray[i3] < -12) positionsArray[i3] = 12
      if (positionsArray[i3 + 1] > 12) positionsArray[i3 + 1] = -12
      if (positionsArray[i3 + 1] < -12) positionsArray[i3 + 1] = 12
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.03}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

const FloatingRing = ({ radius, speed, rotationAxis }) => {
  const meshRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * speed * rotationAxis[0]
    meshRef.current.rotation.y = time * speed * rotationAxis[1]
    meshRef.current.rotation.z = time * speed * rotationAxis[2]
  })

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[radius, 0.005, 16, 100]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
    </mesh>
  )
}

const Hero3D = () => {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Particles />
        <FloatingRing radius={2.5} speed={0.15} rotationAxis={[1, 0.5, 0]} />
        <FloatingRing radius={3.2} speed={0.1} rotationAxis={[0.3, 1, 0.2]} />
        <FloatingRing radius={4} speed={0.08} rotationAxis={[0, 0.2, 1]} />
      </Canvas>
    </div>
  )
}

export default Hero3D
