"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function CoursesFilter({ onFilterChange = () => {}, isMobile = false }) {
  const [filters, setFilters] = useState({
    category: "",
    level: "",
    price: "",
    rating: "",
  })

  const [expanded, setExpanded] = useState({
    category: true,
    level: true,
    price: true,
    rating: true,
  })

  // Only show categories for our two courses
  const categories = [
    { id: "Web Development", name: "Web Development", count: 1 },
    { id: "Digital Marketing", name: "Digital Marketing", count: 1 },
  ]

  // Only show beginner level since both courses are beginner
  const levels = [{ id: "Beginner", name: "Beginner", count: 2 }]

  // Price ranges updated for Indian Rupees
  const priceRanges = [
    { id: "₹0-₹5000", name: "₹0-₹5000", count: 1 },
    { id: "₹5000-₹10000", name: "₹5000-₹10000", count: 1 },
  ]

  // Ratings for our two courses
  const ratings = [
    { id: "4.5+", name: "4.5+ Stars", count: 2 },
    { id: "4.0+", name: "4.0+ Stars", count: 2 },
  ]

  const toggleSection = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleFilterChange = (type, value) => {
    const newValue = filters[type] === value ? "" : value
    setFilters((prev) => {
      const newFilters = { ...prev, [type]: newValue }
      onFilterChange(newFilters)
      return newFilters
    })
  }

  const clearFilters = () => {
    setFilters({
      category: "",
      level: "",
      price: "",
      rating: "",
    })
    onFilterChange({})
  }

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(Boolean).length
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        {getActiveFilterCount() > 0 && (
          <button onClick={clearFilters} className="text-sm text-red-600 hover:text-red-700 font-medium">
            Clear all
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => toggleSection("category")}
        >
          <h4 className="font-semibold text-gray-900">Category</h4>
          {expanded.category ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </div>
        {expanded.category && (
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={filters.category === category.id}
                  onChange={() => handleFilterChange("category", category.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">{category.name}</span>
                <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Level Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between cursor-pointer mb-3" onClick={() => toggleSection("level")}>
          <h4 className="font-semibold text-gray-900">Level</h4>
          {expanded.level ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </div>
        {expanded.level && (
          <div className="space-y-2">
            {levels.map((level) => (
              <label key={level.id} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="radio"
                  name="level"
                  value={level.id}
                  checked={filters.level === level.id}
                  onChange={() => handleFilterChange("level", level.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">{level.name}</span>
                <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{level.count}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between cursor-pointer mb-3" onClick={() => toggleSection("price")}>
          <h4 className="font-semibold text-gray-900">Price</h4>
          {expanded.price ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </div>
        {expanded.price && (
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.id} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="radio"
                  name="price"
                  value={range.id}
                  checked={filters.price === range.id}
                  onChange={() => handleFilterChange("price", range.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">{range.name}</span>
                <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{range.count}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between cursor-pointer mb-3" onClick={() => toggleSection("rating")}>
          <h4 className="font-semibold text-gray-900">Rating</h4>
          {expanded.rating ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </div>
        {expanded.rating && (
          <div className="space-y-2">
            {ratings.map((rating) => (
              <label key={rating.id} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="radio"
                  name="rating"
                  value={rating.id}
                  checked={filters.rating === rating.id}
                  onChange={() => handleFilterChange("rating", rating.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">{rating.name}</span>
                <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{rating.count}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Apply Button - Mobile Only */}
      {isMobile && (
        <button
          onClick={() => onFilterChange(filters)}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Apply Filters
          {getActiveFilterCount() > 0 && (
            <span className="ml-2 bg-blue-800 text-white text-xs px-2 py-1 rounded-full">{getActiveFilterCount()}</span>
          )}
        </button>
      )}
    </div>
  )
}
