"use client"

import { motion } from "framer-motion"
import { Star, Clock, Users, Award } from "lucide-react"

export default function CourseHeader({ course }) {
  const formatPrice = (price) => {
    if (price === 0) return "Free"
    return `₹${price.toLocaleString("en-IN")}`
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {course.isBestseller && (
                <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Bestseller
                </span>
              )}
              {course.isNew && (
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">New</span>
              )}
              <span className={`text-xs font-medium px-2 py-1 rounded-full bg-white/20`}>{course.level}</span>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/20">{course.category}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{course.title}</h1>

            {/* Description */}
            <p className="text-lg text-white/90 mb-6 max-w-2xl">{course.description}</p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 mb-6 text-white/90">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{course.rating}</span>
                <span className="text-sm text-white/70">({course.reviewsCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-5 h-5" />
                <span>{course.enrolledStudents?.toLocaleString("en-IN") || 0} students</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5" />
                <span>{Math.floor(course.totalDuration / 60)} hours</span>
              </div>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg font-bold">{course.instructor.charAt(0)}</span>
              </div>
              <div>
                <div className="text-sm text-white/70">Created by</div>
                <div className="font-medium">{course.instructor}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="aspect-video bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-blue-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="text-2xl font-bold">{formatPrice(course.price)}</div>
                {course.originalPrice && (
                  <div className="flex items-center gap-2">
                    <span className="text-white/70 line-through">{formatPrice(course.originalPrice)}</span>
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                )}
              </div>

              <button className="w-full bg-white text-blue-700 hover:bg-blue-50 py-3 rounded-lg font-semibold transition-colors mb-4">
                Enroll Now
              </button>

              <div className="text-center text-sm mb-4">30-Day Money-Back Guarantee</div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Last updated {new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path
                      fillRule="evenodd"
                      d="M9 2.25a.75.75 0 01.75.75v1.506a49.38 49.38 0 015.343.371.75.75 0 11-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 01-2.969 6.323c.317.384.65.753.998 1.107a.75.75 0 11-1.07 1.052A18.902 18.902 0 019 13.687a18.823 18.823 0 01-5.656 4.482.75.75 0 11-.688-1.333 17.323 17.323 0 005.396-4.353A18.72 18.72 0 015.89 8.598a.75.75 0 011.388-.568A17.21 17.21 0 009 11.224a17.17 17.17 0 002.391-5.165 48.038 48.038 0 00-8.298.307.75.75 0 01-.186-1.489 49.159 49.159 0 015.343-.371V3A.75.75 0 019 2.25zM15.75 9a.75.75 0 01.68.433l5.25 11.25a.75.75 0 01-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 01-1.36-.634l5.25-11.25A.75.75 0 0115.75 9zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>English</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
