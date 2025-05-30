"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FilterList, Clear, ExpandMore, ExpandLess, Search, Star, AccessTime, TrendingUp } from "@mui/icons-material"

const categories = [
  { id: "all", name: "All Categories", count: 500 },
  { id: "web", name: "Web Development", count: 120 },
  { id: "mobile", name: "Mobile Development", count: 85 },
  { id: "data", name: "Data Science", count: 95 },
  { id: "ml", name: "Machine Learning", count: 70 },
  { id: "design", name: "UI/UX Design", count: 60 },
  { id: "marketing", name: "Digital Marketing", count: 45 },
  { id: "business", name: "Business", count: 25 },
]

const levels = [
  { id: "all", name: "All Levels", count: 500 },
  { id: "beginner", name: "Beginner", count: 200 },
  { id: "intermediate", name: "Intermediate", count: 200 },
  { id: "advanced", name: "Advanced", count: 100 },
]

const priceRanges = [
  { id: "all", label: "All Prices", min: 0, max: Number.POSITIVE_INFINITY, count: 500 },
  { id: "free", label: "Free", min: 0, max: 0, count: 50 },
  { id: "low", label: "$1 - $50", min: 1, max: 50, count: 150 },
  { id: "mid", label: "$51 - $100", min: 51, max: 100, count: 200 },
  { id: "high", label: "$101 - $200", min: 101, max: 200, count: 80 },
  { id: "premium", label: "$200+", min: 200, max: Number.POSITIVE_INFINITY, count: 20 },
]

const durations = [
  { id: "all", label: "Any Duration", min: 0, max: Number.POSITIVE_INFINITY },
  { id: "short", label: "0-2 hours", min: 0, max: 120 },
  { id: "medium", label: "2-10 hours", min: 120, max: 600 },
  { id: "long", label: "10+ hours", min: 600, max: Number.POSITIVE_INFINITY },
]

const ratings = [
  { id: "all", label: "All Ratings", min: 0 },
  { id: "4.5", label: "4.5 & up", min: 4.5 },
  { id: "4.0", label: "4.0 & up", min: 4.0 },
  { id: "3.5", label: "3.5 & up", min: 3.5 },
]

export default function CoursesFilter({ onFilterChange, isMobile = false }) {
  const [filters, setFilters] = useState({
    category: "all",
    level: "all",
    priceRange: "all",
    duration: "all",
    rating: "all",
    search: "",
  })

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    level: true,
    price: true,
    duration: false,
    rating: false,
  })

  const [isFilterOpen, setIsFilterOpen] = useState(!isMobile)

  useEffect(() => {
    onFilterChange?.(filters)
  }, [filters, onFilterChange])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    const defaultFilters = {
      category: "all",
      level: "all",
      priceRange: "all",
      duration: "all",
      rating: "all",
      search: "",
    }
    setFilters(defaultFilters)
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const FilterSection = ({ title, children, sectionKey, icon: Icon }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-gray-500" />}
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        {expandedSections[sectionKey] ? (
          <ExpandLess className="w-5 h-5 text-gray-500" />
        ) : (
          <ExpandMore className="w-5 h-5 text-gray-500" />
        )}
      </button>
      <AnimatePresence>
        {expandedSections[sectionKey] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4 space-y-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const FilterContent = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FilterList className="w-5 h-5" />
            Filters
          </h3>
          <button
            onClick={clearFilters}
            className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 font-medium transition-colors"
          >
            <Clear className="w-4 h-4" />
            Clear All
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Search Courses</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              placeholder="Search by title or instructor..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Category Filter */}
        <FilterSection title="Category" sectionKey="category" icon={TrendingUp}>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === category.id}
                    onChange={() => handleFilterChange("category", category.id)}
                    className="mr-3 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    {category.name}
                  </span>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{category.count}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Level Filter */}
        <FilterSection title="Level" sectionKey="level">
          <div className="space-y-2">
            {levels.map((level) => (
              <label key={level.id} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="level"
                    checked={filters.level === level.id}
                    onChange={() => handleFilterChange("level", level.id)}
                    className="mr-3 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    {level.name}
                  </span>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{level.count}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Filter */}
        <FilterSection title="Price Range" sectionKey="price">
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.id} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={filters.priceRange === range.id}
                    onChange={() => handleFilterChange("priceRange", range.id)}
                    className="mr-3 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    {range.label}
                  </span>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{range.count}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Duration Filter */}
        <FilterSection title="Duration" sectionKey="duration" icon={AccessTime}>
          <div className="space-y-2">
            {durations.map((duration) => (
              <label key={duration.id} className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="duration"
                  checked={filters.duration === duration.id}
                  onChange={() => handleFilterChange("duration", duration.id)}
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  {duration.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Rating Filter */}
        <FilterSection title="Rating" sectionKey="rating" icon={Star}>
          <div className="space-y-2">
            {ratings.map((rating) => (
              <label key={rating.id} className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating.id}
                  onChange={() => handleFilterChange("rating", rating.id)}
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    {rating.label}
                  </span>
                  {rating.id !== "all" && (
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(rating.min) ? "text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <>
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-40 hover:bg-blue-700 transition-colors"
        >
          <FilterList className="w-6 h-6" />
        </button>

        {/* Mobile Filter Modal */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsFilterOpen(false)}
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute right-0 top-0 h-full w-full max-w-sm bg-white overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Clear className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <FilterContent />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="hidden lg:block"
    >
      <FilterContent />
    </motion.div>
  )
}
