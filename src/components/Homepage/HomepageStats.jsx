"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const stats = [
  { number: 500, label: "Courses Available", suffix: "+" },
  { number: 10000, label: "Active Students", suffix: "+" },
  { number: 95, label: "Success Rate", suffix: "%" },
  { number: 24, label: "Support Hours", suffix: "/7" },
]

function CountUp({ end, duration = 2000 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime
    let animationFrame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return count
}

export default function HomepageStats() {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Our Impact in Numbers</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join thousands of learners who have transformed their careers with Webitya
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl lg:text-6xl font-bold text-white mb-4">
                <CountUp end={stat.number} />
                {stat.suffix}
              </div>
              <p className="text-xl text-blue-100">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
