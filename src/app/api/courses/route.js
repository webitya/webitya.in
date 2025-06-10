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

    // Mock data for the two courses only
    const mockCourses = [
      {
        _id: "1",
        title: "Complete Web Development Bootcamp 2024",
        description:
          "Master HTML, CSS, JavaScript, React, Node.js, and MongoDB in this comprehensive full-stack development course with real-world projects and career guidance.",
        instructor: "John Smith",
        price: 4999,
        originalPrice: 9999,
        thumbnail: "/placeholder.svg?height=400&width=600",
        category: "Web Development",
        level: "Beginner",
        duration: "42 hours",
        lessons: 156,
        students: 15420,
        rating: 4.8,
        reviews: 2547,
        isPublished: true,
        isBestseller: true,
        isNew: false,
        slug: "complete-web-development-bootcamp-2024",
      },
      {
        _id: "2",
        title: "Digital Marketing Mastery 2024",
        description:
          "Complete digital marketing course covering SEO, social media marketing, Google Ads, email marketing, and analytics for business growth.",
        instructor: "Lisa Thompson",
        price: 6999,
        originalPrice: 12999,
        thumbnail: "/placeholder.svg?height=400&width=600",
        category: "Digital Marketing",
        level: "Beginner",
        duration: "25 hours",
        lessons: 78,
        students: 13567,
        rating: 4.5,
        reviews: 2134,
        isPublished: true,
        isBestseller: false,
        isNew: true,
        slug: "digital-marketing-mastery",
      },
    ]

    // Filter mock courses based on query
    let filteredCourses = mockCourses
    if (query.category) {
      filteredCourses = filteredCourses.filter((course) => course.category === query.category)
    }
    if (query.level) {
      filteredCourses = filteredCourses.filter((course) => course.level === query.level)
    }
    if (query.$or) {
      filteredCourses = filteredCourses.filter((course) => {
        return query.$or.some((condition) => {
          const field = Object.keys(condition)[0]
          const regex = new RegExp(condition[field].$regex, condition[field].$options)
          return regex.test(course[field])
        })
      })
    }

    const result = {
      courses: filteredCourses,
      pagination: {
        page,
        limit,
        total: filteredCourses.length,
        pages: Math.ceil(filteredCourses.length / limit),
        hasNext: page < Math.ceil(filteredCourses.length / limit),
        hasPrev: page > 1,
      },
    }

    // Cache the result for 5 minutes
    await cache.set(cacheKey, result, 300)

    logger.info("Courses fetched successfully", {
      query: { category, level, search, page, limit },
      resultCount: filteredCourses.length,
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
