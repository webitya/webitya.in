"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Refresh, Home } from "@mui/icons-material"
import Link from "next/link"
import clientLogger from "@/lib/client-logger"

export default function AppError({ error, reset }) {
  useEffect(() => {
    clientLogger.error("Application error:", {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    })
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Refresh className="text-red-600 text-5xl" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong!</h1>
        <p className="text-gray-600 mb-8">
          We apologize for the inconvenience. An error occurred while processing your request.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <Refresh />
            Try Again
          </button>
          <Link
            href="/"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <Home />
            Go Home
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 mb-2">Error Details (Development Only)</summary>
            <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-auto">
              {error.message}
              {error.stack}
            </pre>
          </details>
        )}
      </motion.div>
    </div>
  )
}
