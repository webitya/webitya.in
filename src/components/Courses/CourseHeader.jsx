"use client"

import { motion } from "framer-motion"
import { Star, Person, AccessTime, School, PlayArrow } from "@mui/icons-material"

export default function CourseHeader({ course }) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                {course.category}
              </span>
              <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">{course.level}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">{course.title}</h1>
            <p className="text-xl text-blue-100 mb-8">{course.description}</p>

            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-white">
                <Person />
                <span>By {course.instructor}</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <AccessTime />
                <span>
                  {Math.floor(course.totalDuration / 60)}h {course.totalDuration % 60}m
                </span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <School />
                <span>{course.enrolledStudents} students</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400" />
                ))}
                <span className="text-white ml-2">4.8 (1,234 reviews)</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img src={course.thumbnail || "/placeholder.svg"} alt={course.title} className="w-full h-auto" />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <button className="bg-white bg-opacity-90 hover:bg-opacity-100 text-blue-600 w-20 h-20 rounded-full flex items-center justify-center transition-all">
                  <PlayArrow className="text-4xl ml-1" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
