"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CreditCard, Security, CheckCircle } from "@mui/icons-material"
import { useRouter } from "next/navigation"

// Mock course data - replace with actual API call
const mockCourse = {
  _id: "1",
  title: "Complete Web Development Bootcamp",
  price: 99,
  thumbnail: "/placeholder.svg?height=200&width=300",
  instructor: "John Doe",
}

export default function PaymentForm({ courseId }) {
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState("razorpay")
  const [processing, setProcessing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Simulate API call to get course details
    setTimeout(() => {
      setCourse(mockCourse)
      setLoading(false)
    }, 1000)
  }, [courseId])

  const handlePayment = async () => {
    setProcessing(true)

    try {
      if (paymentMethod === "razorpay") {
        // Razorpay integration
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: course.price * 100, // Amount in paise
          currency: "INR",
          name: "Webitya LMS",
          description: course.title,
          handler: (response) => {
            // Payment successful
            router.push(`/payment/success?paymentId=${response.razorpay_payment_id}`)
          },
          prefill: {
            name: "User Name",
            email: "user@example.com",
          },
          theme: {
            color: "#3b82f6",
          },
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
      } else if (paymentMethod === "phonepe") {
        // PhonePe integration would go here
        // For demo, we'll simulate success
        setTimeout(() => {
          router.push("/payment/success?paymentId=phonepe_demo_123")
        }, 2000)
      }
    } catch (error) {
      console.error("Payment error:", error)
      alert("Payment failed. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Course not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-2 gap-8">
        {/* Course Summary */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="flex items-start gap-4 mb-6">
            <img
              src={course.thumbnail || "/placeholder.svg"}
              alt={course.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{course.title}</h3>
              <p className="text-gray-600">By {course.instructor}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span>Course Price</span>
              <span>${course.price}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Discount</span>
              <span className="text-green-600">-$0</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold border-t border-gray-200 pt-2">
              <span>Total</span>
              <span>${course.price}</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-blue-800 mb-2">
              <Security />
              <span className="font-semibold">30-Day Money-Back Guarantee</span>
            </div>
            <p className="text-blue-700 text-sm">Full lifetime access and 30-day money-back guarantee</p>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

          <div className="space-y-4 mb-6">
            <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <div className="flex items-center gap-3">
                <CreditCard className="text-blue-600" />
                <div>
                  <div className="font-semibold">Razorpay</div>
                  <div className="text-sm text-gray-600">Credit/Debit Card, UPI, Net Banking</div>
                </div>
              </div>
            </label>

            <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="phonepe"
                checked={paymentMethod === "phonepe"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <div className="flex items-center gap-3">
                <CreditCard className="text-purple-600" />
                <div>
                  <div className="font-semibold">PhonePe</div>
                  <div className="text-sm text-gray-600">UPI, Wallet, Cards</div>
                </div>
              </div>
            </label>
          </div>

          <button
            onClick={handlePayment}
            disabled={processing}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                Processing...
              </>
            ) : (
              <>
                <CheckCircle />
                Complete Payment
              </>
            )}
          </button>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>By completing your purchase, you agree to our Terms of Service</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
