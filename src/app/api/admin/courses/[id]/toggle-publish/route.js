import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectDB } from "@/lib/mongodb"
import Course from "@/models/Course"

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession()

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params
    const { isPublished } = await request.json()

    await connectDB()

    const course = await Course.findByIdAndUpdate(id, { isPublished }, { new: true })

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json(course)
  } catch (error) {
    console.error("Error updating course publish status:", error)
    return NextResponse.json({ error: "Failed to update course status" }, { status: 500 })
  }
}
