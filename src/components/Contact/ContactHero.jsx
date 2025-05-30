"use client"

import { motion } from "framer-motion"
import { Email, Phone, LocationOn } from "@mui/icons-material"

export default function ContactHero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">Get in Touch</h1>
          <p className="text-xl text-blue-100 mb-12">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <Email className="text-white text-3xl mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
              <p className="text-blue-100 text-sm">info@webitya.com</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <Phone className="text-white text-3xl mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">Call Us</h3>
              <p className="text-blue-100 text-sm">+1 (555) 123-4567</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <LocationOn className="text-white text-3xl mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">Visit Us</h3>
              <p className="text-blue-100 text-sm">New York, NY</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
