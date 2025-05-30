"use client"

import { motion } from "framer-motion"
import { School, People, TrendingUp, Security } from "@mui/icons-material"

const values = [
  {
    icon: School,
    title: "Quality Education",
    description:
      "We believe in providing high-quality, practical education that prepares students for real-world challenges.",
  },
  {
    icon: People,
    title: "Inclusive Learning",
    description: "Our platform is designed to be accessible to learners from all backgrounds and skill levels.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Growth",
    description: "We're committed to helping our students achieve continuous personal and professional growth.",
  },
  {
    icon: Security,
    title: "Trust & Security",
    description: "We prioritize the security and privacy of our students' data and learning experience.",
  },
]

export default function AboutMission() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Mission & Values</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're dedicated to transforming lives through education, making quality learning accessible to everyone,
            everywhere.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              At Webitya, we believe that education is the key to unlocking human potential. Our mission is to
              democratize access to high-quality education by providing innovative, engaging, and practical learning
              experiences that empower individuals to achieve their goals and transform their lives.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We strive to bridge the gap between traditional education and the rapidly evolving demands of the modern
              workforce, ensuring our students are equipped with the skills and knowledge they need to succeed in their
              chosen fields.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="/placeholder.svg?height=400&width=500"
              alt="Our Mission"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="text-blue-600 text-2xl" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Join Our Community</h3>
          <p className="text-xl mb-6 opacity-90">
            Be part of a global community of learners and educators working together to shape the future of education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              Start Learning Today
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold transition-colors">
              Become an Instructor
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
