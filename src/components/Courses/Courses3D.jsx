"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Box } from "@react-three/drei"
import { motion } from "framer-motion"

function FloatingBoxes() {
  return (
    <>
      <Box position={[-2, 0, 0]} args={[1, 1, 1]}>
        <meshStandardMaterial color="#3b82f6" />
      </Box>
      <Box position={[2, 0, 0]} args={[1, 1, 1]}>
        <meshStandardMaterial color="#8b5cf6" />
      </Box>
      <Box position={[0, 2, 0]} args={[1, 1, 1]}>
        <meshStandardMaterial color="#10b981" />
      </Box>
    </>
  )
}

export default function Courses3D() {
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 h-96">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <FloatingBoxes />
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
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Interactive Learning</h2>
          <p className="text-xl text-gray-300">Experience courses in an immersive 3D environment</p>
        </motion.div>
      </div>
    </section>
  )
}
