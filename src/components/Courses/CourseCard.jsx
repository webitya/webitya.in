"use client"

import { motion } from "framer-motion"
import { Star, Person, AccessTime, PlayArrow } from "@mui/icons-material"
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function CourseCard({ course, index = 0 }) {
  const { data: session } = useSession()

  const isEnrolled = session?.user?.purchasedCourses?.some((pc) => pc.courseId === course._id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
    >
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnail || "/placeholder.svg?height=200&width=300"}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <PlayArrow className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {isEnrolled && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Enrolled
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
            {course.category}
          </span>
          <span className="text-sm text-gray-500">{course.level}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Person className="text-sm" />
            <span>{course.instructor}</span>
          </div>
          <div className="flex items-center gap-1">
            <AccessTime className="text-sm" />
            <span>
              {Math.floor(course.totalDuration / 60)}h {course.totalDuration % 60}m
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400 text-sm" />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-1">(4.8)</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-900">${course.price}</span>
          </div>
        </div>

        <Link
          href={`/courses/${course.slug || course._id}`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg font-semibold transition-colors"
        >
          {isEnrolled ? "Continue Learning" : "View Course"}
        </Link>
      </div>
    </motion.div>
  )
}
