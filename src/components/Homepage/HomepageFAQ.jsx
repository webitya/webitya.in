"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    id: 1,
    question: "How do I get started with Webitya?",
    answer:
      "Getting started is easy! Simply create a free account, browse our course catalog, and enroll in courses that interest you. Many courses offer free previews so you can get a feel for the content before purchasing.",
  },
  {
    id: 2,
    question: "Are the certificates recognized by employers?",
    answer:
      "Yes! Our certificates are industry-recognized and valued by employers worldwide. Many of our students have successfully used their Webitya certificates to advance their careers or land new jobs.",
  },
  {
    id: 3,
    question: "Can I access courses on mobile devices?",
    answer:
      "Our platform is fully responsive and optimized for all devices. You can learn on your smartphone, tablet, laptop, or desktop with the same high-quality experience.",
  },
  {
    id: 4,
    question: "What if I'm not satisfied with a course?",
    answer:
      "We offer a 30-day money-back guarantee on all paid courses. If you're not completely satisfied, you can request a full refund within 30 days of purchase, no questions asked.",
  },
  {
    id: 5,
    question: "Do you offer group discounts for teams?",
    answer:
      "Yes! We offer special pricing for teams and organizations. Contact our sales team to learn about bulk discounts and enterprise solutions tailored to your organization's needs.",
  },
  {
    id: 6,
    question: "How often is the content updated?",
    answer:
      "Our courses are regularly updated to reflect the latest industry trends and technologies. Instructors continuously improve their content, and you'll have lifetime access to all updates for courses you've purchased.",
  },
]

export default function HomepageFAQ() {
  const [openItems, setOpenItems] = useState(new Set([1]))

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Find answers to common questions about our platform and courses
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 lg:px-8 py-6 lg:py-8 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
              >
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 pr-4">{faq.question}</h3>
                <div className="flex-shrink-0">
                  {openItems.has(faq.id) ? (
                    <Minus className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                  ) : (
                    <Plus className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openItems.has(faq.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                      <p className="text-gray-600 leading-relaxed text-sm lg:text-base">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12 lg:mt-16"
        >
          <p className="text-gray-600 mb-6">Still have questions? We're here to help!</p>
          <a
            href="/contact-us"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-300"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  )
}
