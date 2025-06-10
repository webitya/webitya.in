"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Grid, List, ChevronLeft, ChevronRight, Search, SlidersHorizontal, X } from "lucide-react"
import CourseCard from "./CourseCard"
import CoursesFilter from "./CoursesFilter"

// Updated mock data with only two courses and correct pricing
const mockCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp 2024",
    slug: "complete-web-development-bootcamp-2024",
    description:
      "Master HTML, CSS, JavaScript, React, Node.js, and MongoDB in this comprehensive full-stack development course with real-world projects and career guidance.",
    category: "Web Development",
    level: "Beginner",
    price: 4999,
    originalPrice: 9999,
    rating: 4.8,
    reviews: 2547,
    students: 15420,
    duration: "42 hours",
    lessons: 156,
    instructor: "John Smith",
    image: null,
    isBestseller: true,
    isNew: false,
  },
  {
    id: 2,
    title: "Digital Marketing Mastery 2024",
    slug: "digital-marketing-mastery",
    description:
      "Complete digital marketing course covering SEO, social media marketing, Google Ads, email marketing, and analytics for business growth.",
    category: "Digital Marketing",
    level: "Beginner",
    price: 6999,
    originalPrice: 12999,
    rating: 4.5,
    reviews: 2134,
    students: 13567,
    duration: "25 hours",
    lessons: 78,
    instructor: "Lisa Thompson",
    image: null,
    isBestseller: false,
    isNew: true,
  },
]

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "alphabetical", label: "A-Z" },
]

export default function CoursesList() {
  const [courses] = useState(mockCourses)
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("popular")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({})
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const coursesPerPage = 9

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = [...courses]

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query),
      )
    }

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter((course) => course.category === filters.category)
    }
    if (filters.level) {
      filtered = filtered.filter((course) => course.level === filters.level)
    }
    if (filters.price) {
      if (filters.price === "Free") {
        filtered = filtered.filter((course) => course.price === 0)
      } else if (filters.price === "₹0-₹5000") {
        filtered = filtered.filter((course) => course.price > 0 && course.price <= 5000)
      } else if (filters.price === "₹5000-₹10000") {
        filtered = filtered.filter((course) => course.price > 5000 && course.price <= 10000)
      } else if (filters.price === "₹10000+") {
        filtered = filtered.filter((course) => course.price > 10000)
      }
    }
    if (filters.rating) {
      const minRating = Number.parseFloat(filters.rating.replace("+", ""))
      filtered = filtered.filter((course) => course.rating >= minRating)
    }

    // Apply sorting
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.students - a.students)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    return filtered
  }, [courses, filters, searchQuery, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCourses.length / coursesPerPage)
  const startIndex = (currentPage - 1) * coursesPerPage
  const endIndex = startIndex + coursesPerPage
  const currentCourses = filteredAndSortedCourses.slice(startIndex, endIndex)

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters, searchQuery, sortBy])

  const handleFilterChange = (newFilters) => {
    setIsLoading(true)
    setTimeout(() => {
      setFilters(newFilters)
      setIsLoading(false)
    }, 300)
  }

  const clearAllFilters = () => {
    setFilters({})
    setSearchQuery("")
    setCurrentPage(1)
  }

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(Boolean).length + (searchQuery ? 1 : 0)
  }

  const goToPage = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 400, behavior: "smooth" })
  }

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 flex-shrink-0">
        <div className="sticky top-8">
          <CoursesFilter onFilterChange={handleFilterChange} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Enhanced Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-6">
          {/* Top Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {filteredAndSortedCourses.length} Course{filteredAndSortedCourses.length !== 1 ? "s" : ""}
              </h2>
              {getActiveFilterCount() > 0 && (
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {getActiveFilterCount()} filter{getActiveFilterCount() !== 1 ? "s" : ""} active
                  </span>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {getActiveFilterCount() > 0 && (
                <span className="bg-blue-800 text-white text-xs px-2 py-1 rounded-full">{getActiveFilterCount()}</span>
              )}
            </button>
          </div>

          {/* Search and Controls Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[180px]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* View Toggle - Desktop Only */}
            <div className="hidden sm:flex items-center bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Filter Modal */}
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
              onClick={() => setShowMobileFilters(false)}
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex items-center justify-between z-10">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <CoursesFilter onFilterChange={handleFilterChange} isMobile={true} />
                </div>
                <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {isLoading && (
          <div
            className={`grid gap-6 mb-8 ${
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
            }`}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Courses Grid/List */}
        {!isLoading && (
          <AnimatePresence mode="wait">
            {currentCourses.length > 0 ? (
              <motion.div
                key="courses"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`grid gap-6 mb-8 ${
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {currentCourses.map((course, index) => (
                  <CourseCard key={course.id} course={course} viewMode={viewMode} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16 bg-white rounded-2xl border border-gray-200"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We couldn't find any courses matching your criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Enhanced Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
            <div className="text-sm text-gray-600 order-2 sm:order-1">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedCourses.length)} of{" "}
              {filteredAndSortedCourses.length} courses
            </div>

            <div className="flex items-center gap-2 order-1 sm:order-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1">
                {getVisiblePages().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === "number" && goToPage(page)}
                    disabled={page === "..."}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      page === currentPage
                        ? "bg-blue-600 text-white shadow-lg"
                        : page === "..."
                          ? "text-gray-400 cursor-default"
                          : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
