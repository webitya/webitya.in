import SignInForm from "@/components/Auth/SignInForm"

export const metadata = {
  title: "Sign In - Webitya",
  description: "Sign in to your Webitya account to continue learning",
}

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hide 3D component on mobile */}
      <div className="hidden lg:block absolute inset-0 opacity-30">
        {/* 3D component would go here for desktop only */}
      </div>
      <SignInForm />
    </div>
  )
}
