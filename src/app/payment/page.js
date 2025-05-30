import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import PaymentForm from "@/components/Payment/PaymentForm"
import Navbar from "@/components/Shared/Navbar"
import Footer from "@/components/Shared/Footer"

export default async function PaymentPage({ searchParams }) {
  const session = await getServerSession()

  if (!session) {
    redirect("/auth/signin")
  }

  const courseId = searchParams.courseId

  if (!courseId) {
    redirect("/courses")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <PaymentForm courseId={courseId} />
      </main>
      <Footer />
    </div>
  )
}
