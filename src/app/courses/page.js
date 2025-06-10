import CoursesHero from "@/components/Courses/CoursesHero"
import CoursesList from "@/components/Courses/CoursesList"
import Navbar from "@/components/Shared/Navbar"
import Footer from "@/components/Shared/Footer"
import { Suspense } from "react"

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />
      <main className="pt-16 sm:pt-20">
        {/* Hero Section */}
        <CoursesHero />

        {/* Main Content - Remove duplicate filter structure */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded-xl h-80 border border-gray-200"></div>
                ))}
              </div>
            }
          >
            <CoursesList />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}
