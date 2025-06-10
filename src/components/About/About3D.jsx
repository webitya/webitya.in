"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Dodecahedron, MeshDistortMaterial } from "@react-three/drei"
import { motion } from "framer-motion"

function AnimatedDodecahedron() {
  return (
    <Dodecahedron args={[1]} scale={1.5}>
      <MeshDistortMaterial color="#f59e0b" attach="material" distort={0.4} speed={2} roughness={0} />
    </Dodecahedron>
  )
}

export default function About3D() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 h-64 sm:h-80 lg:h-96">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedDodecahedron />
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">Innovation in Learning</h2>
          <p className="text-lg sm:text-xl text-gray-300">Cutting-edge technology meets educational excellence</p>
        </motion.div>
      </div>
    </section>
  )
}
