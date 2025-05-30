"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Icosahedron, Sparkles } from "@react-three/drei"
import { useRef } from "react"

// Wireframe Sphere Component
function WireframeSphere({ position = [0, 0, 0] }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group position={position}>
      <Icosahedron ref={meshRef} args={[2, 2]}>
        <meshBasicMaterial color="#e91e63" wireframe={true} transparent opacity={0.8} />
      </Icosahedron>
    </group>
  )
}

// Simple Scene Component
function Scene() {
  return (
    <>
      {/* Minimal lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />

      {/* Main wireframe sphere */}
      <WireframeSphere position={[0, 0, 0]} />

      {/* Subtle sparkles around the sphere */}
      <Sparkles count={20} scale={[8, 8, 8]} size={2} speed={0.3} color="#e91e63" opacity={0.6} />
    </>
  )
}

export default function HeroScene3D() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{
          antialias: true,
          alpha: true,
        }}
        dpr={[1, 2]}
      >
        <Scene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
      </Canvas>

      {/* Clean background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/20 to-purple-50/20 -z-10 rounded-2xl"></div>
    </div>
  )
}
