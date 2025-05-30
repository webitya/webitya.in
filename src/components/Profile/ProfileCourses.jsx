"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PlayArrow, CheckCircle, Download } from "@mui/icons-material"
import Link from "next/link"

const mockCourses = [
  {
    _id: "1",
    title: "Complete Web Development Bootcamp",
    thumbnail: "/placeholder.svg?height=200&width=300",
    progress: 75,
    completed: false,
    lastAccessed: "2024-01-20",
  },
  {
    _id: "2",
    title: "React Native Mobile Development",
    thumbnail: "/placeholder.svg?height=200&width=300",
    progress: 100,
    completed: true,
    lastAccessed: "2024-01-15",
  },
]

export default function ProfileCourses() {
  const [activeTab, setActiveTab] = useState("enrolled")

  const tabs = [
    { id: "enrolled", label: "Enrolled Courses" },
    { id: "completed", label: "Completed Courses" },
    { id: "certificates", label: "Certificates" },
  ]

  const enrolledCourses = mockCourses.filter((course) => !course.completed)
  const completedCourses = mockCourses.filter((course) => course.completed)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "enrolled" && (
          <div className="space-y-6">
            {enrolledCourses.map((course) => (
              <div key={course._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-24 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                      </span>
                      <Link
                        href={`/courses/${course._id}/learn`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                      >
                        <PlayArrow className="text-sm" />
                        Continue
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "completed" && (
          <div className="space-y-6">
            {completedCourses.map((course) => (
              <div key={course._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-24 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                    <div className="flex items-center gap-2 text-green-600 mb-3">
                      <CheckCircle />
                      <span className="text-sm">Completed</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Completed: {new Date(course.lastAccessed).toLocaleDateString()}
                      </span>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                        <Download className="text-sm" />
                        Certificate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "certificates" && (
          <div className="text-center py-12">
            <Download className="text-gray-400 text-6xl mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Certificates</h3>
            <p className="text-gray-600 mb-6">Download your course completion certificates</p>
            <div className="space-y-4">
              {completedCourses.map((course) => (
                <div
                  key={course._id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <span className="font-medium">{course.title}</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                    <Download className="text-sm" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
