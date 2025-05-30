"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExpandMore, PlayArrow, Lock, CheckCircle, Star } from "@mui/icons-material"
import { useSession } from "next-auth/react"

export default function CourseContent({ course }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedChapter, setExpandedChapter] = useState(null)
  const { data: session } = useSession()

  const isEnrolled = session?.user?.purchasedCourses?.some((pc) => pc.courseId === course._id)

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "curriculum", label: "Curriculum" },
    { id: "instructor", label: "Instructor" },
    { id: "reviews", label: "Reviews" },
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">What you'll learn</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Build responsive websites using HTML, CSS, and JavaScript</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Create dynamic web applications with React.js</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Develop backend APIs using Node.js and Express</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Work with databases and implement authentication</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Requirements</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Basic computer skills</li>
                <li>• No prior programming experience required</li>
                <li>• A computer with internet connection</li>
                <li>• Willingness to learn and practice</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                This comprehensive web development course will take you from complete beginner to job-ready developer.
                You'll learn the most in-demand skills including HTML, CSS, JavaScript, React, Node.js, and much more.
                The course includes hands-on projects, real-world examples, and lifetime access to all materials.
              </p>
            </div>
          </div>
        )}

        {activeTab === "curriculum" && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Course Curriculum</h3>
            {course.chapters?.map((chapter, index) => (
              <div key={chapter._id} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setExpandedChapter(expandedChapter === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    {isEnrolled ? <PlayArrow className="text-blue-600" /> : <Lock className="text-gray-400" />}
                    <div>
                      <h4 className="font-medium">{chapter.title}</h4>
                      <p className="text-sm text-gray-500">{chapter.duration} minutes</p>
                    </div>
                  </div>
                  <ExpandMore
                    className={`transform transition-transform ${expandedChapter === index ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedChapter === index && (
                  <div className="px-4 pb-4 border-t border-gray-200">
                    <p className="text-gray-600">{chapter.description}</p>
                    {isEnrolled && (
                      <button className="mt-2 text-blue-600 hover:text-blue-700 font-medium">Watch Now</button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "instructor" && (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <img
                src="/placeholder.svg?height=80&width=80"
                alt={course.instructor}
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h3 className="text-xl font-semibold">{course.instructor}</h3>
                <p className="text-gray-600 mb-2">Senior Full Stack Developer</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>⭐ 4.9 Instructor Rating</span>
                  <span>👥 15,000+ Students</span>
                  <span>🎓 25 Courses</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              John is a seasoned full-stack developer with over 8 years of experience in web development. He has worked
              with companies like Google, Microsoft, and several startups. John is passionate about teaching and has
              helped thousands of students launch their careers in tech.
            </p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold">4.8</div>
                <div className="flex items-center justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400" />
                  ))}
                </div>
                <div className="text-sm text-gray-500">1,234 reviews</div>
              </div>
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((review) => (
                <div key={review} className="border-b border-gray-200 pb-4">
                  <div className="flex items-start gap-3">
                    <img src="/placeholder.svg?height=40&width=40" alt="Student" className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">Student Name</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="text-yellow-400 text-sm" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Excellent course! The instructor explains everything clearly and the projects are very
                        practical. I learned so much and feel confident about my web development skills now.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
