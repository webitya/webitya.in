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

    // Get current date and 30 days ago
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Fetch basic stats
    const [totalUsers, totalCourses, openTickets, recentUsers, recentCourses, allUsers, allCourses] = await Promise.all(
      [
        User.countDocuments(),
        Course.countDocuments({ isPublished: true }),
        SupportTicket.countDocuments({ status: { $in: ["open", "in-progress"] } }),
        User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
        Course.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
        User.find().select("createdAt purchasedCourses").lean(),
        Course.find().select("createdAt price category").lean(),
      ],
    )

    // Calculate revenue
    const totalRevenue = allUsers.reduce((sum, user) => {
      return sum + (user.purchasedCourses?.length || 0) * 50 // Assuming average course price
    }, 0)

    // Calculate growth percentages
    const previousUsers = totalUsers - recentUsers
    const userGrowth = previousUsers > 0 ? `+${Math.round((recentUsers / previousUsers) * 100)}%` : "+0%"

    const previousCourses = totalCourses - recentCourses
    const courseGrowth = previousCourses > 0 ? `+${Math.round((recentCourses / previousCourses) * 100)}%` : "+0%"

    // Generate chart data for the last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      return date.toISOString().split("T")[0]
    }).reverse()

    const revenueChart = {
      labels: last7Days.map((date) => new Date(date).toLocaleDateString()),
      data: last7Days.map(() => Math.floor(Math.random() * 1000) + 500), // Mock data
    }

    const userChart = {
      labels: last7Days.map((date) => new Date(date).toLocaleDateString()),
      data: last7Days.map(() => Math.floor(Math.random() * 20) + 5), // Mock data
    }

    // Course distribution by category
    const categoryCount = {}
    allCourses.forEach((course) => {
      categoryCount[course.category] = (categoryCount[course.category] || 0) + 1
    })

    const courseDistribution = {
      labels: Object.keys(categoryCount),
      data: Object.values(categoryCount),
    }

    const stats = {
      totalUsers,
      totalCourses,
      totalRevenue,
      openTickets,
      completions: Math.floor(totalUsers * 0.3), // Mock completion rate
      pageViews: Math.floor(totalUsers * 15), // Mock page views
      userGrowth,
      courseGrowth,
      revenueGrowth: "+15%", // Mock growth
      completionGrowth: "+8%", // Mock growth
      ticketChange: openTickets > 10 ? "+5%" : "-2%",
      viewsGrowth: "+25%", // Mock growth
      revenueChart,
      userChart,
      courseDistribution,
    }

    logger.info("Admin stats fetched successfully", { userId: session.user.id })

    return NextResponse.json(stats)
  } catch (error) {
    logger.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
