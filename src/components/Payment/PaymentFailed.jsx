"use client"

import { motion } from "framer-motion"
import { Error, Refresh, Home, Support } from "@mui/icons-material"
import Link from "next/link"

export default function PaymentFailed({ reason }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Error className="text-red-600 text-5xl" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Failed</h1>
        <p className="text-gray-600 mb-2">We couldn't process your payment.</p>
        <p className="text-red-600 mb-8">{reason}</p>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="font-semibold mb-4">What you can do:</h3>
          <div className="text-left space-y-2">
            <div className="flex items-center gap-2">
              <span>•</span>
              <span>Check your payment details and try again</span>
            </div>
            <div className="flex items-center gap-2">
              <span>•</span>
              <span>Ensure you have sufficient balance</span>
            </div>
            <div className="flex items-center gap-2">
              <span>•</span>
              <span>Try a different payment method</span>
            </div>
            <div className="flex items-center gap-2">
              <span>•</span>
              <span>Contact your bank if the issue persists</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <Refresh />
            Try Again
          </button>
          <Link
            href="/courses"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <Home />
            Browse Courses
          </Link>
          <Link
            href="/support"
            className="border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <Support />
            Get Help
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
