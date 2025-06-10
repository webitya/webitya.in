"use client"

import { useState } from "react"
import { Play, Clock, Users, Share, Heart, ShoppingCart, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function CourseEnrollment({ course }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const isEnrolled = session?.user?.purchasedCourses?.some((pc) => pc.courseId === course._id)

  const handleEnroll = () => {
    if (!session) {
      router.push("/auth/signin")
      return
    }

    if (course.price === 0) {
      // Free course - enroll directly
      // API call to enroll user
      console.log("Enrolling in free course")
    } else {
      // Paid course - redirect to payment
      router.push(`/payment?courseId=${course._id}`)
    }
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    // API call to add/remove from wishlist
  }

  const handleShare = () => {
    setShowShareOptions(!showShareOptions)
  }

  const formatPrice = (price) => {
    if (price === 0) return "Free"
    return `₹${price.toLocaleString("en-IN")}`
  }

  const calculateDiscount = () => {
    if (!course.originalPrice || course.price === course.originalPrice) return 0
    return Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
  }

  const discount = calculateDiscount()

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-lg shadow-lg p-6 sticky top-24"
    >
      {/* Course Preview */}
      <div className="relative mb-6">
        <div className="w-full h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
          <button className="relative z-10 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg hover:bg-white transition-colors">
            <Play className="h-8 w-8 text-blue-600" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
          Preview available
        </div>
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-gray-900 mb-2">{formatPrice(course.price)}</div>
        {discount > 0 && (
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-gray-500 line-through">{formatPrice(course.originalPrice)}</span>
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">{discount}% OFF</span>
          </div>
        )}
      </div>

      {/* Enroll Button */}
      <div className="space-y-3 mb-6">
        {isEnrolled ? (
          <button
            onClick={() => router.push(`/courses/${course._id}/learn`)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle className="h-5 w-5" />
            Continue Learning
          </button>
        ) : (
          <button
            onClick={handleEnroll}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <ShoppingCart className="h-5 w-5" />
            {course.price === 0 ? "Enroll Now" : "Buy Now"}
          </button>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleWishlist}
            className={`flex-1 border-2 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
              isWishlisted
                ? "border-red-500 text-red-500 bg-red-50"
                : "border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500" : ""}`} />
            Wishlist
          </button>
          <button
            onClick={handleShare}
            className="flex-1 border-2 border-gray-300 text-gray-700 hover:border-gray-400 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Share className="h-5 w-5" />
            Share
          </button>
          {showShareOptions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-6 mt-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10"
            >
              <div className="text-sm font-medium text-gray-900 mb-2 px-2">Share this course</div>
              <button className="w-full text-left px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">
                Copy link
              </button>
              <button className="w-full text-left px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">
                Facebook
              </button>
              <button className="w-full text-left px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">
                Twitter
              </button>
              <button className="w-full text-left px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">
                WhatsApp
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mb-6">30-Day Money-Back Guarantee</div>

      {/* Course Includes */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="font-semibold mb-4">This course includes:</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-500 h-4 w-4" />
            <span>
              {Math.floor(course.totalDuration / 60)}h {course.totalDuration % 60}m on-demand video
            </span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-500 h-4 w-4" />
            <span>{course.curriculum?.reduce((acc, section) => acc + section.lessons.length, 0) || 0} lessons</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-500 h-4 w-4" />
            <span>Downloadable resources</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-500 h-4 w-4" />
            <span>Full lifetime access</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-500 h-4 w-4" />
            <span>Certificate of completion</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-500 h-4 w-4" />
            <span>30-day money-back guarantee</span>
          </li>
        </ul>
      </div>

      {/* Course Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
            <Clock className="h-5 w-5 text-blue-600 mb-1" />
            <div className="text-sm font-medium text-gray-900">{Math.floor(course.totalDuration / 60)} hours</div>
            <div className="text-xs text-gray-500">Total Duration</div>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
            <Users className="h-5 w-5 text-blue-600 mb-1" />
            <div className="text-sm font-medium text-gray-900">
              {course.enrolledStudents?.toLocaleString("en-IN") || 0}
            </div>
            <div className="text-xs text-gray-500">Students</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
