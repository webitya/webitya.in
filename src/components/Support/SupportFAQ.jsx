"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExpandMore, Help } from "@mui/icons-material"

const faqs = [
  {
    question: "How do I enroll in a course?",
    answer:
      "To enroll in a course, simply browse our course catalog, select the course you're interested in, and click the 'Enroll Now' or 'Buy Now' button. You'll be guided through the payment process and will have immediate access to the course content upon successful payment.",
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer:
      "Yes! We offer a 30-day money-back guarantee on all our courses. If you're not satisfied with your purchase, contact our support team within 30 days of purchase for a full refund. No questions asked!",
  },
  {
    question: "How long do I have access to a course?",
    answer:
      "Once you purchase a course, you have lifetime access to all course materials. You can learn at your own pace and revisit the content whenever you need to. All future updates to the course are also included at no extra cost.",
  },
  {
    question: "Do I get a certificate upon completion?",
    answer:
      "Yes! Upon successfully completing a course and passing all assessments, you'll receive a certificate of completion that you can download and share on your professional profiles like LinkedIn.",
  },
  {
    question: "Can I download course videos for offline viewing?",
    answer:
      "Currently, our courses are designed for online streaming to ensure the best quality and security. However, you can access your courses from any device with an internet connection, anywhere in the world.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "To reset your password, go to the sign-in page and click 'Forgot Password'. Enter your email address, and we'll send you instructions to reset your password. If you don't receive the email, check your spam folder or contact support.",
  },
  {
    question: "Can I switch between courses?",
    answer:
      "If you've enrolled in multiple courses, you can easily switch between them from your student dashboard. Your progress in each course is saved automatically, so you can pick up exactly where you left off.",
  },
  {
    question: "Is there a mobile app available?",
    answer:
      "Our platform is fully responsive and works great on mobile browsers. We're currently working on dedicated mobile apps for iOS and Android, which will be available soon with enhanced offline capabilities.",
  },
]

export default function SupportFAQ() {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-blue-100 p-3 rounded-xl">
          <Help className="text-blue-600 text-2xl" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-600 mt-2">Find quick answers to common questions</p>
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-2 border-gray-100 rounded-xl overflow-hidden hover:border-blue-200 transition-colors duration-300"
          >
            <button
              onClick={() => toggleExpanded(index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-300"
            >
              <span className="font-semibold text-gray-900 text-lg pr-4">{faq.question}</span>
              <ExpandMore
                className={`transform transition-transform duration-300 text-gray-600 flex-shrink-0 ${
                  expandedIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6 border-t border-gray-100"
              >
                <p className="text-gray-700 leading-relaxed text-lg pt-4">{faq.answer}</p>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
        <h3 className="font-bold text-blue-900 mb-3 text-xl">Still have questions?</h3>
        <p className="text-blue-800 mb-4 text-lg leading-relaxed">
          Can't find the answer you're looking for? Our support team is here to help you succeed.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg">
          Contact Support Team
        </button>
      </div>
    </motion.div>
  )
}
