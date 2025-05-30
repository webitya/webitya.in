import CoursesHero from "@/components/Courses/CoursesHero"
import CoursesList from "@/components/Courses/CoursesList"
import CoursesFilter from "@/components/Courses/CoursesFilter"
import Courses3D from "@/components/Courses/Courses3D"
import Navbar from "@/components/Shared/Navbar"
import Footer from "@/components/Shared/Footer"

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <CoursesHero />
        <Courses3D />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <CoursesFilter />
            </div>
            <div className="lg:col-span-3">
              <CoursesList />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
