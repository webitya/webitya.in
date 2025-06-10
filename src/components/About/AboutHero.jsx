"use client"

import { motion } from "framer-motion"
import { School, People, TrendingUp } from "@mui/icons-material"

export default function AboutHero() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 py-24 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            About <span className="text-yellow-300">Webitya</span>
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
            We're on a mission to democratize education and make quality learning accessible to everyone, everywhere.
            Join thousands of students transforming their careers with our expert-led courses.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 group"
            >
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <School className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Quality Education</h3>
              <p className="text-blue-100 text-lg leading-relaxed">
                Expert-crafted courses designed for real-world success and career advancement
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 group"
            >
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <People className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Global Community</h3>
              <p className="text-blue-100 text-lg leading-relaxed">
                Connect with learners and experts from around the world in our vibrant community
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 group"
            >
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Career Growth</h3>
              <p className="text-blue-100 text-lg leading-relaxed">
                Skills that matter for your professional advancement and future success
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
