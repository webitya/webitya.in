"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Cylinder, MeshDistortMaterial } from "@react-three/drei"
import { motion } from "framer-motion"

function AnimatedCylinder() {
  return (
    <Cylinder args={[1, 1, 2, 32]} scale={1.2}>
      <MeshDistortMaterial color="#10b981" attach="material" distort={0.3} speed={1.5} roughness={0} />
    </Cylinder>
  )
}

export default function Profile3D() {
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 h-96">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedCylinder />
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
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Your Learning Journey</h2>
          <p className="text-xl text-gray-300">Track your progress and achievements</p>
        </motion.div>
      </div>
    </section>
  )
}
