"use client"

import { motion } from "framer-motion"
import { Person, Email, School, TrendingUp } from "@mui/icons-material"

export default function ProfileHeader({ user }) {
  const stats = [
    { icon: School, label: "Courses Enrolled", value: "5" },
    { icon: TrendingUp, label: "Courses Completed", value: "2" },
    { icon: Person, label: "Certificates", value: "2" },
  ]

  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Person className="text-white text-6xl" />
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{user.name}</h1>
          <div className="flex items-center justify-center gap-2 text-blue-100 mb-8">
            <Email />
            <span>{user.email}</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6"
              >
                <stat.icon className="text-white text-3xl mb-2 mx-auto" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-blue-100 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
