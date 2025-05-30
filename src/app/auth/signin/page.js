import SignInForm from "@/components/Auth/SignInForm"
import Auth3D from "@/components/Auth/Auth3D"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <Auth3D />
        </div>
        <div className="order-1 lg:order-2">
          <SignInForm />
        </div>
      </div>
    </div>
  )
}
