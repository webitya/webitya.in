import { connectToDatabase } from "@/lib/mongodb"
import Course from "@/models/Course"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { logger } from "@/lib/logger"
import Razorpay from "razorpay"
import crypto from "crypto"

export async function POST(request) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { courseId, gateway } = await request.json()

    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 })
    }

    await connectToDatabase()

    // Find course by ID or slug
    const course = await Course.findOne({
      $or: [{ _id: courseId }, { slug: courseId }],
    }).lean()

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    if (gateway === "razorpay") {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      })

      const options = {
        amount: course.price * 100, // amount in smallest currency unit (paise)
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
        notes: {
          courseId: course._id.toString(),
          courseName: course.title,
          userEmail: session.user.email,
        },
      }

      const order = await razorpay.orders.create(options)

      return NextResponse.json(
        {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          orderId: order.id,
          courseName: course.title,
        },
        { status: 200 },
      )
    } else if (gateway === "phonepe") {
      // Generate PhonePe payment URL
      const merchantId = process.env.PHONEPE_MERCHANT_ID
      const merchantTransactionId = `TXN_${Date.now()}`
      const amount = course.price * 100 // amount in smallest currency unit (paise)

      const payload = {
        merchantId,
        merchantTransactionId,
        merchantUserId: session.user.email,
        amount,
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/phonepe/callback`,
        redirectMode: "REDIRECT",
        callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/phonepe/callback`,
        mobileNumber: "9999999999", // This should be user's mobile number in production
        paymentInstrument: {
          type: "PAY_PAGE",
        },
      }

      const payloadString = JSON.stringify(payload)
      const payloadBase64 = Buffer.from(payloadString).toString("base64")

      const saltKey = process.env.PHONEPE_SALT_KEY
      const saltIndex = process.env.PHONEPE_SALT_INDEX || "1"

      const string = `${payloadBase64}/pg/v1/pay${saltKey}`
      const sha256 = crypto.createHash("sha256").update(string).digest("hex")
      const checksum = `${sha256}###${saltIndex}`

      return NextResponse.json(
        {
          data: {
            instrumentResponse: {
              redirectInfo: {
                url: "https://pay.phonepe.com/pay/pg/v1/pay",
              },
            },
          },
          paymentPayload: payloadBase64,
          checksum,
        },
        { status: 200 },
      )
    } else {
      return NextResponse.json({ error: "Invalid payment gateway" }, { status: 400 })
    }
  } catch (error) {
    logger.error(`Error creating payment order: ${error.message}`, { error })
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 })
  }
}
