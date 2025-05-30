"use client"

import { motion } from "framer-motion"
import { School, People, TrendingUp } from "@mui/icons-material"

export default function AboutHero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">About Webitya</h1>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            We're on a mission to democratize education and make quality learning accessible to everyone, everywhere.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6"
            >
              <School className="text-white text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">Quality Education</h3>
              <p className="text-blue-100">Expert-crafted courses designed for real-world success</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6"
            >
              <People className="text-white text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">Global Community</h3>
              <p className="text-blue-100">Connect with learners and experts from around the world</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6"
            >
              <TrendingUp className="text-white text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">Career Growth</h3>
              <p className="text-blue-100">Skills that matter for your professional advancement</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
