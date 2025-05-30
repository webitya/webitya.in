// Environment variable validation
export function validateEnvVars() {
  const requiredVars = ["NEXTAUTH_SECRET", "NEXTAUTH_URL", "MONGODB_URI"]

  const missingVars = requiredVars.filter((varName) => !process.env[varName])

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`)
  }

  // Validate NEXTAUTH_SECRET length
  if (process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_SECRET.length < 32) {
    throw new Error("NEXTAUTH_SECRET must be at least 32 characters long")
  }

  return true
}

// Call validation on server startup
if (typeof window === "undefined") {
  try {
    validateEnvVars()
  } catch (error) {
    console.error("Environment validation failed:", error.message)
    if (process.env.NODE_ENV === "production") {
      process.exit(1)
    }
  }
}
