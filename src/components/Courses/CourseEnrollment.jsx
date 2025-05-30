"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, Favorite, Share, CheckCircle, AccessTime } from "@mui/icons-material"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function CourseEnrollment({ course }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
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

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-lg shadow-lg p-6 sticky top-24"
    >
      {/* Course Preview */}
      <div className="relative mb-6">
        <img
          src={course.thumbnail || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
          <button className="bg-white bg-opacity-90 hover:bg-opacity-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center transition-all">
            <AccessTime className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-gray-900 mb-2">{course.price === 0 ? "Free" : `$${course.price}`}</div>
        {course.price > 0 && <div className="text-sm text-gray-500 line-through">$199</div>}
      </div>

      {/* Enroll Button */}
      <div className="space-y-3 mb-6">
        {isEnrolled ? (
          <button
            onClick={() => router.push(`/courses/${course._id}/learn`)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle />
            Continue Learning
          </button>
        ) : (
          <button
            onClick={handleEnroll}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart />
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
            <Favorite className={isWishlisted ? "text-red-500" : ""} />
            Wishlist
          </button>
          <button className="flex-1 border-2 border-gray-300 text-gray-700 hover:border-gray-400 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
            <Share />
            Share
          </button>
        </div>
      </div>

      {/* Course Includes */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="font-semibold mb-4">This course includes:</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-500 text-sm" />
            <span>
              {Math.floor(course.totalDuration / 60)}h {course.totalDuration % 60}m on-demand video
            </span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-500 text-sm" />
            <span>{course.chapters?.length || 0} lessons</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-500 text-sm" />
            <span>Downloadable resources</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-500 text-sm" />
            <span>Full lifetime access</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-500 text-sm" />
            <span>Certificate of completion</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-500 text-sm" />
            <span>30-day money-back guarantee</span>
          </li>
        </ul>
      </div>
    </motion.div>
  )
}
