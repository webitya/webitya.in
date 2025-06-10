"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, AttachFile, Subject, Message } from "@mui/icons-material"
import { useSession } from "next-auth/react"

export default function SupportTickets() {
  const [ticket, setTicket] = useState({
    subject: "",
    category: "general",
    priority: "medium",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // API call to create support ticket
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Support ticket created successfully! We'll get back to you soon.")
      setTicket({ subject: "", category: "general", priority: "medium", message: "" })
    } catch (error) {
      alert("Failed to create ticket. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Create Support Ticket</h2>
        <p className="text-gray-600 text-lg">
          Need help? Create a support ticket and our team will assist you promptly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3">Subject</label>
          <div className="relative">
            <Subject className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              required
              value={ticket.subject}
              onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 bg-gray-50 hover:bg-white"
              placeholder="Brief description of your issue"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">Category</label>
            <select
              value={ticket.category}
              onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 bg-gray-50 hover:bg-white"
            >
              <option value="general">General Inquiry</option>
              <option value="technical">Technical Issue</option>
              <option value="billing">Billing & Payment</option>
              <option value="course">Course Content</option>
              <option value="account">Account Management</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">Priority</label>
            <select
              value={ticket.priority}
              onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 bg-gray-50 hover:bg-white"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3">Message</label>
          <div className="relative">
            <Message className="absolute left-4 top-4 text-gray-400" />
            <textarea
              required
              rows={6}
              value={ticket.message}
              onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 bg-gray-50 hover:bg-white resize-none"
              placeholder="Please describe your issue in detail..."
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-3 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 text-gray-700 font-semibold"
          >
            <AttachFile />
            Attach File
          </button>
          <p className="text-sm text-gray-500">Max file size: 10MB</p>
        </div>

        <button
          type="submit"
          disabled={loading || !session}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-blue-400 disabled:to-purple-400 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
              Creating Ticket...
            </>
          ) : (
            <>
              <Send />
              {session ? "Create Ticket" : "Sign In to Create Ticket"}
            </>
          )}
        </button>

        {!session && (
          <p className="text-center text-gray-600 text-sm">
            Please sign in to create a support ticket. This helps us provide better assistance.
          </p>
        )}
      </form>
    </motion.div>
  )
}
