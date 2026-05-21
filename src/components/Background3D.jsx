import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Sparkles } from '@react-three/drei'
import * as THREE from 'three'



const Leaf = ({ position, speed, rotationSpeed, color }) => {
  const meshRef = useRef()
  const { viewport } = useThree()
  const initialPos = useMemo(() => new THREE.Vector3(...position), [position])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.position.y -= speed
      meshRef.current.position.x += Math.sin(time + initialPos.x) * 0.02
      meshRef.current.rotation.x += rotationSpeed
      meshRef.current.rotation.y += rotationSpeed * 0.5

      if (meshRef.current.position.y < -viewport.height) {
        meshRef.current.position.y = viewport.height
        meshRef.current.position.x = initialPos.x
      }
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[0.3, 0.3]} />
      <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.6} />
    </mesh>
  )
}

const FallingLeaves = () => {
  const count = 25
  const leaves = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      position: [(Math.random() - 0.5) * 40, Math.random() * 20, (Math.random() - 0.5) * 10],
      speed: 0.02 + Math.random() * 0.03,
      rotationSpeed: 0.01 + Math.random() * 0.02,
      color: i % 2 === 0 ? '#10b981' : '#059669'
    }))
  }, [])

  return (
    <group>
      {leaves.map((leaf, i) => (
        <Leaf key={i} {...leaf} />
      ))}
    </group>
  )
}

const Bird = ({ speed, delay, initialY, initialZ }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime() + delay
    const x = (time * speed) % 80 - 40
    
    if (meshRef.current) {
      meshRef.current.position.set(x, initialY + Math.sin(time * 2) * 0.3, initialZ)
      meshRef.current.rotation.z = Math.sin(time * 5) * 0.2
    }
  })

  return (
    <group ref={meshRef}>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.4, 0.04, 0.04]} />
        <meshBasicMaterial color="#475569" />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 4]} position={[0.28, 0, 0]}>
        <boxGeometry args={[0.4, 0.04, 0.04]} />
        <meshBasicMaterial color="#475569" />
      </mesh>
    </group>
  )
}

const InteractiveCloud = ({ position, ...props }) => {
  const cloudRef = useRef()
  const { mouse, viewport } = useThree()
  const initialPos = useMemo(() => new THREE.Vector3(...position), [position])

  useFrame(() => {
    if (cloudRef.current) {
      const targetX = (mouse.x * viewport.width) / 2
      const targetY = (mouse.y * viewport.height) / 2
      const dx = cloudRef.current.position.x - targetX
      const dy = cloudRef.current.position.y - targetY
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      const repulsionRange = 10
      if (dist < repulsionRange) {
        const force = (repulsionRange - dist) / repulsionRange
        cloudRef.current.position.x += dx * force * 0.06
        cloudRef.current.position.y += dy * force * 0.06
      }
      cloudRef.current.position.x += (initialPos.x - cloudRef.current.position.x) * 0.02
      cloudRef.current.position.y += (initialPos.y - cloudRef.current.position.y) * 0.02
    }
  })

  return (
    <group ref={cloudRef} position={position}>
      <Cloud {...props} />
    </group>
  )
}

const Background3D = () => {
  const birds = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      speed: 1.5 + Math.random() * 2,
      delay: Math.random() * 40,
      initialY: (Math.random() - 0.5) * 15,
      initialZ: (Math.random() - 0.5) * 5
    }))
  }, [])

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      zIndex: -1,
      pointerEvents: 'none'
    }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[20, 20, 20]} intensity={1.5} color="#fff7ed" />
        
        <Sparkles count={50} scale={30} size={4} speed={0.5} opacity={0.2} color="#f59e0b" />

        <FallingLeaves />

        {birds.map((bird, i) => (
          <Bird key={i} {...bird} />
        ))}
        
        <Environment preset="apartment" />
      </Canvas>
    </div>
  )
}

export default Background3D
