"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CreditCard, Security, CheckCircle, Phone } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function PaymentForm({ courseId }) {
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState("razorpay")
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails()
    }
  }, [courseId])

  const fetchCourseDetails = async () => {
    try {
      // First try to fetch by ID
      let response = await fetch(`/api/courses/${courseId}`)

      // If not found, try to fetch by slug
      if (!response.ok) {
        response = await fetch(`/api/courses/${courseId}`)
      }

      if (response.ok) {
        const data = await response.json()
        setCourse(data.course)
      } else {
        setError("Course not found")
      }
    } catch (error) {
      setError("Failed to load course details")
      console.error("Error fetching course:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRazorpayPayment = async () => {
    try {
      // Create order
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, gateway: "razorpay" }),
      })

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json()
        throw new Error(errorData.error || "Failed to create order")
      }

      const orderData = await orderResponse.json()

      // Initialize Razorpay
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Webitya LMS",
        description: orderData.courseName,
        order_id: orderData.orderId,
        handler: async (response) => {
          try {
            // Verify payment
            const verifyResponse = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                courseId,
                gateway: "razorpay",
              }),
            })

            if (verifyResponse.ok) {
              router.push(`/payment/success?paymentId=${response.razorpay_payment_id}&gateway=razorpay`)
            } else {
              throw new Error("Payment verification failed")
            }
          } catch (error) {
            setError("Payment verification failed. Please contact support.")
            setProcessing(false)
          }
        },
        prefill: {
          name: session?.user?.name || "",
          email: session?.user?.email || "",
        },
        theme: {
          color: "#3b82f6",
        },
        modal: {
          ondismiss: () => {
            setProcessing(false)
          },
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.on("payment.failed", (response) => {
        setError(`Payment failed: ${response.error.description}`)
        setProcessing(false)
      })

      rzp.open()
    } catch (error) {
      setError(error.message)
      setProcessing(false)
    }
  }

  const handlePhonePePayment = async () => {
    try {
      // Create PhonePe order
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, gateway: "phonepe" }),
      })

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json()
        throw new Error(errorData.error || "Failed to create order")
      }

      const orderData = await orderResponse.json()

      // Create form and submit to PhonePe
      const form = document.createElement("form")
      form.method = "POST"
      form.action = orderData.data.instrumentResponse.redirectInfo.url

      const payloadInput = document.createElement("input")
      payloadInput.type = "hidden"
      payloadInput.name = "request"
      payloadInput.value = orderData.paymentPayload

      const checksumInput = document.createElement("input")
      checksumInput.type = "hidden"
      checksumInput.name = "checksum"
      checksumInput.value = orderData.checksum

      form.appendChild(payloadInput)
      form.appendChild(checksumInput)
      document.body.appendChild(form)
      form.submit()
    } catch (error) {
      setError(error.message)
      setProcessing(false)
    }
  }

  const handlePayment = async () => {
    if (!session) {
      router.push("/auth/signin")
      return
    }

    setProcessing(true)
    setError("")

    try {
      if (paymentMethod === "razorpay") {
        await handleRazorpayPayment()
      } else if (paymentMethod === "phonepe") {
        await handlePhonePePayment()
      }
    } catch (error) {
      setError("Payment processing failed. Please try again.")
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

  if (error && !course) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => router.push("/courses")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Courses
        </button>
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
              src={course?.thumbnail || "/placeholder.svg?height=80&width=120"}
              alt={course?.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{course?.title}</h3>
              <p className="text-gray-600">By {course?.instructor}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-500">★</span>
                <span className="text-sm">
                  {course?.rating || 4.5} ({course?.reviews || 0} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span>Course Price</span>
              <span>₹{course?.price}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Platform Fee</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold border-t border-gray-200 pt-2">
              <span>Total</span>
              <span>₹{course?.price}</span>
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

          {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

          <div className="space-y-4 mb-6">
            <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
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
                  <div className="text-sm text-gray-600">Credit/Debit Card, UPI, Net Banking, Wallets</div>
                </div>
              </div>
            </label>

            <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="phonepe"
                checked={paymentMethod === "phonepe"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <div className="flex items-center gap-3">
                <Phone className="text-purple-600" />
                <div>
                  <div className="font-semibold">PhonePe</div>
                  <div className="text-sm text-gray-600">UPI, Wallet, Cards, Net Banking</div>
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
                Pay ₹{course?.price}
              </>
            )}
          </button>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>By completing your purchase, you agree to our Terms of Service</p>
            <p className="mt-1">Secure payment powered by industry-leading encryption</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
