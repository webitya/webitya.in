import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb" // Fixed import
import Course from "@/models/Course"
import logger from "@/lib/logger" // Fixed import

export async function GET(request, { params }) {
  try {
    const { slug } = params

    await connectDB() // Using the correct function name

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
