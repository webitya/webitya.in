import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import UserManagement from "@/components/Admin/UserManagement"
import AdminSidebar from "@/components/Admin/AdminSidebar"

export default async function AdminUsersPage() {
  const session = await getServerSession()

  if (!session || session.user.role !== "admin") {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <UserManagement />
      </main>
    </div>
  )
}
