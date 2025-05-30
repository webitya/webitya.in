"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Torus, MeshDistortMaterial } from "@react-three/drei"
import { motion } from "framer-motion"

function AnimatedTorus() {
  return (
    <Torus args={[1, 0.4, 16, 100]} scale={1.5}>
      <MeshDistortMaterial color="#8b5cf6" attach="material" distort={0.4} speed={1.5} roughness={0} />
    </Torus>
  )
}

export default function Course3D() {
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 h-96">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedTorus />
          <OrbitControls enableZoom={false} autoRotate />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Master New Skills</h2>
          <p className="text-xl text-gray-300">Transform your career with hands-on learning</p>
        </motion.div>
      </div>
    </section>
  )
}
