import { NextResponse } from "next/server"
import crypto from "crypto"
import { connectDB } from "@/lib/mongodb" // Fixed import
import User from "@/models/User"
import Course from "@/models/Course"
import { getServerSession } from "next-auth"
import logger from "@/lib/logger" // Fixed import

// Payment model for transaction records
const PaymentSchema = {
  userId: String,
  courseId: String,
  paymentId: String,
  orderId: String,
  amount: Number,
  currency: String,
  status: String,
  gateway: String,
  metadata: Object,
  createdAt: Date,
}

export async function POST(request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { gateway, courseId } = body

    await connectDB() // Using the correct function name

    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const course = await Course.findById(courseId)
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    let paymentVerified = false
    let paymentData = {}

    if (gateway === "razorpay") {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

      // Verify Razorpay signature
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex")

      if (expectedSignature === razorpay_signature) {
        paymentVerified = true
        paymentData = {
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          signature: razorpay_signature,
        }
        logger.info("Razorpay payment verified", { paymentId: razorpay_payment_id, userId: user._id })
      } else {
        logger.error("Razorpay signature verification failed", {
          expected: expectedSignature,
          received: razorpay_signature,
        })
      }
    } else if (gateway === "phonepe") {
      const { transactionId, providerReferenceId } = body

      // Verify PhonePe payment status
      const merchantId = process.env.PHONEPE_MERCHANT_ID
      const saltKey = process.env.PHONEPE_SALT_KEY
      const saltIndex = process.env.PHONEPE_SALT_INDEX || "1"

      const statusUrl = `/pg/v1/status/${merchantId}/${transactionId}`
      const stringToHash = statusUrl + saltKey
      const sha256Hash = crypto.createHash("sha256").update(stringToHash).digest("hex")
      const checksum = sha256Hash + "###" + saltIndex

      try {
        const response = await fetch(`https://api.phonepe.com${statusUrl}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-VERIFY": checksum,
            "X-MERCHANT-ID": merchantId,
          },
        })

        const statusData = await response.json()

        if (statusData.success && statusData.data.state === "COMPLETED") {
          paymentVerified = true
          paymentData = {
            paymentId: providerReferenceId,
            transactionId: transactionId,
            phonepeData: statusData.data,
          }
          logger.info("PhonePe payment verified", { transactionId, userId: user._id })
        } else {
          logger.error("PhonePe payment verification failed", { statusData })
        }
      } catch (error) {
        logger.error("PhonePe status check failed", { error: error.message })
      }
    }

    if (!paymentVerified) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 })
    }

    // Add course to user's purchased courses
    const purchaseData = {
      courseId,
      purchaseDate: new Date(),
      progress: 0,
      paymentId: paymentData.paymentId,
      amount: course.price,
      gateway,
    }

    await User.findByIdAndUpdate(user._id, {
      $push: { purchasedCourses: purchaseData },
    })

    // Update course enrollment count
    await Course.findByIdAndUpdate(courseId, {
      $inc: { enrolledStudents: 1 },
    })

    // Save payment record (implement Payment model as needed)
    const paymentRecord = {
      userId: user._id,
      courseId,
      paymentId: paymentData.paymentId,
      orderId: paymentData.orderId || paymentData.transactionId,
      amount: course.price,
      currency: "INR",
      status: "completed",
      gateway,
      metadata: paymentData,
      createdAt: new Date(),
    }

    logger.info("Course enrollment successful", {
      userId: user._id,
      courseId,
      paymentId: paymentData.paymentId,
    })

    return NextResponse.json({
      success: true,
      message: "Payment verified and course enrolled successfully",
      enrollmentData: purchaseData,
    })
  } catch (error) {
    logger.error("Payment verification error", { error: error.message })
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 })
  }
}
