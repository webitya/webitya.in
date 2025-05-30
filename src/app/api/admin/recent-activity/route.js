import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import Course from "@/models/Course"
import SupportTicket from "@/models/SupportTicket"
import logger from "@/lib/logger"

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    // Get recent activities
    const [recentUsers, recentCourses, recentTickets] = await Promise.all([
      User.find().sort({ createdAt: -1 }).limit(5).select("name email createdAt").lean(),
      Course.find().sort({ createdAt: -1 }).limit(3).select("title instructor createdAt").lean(),
      SupportTicket.find().sort({ createdAt: -1 }).limit(3).populate("userId", "name").lean(),
    ])

    const activities = []

    // Add user registrations
    recentUsers.forEach((user) => {
      activities.push({
        title: "New User Registration",
        description: `${user.name} (${user.email}) joined the platform`,
        time: getTimeAgo(user.createdAt),
        color: "bg-green-500",
        createdAt: user.createdAt,
      })
    })

    // Add course creations
    recentCourses.forEach((course) => {
      activities.push({
        title: "New Course Created",
        description: `"${course.title}" by ${course.instructor}`,
        time: getTimeAgo(course.createdAt),
        color: "bg-blue-500",
        createdAt: course.createdAt,
      })
    })

    // Add support tickets
    recentTickets.forEach((ticket) => {
      activities.push({
        title: "Support Ticket",
        description: `${ticket.subject} - ${ticket.userId?.name || "Unknown User"}`,
        time: getTimeAgo(ticket.createdAt),
        color: "bg-orange-500",
        createdAt: ticket.createdAt,
      })
    })

    // Sort by time and limit to 10
    activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    logger.info("Recent activity fetched successfully", { userId: session.user.id })

    return NextResponse.json(activities.slice(0, 10))
  } catch (error) {
    logger.error("Error fetching recent activity:", error)
    return NextResponse.json({ error: "Failed to fetch activity" }, { status: 500 })
  }
}

function getTimeAgo(date) {
  const now = new Date()
  const diffInMs = now - new Date(date)
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
  } else {
    return "Just now"
  }
}
