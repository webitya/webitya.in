import mongoose from "mongoose"

const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
      unique: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    gateway: {
      type: String,
      enum: ["razorpay", "phonepe"],
      required: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    refundId: {
      type: String,
      default: null,
    },
    refundAmount: {
      type: Number,
      default: 0,
    },
    refundReason: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
PaymentSchema.index({ userId: 1, courseId: 1 })
PaymentSchema.index({ paymentId: 1 })
PaymentSchema.index({ status: 1 })
PaymentSchema.index({ gateway: 1 })
PaymentSchema.index({ createdAt: -1 })

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema)
