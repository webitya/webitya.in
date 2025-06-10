import SignUpForm from "@/components/Auth/SignUpForm"

export const metadata = {
  title: "Sign Up - Webitya",
  description: "Create your Webitya account and start your learning journey",
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hide 3D component on mobile */}
      <div className="hidden lg:block absolute inset-0 opacity-30">
        {/* 3D component would go here for desktop only */}
      </div>
      <SignUpForm />
    </div>
  )
}
