"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Edit, Save, Cancel } from "@mui/icons-material"

export default function ProfileSettings({ user }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: "",
    phone: "",
  })

  const handleSave = () => {
    // API call to update user profile
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      bio: "",
      phone: "",
    })
    setIsEditing(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Profile Settings</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <Edit className="text-sm" />
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleSave} className="text-green-600 hover:text-green-700 flex items-center gap-1">
              <Save className="text-sm" />
              Save
            </button>
            <button onClick={handleCancel} className="text-red-600 hover:text-red-700 flex items-center gap-1">
              <Cancel className="text-sm" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-900">{formData.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          {isEditing ? (
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-900">{formData.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          {isEditing ? (
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          ) : (
            <p className="text-gray-900">{formData.phone || "Not provided"}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          {isEditing ? (
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell us about yourself"
            />
          ) : (
            <p className="text-gray-900">{formData.bio || "No bio provided"}</p>
          )}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold mb-4">Account Actions</h4>
        <div className="space-y-2">
          <button className="w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
            Change Password
          </button>
          <button className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">Delete Account</button>
        </div>
      </div>
    </motion.div>
  )
}
