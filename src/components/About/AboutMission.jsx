"use client"

import { motion } from "framer-motion"
import { School, People, TrendingUp, Security } from "@mui/icons-material"

const values = [
  {
    icon: School,
    title: "Quality Education",
    description:
      "We believe in providing high-quality, practical education that prepares students for real-world challenges and career success.",
  },
  {
    icon: People,
    title: "Inclusive Learning",
    description:
      "Our platform is designed to be accessible to learners from all backgrounds and skill levels, fostering diversity and inclusion.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Growth",
    description:
      "We're committed to helping our students achieve continuous personal and professional growth throughout their learning journey.",
  },
  {
    icon: Security,
    title: "Trust & Security",
    description:
      "We prioritize the security and privacy of our students' data and learning experience with industry-standard protection.",
  },
]

export default function AboutMission() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 leading-tight">
            Our Mission & <span className="text-blue-600">Values</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're dedicated to transforming lives through education, making quality learning accessible to everyone,
            everywhere.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
              Our Mission
            </h3>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                At Webitya, we believe that education is the key to unlocking human potential. Our mission is to
                democratize access to high-quality education by providing innovative, engaging, and practical learning
                experiences that empower individuals to achieve their goals and transform their lives.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                We strive to bridge the gap between traditional education and the rapidly evolving demands of the modern
                workforce, ensuring our students are equipped with the skills and knowledge they need to succeed in
                their chosen fields.
              </p>
            </div>
            <div className="mt-6 sm:mt-8">
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="/placeholder.svg?height=500&width=600&text=Mission+Vision"
                alt="Our Mission - Team Collaboration"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent group-hover:from-blue-600/30 transition-all duration-300"></div>

              {/* Floating stats */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">10K+</div>
                <div className="text-xs sm:text-sm text-gray-600">Students</div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-green-600">95%</div>
                <div className="text-xs sm:text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-blue-200 cursor-pointer"
              whileHover={{ y: -5 }}
            >
              <div className="bg-blue-100 w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6 group-hover:bg-blue-200 transition-colors duration-300 group-hover:scale-110">
                <value.icon className="text-blue-600 text-2xl sm:text-3xl" />
              </div>
              <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">
                {value.title}
              </h4>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg">{value.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 sm:top-10 left-4 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 bg-white rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-4 sm:bottom-10 right-4 sm:right-10 w-24 sm:w-40 h-24 sm:h-40 bg-white rounded-full blur-xl animate-pulse delay-1000"></div>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 lg:mb-6">Join Our Community</h3>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 lg:mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Be part of a global community of learners and educators working together to shape the future of education.
              Start your transformation today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <motion.button
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Learning Today
              </motion.button>
              <motion.button
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Become an Instructor
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
