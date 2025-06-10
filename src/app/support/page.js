import SupportHero from "@/components/Support/SupportHero"
import SupportTickets from "@/components/Support/SupportTickets"
import SupportFAQ from "@/components/Support/SupportFAQ"
import Support3D from "@/components/Support/Support3D"
import Navbar from "@/components/Shared/Navbar"
import Footer from "@/components/Shared/Footer"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <SupportHero />
        <Support3D />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-8">
            <SupportTickets />
            <SupportFAQ />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
