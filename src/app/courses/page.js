import CoursesHero from "@/components/Courses/CoursesHero"
import CoursesList from "@/components/Courses/CoursesList"
import CoursesFilter from "@/components/Courses/CoursesFilter"
import Courses3D from "@/components/Courses/Courses3D"
import Navbar from "@/components/Shared/Navbar"
import Footer from "@/components/Shared/Footer"
import { Suspense } from "react"

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <main className="pt-16">
        <CoursesHero />
        <Courses3D />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-96"></div>}>
                  <CoursesFilter />
                </Suspense>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="lg:col-span-3">
              <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-96"></div>}>
                <CoursesList />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
