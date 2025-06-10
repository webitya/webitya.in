"use client"

import { motion } from "framer-motion"
import { Star, Clock, Users, BookOpen, ArrowRight, Heart, Share2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function CourseCard({ course, viewMode = "grid", index = 0 }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageError, setImageError] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const calculateDiscount = () => {
    if (course.originalPrice && course.price) {
      return Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    }
    return 0
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const handleShare = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: course.description,
        url: `/courses/${course.slug}`,
      })
    }
  }

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
      >
        <Link href={`/courses/${course.slug}`} className="block">
          <div className="flex flex-col sm:flex-row">
            {/* Image Section */}
            <div className="relative sm:w-80 h-48 sm:h-auto flex-shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-blue-500" />
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {course.isBestseller && (
                  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">BESTSELLER</span>
                )}
                {course.isNew && (
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">NEW</span>
                )}
                {calculateDiscount() > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {calculateDiscount()}% OFF
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={handleWishlist}
                  className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                    isWishlisted
                      ? "bg-red-500 text-white"
                      : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
                  }`}
                >
                  <Heart className="w-4 h-4" />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-blue-500 hover:text-white backdrop-blur-sm transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                      {course.category}
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                      {course.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">{course.description}</p>
                  <p className="text-sm text-gray-500 mb-2">by {course.instructor}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">{course.rating}</span>
                    <span>({course.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    {course.originalPrice && (
                      <span className="text-gray-400 line-through text-sm">{formatPrice(course.originalPrice)}</span>
                    )}
                    <span className="text-2xl font-bold text-gray-900">
                      {course.price === 0 ? "Free" : formatPrice(course.price)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  // Grid View
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
    >
      <Link href={`/courses/${course.slug}`} className="block h-full">
        <div className="flex flex-col h-full">
          {/* Image Section */}
          <div className="relative h-48 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-blue-500" />
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {course.isBestseller && (
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">BESTSELLER</span>
              )}
              {course.isNew && (
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">NEW</span>
              )}
              {calculateDiscount() > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {calculateDiscount()}% OFF
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleWishlist}
                className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                  isWishlisted ? "bg-red-500 text-white" : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
                }`}
              >
                <Heart className="w-4 h-4" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-blue-500 hover:text-white backdrop-blur-sm transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 flex flex-col flex-1">
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                  {course.category}
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                  {course.level}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {course.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-2">{course.description}</p>
              <p className="text-sm text-gray-500">by {course.instructor}</p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 mb-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-semibold">{course.rating}</span>
                <span>({course.reviews.toLocaleString()})</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-col">
                {course.originalPrice && (
                  <span className="text-gray-400 line-through text-sm">{formatPrice(course.originalPrice)}</span>
                )}
                <span className="text-xl font-bold text-gray-900">
                  {course.price === 0 ? "Free" : formatPrice(course.price)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                <span className="text-sm">Enroll</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
