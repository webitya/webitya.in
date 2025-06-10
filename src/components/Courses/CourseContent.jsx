"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Play, Lock, Star, User } from "lucide-react"

export default function CourseContent({ course }) {
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const totalLessons = course.curriculum?.reduce((acc, section) => acc + section.lessons.length, 0) || 0

  return (
    <div className="space-y-8">
      {/* What you'll learn */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-xl font-bold mb-4">What you'll learn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {course.longDescription
            ?.match(/<li>(.*?)<\/li>/g)
            ?.slice(0, 8)
            .map((item, index) => {
              const content = item.replace(/<li>(.*?)<\/li>/, "$1")
              return (
                <div key={index} className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{content}</span>
                </div>
              )
            })}
        </div>
      </motion.section>

      {/* Course content */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-xl font-bold mb-2">Course content</h2>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
          <span>{course.curriculum?.length || 0} sections</span>
          <span>•</span>
          <span>{totalLessons} lectures</span>
          <span>•</span>
          <span>
            {Math.floor(course.totalDuration / 60)}h {course.totalDuration % 60}m total length
          </span>
        </div>

        <div className="space-y-3">
          {course.curriculum?.map((section) => (
            <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between bg-gray-50 p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2 text-left">
                  {expandedSections[section.id] ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">{section.title}</h3>
                    <p className="text-sm text-gray-500">
                      {section.lessons.length} lectures •{" "}
                      {section.lessons.reduce((acc, lesson) => acc + lesson.duration, 0)} min
                    </p>
                  </div>
                </div>
              </button>

              {expandedSections[section.id] && (
                <div className="border-t border-gray-200">
                  {section.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        {lesson.isPreview ? (
                          <Play className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="text-gray-700">{lesson.title}</span>
                        {lesson.isPreview && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Preview</span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{lesson.duration} min</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Requirements */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-xl font-bold mb-4">Requirements</h2>
        <ul className="space-y-2 text-gray-700">
          {course.longDescription
            ?.match(/<li>(.*?)<\/li>/g)
            ?.slice(8, 12)
            .map((item, index) => {
              const content = item.replace(/<li>(.*?)<\/li>/, "$1")
              return (
                <li key={index} className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{content}</span>
                </li>
              )
            })}
        </ul>
      </motion.section>

      {/* Instructor */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-xl font-bold mb-4">Instructor</h2>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
            {course.instructor?.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-medium">{course.instructor}</h3>
            <p className="text-gray-500 mb-2">{course.instructorBio?.split(".")[0]}.</p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>4.8 Instructor Rating</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>15,000+ Students</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Reviews */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-xl font-bold mb-4">Student Reviews</h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900">{course.rating}</div>
            <div className="flex items-center justify-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(course.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500 mt-1">Course Rating</div>
          </div>
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((rating) => {
              const percentage = rating === 5 ? 78 : rating === 4 ? 15 : rating === 3 ? 5 : rating === 2 ? 1 : 1
              return (
                <div key={rating} className="flex items-center gap-2 mb-1">
                  <div className="flex items-center gap-1 w-12">
                    <span>{rating}</span>
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <div className="w-8 text-xs text-gray-500">{percentage}%</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-6">
          {course.reviews?.map((review) => (
            <div key={review.id} className="border-t border-gray-100 pt-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium">
                  {review.user.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{review.user}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
