"use client"

import { motion } from "framer-motion"
import { Email, Phone, LocationOn, Schedule, Support } from "@mui/icons-material"

const contactInfo = [
  {
    icon: Email,
    title: "Email Address",
    details: ["info@webitya.com", "support@webitya.com"],
    description: "Send us an email anytime!",
  },
  {
    icon: Phone,
    title: "Phone Number",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    description: "Mon-Fri from 8am to 5pm",
  },
  {
    icon: LocationOn,
    title: "Office Address",
    details: ["123 Learning Street", "New York, NY 10001"],
    description: "Come visit our office",
  },
  {
    icon: Schedule,
    title: "Business Hours",
    details: ["Monday - Friday: 8am - 5pm", "Saturday: 9am - 2pm"],
    description: "We're here to help",
  },
]

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

        <div className="space-y-6">
          {contactInfo.map((info, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <info.icon className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 text-sm">
                    {detail}
                  </p>
                ))}
                <p className="text-gray-500 text-xs mt-1">{info.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Support className="text-2xl" />
          <h3 className="text-xl font-semibold">24/7 Support</h3>
        </div>
        <p className="mb-4 opacity-90">
          Need immediate assistance? Our support team is available around the clock to help you with any questions or
          issues.
        </p>
        <button className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold transition-colors">
          Get Instant Help
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
        <div className="flex gap-4">
          <a href="#" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
            <span className="sr-only">Facebook</span>📘
          </a>
          <a href="#" className="bg-blue-400 text-white p-3 rounded-lg hover:bg-blue-500 transition-colors">
            <span className="sr-only">Twitter</span>🐦
          </a>
          <a href="#" className="bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-800 transition-colors">
            <span className="sr-only">LinkedIn</span>💼
          </a>
          <a href="#" className="bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition-colors">
            <span className="sr-only">Instagram</span>📷
          </a>
        </div>
      </div>
    </motion.div>
  )
}
