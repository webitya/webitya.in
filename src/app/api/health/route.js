import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"

export async function GET() {
  try {
    // Check database connection
    await connectDB()

    const healthCheck = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || "1.0.0",
      services: {
        database: "connected",
        cache: process.env.REDIS_URL ? "available" : "not configured",
      },
    }

    // Only log on server side
    if (typeof window === "undefined") {
      try {
        const logger = require("@/lib/logger").default
        logger.info("Health check performed", healthCheck)
      } catch (logError) {
        console.log("Health check performed", healthCheck)
      }
    }

    return NextResponse.json(healthCheck, { status: 200 })
  } catch (error) {
    // Only log on server side
    if (typeof window === "undefined") {
      try {
        const logger = require("@/lib/logger").default
        logger.error("Health check failed", { error: error.message })
      } catch (logError) {
        console.error("Health check failed", { error: error.message })
      }
    }

    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error.message,
      },
      { status: 503 },
    )
  }
}
