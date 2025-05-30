import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import AdminDashboard from "@/components/Admin/AdminDashboard"
import AdminSidebar from "@/components/Admin/AdminSidebar"

export default async function AdminPage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/auth/signin?callbackUrl=/admin")
  }

  if (session.user.role !== "admin") {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <AdminDashboard />
      </main>
    </div>
  )
}
