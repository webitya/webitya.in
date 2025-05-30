import PaymentFailed from "@/components/Payment/PaymentFailed"
import Navbar from "@/components/Shared/Navbar"
import Footer from "@/components/Shared/Footer"

export default function PaymentFailedPage({ searchParams }) {
  const reason = searchParams.reason || "Payment was not completed"

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <PaymentFailed reason={reason} />
      </main>
      <Footer />
    </div>
  )
}
