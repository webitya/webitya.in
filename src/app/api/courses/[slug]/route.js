import { connectToDatabase } from "@/lib/mongodb"
import Course from "@/models/Course"
import { NextResponse } from "next/server"
import { logger } from "@/lib/logger"

export async function GET(request, { params }) {
  try {
    const { slug } = params

    await connectToDatabase()

    const course = await Course.findOne({ slug }).lean()

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({ course }, { status: 200 })
  } catch (error) {
    logger.error(`Error fetching course: ${error.message}`, { error })
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 })
  }
}
