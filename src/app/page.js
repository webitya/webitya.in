import HomepageHero from "@/components/Homepage/HomepageHero"
import HomepageFeatures from "@/components/Homepage/HomepageFeatures"
import Homepage3D from "@/components/Homepage/Homepage3D"
import HomepageStats from "@/components/Homepage/HomepageStats"
import HomepageCTA from "@/components/Homepage/HomepageCTA"
import HomepageTestimonials from "@/components/Homepage/HomepageTestimonials"
import HomepageFAQ from "@/components/Homepage/HomepageFAQ"
import Navbar from "@/components/Shared/Navbar"
import Footer from "@/components/Shared/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      <main>
        <HomepageHero />
        <Homepage3D />
        <HomepageFeatures />
        <HomepageStats />
        <HomepageTestimonials />
        <HomepageFAQ />
        <HomepageCTA />
      </main>
      <Footer />
    </div>
  )
}
