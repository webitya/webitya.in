"use client"

import { motion } from "framer-motion"
import { ArrowForward } from "@mui/icons-material"
import Link from "next/link"

export default function HomepageCTA() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of students and start your learning journey today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center gap-2 justify-center"
            >
              Get Started Free
              <ArrowForward />
            </Link>
            <Link
              href="/courses"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
