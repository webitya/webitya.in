"use client"

import { motion } from "framer-motion"
import { LinkedIn, Twitter, GitHub } from "@mui/icons-material"

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=400&width=400&text=Sarah+Johnson",
    bio: "Former education technology executive with 15+ years of experience in transforming learning experiences and building successful EdTech platforms.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "/placeholder.svg?height=400&width=400&text=Michael+Chen",
    bio: "Full-stack developer and AI enthusiast passionate about creating innovative educational platforms that scale globally.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Content",
    image: "/placeholder.svg?height=400&width=400&text=Emily+Rodriguez",
    bio: "Educational content strategist with expertise in curriculum development and instructional design for online learning.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "David Kim",
    role: "Lead Designer",
    image: "/placeholder.svg?height=400&width=400&text=David+Kim",
    bio: "UX/UI designer focused on creating intuitive and engaging learning experiences that delight users worldwide.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
]

export default function AboutTeam() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 leading-tight">
            Meet Our <span className="text-blue-600">Team</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our diverse team of educators, technologists, and innovators is passionate about revolutionizing online
            learning and empowering students worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100"
              whileHover={{ y: -5 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-64 sm:h-72 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 sm:pb-6">
                  <div className="flex gap-3 sm:gap-4">
                    {[
                      { icon: LinkedIn, href: member.social.linkedin },
                      { icon: Twitter, href: member.social.twitter },
                      { icon: GitHub, href: member.social.github },
                    ].map((social, idx) => (
                      <motion.a
                        key={idx}
                        href={social.href}
                        className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <social.icon className="text-white text-lg sm:text-xl" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-3 sm:mb-4 text-base sm:text-lg">{member.role}</p>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 shadow-lg border border-gray-100"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Want to Join Our Team?</h3>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            We're always looking for passionate individuals who share our vision of transforming education and making a
            positive impact.
          </p>
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Open Positions
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
