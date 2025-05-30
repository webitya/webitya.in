"use client"

import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Error, Home, ArrowBack } from "@mui/icons-material"
import Link from "next/link"

const errorMessages = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "You do not have permission to sign in.",
  Verification: "The verification token has expired or has already been used.",
  Default: "An error occurred during authentication.",
}

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const errorMessage = errorMessages[error] || errorMessages.Default

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Error className="text-red-600 text-5xl" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Authentication Error</h1>
        <p className="text-gray-600 mb-8">{errorMessage}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/signin"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <ArrowBack />
            Try Again
          </Link>
          <Link
            href="/"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <Home />
            Go Home
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-left">
            <h3 className="font-semibold mb-2">Debug Information:</h3>
            <p className="text-sm text-gray-600">Error: {error}</p>
            <p className="text-sm text-gray-600 mt-2">Make sure you have set the following environment variables:</p>
            <ul className="text-sm text-gray-600 mt-1 list-disc list-inside">
              <li>NEXTAUTH_SECRET</li>
              <li>NEXTAUTH_URL</li>
              <li>MONGODB_URI</li>
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  )
}
