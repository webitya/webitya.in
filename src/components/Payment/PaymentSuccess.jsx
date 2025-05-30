"use client"

import { motion } from "framer-motion"
import { CheckCircle, Download, PlayArrow } from "@mui/icons-material"
import Link from "next/link"

export default function PaymentSuccess({ paymentId }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-600 text-5xl" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">Thank you for your purchase. You now have access to your course.</p>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="font-semibold mb-4">Payment Details</h3>
          <div className="text-left space-y-2">
            <div className="flex justify-between">
              <span>Payment ID:</span>
              <span className="font-mono text-sm">{paymentId}</span>
            </div>
            <div className="flex justify-between">
              <span>Amount:</span>
              <span>$99.00</span>
            </div>
            <div className="flex justify-between">
              <span>Course:</span>
              <span>Complete Web Development Bootcamp</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/courses/1/learn"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <PlayArrow />
            Start Learning
          </Link>
          <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
            <Download />
            Download Receipt
          </button>
        </div>
      </motion.div>
    </div>
  )
}
