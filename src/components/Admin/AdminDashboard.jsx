"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { People, School, Payment, TrendingUp, Visibility, Assignment, Support } from "@mui/icons-material"
import clientLogger from "@/lib/client-logger"

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, activityRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/recent-activity"),
      ])

      if (statsRes.ok && activityRes.ok) {
        const statsData = await statsRes.json()
        const activityData = await activityRes.json()
        setStats(statsData)
        setRecentActivity(activityData)
        clientLogger.info("Dashboard data loaded successfully")
      } else {
        throw new Error("Failed to fetch dashboard data")
      }
    } catch (error) {
      clientLogger.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const statsCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || "0",
      change: stats?.userGrowth || "+0%",
      icon: People,
      color: "bg-blue-500",
      trend: "up",
    },
    {
      title: "Active Courses",
      value: stats?.totalCourses || "0",
      change: stats?.courseGrowth || "+0%",
      icon: School,
      color: "bg-green-500",
      trend: "up",
    },
    {
      title: "Total Revenue",
      value: `$${stats?.totalRevenue || "0"}`,
      change: stats?.revenueGrowth || "+0%",
      icon: Payment,
      color: "bg-purple-500",
      trend: "up",
    },
    {
      title: "Course Completions",
      value: stats?.completions || "0",
      change: stats?.completionGrowth || "+0%",
      icon: Assignment,
      color: "bg-orange-500",
      trend: "up",
    },
    {
      title: "Support Tickets",
      value: stats?.openTickets || "0",
      change: stats?.ticketChange || "+0%",
      icon: Support,
      color: "bg-red-500",
      trend: stats?.ticketChange?.startsWith("+") ? "down" : "up",
    },
    {
      title: "Page Views",
      value: stats?.pageViews || "0",
      change: stats?.viewsGrowth || "+0%",
      icon: Visibility,
      color: "bg-indigo-500",
      trend: "up",
    },
  ]

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your platform.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="text-white text-2xl" />
              </div>
              <span
                className={`text-sm font-semibold ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                } flex items-center gap-1`}
              >
                <TrendingUp className={`text-sm ${stat.trend === "down" ? "rotate-180" : ""}`} />
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-1 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${activity.color || "bg-blue-500"}`}></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-xs text-gray-600">{activity.description}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
