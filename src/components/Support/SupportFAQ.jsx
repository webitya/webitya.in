"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExpandMore, Help } from "@mui/icons-material"

const faqs = [
  {
    question: "How do I enroll in a course?",
    answer:
      "To enroll in a course, simply browse our course catalog, select the course you're interested in, and click the 'Enroll Now' or 'Buy Now' button. You'll be guided through the payment process and will have immediate access to the course content.",
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer:
      "Yes! We offer a 30-day money-back guarantee on all our courses. If you're not satisfied with your purchase, contact our support team within 30 days for a full refund.",
  },
  {
    question: "How long do I have access to a course?",
    answer:
      "Once you purchase a course, you have lifetime access to all course materials. You can learn at your own pace and revisit the content whenever you need to.",
  },
  {
    question: "Do I get a certificate upon completion?",
    answer:
      "Yes! Upon successfully completing a course, you'll receive a certificate of completion that you can download and share on your professional profiles.",
  },
  {
    question: "Can I download course videos for offline viewing?",
    answer:
      "Currently, our courses are designed for online streaming. However, you can access your courses from any device with an internet connection.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "To reset your password, go to the sign-in page and click 'Forgot Password'. Enter your email address, and we'll send you instructions to reset your password.",
  },
  {
    question: "Can I switch between courses?",
    answer:
      "If you've enrolled in multiple courses, you can easily switch between them from your dashboard. Your progress in each course is saved automatically.",
  },
  {
    question: "Is there a mobile app available?",
    answer:
      "Our platform is fully responsive and works great on mobile browsers. We're currently working on dedicated mobile apps for iOS and Android.",
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
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Help className="text-blue-600" />
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleExpanded(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              <ExpandMore className={`transform transition-transform ${expandedIndex === index ? "rotate-180" : ""}`} />
            </button>
            {expandedIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 pb-4 border-t border-gray-200"
              >
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Still have questions?</h3>
        <p className="text-blue-700 text-sm mb-3">
          Can't find the answer you're looking for? Our support team is here to help.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          Contact Support
        </button>
      </div>
    </motion.div>
  )
}
