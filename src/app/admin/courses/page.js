import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import CourseManagement from "@/components/Admin/CourseManagement"
import AdminSidebar from "@/components/Admin/AdminSidebar"

export default async function AdminCoursesPage() {
  const session = await getServerSession()

  if (!session || session.user.role !== "admin") {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <CourseManagement />
      </main>
    </div>
  )
}
