import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import PaymentManagement from "@/components/Admin/PaymentManagement"
import AdminSidebar from "@/components/Admin/AdminSidebar"

export default async function AdminPaymentsPage() {
  const session = await getServerSession()

  if (!session || session.user.role !== "admin") {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <PaymentManagement />
      </main>
    </div>
  )
}
