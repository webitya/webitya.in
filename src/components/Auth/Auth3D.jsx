"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei"

function AnimatedSphere() {
  return (
    <Sphere visible args={[1, 100, 200]} scale={1.5}>
      <MeshDistortMaterial color="#3b82f6" attach="material" distort={0.5} speed={2} roughness={0} />
    </Sphere>
  )
}

export default function Auth3D() {
  return (
    <div className="h-96 w-full">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedSphere />
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  )
}
