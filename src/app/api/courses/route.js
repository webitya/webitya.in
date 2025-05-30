import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Course from "@/models/Course"
import { handleError } from "@/lib/error-handler"
import { cache } from "@/lib/cache"
import logger from "@/lib/logger"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const level = searchParams.get("level")
    const search = searchParams.get("search")
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 12

    // Create cache key
    const cacheKey = `courses:${category || "all"}:${level || "all"}:${search || "none"}:${page}:${limit}`

    // Try to get from cache first
    const cachedCourses = await cache.get(cacheKey)
    if (cachedCourses) {
      return NextResponse.json(cachedCourses)
    }

    await connectDB()

    const query = { isPublished: true }

    if (category && category !== "All Categories") {
      query.category = category
    }

    if (level && level !== "All Levels") {
      query.level = level
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { instructor: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ]
    }

    const skip = (page - 1) * limit

    const [courses, total] = await Promise.all([
      Course.find(query)
        .select("-chapters") // Exclude chapters for performance
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Course.countDocuments(query),
    ])

    const result = {
      courses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    }

    // Cache the result for 5 minutes
    await cache.set(cacheKey, result, 300)

    logger.info("Courses fetched successfully", {
      query: { category, level, search, page, limit },
      resultCount: courses.length,
    })

    return NextResponse.json(result)
  } catch (error) {
    const errorResponse = handleError(error, request)
    return NextResponse.json({ error: errorResponse.message }, { status: errorResponse.statusCode })
  }
}

export async function POST(request) {
  try {
    const courseData = await request.json()

    // Validate course data here
    // const validatedData = validateRequest(courseSchema)(courseData)

    await connectDB()

    const course = await Course.create(courseData)

    // Invalidate courses cache
    await cache.del("courses:*")

    logger.info("Course created successfully", {
      courseId: course._id,
      title: course.title,
    })

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    const errorResponse = handleError(error, request)
    return NextResponse.json({ error: errorResponse.message }, { status: errorResponse.statusCode })
  }
}
