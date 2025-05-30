import { connectDB } from "@/lib/mongodb"
import Course from "@/models/Course"

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://webitya.com"

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ]

  // Dynamic course pages
  let coursePages = []
  try {
    await connectDB()
    const courses = await Course.find({ isPublished: true }).select("_id updatedAt").lean()

    coursePages = courses.map((course) => ({
      url: `${baseUrl}/courses/${course._id}`,
      lastModified: course.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }))
  } catch (error) {
    console.error("Error generating course sitemap:", error)
  }

  return [...staticPages, ...coursePages]
}
