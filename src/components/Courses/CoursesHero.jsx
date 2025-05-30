"use client"

import { motion } from "framer-motion"
import { Search, TrendingUp, School, Star } from "@mui/icons-material"
import { useState } from "react"

export default function CoursesHero() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
  }

  return (
    <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium"
            >
              <TrendingUp className="w-4 h-4" />
              <span>500+ Premium Courses Available</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight">
              Explore Our
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Premium Courses
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Discover thousands of courses taught by expert instructors. Learn at your own pace with lifetime access
              and certificates.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="max-w-2xl mx-auto mt-8"
            >
              <form onSubmit={handleSearch} className="relative">
                <div className={`relative transition-all duration-300 ${isSearchFocused ? "transform scale-105" : ""}`}>
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search for courses, instructors, or topics..."
                    className="w-full pl-12 pr-32 py-4 rounded-2xl text-gray-900 bg-white/95 backdrop-blur-sm border-0 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-xl text-base sm:text-lg"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Quick Filters */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {["Web Development", "Data Science", "UI/UX Design", "Digital Marketing"].map((tag) => (
                  <button
                    key={tag}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm hover:bg-white/30 transition-all duration-300 border border-white/20"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mt-12 max-w-4xl mx-auto"
            >
              {[
                { icon: School, label: "Courses", value: "500+" },
                { icon: Star, label: "Rating", value: "4.8" },
                { label: "Students", value: "10K+" },
                { label: "Instructors", value: "50+" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  {stat.icon && <stat.icon className="w-8 h-8 text-yellow-300 mx-auto mb-2" />}
                  <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-blue-100 text-sm sm:text-base">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
