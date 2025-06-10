import { notFound } from "next/navigation"
import CourseHeader from "@/components/Courses/CourseHeader"
import CourseContent from "@/components/Courses/CourseContent"
import CourseEnrollment from "@/components/Courses/CourseEnrollment"
import Course3D from "@/components/Courses/Course3D"
import Navbar from "@/components/Shared/Navbar"
import Footer from "@/components/Shared/Footer"
import { Suspense } from "react"

// Mock course data - updated with only two courses
const getCourseBySlug = async (slug) => {
  const mockCourses = {
    "complete-web-development-bootcamp-2024": {
      _id: "1",
      title: "Complete Web Development Bootcamp 2024",
      description:
        "Master HTML, CSS, JavaScript, React, Node.js, and MongoDB in this comprehensive full-stack development course with real-world projects and career guidance.",
      longDescription: `
        <h3>What you'll learn</h3>
        <ul>
          <li>Build 16+ projects including a massive production application</li>
          <li>Learn the latest technologies including Javascript, React, Node and even Web3 development</li>
          <li>After the course you will be able to build ANY website you want</li>
          <li>Build fully-fledged websites and web apps for your startup or business</li>
          <li>Work as a freelance web developer</li>
          <li>Master frontend development with React</li>
          <li>Master backend development with Node.js</li>
          <li>Learn professional developer best practices</li>
        </ul>
        
        <h3>Course Content</h3>
        <p>This comprehensive course covers everything you need to know to become a full-stack web developer. From the basics of HTML and CSS to advanced React patterns and Node.js backend development.</p>
        
        <h3>Requirements</h3>
        <ul>
          <li>No programming experience needed - I'll teach you everything you need to know</li>
          <li>A computer with access to the internet</li>
          <li>No paid software required - all tools used are free</li>
          <li>I'll walk you through, step-by-step how to get all the software installed and set up</li>
        </ul>
      `,
      instructor: "John Smith",
      instructorBio:
        "Full-stack developer with 10+ years of experience. Former senior developer at Google and Facebook.",
      instructorImage: "/placeholder.svg?height=100&width=100",
      price: 4999,
      originalPrice: 9999,
      thumbnail: "/placeholder.svg?height=400&width=600",
      category: "Web Development",
      level: "Beginner",
      totalDuration: 2520, // 42 hours
      enrolledStudents: 15420,
      rating: 4.8,
      reviewsCount: 2547,
      isPublished: true,
      isBestseller: true,
      slug: "complete-web-development-bootcamp-2024",
      curriculum: [
        {
          id: 1,
          title: "Introduction to Web Development",
          lessons: [
            { id: 1, title: "Welcome to the Course", duration: 5, isPreview: true },
            { id: 2, title: "How the Web Works", duration: 15, isPreview: true },
            { id: 3, title: "Setting Up Your Development Environment", duration: 20, isPreview: false },
          ],
        },
        {
          id: 2,
          title: "HTML Fundamentals",
          lessons: [
            { id: 4, title: "HTML Basics", duration: 30, isPreview: false },
            { id: 5, title: "HTML Forms", duration: 25, isPreview: false },
            { id: 6, title: "Semantic HTML", duration: 20, isPreview: false },
          ],
        },
        {
          id: 3,
          title: "CSS Styling",
          lessons: [
            { id: 7, title: "CSS Fundamentals", duration: 35, isPreview: false },
            { id: 8, title: "CSS Flexbox", duration: 40, isPreview: false },
            { id: 9, title: "CSS Grid", duration: 45, isPreview: false },
          ],
        },
      ],
      features: [
        "42 hours on-demand video",
        "15 articles",
        "12 downloadable resources",
        "Full lifetime access",
        "Access on mobile and TV",
        "Certificate of completion",
      ],
      reviews: [
        {
          id: 1,
          user: "Alice Johnson",
          avatar: "/placeholder.svg?height=50&width=50",
          rating: 5,
          comment: "Excellent course! Very comprehensive and well-structured.",
          date: "2024-01-15",
        },
        {
          id: 2,
          user: "Bob Smith",
          avatar: "/placeholder.svg?height=50&width=50",
          rating: 4,
          comment: "Great content, but could use more advanced topics.",
          date: "2024-01-10",
        },
      ],
    },
    "digital-marketing-mastery": {
      _id: "2",
      title: "Digital Marketing Mastery 2024",
      description:
        "Complete digital marketing course covering SEO, social media marketing, Google Ads, email marketing, and analytics for business growth.",
      longDescription: `
        <h3>What you'll learn</h3>
        <ul>
          <li>Master SEO and rank higher on Google</li>
          <li>Create effective social media marketing campaigns</li>
          <li>Run profitable Google Ads and Facebook Ads</li>
          <li>Build email marketing funnels that convert</li>
          <li>Analyze and optimize marketing performance</li>
          <li>Develop comprehensive marketing strategies</li>
          <li>Understand customer psychology and behavior</li>
          <li>Create compelling content that drives engagement</li>
        </ul>
        
        <h3>Course Content</h3>
        <p>This course covers all aspects of digital marketing from strategy to execution. You'll learn how to create, implement, and optimize marketing campaigns across multiple channels.</p>
        
        <h3>Requirements</h3>
        <ul>
          <li>Basic computer skills and internet access</li>
          <li>No prior marketing experience required</li>
          <li>Willingness to learn and practice</li>
          <li>Access to social media platforms</li>
        </ul>
      `,
      instructor: "Lisa Thompson",
      instructorBio:
        "Digital marketing expert with 8+ years of experience. Helped 500+ businesses grow their online presence.",
      instructorImage: "/placeholder.svg?height=100&width=100",
      price: 6999,
      originalPrice: 12999,
      thumbnail: "/placeholder.svg?height=400&width=600",
      category: "Digital Marketing",
      level: "Beginner",
      totalDuration: 1500, // 25 hours
      enrolledStudents: 13567,
      rating: 4.5,
      reviewsCount: 2134,
      isPublished: true,
      isBestseller: false,
      slug: "digital-marketing-mastery",
      curriculum: [
        {
          id: 1,
          title: "Digital Marketing Fundamentals",
          lessons: [
            { id: 1, title: "Introduction to Digital Marketing", duration: 10, isPreview: true },
            { id: 2, title: "Understanding Your Target Audience", duration: 20, isPreview: true },
            { id: 3, title: "Creating a Marketing Strategy", duration: 25, isPreview: false },
          ],
        },
        {
          id: 2,
          title: "Search Engine Optimization (SEO)",
          lessons: [
            { id: 4, title: "SEO Basics and Keyword Research", duration: 30, isPreview: false },
            { id: 5, title: "On-Page SEO Optimization", duration: 35, isPreview: false },
            { id: 6, title: "Link Building Strategies", duration: 25, isPreview: false },
          ],
        },
        {
          id: 3,
          title: "Social Media Marketing",
          lessons: [
            { id: 7, title: "Social Media Strategy", duration: 20, isPreview: false },
            { id: 8, title: "Content Creation and Curation", duration: 30, isPreview: false },
            { id: 9, title: "Social Media Advertising", duration: 40, isPreview: false },
          ],
        },
      ],
      features: [
        "25 hours on-demand video",
        "10 articles",
        "8 downloadable resources",
        "Full lifetime access",
        "Access on mobile and TV",
        "Certificate of completion",
      ],
      reviews: [
        {
          id: 1,
          user: "Mark Wilson",
          avatar: "/placeholder.svg?height=50&width=50",
          rating: 5,
          comment: "Great practical course with actionable strategies!",
          date: "2024-01-20",
        },
        {
          id: 2,
          user: "Sarah Davis",
          avatar: "/placeholder.svg?height=50&width=50",
          rating: 4,
          comment: "Very informative, helped me grow my business.",
          date: "2024-01-18",
        },
      ],
    },
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return mockCourses[slug] || null
}

export default async function CoursePage({ params }) {
  const course = await getCourseBySlug(params.slug)

  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />
      <main className="pt-16 sm:pt-20">
        {/* Course Header */}
        <CourseHeader course={course} />

        {/* 3D Section - Hidden on mobile for performance */}
        <div className="hidden lg:block">
          <Course3D />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Course Content */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <Suspense
                fallback={
                  <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-64 bg-gray-300 rounded"></div>
                  </div>
                }
              >
                <CourseContent course={course} />
              </Suspense>
            </div>

            {/* Enrollment Sidebar */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="lg:sticky lg:top-24">
                <Suspense
                  fallback={<div className="animate-pulse bg-white rounded-xl h-96 border border-gray-200"></div>}
                >
                  <CourseEnrollment course={course} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const course = await getCourseBySlug(params.slug)

  if (!course) {
    return {
      title: "Course Not Found",
    }
  }

  return {
    title: `${course.title} | Webitya LMS`,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      images: [course.thumbnail],
    },
  }
}
