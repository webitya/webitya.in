import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const users = await User.find().select("name email role isVerified isActive createdAt purchasedCourses").lean()

    // Create CSV content
    const csvHeaders = "Name,Email,Role,Verified,Active,Joined,Courses Enrolled\n"
    const csvRows = users
      .map((user) => {
        return [
          user.name,
          user.email,
          user.role,
          user.isVerified ? "Yes" : "No",
          user.isActive !== undefined ? (user.isActive ? "Yes" : "No") : "Yes",
          new Date(user.createdAt).toLocaleDateString(),
          user.purchasedCourses?.length || 0,
        ].join(",")
      })
      .join("\n")

    const csvContent = csvHeaders + csvRows

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="users-export-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error("Error exporting users:", error)
    return NextResponse.json({ error: "Failed to export users" }, { status: 500 })
  }
}
