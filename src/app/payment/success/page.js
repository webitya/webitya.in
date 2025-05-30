import PaymentSuccess from "@/components/Payment/PaymentSuccess"
import Navbar from "@/components/Shared/Navbar"
import Footer from "@/components/Shared/Footer"

export default function PaymentSuccessPage({ searchParams }) {
  const paymentId = searchParams.paymentId

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <PaymentSuccess paymentId={paymentId} />
      </main>
      <Footer />
    </div>
  )
}
