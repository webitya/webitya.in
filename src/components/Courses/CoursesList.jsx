"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import CourseCard from "./CourseCard"

// Mock data - replace with actual API call
const mockCourses = [
  {
    _id: "1",
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive course",
    instructor: "John Doe",
    price: 99,
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Web Development",
    level: "Beginner",
    totalDuration: 2400,
    enrolledStudents: 1250,
    isPublished: true,
  },
  {
    _id: "2",
    title: "React Native Mobile Development",
    description: "Build cross-platform mobile apps with React Native and Expo",
    instructor: "Jane Smith",
    price: 149,
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Mobile Development",
    level: "Intermediate",
    totalDuration: 1800,
    enrolledStudents: 890,
    isPublished: true,
  },
  {
    _id: "3",
    title: "Data Science with Python",
    description: "Master data analysis, visualization, and machine learning with Python",
    instructor: "Dr. Mike Johnson",
    price: 199,
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Data Science",
    level: "Advanced",
    totalDuration: 3600,
    enrolledStudents: 567,
    isPublished: true,
  },
  {
    _id: "4",
    title: "UI/UX Design Fundamentals",
    description: "Learn design principles, user research, and prototyping",
    instructor: "Sarah Wilson",
    price: 79,
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "UI/UX Design",
    level: "Beginner",
    totalDuration: 1200,
    enrolledStudents: 2100,
    isPublished: true,
  },
  {
    _id: "5",
    title: "Digital Marketing Mastery",
    description: "Complete guide to SEO, social media, and online advertising",
    instructor: "Mark Davis",
    price: 129,
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Digital Marketing",
    level: "Intermediate",
    totalDuration: 2000,
    enrolledStudents: 1800,
    isPublished: true,
  },
  {
    _id: "6",
    title: "Machine Learning A-Z",
    description: "Hands-on machine learning with Python and real-world projects",
    instructor: "Dr. Emily Chen",
    price: 249,
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Machine Learning",
    level: "Advanced",
    totalDuration: 4200,
    enrolledStudents: 450,
    isPublished: true,
  },
]

export default function CoursesList({ filters }) {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchCourses = async () => {
      setLoading(true)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      let filteredCourses = mockCourses

      if (filters) {
        // Apply filters
        if (filters.category && filters.category !== "All Categories") {
          filteredCourses = filteredCourses.filter((course) => course.category === filters.category)
        }

        if (filters.level && filters.level !== "All Levels") {
          filteredCourses = filteredCourses.filter((course) => course.level === filters.level)
        }

        if (filters.priceRange && filters.priceRange.label !== "All Prices") {
          filteredCourses = filteredCourses.filter(
            (course) => course.price >= filters.priceRange.min && course.price <= filters.priceRange.max,
          )
        }

        if (filters.search) {
          filteredCourses = filteredCourses.filter(
            (course) =>
              course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
              course.instructor.toLowerCase().includes(filters.search.toLowerCase()),
          )
        }
      }

      setCourses(filteredCourses)
      setLoading(false)
    }

    fetchCourses()
  }, [filters])

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-gray-300"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-4"></div>
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">No courses found matching your criteria</div>
        <p className="text-gray-400">Try adjusting your filters or search terms</p>
      </motion.div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <CourseCard key={course._id} course={course} index={index} />
      ))}
    </div>
  )
}
