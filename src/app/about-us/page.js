import AboutHero from "@/components/About/AboutHero"
import AboutTeam from "@/components/About/AboutTeam"
import AboutMission from "@/components/About/AboutMission"
import About3D from "@/components/About/About3D"
import Navbar from "@/components/Shared/Navbar"
import Footer from "@/components/Shared/Footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <AboutHero />
        <About3D />
        <AboutMission />
        <AboutTeam />
      </main>
      <Footer />
    </div>
  )
}
