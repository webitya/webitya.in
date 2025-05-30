"use client"

import { motion } from "framer-motion"
import { Support, Chat, Email, Phone } from "@mui/icons-material"

export default function SupportHero() {
  return (
    <section className="bg-gradient-to-r from-green-600 to-blue-600 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Support className="text-white text-6xl mb-6 mx-auto" />
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">We're Here to Help</h1>
          <p className="text-xl text-green-100 mb-12">Get the support you need to succeed in your learning journey</p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <Chat className="text-white text-3xl mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">Live Chat</h3>
              <p className="text-green-100 text-sm">24/7 instant support</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <Email className="text-white text-3xl mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">Email Support</h3>
              <p className="text-green-100 text-sm">Response within 24 hours</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <Phone className="text-white text-3xl mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">Phone Support</h3>
              <p className="text-green-100 text-sm">Call us anytime</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
