"use client"

import { motion } from "framer-motion"
import { Play, ArrowRight, BookOpen, Star, Users } from "lucide-react"
import HeroScene3D from "./HeroScene3D"
import Link from "next/link"

export default function HomepageHero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8 text-center lg:text-left"
          >
            {/* Badge */}
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-full px-4 py-2 text-sm font-medium text-blue-700"
            >
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Rated #1 Learning Platform</span>
            </motion.div> */}

            <div className="space-y-4 lg:space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              >
                Learn with{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Webitya
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                Transform your skills with our comprehensive learning platform. Access premium courses, track your
                progress, and earn certificates from industry experts.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/courses">
                <button className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-medium min-h-[56px] w-full sm:w-auto">
                  <Play className="mr-2 h-5 w-5" />
                  Start Learning
                </button>
              </Link>
              <Link href="/about-us">
                <button className="inline-flex items-center justify-center px-8 py-4 text-lg border-2 border-blue-200 hover:bg-blue-50 rounded-xl transition-all duration-300 font-medium min-h-[56px] w-full sm:w-auto text-blue-700 hover:text-blue-800">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6"
            >
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  <div className="text-2xl lg:text-3xl font-bold text-blue-600">500+</div>
                </div>
                <div className="text-sm lg:text-base text-gray-600">Courses</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Users className="h-6 w-6 text-green-600" />
                  <div className="text-2xl lg:text-3xl font-bold text-green-600">10K+</div>
                </div>
                <div className="text-sm lg:text-base text-gray-600">Students</div>
              </div>
              <div className="text-center lg:text-left col-span-2 sm:col-span-1">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  <div className="text-2xl lg:text-3xl font-bold text-yellow-600">4.9</div>
                </div>
                <div className="text-sm lg:text-base text-gray-600">Rating</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Graphics */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full order-first lg:order-last"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-3xl"></div>
            <HeroScene3D />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
