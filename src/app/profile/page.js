import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import ProfileHeader from "@/components/Profile/ProfileHeader"
import ProfileCourses from "@/components/Profile/ProfileCourses"
import ProfileSettings from "@/components/Profile/ProfileSettings"
import Profile3D from "@/components/Profile/Profile3D"
import Navbar from "@/components/Shared/Navbar"
import Footer from "@/components/Shared/Footer"

export default async function ProfilePage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <ProfileHeader user={session.user} />
        <Profile3D />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ProfileCourses />
            </div>
            <div className="lg:col-span-1">
              <ProfileSettings user={session.user} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
