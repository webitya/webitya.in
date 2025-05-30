"use client"

import { motion } from "framer-motion"
import { Search } from "@mui/icons-material"

export default function CoursesHero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">Explore Our Courses</h1>
          <p className="text-xl text-blue-100 mb-8">Discover thousands of courses taught by expert instructors</p>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for courses..."
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                Search
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
