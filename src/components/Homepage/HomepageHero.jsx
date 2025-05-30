"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PlayArrow, School, TrendingUp } from "@mui/icons-material"
import Link from "next/link"
import HeroScene3D from "./HeroScene3D"

export default function HomepageHero() {
  const [isLargeScreen, setIsLargeScreen] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)")
    setIsLargeScreen(mediaQuery.matches)

    const handler = (e) => setIsLargeScreen(e.matches)
    mediaQuery.addEventListener("change", handler)

    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6"
          >
            Learn with
            <span className="text-blue-600 block">Webitya</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-600 mb-8 leading-relaxed"
          >
            Transform your skills with our comprehensive learning platform. Access premium courses, track your progress,
            and earn certificates.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link
              href="/courses"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <PlayArrow />
              Start Learning
            </Link>
            <Link
              href="/about-us"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Learn More
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex items-center gap-8 mt-12 justify-center lg:justify-start"
          >
            <div className="text-center">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <School />
                <span className="text-2xl font-bold">500+</span>
              </div>
              <p className="text-gray-600">Courses</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <TrendingUp />
                <span className="text-2xl font-bold">10K+</span>
              </div>
              <p className="text-gray-600">Students</p>
            </div>
          </motion.div>
        </motion.div>

        {isLargeScreen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] w-full"
          >
            <HeroScene3D />
          </motion.div>
        )}
      </div>
    </section>
  )
}
