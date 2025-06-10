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
    <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Our Mission & <span className="text-blue-600">Values</span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're dedicated to transforming lives through education, making quality learning accessible to everyone,
            everywhere.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-8">Our Mission</h3>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                At Webitya, we believe that education is the key to unlocking human potential. Our mission is to
                democratize access to high-quality education by providing innovative, engaging, and practical learning
                experiences that empower individuals to achieve their goals and transform their lives.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We strive to bridge the gap between traditional education and the rapidly evolving demands of the modern
                workforce, ensuring our students are equipped with the skills and knowledge they need to succeed in
                their chosen fields.
              </p>
            </div>
            <div className="mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Start Your Journey
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Our Mission - Team Collaboration"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-blue-200"
            >
              <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                <value.icon className="text-blue-600 text-3xl" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h4>
              <p className="text-gray-600 leading-relaxed text-lg">{value.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-xl"></div>
          </div>
          <div className="relative z-10">
            <h3 className="text-4xl font-bold mb-6">Join Our Community</h3>
            <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Be part of a global community of learners and educators working together to shape the future of education.
              Start your transformation today!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Learning Today
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105">
                Become an Instructor
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
