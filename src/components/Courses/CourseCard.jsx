"use client"

import { motion } from "framer-motion"
import {
  Star,
  Person,
  AccessTime,
  PlayArrow,
  Bookmark,
  BookmarkBorder,
  Share,
  TrendingUp,
  CheckCircle,
} from "@mui/icons-material"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useState } from "react"

export default function CourseCard({ course, index = 0 }) {
  const { data: session } = useSession()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const isEnrolled = session?.user?.purchasedCourses?.some((pc) => pc.courseId === course._id)

  const handleBookmark = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
    // Implement bookmark functionality
  }

  const handleShare = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: course.description,
        url: window.location.href + `/${course.slug || course._id}`,
      })
    }
  }

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const formatPrice = (price) => {
    return price === 0 ? "Free" : `$${price}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
    >
      {/* Course Image */}
      <div className="relative overflow-hidden aspect-video">
        <div className={`absolute inset-0 bg-gray-200 animate-pulse ${imageLoaded ? "hidden" : "block"}`} />
        <img
          src={course.thumbnail || "/placeholder.svg?height=200&width=300"}
          alt={course.title}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${imageLoaded ? "block" : "hidden"}`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <PlayArrow className="text-blue-600 text-3xl" />
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            {course.isBestseller && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Bestseller
              </span>
            )}
            {isEnrolled && (
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Enrolled
              </span>
            )}
            {course.price === 0 && (
              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">Free</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleBookmark}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
            >
              {isBookmarked ? (
                <Bookmark className="w-4 h-4 text-blue-600" />
              ) : (
                <BookmarkBorder className="w-4 h-4 text-gray-600" />
              )}
            </button>
            <button
              onClick={handleShare}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
            >
              <Share className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Category and Level */}
        <div className="flex items-center justify-between mb-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            {course.category}
          </span>
          <span className="text-sm text-gray-500 font-medium">{course.level}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{course.description}</p>

        {/* Instructor and Duration */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Person className="w-4 h-4" />
            <span className="font-medium">{course.instructor}</span>
          </div>
          <div className="flex items-center gap-1">
            <AccessTime className="w-4 h-4" />
            <span>{formatDuration(course.totalDuration)}</span>
          </div>
        </div>

        {/* Rating and Students */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(course.rating || 4.8) ? "text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">{course.rating || "4.8"}</span>
            <span className="text-sm text-gray-500">({course.enrolledStudents || 0})</span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">{formatPrice(course.price)}</span>
            {course.originalPrice && course.originalPrice > course.price && (
              <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
            )}
          </div>

          <Link
            href={`/courses/${course.slug || course._id}`}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          >
            {isEnrolled ? "Continue" : "View Course"}
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
