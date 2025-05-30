import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

// Mock payment model - replace with actual Payment model
const mockPayments = [
  {
    _id: "1",
    paymentId: "pay_123456789",
    gateway: "Razorpay",
    amount: 99,
    currency: "USD",
    status: "completed",
    user: {
      name: "John Doe",
      email: "john@example.com",
    },
    course: {
      title: "Complete Web Development Bootcamp",
      instructor: "Jane Smith",
    },
    createdAt: new Date().toISOString(),
    metadata: {
      razorpay_payment_id: "pay_123456789",
      razorpay_order_id: "order_123456789",
    },
  },
  // Add more mock payments...
]

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In production, fetch from actual Payment model
    // await connectDB()
    // const payments = await Payment.find().populate("userId", "name email").populate("courseId", "title instructor").sort({ createdAt: -1 })

    return NextResponse.json({ payments: mockPayments })
  } catch (error) {
    console.error("Error fetching payments:", error)
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 })
  }
}
