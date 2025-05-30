"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  GridView,
  ViewList,
  Sort,
  FilterList,
  Search,
  TrendingUp,
  AccessTime,
  Star,
  AttachMoney,
} from "@mui/icons-material"
import CourseCard from "./CourseCard"
import CoursesFilter from "./CoursesFilter"

// Enhanced mock data with more realistic course information
const mockCourses = [
  {
    _id: "1",
    title: "Complete Web Development Bootcamp 2024",
    description:
      "Learn HTML, CSS, JavaScript, React, Node.js, MongoDB and more in this comprehensive full-stack development course with real-world projects.",
    instructor: "John Doe",
    price: 99,
    originalPrice: 199,
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Web Development",
    level: "Beginner",
    totalDuration: 2400, // 40 hours
    enrolledStudents: 1250,
    rating: 4.8,
    isPublished: true,
    isBestseller: true,
    slug: "complete-web-development-bootcamp-2024",
  },
  {
    _id: "2",
    title: "React Native Mobile App Development",
    description:
      "Build cross-platform mobile applications with React Native, Expo, and Firebase. Deploy to both iOS and Android app stores.",
    instructor: "Jane Smith",
    price: 149,
    originalPrice: 249,
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Mobile Development",
    level: "Intermediate",
    totalDuration: 1800, // 30 hours
    enrolledStudents: 890,
    rating: 4.7,
    isPublished: true,
    slug: "react-native-mobile-app-development",
  },
  {
    _id: "3",
    title: "Data Science with Python & Machine Learning",
    description:
      "Master data analysis, visualization, machine learning algorithms, and AI with Python, Pandas, NumPy, Scikit-learn, and TensorFlow.",
    instructor: "Dr. Mike Johnson",
    price: 199,
    originalPrice: 299,
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Data Science",
    level: "Advanced",
    totalDuration: 3600, // 60 hours
    enrolledStudents: 567,
    rating: 4.9,
    isPublished: true,
    isBestseller: true,
    slug: "data-science-python-machine-learning",
  },
  {
    _id: "4",
    title: "UI/UX Design Fundamentals & Figma Mastery",
    description:
      "Learn design principles, user research, wireframing, prototyping, and master Figma for creating stunning user interfaces.",
    instructor: "Sarah Wilson",
    price: 79,
    originalPrice: 129,
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "UI/UX Design",
    level: "Beginner",
    totalDuration: 1200, // 20 hours
    enrolledStudents: 2100,
    rating: 4.6,
    isPublished: true,
    slug: "ui-ux-design-fundamentals-figma",
  },
  {
    _id: "5",
    title: "Digital Marketing Mastery 2024",
    description:
      "Complete guide to SEO, social media marketing, Google Ads, Facebook Ads, email marketing, and analytics for business growth.",
    instructor: "Mark Davis",
    price: 129,
    originalPrice: 199,
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Digital Marketing",
    level: "Intermediate",
    totalDuration: 2000, // 33 hours
    enrolledStudents: 1800,
    rating: 4.5,
    isPublished: true,
    slug: "digital-marketing-mastery-2024",
  },
  {
    _id: "6",
    title: "Machine Learning A-Z with Python & R",
    description:
      "Hands-on machine learning course with Python and R. Build real-world ML projects including regression, classification, and deep learning.",
    instructor: "Dr. Emily Chen",
    price: 249,
    originalPrice: 349,
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Machine Learning",
    level: "Advanced",
    totalDuration: 4200, // 70 hours
    enrolledStudents: 450,
    rating: 4.9,
    isPublished: true,
    isBestseller: true,
    slug: "machine-learning-python-r",
  },
  {
    _id: "7",
    title: "Free Introduction to Programming",
    description:
      "Start your coding journey with this free course covering programming fundamentals, logic, and basic algorithms.",
    instructor: "Alex Johnson",
    price: 0,
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Web Development",
    level: "Beginner",
    totalDuration: 600, // 10 hours
    enrolledStudents: 5000,
    rating: 4.4,
    isPublished: true,
    slug: "free-introduction-programming",
  },
  {
    _id: "8",
    title: "Advanced Business Strategy & Leadership",
    description:
      "Develop strategic thinking, leadership skills, and business acumen for executive-level decision making and team management.",
    instructor: "Robert Brown",
    price: 299,
    originalPrice: 399,
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Business",
    level: "Advanced",
    totalDuration: 1500, // 25 hours
    enrolledStudents: 320,
    rating: 4.7,
    isPublished: true,
    slug: "advanced-business-strategy-leadership",
  },
]

const sortOptions = [
  { id: "relevance", label: "Most Relevant", icon: TrendingUp },
  { id: "newest", label: "Newest First", icon: AccessTime },
  { id: "rating", label: "Highest Rated", icon: Star },
  { id: "price_low", label: "Price: Low to High", icon: AttachMoney },
  { id: "price_high", label: "Price: High to Low", icon: AttachMoney },
  { id: "popular", label: "Most Popular", icon: TrendingUp },
]

export default function CoursesList() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [sortBy, setSortBy] = useState("relevance")
  const [filters, setFilters] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const coursesPerPage = 12

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = mockCourses

    // Apply filters
    if (filters.category && filters.category !== "all") {
      const categoryMap = {
        web: "Web Development",
        mobile: "Mobile Development",
        data: "Data Science",
        ml: "Machine Learning",
        design: "UI/UX Design",
        marketing: "Digital Marketing",
        business: "Business",
      }
      filtered = filtered.filter((course) => course.category === categoryMap[filters.category])
    }

    if (filters.level && filters.level !== "all") {
      const levelMap = {
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
      }
      filtered = filtered.filter((course) => course.level === levelMap[filters.level])
    }

    if (filters.priceRange && filters.priceRange !== "all") {
      const priceMap = {
        free: { min: 0, max: 0 },
        low: { min: 1, max: 50 },
        mid: { min: 51, max: 100 },
        high: { min: 101, max: 200 },
        premium: { min: 200, max: Number.POSITIVE_INFINITY },
      }
      const range = priceMap[filters.priceRange]
      if (range) {
        filtered = filtered.filter((course) => course.price >= range.min && course.price <= range.max)
      }
    }

    if (filters.rating && filters.rating !== "all") {
      const minRating = Number.parseFloat(filters.rating)
      filtered = filtered.filter((course) => (course.rating || 4.8) >= minRating)
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm) ||
          course.instructor.toLowerCase().includes(searchTerm) ||
          course.description.toLowerCase().includes(searchTerm),
      )
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        // Assuming newer courses have higher IDs
        filtered.sort((a, b) => Number.parseInt(b._id) - Number.parseInt(a._id))
        break
      case "rating":
        filtered.sort((a, b) => (b.rating || 4.8) - (a.rating || 4.8))
        break
      case "price_low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price_high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "popular":
        filtered.sort((a, b) => b.enrolledStudents - a.enrolledStudents)
        break
      default: // relevance
        // Keep original order or implement relevance algorithm
        break
    }

    return filtered
  }, [filters, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCourses.length / coursesPerPage)
  const paginatedCourses = filteredAndSortedCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage,
  )

  useEffect(() => {
    // Simulate API call
    const fetchCourses = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setCourses(filteredAndSortedCourses)
      setLoading(false)
    }

    fetchCourses()
  }, [filteredAndSortedCourses])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const LoadingSkeleton = () => (
    <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
          <div className="aspect-video bg-gray-300"></div>
          <div className="p-6 space-y-4">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-10 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const Pagination = () => (
    <div className="flex items-center justify-between mt-12">
      <div className="text-sm text-gray-700">
        Showing {(currentPage - 1) * coursesPerPage + 1} to{" "}
        {Math.min(currentPage * coursesPerPage, filteredAndSortedCourses.length)} of {filteredAndSortedCourses.length}{" "}
        courses
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        {[...Array(Math.min(totalPages, 5))].map((_, index) => {
          const pageNumber = index + 1
          return (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === pageNumber
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {pageNumber}
            </button>
          )
        })}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900">{filteredAndSortedCourses.length} Courses Found</h2>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FilterList className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <Sort className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <GridView className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <ViewList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <CoursesFilter onFilterChange={handleFilterChange} isMobile={true} />

      {/* Courses Grid/List */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoadingSkeleton />
          </motion.div>
        ) : paginatedCourses.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-16 bg-white rounded-xl border border-gray-200"
          >
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={() => {
                setFilters({})
                setCurrentPage(1)
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="courses"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`grid gap-6 ${
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            }`}
          >
            {paginatedCourses.map((course, index) => (
              <CourseCard key={course._id} course={course} index={index} viewMode={viewMode} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {!loading && paginatedCourses.length > 0 && totalPages > 1 && <Pagination />}
    </div>
  )
}
