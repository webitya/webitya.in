"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useState, useEffect } from "react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Full Stack Developer",
    company: "Google",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "Webitya transformed my career completely. The courses are comprehensive and the instructors are world-class. I landed my dream job at Google after completing their web development bootcamp.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Data Scientist",
    company: "Microsoft",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "The machine learning course exceeded my expectations. The hands-on projects and real-world applications helped me transition from finance to tech seamlessly.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX Designer",
    company: "Apple",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "Amazing platform with incredible support. The UI/UX design course was exactly what I needed to advance my career. Now I'm designing products used by millions.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Kim",
    role: "Marketing Manager",
    company: "Netflix",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "The digital marketing course helped me understand modern marketing strategies. The practical approach and case studies were invaluable for my career growth.",
    rating: 5,
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Product Manager",
    company: "Amazon",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "Excellent learning experience with top-notch content. The business strategy course gave me the skills I needed to become a successful product manager.",
    rating: 5,
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Mobile Developer",
    company: "Uber",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "The React Native course was comprehensive and up-to-date. I built several apps during the course and now I'm developing mobile solutions at Uber.",
    rating: 5,
  },
]

export default function HomepageTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 3))
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const visibleTestimonials = testimonials.slice(currentIndex * 3, (currentIndex + 1) * 3)

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
            What Our Students Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful learners who have transformed their careers with Webitya
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-blue-200" />

                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 lg:w-16 lg:h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm lg:text-base">{testimonial.name}</h4>
                    <p className="text-gray-600 text-xs lg:text-sm">{testimonial.role}</p>
                    <p className="text-blue-600 text-xs lg:text-sm font-medium">{testimonial.company}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed text-sm lg:text-base italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 lg:mt-12 space-x-2">
            {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
