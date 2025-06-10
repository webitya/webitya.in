"use client"

import { motion } from "framer-motion"
import { LinkedIn, Twitter, GitHub } from "@mui/icons-material"

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=400&width=400",
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
    image: "/placeholder.svg?height=400&width=400",
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
    image: "/placeholder.svg?height=400&width=400",
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
    image: "/placeholder.svg?height=400&width=400",
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
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Meet Our <span className="text-blue-600">Team</span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our diverse team of educators, technologists, and innovators is passionate about revolutionizing online
            learning and empowering students worldwide.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex gap-4">
                    <a
                      href={member.social.linkedin}
                      className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                    >
                      <LinkedIn className="text-white text-xl" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                    >
                      <Twitter className="text-white text-xl" />
                    </a>
                    <a
                      href={member.social.github}
                      className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                    >
                      <GitHub className="text-white text-xl" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-4 text-lg">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-white rounded-2xl p-12 shadow-lg border border-gray-100"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Want to Join Our Team?</h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            We're always looking for passionate individuals who share our vision of transforming education and making a
            positive impact.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            View Open Positions
          </button>
        </motion.div>
      </div>
    </section>
  )
}
