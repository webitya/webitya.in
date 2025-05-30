import { notFound } from "next/navigation"
import CourseHeader from "@/components/Courses/CourseHeader"
import CourseContent from "@/components/Courses/CourseContent"
import CourseEnrollment from "@/components/Courses/CourseEnrollment"
import Course3D from "@/components/Courses/Course3D"
import Navbar from "@/components/Shared/Navbar"
import Footer from "@/components/Shared/Footer"

// Mock function to get course data
async function getCourse(slug) {
  // In production, this would fetch from your database
  const mockCourse = {
    _id: slug,
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive course",
    instructor: "John Doe",
    price: 99,
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "Web Development",
    level: "Beginner",
    totalDuration: 2400,
    enrolledStudents: 1250,
    isPublished: true,
    chapters: [
      {
        _id: "1",
        title: "Introduction to Web Development",
        description: "Overview of web development and course structure",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: 15,
        order: 1,
      },
      {
        _id: "2",
        title: "HTML Fundamentals",
        description: "Learn the basics of HTML markup",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: 45,
        order: 2,
      },
      {
        _id: "3",
        title: "CSS Styling",
        description: "Style your web pages with CSS",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: 60,
        order: 3,
      },
    ],
  }

  return mockCourse
}

export default async function CoursePage({ params }) {
  const course = await getCourse(params.slug)

  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <CourseHeader course={course} />
        <Course3D />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CourseContent course={course} />
            </div>
            <div className="lg:col-span-1">
              <CourseEnrollment course={course} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
