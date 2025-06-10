"use client"

import { motion } from "framer-motion"
import { Support, Chat, Email, Phone } from "@mui/icons-material"

export default function SupportHero() {
  return (
    <section className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 py-24 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="bg-white/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Support className="text-white text-4xl" />
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            We're Here to <span className="text-yellow-300">Help</span>
          </h1>
          <p className="text-xl lg:text-2xl text-green-100 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
            Get the support you need to succeed in your learning journey. Our dedicated team is available 24/7 to assist
            you with any questions or challenges.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 group"
            >
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Chat className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Live Chat</h3>
              <p className="text-green-100 text-lg font-semibold">24/7 instant support</p>
              <p className="text-green-200 text-sm mt-2">Average response: 2 minutes</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 group"
            >
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Email className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Email Support</h3>
              <p className="text-green-100 text-lg font-semibold">Response within 24 hours</p>
              <p className="text-green-200 text-sm mt-2">Detailed solutions provided</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 hover:bg-white/25 transition-all duration-300 group"
            >
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Phone Support</h3>
              <p className="text-green-100 text-lg font-semibold">Call us anytime</p>
              <p className="text-green-200 text-sm mt-2">Direct line to experts</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
