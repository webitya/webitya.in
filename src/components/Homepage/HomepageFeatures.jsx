"use client"

import { motion } from "framer-motion"
import {
  School,
  LockIcon as Security,
  FastForwardIcon as Speed,
  PowerIcon as Support,
  BookOpen,
  Award,
  Users,
  TrendingUp,
} from "lucide-react"

const features = [
  {
    icon: School,
    title: "Expert-Led Courses",
    description: "Learn from industry professionals with real-world experience and proven track records",
    color: "blue",
  },
  {
    icon: Security,
    title: "Secure Learning",
    description: "Your progress and data are protected with enterprise-grade security and privacy",
    color: "green",
  },
  {
    icon: Speed,
    title: "Fast & Responsive",
    description: "Optimized platform for seamless learning experience across all devices",
    color: "purple",
  },
  {
    icon: Support,
    title: "24/7 Support",
    description: "Get help whenever you need it with our dedicated support team and community",
    color: "orange",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Content",
    description: "Access to extensive library of courses, tutorials, and learning materials",
    color: "pink",
  },
  {
    icon: Award,
    title: "Certificates",
    description: "Earn industry-recognized certificates upon successful course completion",
    color: "indigo",
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "Join a vibrant community of learners and collaborate on projects",
    color: "teal",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Track your progress and advance your career with personalized learning paths",
    color: "red",
  },
]

const colorClasses = {
  blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
  green: "bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white",
  purple: "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
  orange: "bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white",
  pink: "bg-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white",
  indigo: "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
  teal: "bg-teal-100 text-teal-600 group-hover:bg-teal-600 group-hover:text-white",
  red: "bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white",
}

export default function HomepageFeatures() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">Why Choose Webitya?</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide everything you need to succeed in your learning journey with cutting-edge technology and expert
            guidance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2"
            >
              <div
                className={`w-14 h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center mb-4 lg:mb-6 transition-all duration-300 ${colorClasses[feature.color]}`}
              >
                <feature.icon className="w-7 h-7 lg:w-8 lg:h-8" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3 lg:mb-4 group-hover:text-gray-800 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base group-hover:text-gray-700 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
