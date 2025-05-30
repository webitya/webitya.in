"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FilterList, Clear } from "@mui/icons-material"

const categories = [
  "All Categories",
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "UI/UX Design",
  "Digital Marketing",
  "Business",
]

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"]

const priceRanges = [
  { label: "All Prices", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "Free", min: 0, max: 0 },
  { label: "$1 - $50", min: 1, max: 50 },
  { label: "$51 - $100", min: 51, max: 100 },
  { label: "$101 - $200", min: 101, max: 200 },
  { label: "$200+", min: 200, max: Number.POSITIVE_INFINITY },
]

export default function CoursesFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    category: "All Categories",
    level: "All Levels",
    priceRange: priceRanges[0],
    search: "",
  })

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const clearFilters = () => {
    const defaultFilters = {
      category: "All Categories",
      level: "All Levels",
      priceRange: priceRanges[0],
      search: "",
    }
    setFilters(defaultFilters)
    onFilterChange?.(defaultFilters)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg sticky top-24"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FilterList />
          Filters
        </h3>
        <button onClick={clearFilters} className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
          <Clear className="text-sm" />
          Clear
        </button>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search Courses</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            placeholder="Search by title or instructor..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
          <select
            value={filters.level}
            onChange={(e) => handleFilterChange("level", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <div className="space-y-2">
            {priceRanges.map((range, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange.label === range.label}
                  onChange={() => handleFilterChange("priceRange", range)}
                  className="mr-2 text-blue-600"
                />
                <span className="text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
