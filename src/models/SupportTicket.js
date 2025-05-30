import mongoose from "mongoose"

const SupportTicketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["general", "technical", "billing", "course", "account"],
      default: "general",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved", "closed"],
      default: "open",
    },
    message: {
      type: String,
      required: true,
    },
    responses: [
      {
        message: String,
        isAdmin: Boolean,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    attachments: [String],
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.SupportTicket || mongoose.model("SupportTicket", SupportTicketSchema)
