"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, AttachFile } from "@mui/icons-material"
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
      alert("Support ticket created successfully!")
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
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Create Support Ticket</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
          <input
            type="text"
            required
            value={ticket.subject}
            onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Brief description of your issue"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={ticket.category}
              onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="general">General</option>
              <option value="technical">Technical Issue</option>
              <option value="billing">Billing</option>
              <option value="course">Course Content</option>
              <option value="account">Account</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={ticket.priority}
              onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
          <textarea
            required
            rows={6}
            value={ticket.message}
            onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Please describe your issue in detail..."
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <AttachFile />
            Attach File
          </button>
        </div>

        <button
          type="submit"
          disabled={loading || !session}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
              Creating Ticket...
            </>
          ) : (
            <>
              <Send />
              {session ? "Create Ticket" : "Sign In to Create Ticket"}
            </>
          )}
        </button>
      </form>
    </motion.div>
  )
}
