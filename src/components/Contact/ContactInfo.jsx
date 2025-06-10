"use client"

import { motion } from "framer-motion"
import { Email, Phone, LocationOn, Schedule, Support } from "@mui/icons-material"

const contactInfo = [
  {
    icon: Email,
    title: "Email Address",
    details: ["info@webitya.com", "support@webitya.com"],
    description: "Send us an email anytime!",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Phone,
    title: "Phone Number",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    description: "Mon-Fri from 9am to 6pm EST",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: LocationOn,
    title: "Office Address",
    details: ["123 Learning Street", "New York, NY 10001"],
    description: "Come visit our office",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Schedule,
    title: "Business Hours",
    details: ["Monday - Friday: 9am - 6pm", "Saturday: 10am - 2pm"],
    description: "We're here to help",
    color: "bg-orange-100 text-orange-600",
  },
]

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>

        <div className="space-y-8">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-6 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300"
            >
              <div className={`${info.color} p-4 rounded-xl shadow-md`}>
                <info.icon className="text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2 text-xl">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-700 font-semibold text-lg">
                    {detail}
                  </p>
                ))}
                <p className="text-gray-500 mt-2">{info.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-20 h-20 bg-white rounded-full blur-xl"></div>
          <div className="absolute bottom-4 right-4 w-24 h-24 bg-white rounded-full blur-xl"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 p-3 rounded-xl">
              <Support className="text-3xl" />
            </div>
            <h3 className="text-2xl font-bold">24/7 Support</h3>
          </div>
          <p className="mb-6 opacity-90 text-lg leading-relaxed">
            Need immediate assistance? Our support team is available around the clock to help you with any questions or
            issues. We're committed to your success!
          </p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Instant Help
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h3>
        <p className="text-gray-600 mb-6 text-lg">Stay connected with us on social media for updates and tips!</p>
        <div className="flex gap-4">
          <a
            href="#"
            className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 shadow-lg"
          >
            <span className="sr-only">Facebook</span>
            <span className="text-2xl">📘</span>
          </a>
          <a
            href="#"
            className="bg-blue-400 text-white p-4 rounded-xl hover:bg-blue-500 transition-all duration-300 transform hover:scale-110 shadow-lg"
          >
            <span className="sr-only">Twitter</span>
            <span className="text-2xl">🐦</span>
          </a>
          <a
            href="#"
            className="bg-blue-700 text-white p-4 rounded-xl hover:bg-blue-800 transition-all duration-300 transform hover:scale-110 shadow-lg"
          >
            <span className="sr-only">LinkedIn</span>
            <span className="text-2xl">💼</span>
          </a>
          <a
            href="#"
            className="bg-pink-600 text-white p-4 rounded-xl hover:bg-pink-700 transition-all duration-300 transform hover:scale-110 shadow-lg"
          >
            <span className="sr-only">Instagram</span>
            <span className="text-2xl">📷</span>
          </a>
        </div>
      </div>
    </motion.div>
  )
}
